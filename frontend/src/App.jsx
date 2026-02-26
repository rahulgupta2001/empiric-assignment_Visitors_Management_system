import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import SecurityDashboard from "./pages/SecurityDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import HrDashboard from "./pages/HrDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/security" element={<SecurityDashboard />} />
      <Route path="/manager" element={<ManagerDashboard />} />
      <Route path="/hr" element={<HrDashboard />} />
    </Routes>
  );
}

export default App;