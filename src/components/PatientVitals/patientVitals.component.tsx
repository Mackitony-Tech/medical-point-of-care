import React, { useEffect, useState } from "react";
import { GetPatientVitals } from "./patientVitals.resource";
import "./patientVitals.component.css";

function PatientVitals(props: any) {
  const [vitals, setVitals] = useState([]);
  const { id } = props;

  useEffect(() => {
    if (id) {
      GetPatientVitals(id).then((resp) => {
        const results = resp.map((vitals: any) => {
          return {
            vitals_id: vitals.uuid,
            location: vitals.location.display,
            obsDate: vitals.obsDatetime,
            obs: vitals.encounter.obs,
          };
        });
        setVitals(results);
      });
    }
  }, [id]);
  const headers = [
    { key: "location", header: "Location" },
    { key: "obsDate", header: "Date" },
    { key: "obs", header: "Observations" },
  ];

  return (
    <>
      <p className="vitalsname">Patient Vitals</p>
      {vitals.length > 0 ? (
        <div className="patientVitals">
          <table title="Patient Vitals">
            <thead>
              <tr>
                {headers.map((item, index) => (
                  <th>{item.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vitals.map((item: any, index) => (
                <tr>
                  {headers.map((columnItem, index) => {
                    if (columnItem.key === "obs") {
                      return (
                        <td>
                          {item.obs.map((value: any, index: any) => {
                            return (
                              <li className="list">
                                <ul>{value.display}</ul>
                              </li>
                            );
                          })}
                        </td>
                      );
                    }
                    return <td>{item[`${columnItem.key}`]}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Vitals Found</p>
      )}
    </>
  );
}

export default PatientVitals;
