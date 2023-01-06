import { Post } from "../shared/httpClient";
import { dataJobUrl, listUrl } from "../constants/apiEndpoints";

export const fetchJobList = async (type) => {
  const url = dataJobUrl + listUrl;

  const response = await Post(url, {
    filters: {
      type,
    },
  });

  return response;
};
