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

const Get = async (url, payload) => {
  return apiCall("get", url, payload);
};

const Post = async (url, payload) => {
  return apiCall("post", url, payload);
};

const Put = async (url, payload) => {
  return apiCall("put", url, payload);
};

const Delete = async (url, payload) => {
  return apiCall("delete", url, payload);
};

const Patch = async (url, payload) => {
  return apiCall("patch", url, payload);
};

const apiCall = async (method, url, payload) => {
  try {
    const response = await httpClient[method](url, payload);
    return successResponseResolver(response);
  } catch (error) {
    return errorResponseResolver(error);
  }
};

const successResponseResolver = function (response) {
  const result = { ...response, ...response?.data };
  console.log({ successResponseResolver: result });
  return result;
};

const errorResponseResolver = function (error) {
  const result = {
    data: {},
    success: false,
    message: error?.response?.data?.message || error?.message,
    error,
  };
  console.log({ errorResponseResolver: result });
  return result;
};

export { Get, Post, Put, Patch, Delete };
