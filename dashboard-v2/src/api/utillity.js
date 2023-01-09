import { Post } from "../shared/httpClient";
import { dataJobUrl, listUrl } from "../constants/apiEndpoints";

export const fetchJobList = async ({ kind }) => {
  const url = dataJobUrl + listUrl;

  const response = await Post(url, {
    filters: {
      kind,
    },
  });

  return response;
};
