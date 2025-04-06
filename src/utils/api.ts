import axios, { AxiosError } from "axios";
import config from "../Config/config";

// Show toast function (replace with your actual toast lib)
const showToast = (message: string) => {
    alert(message); // Use react-toastify or similar
};

// Token management
const getToken = () => localStorage.getItem("token");
const setToken = (token: string) => localStorage.setItem("token", token);
const Storage = {
    removeToken: () => localStorage.removeItem("token"),
};

// Navigate function (update if you're using React Router)
const navigate = (route: string) => {
    window.location.href = `/${route.toLowerCase()}`;
};

// Create Axios instance
export const API = axios.create({
    baseURL: config.BASE_URL, // '/api'
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
});


// 🔐 Request Interceptor: Add token and log details
API.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        // 🔍 Log request details in DEV
        if (import.meta.env.DEV) {
            const fullUrl = `${config.baseURL}${config.url}`;
            console.log(" API Request:");
            console.log(" Method:", config.method?.toUpperCase());
            console.log(" URL:", fullUrl);
            console.log(" Payload:", config.data || config.params || {});
            console.log(" Headers:", config.headers);
        }

        return config;
    },
    (error) => {
        if (import.meta.env.DEV) {
            console.error("Request Error:", error);
        }
        return Promise.reject(error);
    }
);

// ⚠️ Response Interceptor: Handle success, errors, and log
API.interceptors.response.use(
    (response) => {
        if (import.meta.env.DEV) {
            const fullUrl = `${response?.config?.baseURL}${response?.config?.url}`;
            console.log(" API Response:");
            console.log("URL:", fullUrl);
            console.log("Status:", response.status);
            console.log(" Data:", response.data);
        }

        if (response.data?.success) {
            return response.data;
        } else {
            showToast(response?.data?.message || "Something went wrong");
            return Promise.reject(response.data);
        }
    },
    async (error) => {
        const err = error as AxiosError & { response?: any };
        const message: string = err.response?.data?.message || err.message;

        if (import.meta.env.DEV) {
            const fullUrl = `${err?.config?.baseURL}${err?.config?.url}`;
            console.error(" API Error:");
            console.log(" URL:", fullUrl);
            console.log("Status:", err.response?.status);
            console.log("Data:", err.response?.data);
        }

        showToast(message);

        if (err.response?.status === 401) {
            setToken("");
            await Storage.removeToken();
            navigate("Login");
        }

        return Promise.reject(err.response?.data || error);
    }
);
