import axios from "axios";
import { getTokenFromStorage } from "../shared/auth";
/** Default config for axios instance */
let config = {
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/gateway/api/`,
  withCredentials: true,
};

const httpClient = axios.create(config);

httpClient.defaults.headers.common[
  "Authorization"
] = `Bearer ${getTokenFromStorage()}`;

export { httpClient };
