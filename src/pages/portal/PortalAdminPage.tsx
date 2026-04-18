import { useEffect, useState } from 'react';
import { listAdminEnquiries, listAdminUsers, updateEnquiryStatus, updateUserAdminFields, type PortalEnquiry, type UserProfile } from '../../lib/firestoreHelpers';
import { userRoles, type UserRole, type UserStatus } from '../../lib/roles';

const enquiryStatuses: PortalEnquiry['status'][] = ['new', 'in_review', 'awaiting_reply', 'closed', 'converted'];
const userStatuses: UserStatus[] = ['active', 'pending', 'archived'];
const formatStatus = (value: string) => value.replace(/_/g, ' ');

export function PortalAdminPage() {
  const [enquiries, setEnquiries] = useState<PortalEnquiry[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  async function load() {
    setStatus('loading');
    try {
      const [nextEnquiries, nextUsers] = await Promise.all([listAdminEnquiries(), listAdminUsers()]);
      setEnquiries(nextEnquiries);
      setUsers(nextUsers);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleStatusChange(enquiryId: string, nextStatus: PortalEnquiry['status']) {
    await updateEnquiryStatus(enquiryId, nextStatus);
    await load();
  }

  async function handleUserChange(uid: string, values: { role?: UserRole; status?: UserStatus; promoEligible?: boolean; promoCodeAssigned?: string }) {
    await updateUserAdminFields(uid, values);
    await load();
  }

  return (
    <div className="portal-stack">
      <div className="portal-card portal-card--hero">
        <div>
          <p className="eyebrow">Admin</p>
          <h2>Lead review</h2>
          <p>Review enquiries, linked accounts, profile completion, and status updates.</p>
        </div>
        <div className="admin-metrics">
          <span>{enquiries.length} enquiries</span>
          <span>{users.length} users</span>
        </div>
      </div>
      {status === 'loading' ? <p className="portal-muted">Loading admin data...</p> : null}
      {status === 'error' ? <p className="error-text">Unable to load admin data. Check Firebase setup and security rules.</p> : null}
      {status === 'ready' ? (
        <>
          <div className="portal-card">
            <p className="eyebrow">Enquiries</p>
            <h3>Lead status</h3>
            <div className="admin-list">
              {enquiries.map((enquiry) => (
                <article className="admin-row" key={enquiry.id}>
                  <div>
                    <span className="status-pill">{formatStatus(enquiry.status)}</span>
                    <h3>{enquiry.fullName || 'Unnamed enquiry'}</h3>
                    <p>{enquiry.email} {enquiry.phone ? `· ${enquiry.phone}` : ''}</p>
                    <p className="portal-muted">{enquiry.enquiryType?.join(', ') || 'Detailed property enquiry'}</p>
                  </div>
                  <label>
                    <span className="sr-only">Update enquiry status</span>
                    <select value={enquiry.status} onChange={(event) => void handleStatusChange(enquiry.id, event.target.value as PortalEnquiry['status'])}>
                      {enquiryStatuses.map((item) => (
                        <option value={item} key={item}>{formatStatus(item)}</option>
                      ))}
                    </select>
                  </label>
                </article>
              ))}
              {enquiries.length === 0 ? <p className="portal-muted">No enquiries found yet.</p> : null}
            </div>
          </div>

          <div className="portal-card">
            <p className="eyebrow">Users</p>
            <h3>Accounts and roles</h3>
            <div className="admin-list">
              {users.map((portalUser) => (
                <article className="admin-row" key={portalUser.uid}>
                  <div>
                    <span className="status-pill">{portalUser.profileCompleted ? 'profile complete' : 'profile pending'}</span>
                    <h3>{portalUser.fullName || portalUser.email}</h3>
                    <p>{portalUser.email} {portalUser.phone ? `· ${portalUser.phone}` : ''}</p>
                    <p className="portal-muted">
                      {portalUser.linkedEnquiryIds.length} linked enquiries · Promo {portalUser.promoEligible ? 'eligible' : 'not eligible'}
                    </p>
                  </div>
                  <div className="admin-controls">
                    <label>
                      <span>Role</span>
                      <select value={portalUser.role} onChange={(event) => void handleUserChange(portalUser.uid, { role: event.target.value as UserRole })}>
                        {userRoles.map((item) => (
                          <option value={item} key={item}>{item}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>Status</span>
                      <select value={portalUser.status} onChange={(event) => void handleUserChange(portalUser.uid, { status: event.target.value as UserStatus })}>
                        {userStatuses.map((item) => (
                          <option value={item} key={item}>{item}</option>
                        ))}
                      </select>
                    </label>
                    <label className="choice-option choice-option--single">
                      <input
                        type="checkbox"
                        checked={portalUser.promoEligible}
                        onChange={(event) => void handleUserChange(portalUser.uid, { promoEligible: event.target.checked })}
                      />
                      <span>Promo eligible</span>
                    </label>
                  </div>
                </article>
              ))}
              {users.length === 0 ? <p className="portal-muted">No users found yet.</p> : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
