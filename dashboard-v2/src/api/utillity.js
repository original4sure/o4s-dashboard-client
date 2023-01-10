import { Post } from "../shared/httpClient";
import {
  addDownloadJobUrl,
  dataJobUrl,
  listUrl,
} from "../constants/apiEndpoints";

export const fetchJobListApi = async ({ kind }) => {
  const url = dataJobUrl + listUrl;

  const response = await Post(url, {
    filters: {
      kind,
    },
  });

  return response;
};

export const dataDownloadApi = async (payload) => {
  const url = dataJobUrl + addDownloadJobUrl;

  const response = await Post(url, { ...payload });

  return response;
};
