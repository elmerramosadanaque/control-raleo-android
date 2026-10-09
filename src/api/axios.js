import axios from 'axios';

//const SESSION_NAME = import.meta.env.VITE_SESSION_NAME;
const BASE_URL = import.meta.env.VITE_URL_API;

export default axios.create({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    baseURL : BASE_URL,
    crossDomain: true
});

/*
export const axiosPrivate = axios.create({
    baseURL : BASE_URL,
    headers: { 
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem(SESSION_NAME))?.token}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    },
    withCredentials : true
});
*/
