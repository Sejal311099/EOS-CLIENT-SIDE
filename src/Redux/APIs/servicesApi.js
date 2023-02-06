import axios from "axios";

const url = "http://localhost:9000/api";
const token = JSON.parse(sessionStorage.getItem("USEREOS"));
const headersParam = {
    "Authorization" : `Bearer ${token}`,
};


export const getAllServicesApi = async () => await axios.get(`${url}/service/getallservice`, {headers: headersParam});

export const getSingleServiceApi = async (service) => await axios.get(`${url}/categories//${service}`,{ headers: headersParam});

export const getSingleCategoryApi = async(category_id) => await axios.get(`${url}/categories/single-categories/${category_id}`, { headers: headersParam });

export const getServicesApi = async() => await axios.get(`${url}/service`, { headers: headersParam });
