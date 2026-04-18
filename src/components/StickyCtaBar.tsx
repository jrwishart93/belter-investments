import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { featuredProperty } from '../data/property';

export function StickyCtaBar() {
  return (
    <div className="sticky-cta-bar" aria-label="Property enquiry actions">
      <div className="sticky-cta-bar__inner">
        <p className="sticky-cta-bar__label">
          <span className="sticky-cta-bar__address">{featuredProperty.addressLine1}, Edinburgh</span>
          <span className="sticky-cta-bar__price">{featuredProperty.monthlyRentDisplay}</span>
        </p>
        <div className="sticky-cta-bar__actions">
          <Link className="cta-button" to="/enquiries">
            <MessageCircle className="button-icon" size={16} strokeWidth={1.9} aria-hidden="true" />
            <span>Make an Enquiry</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
