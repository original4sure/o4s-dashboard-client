import { httpClient, Get, Post, Put } from "../shared/httpClient";

const fetchEWarrantyListApi = async (payload) => {
  const fetchEWarrantyListUrl = `/consumer/warranty/list`;
  const eWarrantyList = await Post(fetchEWarrantyListUrl, payload);
  return eWarrantyList;
};

const fetchWarrantyApi = async (warrantyCode) => {
  const fetchWarrantyUrl = `/consumer/warranty?code=${warrantyCode}`;
  const eWarranty = await Get(fetchWarrantyUrl);
  return eWarranty;
};

const changeStatusApi = async (warrantyCode, payload) => {
  const url = `/consumer/warranty?code=${warrantyCode}`;
  const result = await Put(url, payload);
  return result;
};

export default {
  fetchEWarrantyListApi,
  fetchWarrantyApi,
  changeStatusApi,
};
