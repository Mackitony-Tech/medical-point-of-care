

const baseUrl = 'https://kibana.ampath.or.ke/openmrs/ws/rest/v1/'

export const Authenticate = (username: any, password: any) => {

   const token = window.btoa(`${username}:${password}`)

    return window.fetch(`${baseUrl}session`, {
        headers: {
            Authorization: `Basic ${token}`,
            mode: "cors",
        }
    }).then(resp => resp.json())
    
        .then(data => data)
}