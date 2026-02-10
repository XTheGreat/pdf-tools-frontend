import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UploadPage from './pages/UploadPage'; // Import UploadPage
import Footer from './components/Footer';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<UploadPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} /> {/* Route untuk Pricing */}
          <Route path="/contact" element={<Contact />} /> {/* Route untuk Tools */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;