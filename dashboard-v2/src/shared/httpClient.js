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

export const get = async (url, optionConfig) => {
  try {
    const response = await httpClient.get(url);
    return response;
  } catch (error) {
    return error
      ? { errorCode: error.status, errorMessage: error.statusText }
      : error;
  }
};

export { httpClient };
