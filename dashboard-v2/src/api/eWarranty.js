import { Get, Post, Put } from "../shared/httpClient";

const fetchEWarrantyListApi = async (payload) => {
  const fetchEWarrantyListUrl = `/consumer/warranty/list`;
  const response = await Post(fetchEWarrantyListUrl, payload);
  return response;
};

const fetchWarrantyApi = async (warrantyCode) => {
  const fetchWarrantyUrl = `/consumer/warranty?code=${warrantyCode}`;
  const response = await Get(fetchWarrantyUrl);
  return response;
};

const changeStatusApi = async (warrantyCode, payload) => {
  const url = `/consumer/warranty?code=${warrantyCode}`;
  const response = await Put(url, payload);
  return response;
};

export default {
  fetchEWarrantyListApi,
  fetchWarrantyApi,
  changeStatusApi,
};
