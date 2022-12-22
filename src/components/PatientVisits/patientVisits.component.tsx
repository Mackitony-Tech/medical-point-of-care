import React, { useEffect, useState } from "react";
import { GetPatientVisit } from "./patientVisits.resource";

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
      {rows.length > 0 ? (
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
      ) : (
        <p>No visits Found</p>
      )}
    </>
  );
}

export default PatientVisits;
