import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { AboutPage } from './pages/AboutPage';
import { EnquiryPage } from './pages/EnquiryPage';
import { HomePage } from './pages/HomePage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';

function App() {
  const location = useLocation();

  return (
    <SiteLayout>
      <div key={location.pathname} className="route-shell">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/property/:slug" element={<PropertyDetailsPage />} />
          <Route path="/enquiry" element={<EnquiryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </SiteLayout>
  );
}

export default App;
