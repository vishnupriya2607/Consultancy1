import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDash";
import Login from "./components/AdminLogin";
import EventForm from "./components/EventForm";
import AddStudentForm from "./components/AddStudentForm";
import NotificationSetup from "./components/NotificationSetup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/eventForm" element={<EventForm />} />
         <Route path="/add-student" element={<AddStudentForm />} />
        <Route path="/notification-setup" element={<NotificationSetup/>} />
      </Routes>
    </Router>
  );
}
export default App;