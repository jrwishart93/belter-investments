export function PortalTenancyPage() {
  return (
    <div className="portal-stack">
      <div className="portal-card">
        <p className="eyebrow">Tenant Area</p>
        <h2>Tenancy summary</h2>
        <p>This area is ready for tenancy records, agreement links, notices, and rent setup status once a tenancy is linked to your account.</p>
      </div>
      <div className="portal-card-grid">
        <div className="portal-card">
          <h3>Agreement</h3>
          <p className="portal-muted">No tenancy agreement is currently linked.</p>
        </div>
        <div className="portal-card">
          <h3>Payment method</h3>
          <p className="portal-muted">Awaiting secure third party payment setup.</p>
          <p className="form-helper">Belter will not store raw bank or card details in this portal.</p>
        </div>
      </div>
    </div>
  );
}
