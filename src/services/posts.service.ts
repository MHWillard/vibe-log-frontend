import { AxiosRequestConfig } from "axios";
import { ApiResponse } from "../models/api-response";
import { callExternalApi, fetchPosts } from "./api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;
const apiPostUrl = process.env.REACT_APP_API_POST_URL;

interface postData {
  content: string,
  userId: string,
}

export const getPostsTest = async () => {
  const { data, error } = await fetchPosts()
  console.log(data);

  return {
    data,
    error,
  };
}

export const getPosts = async (): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;
  console.log("console:" + JSON.stringify(data));

  return {
    data,
    error,
  };
};

export const createPost = async (postData: postData): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiPostUrl}`,
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    data: postData,
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};

export const getPublicResource = async (): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/messages/public`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};

export const getProtectedResource = async (): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/messages/protected`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};

export const getAdminResource = async (): Promise<ApiResponse> => {
  const config: AxiosRequestConfig = {
    url: `${apiServerUrl}/api/messages/admin`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = (await callExternalApi({ config })) as ApiResponse;

  return {
    data,
    error,
  };
};
