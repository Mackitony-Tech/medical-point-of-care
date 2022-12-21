import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PatientVisits from "../PatientVisits/patientVisits.component";
import PatientVitals from "../PatientVitals/patientVitals.component";

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
      <PatientVisits id={id} />
      <PatientVitals id={id} />
    </>
  );
}

export default PatientDetails;
