import axios from "axios";

const axiosConfig = axios.create({
    baseURL: "https://money-manager-application-gbib.onrender.com/api/v1.0",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
});

//list of endpoints that do not require authorization header
const excludeEndpoints = ["/login", "/register", "/status", "/activate", "/health"];

//request interceptor
axiosConfig.interceptors.request.use((config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) =>
        config.url?.includes(endpoint)
    )

    if(!shouldSkipToken){
        const accessToken = localStorage.getItem("token")
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});
