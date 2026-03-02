
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import SecurityDashboard from "./pages/SecurityDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import HrDashboard from "./pages/HrDashboard";
import ProtectedRoute from "./pages/ProtectedRoute"; 

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Login />} />

     
      
     
      <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      
   
      <Route element={<ProtectedRoute allowedRoles={['Security']} />}>
        <Route path="/security" element={<SecurityDashboard />} />
      </Route>

   
      <Route element={<ProtectedRoute allowedRoles={['Manager']} />}>
        <Route path="/manager" element={<ManagerDashboard />} />
      </Route>

    
      <Route element={<ProtectedRoute allowedRoles={['HR']} />}>
        <Route path="/hr" element={<HrDashboard />} />
      </Route>
      
     
    </Routes>
  );
}

export default App;