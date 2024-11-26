import axios from 'axios'

export const baseAPI = process.env.REACT_APP_BASE_URL_PROD;

export const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_PROD,
    // baseURL: process.env.REACT_APP_BASE_URL,
})


export const APIv1 = axios.create({
        // baseURL: process.env.REACT_APP_BASE_URL_PRODV1,
        baseURL: process.env.REACT_APP_BASE_URLV1,
})

export const SIGN_IN = (formData) => APIv1.post("/login/", formData);
