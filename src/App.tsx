import { Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout';
import { AboutPage } from './pages/AboutPage';
import { EnquiryPage } from './pages/EnquiryPage';
import { HomePage } from './pages/HomePage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';

function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property/:slug" element={<PropertyDetailsPage />} />
        <Route path="/enquiry" element={<EnquiryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteLayout>
  );
}

export default App;
