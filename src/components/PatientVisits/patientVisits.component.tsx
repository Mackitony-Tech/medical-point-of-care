import React, { useEffect, useState } from "react";
import { GetPatientVisit } from "./patientVisits.resource";
import "./patientVisits.component.css";

function PatientVisits(props: any) {
  const [rows, setrows] = useState([]);

  const { id } = props;
  useEffect(() => {
    if (id) {
      GetPatientVisit(id).then((resp) => {
        const results = resp.map((visit: any) => {
          return {
            name: visit.patient.display,
            location_id: visit.uuid,
            location: visit.location.display,
            visit_type: visit.visitType.display,
            date: visit.startDatetime,
          };
        });
        setrows(results);
      });
    }
  }, [id]);
  const headers = [
    { key: "location_id", header: "Location ID" },
    { key: "visit_type", header: "Visit Type" },
    { key: "location", header: "Location" },
    { key: "date", header: "Date" },
  ];

  return (
    <>
      <p className="visitsname">Patient Visits</p>
      {rows.length > 0 ? (
        <div className="patient_visits">
          <table title="Patient Visits">
            <thead>
              <tr>
                {headers.map((item, index) => (
                  <th>{item.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((item, index) => (
                <tr>
                  {headers.map((columnItem, index) => {
                    return <td>{item[`${columnItem.key}`]}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No visits Found</p>
      )}
    </>
  );
}

export default PatientVisits;
