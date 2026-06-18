import React from "react";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:6500/api",
});



// Automatically attach token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("Token");
    if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
    return config;
});


export default api;