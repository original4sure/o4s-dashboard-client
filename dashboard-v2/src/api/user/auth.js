import { getCall } from "../../shared/httpClient";
export const fetchConfig = async (pageSize, pageNumber, status) => {
  const response = await getCall("/utilities/config");
  return response?.data;
};
