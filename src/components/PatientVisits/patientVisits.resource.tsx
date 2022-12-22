const baseUrl = "https://kibana.ampath.or.ke/openmrs/ws/rest/v1/";

export const GetPatientVisit = (id: string) => {
  return window
    .fetch(`${baseUrl}visit?patient=${id}&v=full`, {
      headers: {
        Authorization: `Basic ${window.sessionStorage.getItem("auth.token")}`,
        Cookie: `JSESSIONID=${window.sessionStorage.getItem("auth.sessionId")}`,
        mode: "cors",
      },
    })
    .then((resp) => resp.json())
    .then((result) => {
      return result.results;
    })
    .catch((error) => console.log("error", error));
};