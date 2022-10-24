import axios from "axios";
import BASE_URL from "./baseUrl";

axios.defaults.baseURL = BASE_URL;

export const putRequest = async (URL, params) => {


    const response = await axios.put(URL).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    })

    if (response){
        return response;
    }else{
        return true;
    }
}
