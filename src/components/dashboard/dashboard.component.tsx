import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PatientSearch from "../PatientSearch/patientSearch.component";

function Dashboard() {
  const [isLoggedin] = useState(
    window.sessionStorage.getItem("auth.credentials")
  );
  const navigate = useNavigate();
  useEffect(() => {
    isLoggedin === null && navigate("/");
  }, [isLoggedin, navigate]);
  return (
    <>
      <label>Ampath Medical P.O.C</label>

      <PatientSearch />
    </>
  );
}

export default Dashboard;
