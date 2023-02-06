import axios from "axios";

const url = "http://localhost:9000/api";
const token = JSON.parse(sessionStorage.getItem("USEREOS"));
const headersParam = {
    "Authorization" : `Bearer ${token}`,
};


export const getAllBestOffersApi = async () => await axios.get(`${url}/bestOffers/getall`, {headers: headersParam});