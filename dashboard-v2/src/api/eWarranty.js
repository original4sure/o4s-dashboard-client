import { httpClient, postCall } from "../shared/httpClient";

const fetchEWarrantyList = async ({pageNumber, pageSize, filters, sorts}) => {
  try {
    const fetchEWarrantyListUrl = `/consumer/warranty/list`;
    const eWarrantyList = await postCall(fetchEWarrantyListUrl, {
      pageNumber: pageNumber,
      pageSize: pageSize,
      filters: {
          purchasedOn: {
              startTimestamp: filters.purchasedOn.startTimestamp,
              endTimestamp: filters.purchasedOn.endTimestamp,
          },
          identity : filters.identity,
          status: filters.status
      },
      sorts: {
          "warrantyData.purchasedOn": sorts["warrantyData.purchasedOn"]
      }
    });
    return eWarrantyList;
  } catch (error) {
    return error
      ? { errorCode: error.status, errorMessage: error.statusText }
      : error;
  }
};

const fetchWarranty = async (warrantyCode) => {
  try {
    const fetchWarrantyUrl = `/consumer/warranty?code=${warrantyCode}`;
    const eWarranty = await httpClient.get(fetchWarrantyUrl);
    return eWarranty;
  } catch (error) {
    console.log("L6");
    return error
      ? { errorCode: error.status, errorMessage: error.statusText }
      : error;
  }
};

const changeStatus = async (warrantyCode, payload) => {
  try {
    const url = `/consumer/warranty?code=${warrantyCode}`;
    const result = await httpClient.put(url, payload);
    return result;
  } catch (error) {
    return error
      ? { errorCode: error.status, errorMessage: error.statusText }
      : error;
  }
};

export default {
  fetchEWarrantyList,
  fetchWarranty,
  changeStatus,
};
