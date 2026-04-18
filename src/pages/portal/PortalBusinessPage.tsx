import { Link } from 'react-router-dom';

export function PortalBusinessPage() {
  return (
    <div className="portal-stack">
      <div className="portal-card">
        <p className="eyebrow">Business</p>
        <h2>Business and property owner enquiries</h2>
        <p>Track service interest around management, licensing, advertising, property websites, and portfolio support.</p>
        <Link className="cta-button cta-button--secondary" to="/enquiries">Send a business enquiry</Link>
      </div>
      <div className="portal-card">
        <h3>Payment links</h3>
        <p className="portal-muted">Future invoice and payment link statuses will appear here. No payment details are stored by Belter.</p>
      </div>
    </div>
  );
}
