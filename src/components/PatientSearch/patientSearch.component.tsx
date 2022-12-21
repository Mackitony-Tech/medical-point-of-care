import React, { useState } from "react";
import { SearchPatient } from "./patientSearch.resource";

function PatientSearch() {
  const [patientName, setPatientName] = useState("");
  const [data, setData] = useState([]);

  const handleSearchChange = (e: any) => {
    console.log(data, patientName);

    e.preventDefault();
    if (e.target.value.match("^[a-zA-Z ]*$") != null) {
      //validation of search
      setPatientName(e.target.value);
    }
    SearchPatient(patientName).then((resp) => {
      const results = resp.map((patient: any) => {
        return {
          id: patient.uuid,
          name: patient.person.display,
          age: patient.person.age,
          gender: patient.person.gender,
          dob: patient.person.birthdate,
        };
      });
      setData(results);
    });
  };
  const PatientsTable = () => {
    return (
      <>
        <p>table</p>
      </>
    );
  };
  return (
    <>
      <br />
      <input
        type="text"
        placeholder="Search Patient"
        value={patientName}
        onChange={handleSearchChange}
      />
     <br />
     {patientName === "" ? (
          <p className="enter-name">Enter patients name</p>
        ) : (
          PatientsTable()
        )}
    </>
  );
}

export default PatientSearch;
