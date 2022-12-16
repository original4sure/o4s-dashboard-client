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

const getCall = async (url, payload) => {
  try {
    const response = await httpClient.get(url, payload);
    return successResponseResolver(response);
  } catch (error) {
    return errorResponseResolver(error)
  }
};

const postCall = async (url, payload) => {
  try {
    const response = await httpClient.post(url, payload);
    return successResponseResolver(response);
  } catch (error) {
    console.log()
    return errorResponseResolver(error)
  }
};

const putCall = async (url, payload) => {
  try {
    const response = await httpClient.put(url, payload);
    return response;
  } catch (error) {
    return error
      ? { errorCode: error.status, errorMessage: error.statusText }
      : error;
  }
};

const deleteCall = async (url, payload) => {
  try {
    const response = await httpClient.delete(url, payload);
    return response;
  } catch (error) {
    return error
      ? { errorCode: error.status, errorMessage: error.statusText }
      : error;
  }
};

const patchCall = async (url, payload) => {
  try {
    const response = await httpClient.patch(url, payload);
    return response;
  } catch (error) {
    return error
      ? { errorCode: error.status, errorMessage: error.statusText }
      : error;
  }
};

const successResponseResolver = function(response){
  const result  = {...response, ...response?.data}
  console.log(result)
  return result
}

const errorResponseResolver = function(error){
  const result = { data : {}, success: false, message: error?.response?.data?.message || error?.message, error}
  console.log(result)
  return result
}

export { httpClient, getCall, postCall, putCall, patchCall, deleteCall };
