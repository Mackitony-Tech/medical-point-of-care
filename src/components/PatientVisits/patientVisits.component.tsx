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
            location_id: visit.uuid,
            location: visit.display,
          };
        });
        setrows(results);
      });
    }
  }, [id]);
  const headers = [
    { key: "location_id", header: "Location ID" },
    { key: "location", header: "Location" },
  ];

  return (
    <>
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
    </>
  );
}

export default PatientVisits;
