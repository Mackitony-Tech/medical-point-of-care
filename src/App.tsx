import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login.component";
import Dashboard from "./components/dashboard/dashboard.component";
import PatientDetails from "./components/PatientDetails/patientDetails.component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient/:patientuuid?" element={<PatientDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
