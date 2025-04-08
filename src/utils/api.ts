// src/utils/api.ts
import axios, { AxiosError } from "axios";
import config from "../Config/config";
import { removeTokenFromStorage, saveTokenToStorage } from "./storage";

// Optional manual navigate (fallback)
const navigate = (route: string) => {
  window.location.href = `/${route.toLowerCase()}`;
};

// Axios Instance
export const API = axios.create({
  baseURL: config.BASE_URL, // Set your base URL here (e.g., import from config)
  headers: {
    "Content-Type": "application/json",
  },
});
export const setToken = (token: string) => {
  console.log("token", token);

  API.defaults.headers.common.Authorization = `Bearer ${token}`;
  return true;
};
// Response Interceptor
API.interceptors.response.use(
  function (response) {
    console.log(`✅ RES of ${response?.config?.url || ""}:`, response);

    if (response?.status === 200) {
      return response.data;
    } else {
      if (response?.data?.msg) {
        console.log(response?.data?.msg);

        // showError(response.data.message);
      }
      return Promise.reject(response.data);
    }
  },
  async function (error: AxiosError) {
    const message =
      error.response?.data?.msg || error.message || "Something went wrong";

    console.log(message);

    if (error.response?.status === 401) {
      saveTokenToStorage("");
      removeTokenFromStorage();
      navigate("login");
    }

    return Promise.reject(error.response?.data || error);
  }
);
