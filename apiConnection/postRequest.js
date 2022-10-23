import axios from "axios";

axios.defaults.baseURL = "http://192.168.100.99:3000";

export const postRequest = async (URL, params) => {

    const response = await axios.post(URL, {
        headers: {
            "Content-Type": "application/json",
        },
        params: params,
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return (error);
    })

    return response;
}
