const baseUrl = "https://kibana.ampath.or.ke/openmrs/ws/rest/v1/";

export const GetPatientVitals = (id: string) => {
  return window
    .fetch(
      `${baseUrl}obs?patient=${id}&concepts=5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,5086AA
    AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,5088AAAAAAAAAAAAAAAAAAAAAAAAA
    AAAAAAA,5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,5089AAAAAAAAAAAA
    AAAAAAAAAAAAAAAAAAAA,5087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,509
    2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,1343AAAAAAAAAAAAAAAAAAAAAA
    AAAAAAAAAA,5242AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA,5283AAAAAAAAA
    AAAAAAAAAAAAAAAAAAAAAAA&v=full`,
      {
        headers: {
          Authorization: `Basic ${window.sessionStorage.getItem("auth.token")}`,
          Cookie: `JSESSIONID=${window.sessionStorage.getItem(
            "auth.sessionId"
          )}`,
          mode: "cors",
        },
      }
    )
    .then((resp) => resp.json())
    .then((result) => {
      return result.results;
    })
    .catch((error) => console.log("error", error));
};
