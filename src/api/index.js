import axios from 'axios'

export const API = axios.create({
    baseURL: 'http://127.0.0.1:8000',
})


export const APIv1 = axios.create({
	baseURL: 'http://127.0.0.1:8000/api/v1',
})

export const SIGN_IN = (formData) => APIv1.post("/login/", formData);