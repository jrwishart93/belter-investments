import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PortalLayout } from './components/portal/PortalLayout';
import { SiteLayout } from './components/SiteLayout';
import { EnquiryPage } from './pages/EnquiryPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { HomePage } from './pages/HomePage';
import { InvestmentsPage } from './pages/InvestmentsPage';
import { LoginPage } from './pages/LoginPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { RegisterPage } from './pages/RegisterPage';
import { PortalAdminPage } from './pages/portal/PortalAdminPage';
import { PortalBusinessPage } from './pages/portal/PortalBusinessPage';
import { PortalDashboardPage } from './pages/portal/PortalDashboardPage';
import { PortalEnquiriesPage } from './pages/portal/PortalEnquiriesPage';
import { PortalIssuesPage } from './pages/portal/PortalIssuesPage';
import { PortalProfilePage } from './pages/portal/PortalProfilePage';
import { PortalTenancyPage } from './pages/portal/PortalTenancyPage';

function LegacyPropertyRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `/properties/${slug}` : '/properties'} replace />;
}

function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:slug" element={<PropertyDetailsPage />} />
        <Route path="/investments" element={<InvestmentsPage />} />
        <Route path="/enquiries" element={<EnquiryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/portal"
          element={(
            <ProtectedRoute>
              <PortalLayout />
            </ProtectedRoute>
          )}
        >
          <Route index element={<PortalDashboardPage />} />
          <Route path="profile" element={<PortalProfilePage />} />
          <Route path="enquiries" element={<PortalEnquiriesPage />} />
          <Route path="tenancy" element={<PortalTenancyPage />} />
          <Route path="issues" element={<PortalIssuesPage />} />
          <Route path="business" element={<PortalBusinessPage />} />
          <Route path="admin" element={<PortalAdminPage />} />
        </Route>
        <Route path="/property/:slug" element={<LegacyPropertyRedirect />} />
        <Route path="/enquiry" element={<Navigate to="/enquiries" replace />} />
        <Route path="/about" element={<Navigate to="/investments" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  );
}

export default App;
