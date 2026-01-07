import { CustomError } from "@/types/custom-error.type";
import axios from "axios";

console.log("API BASE URL =", import.meta.env.VITE_API_BASE_URL);

const baseURL = import.meta.env.VITE_API_BASE_URL;

// 🚨 Safety check
if (!baseURL) {
  console.error("❌ VITE_API_BASE_URL is not defined in .env file");
}

const API = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

// ===============================
// RESPONSE INTERCEPTOR
// ===============================
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const response = error.response;
    const status = response?.status;
    const data = response?.data;

    if (status === 401) {
      window.location.href = "/";
    }

    const customError: CustomError = {
      ...error,
      message: data?.message || error.message || "Something went wrong",
      errorCode: data?.errorCode || "UNKNOWN_ERROR",
      status,
    };

    return Promise.reject(customError);
  }
);

export default API;
