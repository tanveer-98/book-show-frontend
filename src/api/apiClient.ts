/// <reference types="vite/client" />

import axios from "axios";

const url = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/";

const apiClient = axios.create({
  baseURL: url,
  timeout: 10000,
});

export { apiClient };
