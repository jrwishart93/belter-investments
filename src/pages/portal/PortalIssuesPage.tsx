import { FormEvent, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createIssue } from '../../lib/firestoreHelpers';

export function PortalIssuesPage() {
  const { user } = useAuth();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) return;
    const form = new FormData(event.currentTarget);
    setStatus('loading');
    try {
      await createIssue(user.uid, {
        title: String(form.get('title') ?? ''),
        description: String(form.get('description') ?? ''),
        category: String(form.get('category') ?? 'maintenance') as 'fault' | 'damage' | 'maintenance' | 'other',
        priority: String(form.get('priority') ?? 'normal') as 'low' | 'normal' | 'urgent'
      });
      event.currentTarget.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="portal-card portal-form" onSubmit={handleSubmit}>
      <p className="eyebrow">Issues</p>
      <h2>Report a fault, issue, or damage</h2>
      <p>This creates a tenant issue record that staff can review once your tenancy is linked.</p>
      <div className="form-grid">
        <div className="field-group">
          <label htmlFor="issue-category">Category</label>
          <select id="issue-category" name="category" required>
            <option value="maintenance">Maintenance</option>
            <option value="fault">Fault</option>
            <option value="damage">Damage</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="field-group">
          <label htmlFor="issue-priority">Priority</label>
          <select id="issue-priority" name="priority" required>
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>
      <div className="field-group">
        <label htmlFor="issue-title">Title</label>
        <input id="issue-title" name="title" required />
      </div>
      <div className="field-group">
        <label htmlFor="issue-description">Description</label>
        <textarea id="issue-description" name="description" rows={5} required />
      </div>
      <button className="cta-button" disabled={status === 'loading'}>{status === 'loading' ? 'Sending...' : 'Submit issue'}</button>
      {status === 'success' ? <p className="success-text">Issue submitted.</p> : null}
      {status === 'error' ? <p className="error-text">Unable to submit issue right now.</p> : null}
    </form>
  );
}
