import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { listMyEnquiries, type PortalEnquiry } from '../../lib/firestoreHelpers';

const formatStatus = (value: string) => value.replace(/_/g, ' ');

export function PortalEnquiriesPage() {
  const { user } = useAuth();
  const [enquiries, setEnquiries] = useState<PortalEnquiry[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    if (!user) return;
    listMyEnquiries(user.uid)
      .then((items) => {
        setEnquiries(items);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [user]);

  return (
    <div className="portal-stack">
      <div className="portal-card">
        <p className="eyebrow">Enquiries</p>
        <h2>Your submitted enquiries</h2>
        <p>Track enquiry status and add more detail by submitting another enquiry if your circumstances change.</p>
        <Link className="cta-button cta-button--secondary" to="/enquiries">Submit another enquiry</Link>
      </div>
      {status === 'loading' ? <p className="portal-muted">Loading enquiries...</p> : null}
      {status === 'error' ? <p className="error-text">Unable to load enquiries. Check Firebase setup and rules.</p> : null}
      {status === 'ready' && enquiries.length === 0 ? (
        <div className="portal-card">
          <h3>No linked enquiries yet</h3>
          <p>When you submit an enquiry while signed in, it will appear here.</p>
        </div>
      ) : null}
      {enquiries.map((enquiry) => (
        <article className="portal-card enquiry-summary" key={enquiry.id}>
          <div>
            <span className="status-pill">{formatStatus(enquiry.status)}</span>
            <h3>{enquiry.enquiryType?.join(', ') || 'Property enquiry'}</h3>
            <p>{enquiry.message || enquiry.sections?.[0]?.title || 'Detailed enquiry submitted.'}</p>
          </div>
          <p className="portal-muted">{enquiry.accountCreated ? 'Linked to account' : 'Guest enquiry'}</p>
        </article>
      ))}
    </div>
  );
}
