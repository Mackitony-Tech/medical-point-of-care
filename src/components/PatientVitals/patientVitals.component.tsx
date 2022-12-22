import React, { useEffect, useState } from "react";
import { GetPatientVitals } from "./patientVitals.resource";

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
  console.log("Vitals", vitals);

  const headers = [
    { key: "location", header: "Location" },
    { key: "obsDate", header: "Date" },
    { key: "obs", header: "Observations" },
  ];

  return (
    <>
      <p>Vitals: </p>
      {vitals.length > 0 ? (
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
                  console.log("Column IT", columnItem);
                  if (columnItem.key === "obs") {
                    console.log("Item", item.obs);

                    return (
                      <td>
                        {item.obs.map((v: any, i: any) => {
                          console.log("VV", v.display);

                          return (
                            <li>
                              <ul>{v.display}</ul>
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
      ) : (
        <p>No Vitals Found</p>
      )}
    </>
  );
}

export default PatientVitals;
