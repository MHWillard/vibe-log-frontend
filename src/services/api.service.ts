import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResponse } from "../models/api-response";
import { AppError } from "../models/app-error";

//const apiServerUrl = process.env.REACT_APP_API_SERVER_URL; 
const apiServerUrl = process.env.REACT_APP_API_TEST_URL; 
//const apiServerUrl = process.env.RAILWAY_API_URL; 
export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${apiServerUrl}`)
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { data: null, error };
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
