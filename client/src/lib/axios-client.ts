import { CustomError } from "@/types/custom-error.type";
import axios, { InternalAxiosRequestConfig } from "axios";

interface RequestError extends Error {
  config?: InternalAxiosRequestConfig;
}

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

// REQUEST INTERCEPTOR: block accidental requests that include 'undefined' in path
API.interceptors.request.use(
  (config) => {
    const url = config?.url || "";
    if (url.includes("undefined")) {
      const err: RequestError = new Error("Blocked request: missing workspaceId or parameter in URL");
      // Attach original config for debugging
      err.config = config;
      console.warn("Blocked outgoing API request with 'undefined' in URL:", url);
      return Promise.reject(err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// RESPONSE INTERCEPTOR
// ===============================
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const response = error.response;
    const status = response?.status;
    const data = response?.data;
    const url = response?.config?.url;

    if (status === 401 && !url?.includes('/user/current')) {
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
