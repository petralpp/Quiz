import axios from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response?.data.error;
    } else if (error.request) {
      return error.request;
    } else {
      return error.message;
    }
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "An unknown error has occurred.";
  }
};
