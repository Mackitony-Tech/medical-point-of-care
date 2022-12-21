import React, { useState } from "react";
import { useNavigate } from "react-router";
import PatientDetails from "../PatientDetails/patientDetails.component";
import { SearchPatient } from "./patientSearch.resource";

function PatientSearch() {
  const [patientName, setPatientName] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
  const handleRowClick = (e: any) => {
    navigate(`/patient/${e.id}`);
    PatientDetails();
  };
  const headers = [
    { key: "name", header: "Name" },
    { key: "age", header: "Age" },
    { key: "gender", header: "Gender" },
  ];
  const PatientsTable = () => {
    return (
      <>
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
