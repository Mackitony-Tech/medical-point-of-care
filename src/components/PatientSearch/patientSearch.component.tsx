import React, { useState } from "react";
import { useNavigate } from "react-router";
import PatientVisits from "../PatientVisits/patientVisits.component";
import { SearchPatient } from "./patientSearch.resource";
import "./patientSearch.component.css";

function PatientSearch() {
  const [patientName, setPatientName] = useState("");
  const [data, setData] = useState([]);
  const [, setPatientData] = useState({});
  const navigate = useNavigate();

  const handleSearchChange = (e: any) => {
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
  const handleRowClick = (patientData: any) => {
    navigate(`/patient/${patientData.id}`);
    setPatientData(patientData);
    // eslint-disable-next-line no-lone-blocks
    {
      patientData && <PatientVisits {...patientData} />;
    }
  };
  const headers = [
    { key: "name", header: "Name" },
    { key: "age", header: "Age" },
    { key: "gender", header: "Gender" },
  ];
  const PatientsTable = () => {
    return (
      <>
        <div className="patientsTable">
          {data.length > 0 ? (
            <table title="Patient search results">
              <thead>
                <tr>
                  {headers.map((item, index) => (
                    <th>{item.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr onClick={() => handleRowClick(item)}>
                    {headers.map((columnItem, index) => {
                      return <td>{item[`${columnItem.key}`]}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No paient Found</p>
          )}
        </div>
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
