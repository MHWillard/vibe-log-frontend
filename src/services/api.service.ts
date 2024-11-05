import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "../models/api-response";
import { AppError } from "../models/app-error";

//const apiServerUrl = process.env.REACT_APP_API_SERVER_URL; 
const apiServerUrl = 'https://localhost:7125/test-posts'

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${apiServerUrl}`);
    const {data} = response;
    return data; // Access the data property
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const callExternalApi = async (options: {
  config: AxiosRequestConfig;
}): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse = await axios(options.config);
    const { data } = response;
    console.log("ExternalAPIData:" + JSON.stringify(data));

    return {
      data,
      error: null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      const { response } = axiosError;

      let message = "http request failed";

      if (response && response.statusText) {
        message = response.statusText;
      }

      if (axiosError.message) {
        message = axiosError.message;
      }

      if (response && response.data && (response.data as AppError).message) {
        message = (response.data as AppError).message;
      }

      return {
        data: null,
        error: {
          message,
        },
      };
    }

    return {
      data: null,
      error: {
        message: (error as Error).message,
      },
    };
  }
};
