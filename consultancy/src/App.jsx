import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SchoolHomePage from "./pages/SchoolHomePage";
import AboutPage from "./pages/AboutPage";
import AdmissionForm from "./pages/AdmissionForm";
import Gallery from "./pages/Gallery1";
import Facilities from "./pages/Facilities";
import ContactPage from "./pages/ContactPage";
import Vission from "./pages/Vission";
import Mission from "./pages/MissionPage";
import Faculty from "./pages/FacultyPage";
import Navbar from "./components/Navbar"; 
import Footer from "./pages/Footer";
import "./index.css";



function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is now always present */}
      <Routes>
        <Route path="/" element={<SchoolHomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/vission" element={<Vission />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/admissionForm" element={<AdmissionForm />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </Router>
  );
}

export default App;
