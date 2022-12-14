import { get } from "../../shared/httpClient";
export const fetchConfig = async (pageSize, pageNumber, status) => {
  const response = await get("/utilities/config");
  return response?.data;
};
