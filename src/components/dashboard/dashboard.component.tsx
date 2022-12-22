import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PatientSearch from "../PatientSearch/patientSearch.component";
import "./dashboard.component.css";

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
      <div className="dashboard">
        <label
          className="dash_heading"
          style={{ color: "darkblue", position: "absolute" }}
        >
          Ampath Medical P.O.C
        </label>

        <PatientSearch />
      </div>
    </>
  );
}

export default Dashboard;
