
import axios from "axios";
import { useEffect } from "react";

const url = "http://localhost:9000/api";
const token = JSON.parse(sessionStorage.getItem("USEREOS"));
const headersParam = {
    "Authorization" : `Bearer ${token}`,
};


    // const userId = sessionStorage.getItem('userId')

export const getAllCartItemApi = async (userId) => await axios.get(`${url}/addtocart/${userId}`, {headers: headersParam});

export const addItemtoCartApi = async (item_data) => await axios.post(`${url}/addtocart/Create`, item_data, {headers: headersParam});

export const deleteItemtoCartApi = async (item_data) => await axios.delete(`${url}/addtocart/user/${item_data}`, {headers: headersParam});

export const allItemDeleteFromCartApi = async(userId) => await axios.delete(`${url}/addtocart/${userId}`, {headers: headersParam});