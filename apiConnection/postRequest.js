import axios from "axios";
import BASE_URL from "./baseUrl";

axios.defaults.baseURL = BASE_URL;

export const postRequest = async (URL, params) => {

    const response = await axios.post(URL).then((response) => {
        return response.data;
    }).catch((error) => {
        throw error.response.data.message;
    })

    return response;
}
