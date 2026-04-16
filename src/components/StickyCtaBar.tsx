import { Link } from 'react-router-dom';
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
          <Link className="cta-button" to="/enquiry">Enquire Now</Link>
          <Link className="cta-button cta-button--secondary" to="/enquiry">Arrange a Viewing</Link>
        </div>
      </div>
    </div>
  );
}
