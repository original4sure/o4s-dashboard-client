import { httpClient } from "../shared/httpClient";

const fetchEWarrantyList = async (pageSize, pageNumber, status) => {
  try {
    const fetchEWarrantyListUrl = `/consumer/warranty/list`;
    const eWarrantyList = await httpClient.post(fetchEWarrantyListUrl, {
      pageNumber: pageNumber,
      pageSize: pageSize,
      filters: {
        status: status,
      },
    });
    return eWarrantyList;
  } catch (error) {
    console.log("L3");
    return error
      ? { errorCode: error.status, errorMessage: error.statusText }
      : error;
  }
};

const fetchWarranty = async (warrantyCode) => {
  try {
    console.log("L4");
    const fetchWarrantyUrl = `/consumer/warranty?code=${warrantyCode}`;
    const eWarranty = await httpClient.get(fetchWarrantyUrl);
    console.log("L5", eWarranty);
    return eWarranty;
  } catch (error) {
    console.log("L6");
    return error
      ? { errorCode: error.status, errorMessage: error.statusText }
      : error;
  }
};

export default {
  fetchEWarrantyList,
  fetchWarranty,
};
