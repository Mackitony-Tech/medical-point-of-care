const baseUrl = "https://kibana.ampath.or.ke/openmrs/ws/rest/v1/";

export const SearchPatient = (patientName: string) => {
  return window
    .fetch(`${baseUrl}patient?q=${patientName}&v=default&limit=`, {
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
