import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PatientVisits from "../PatientVisits/patientVisits.component";
import PatientVitals from "../PatientVitals/patientVitals.component";
import "./patientDetails.component.css";

function PatientDetails() {
  const [id, setId] = useState("");
  const params = useParams();
  useEffect(() => {
    if (params.patientuuid) {
      setId(params.patientuuid);
    }
  }, [params.patientuuid]);

  return (
    <>
      <div className="patientDetails">
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
