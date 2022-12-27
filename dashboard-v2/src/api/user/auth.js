import { Get } from "../../shared/httpClient";
export const fetchConfig = async (pageSize, pageNumber, status) => {
  const response = await Get("/utilities/config");
  return response?.data;
};
