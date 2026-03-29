import axios from "axios";

export const api = axios.create({
  // Optional: A base URL can be set here.
  // If a baseURL is set, the interceptor modifies the relative endpoint.
  baseURL: import.meta.API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
