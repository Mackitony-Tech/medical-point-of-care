import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PatientVisits from "../PatientVisits/patientVisits.component";
import PatientVitals from "../PatientVitals/patientVitals.component";
import "./patientDetails.component.css";

function PatientDetails() {
  const [id, setId] = useState("");
  const params = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (params.patientuuid) {
      setId(params.patientuuid);
    }
  }, [params.patientuuid]);
  const handleRowClick = (patientData: any) => {
    navigate(`/dashboard`);
  };

  return (
    <>
      <div className="patientDetails">
        <input
          className="backBtn"
          type="button"
          value="Back"
          onClick={handleRowClick}
        />
        <PatientVisits id={id} />
        <div>
          <p>....................</p>
        </div>
        <PatientVitals id={id} />
      </div>
    </>
  );
}

export default PatientDetails;
