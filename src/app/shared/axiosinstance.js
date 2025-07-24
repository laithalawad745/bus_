"use client";
import axios from 'axios';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const axiosInstance = axios.create({
    baseURL: "https://mmo2zebussystem-c5c63f16b7b0.herokuapp.com/",
    timeout: 30000, 
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response?.status === 401) {

        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
