import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { EnquiryPage } from './pages/EnquiryPage';
import { HomePage } from './pages/HomePage';
import { InvestmentsPage } from './pages/InvestmentsPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';

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
        <Route path="/property/:slug" element={<LegacyPropertyRedirect />} />
        <Route path="/enquiry" element={<Navigate to="/enquiries" replace />} />
        <Route path="/about" element={<Navigate to="/investments" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  );
}

export default App;
