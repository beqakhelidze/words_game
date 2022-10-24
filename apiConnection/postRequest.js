import axios from "axios";
import BASE_URL from "./baseUrl";

axios.defaults.baseURL = BASE_URL;

export const postRequest = async (URL, params) => {

    console.log(URL);

    const response = await axios.post(URL).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error.response.data)
        return (error);
    })

    console.log(response);

    return response;
}
