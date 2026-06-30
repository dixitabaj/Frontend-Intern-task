import axios from "axios";

// create an axios instance for the auth API with base URL and headers
export const authClient = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_REQRES_API_KEY,
  },
});

