// src/utils/api.ts
import axios, { AxiosError } from "axios";

export const setToken = (token: string) => {
  API.defaults.headers.common.Authorization = `Bearer ${token}`;
  return true;
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

// Optional manual navigate (fallback)
const navigate = (route: string) => {
  window.location.href = `/${route.toLowerCase()}`;
};

// Axios Instance
export const API = axios.create({
  baseURL: "", // Set your base URL here (e.g., import from config)
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "en",
  },
  timeout: 30000,
});

// Response Interceptor
API.interceptors.response.use(
  function (response) {
    console.log(`✅ RES of ${response?.config?.url || ""}:`, response);

    if (response.data?.success) {
      if (import.meta.env.DEV && response?.data?.message) {
        console.log(response?.data?.message);
      }

      return response.data;
    } else {
      if (response?.data?.message) {
        console.log(response?.data?.message);

        // showError(response.data.message);
      }
      return Promise.reject(response.data);
    }
  },
  async function (error: AxiosError) {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    console.log(message);

    if (error.response?.status === 401) {
      setToken("");
      removeToken();
      navigate("login");
    }

    return Promise.reject(error.response?.data || error);
  }
);
