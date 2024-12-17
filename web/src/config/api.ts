import axios from "axios";

// Back End

const axiosInstanceMainApi = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_MAIN_URL });

axiosInstanceMainApi.defaults.timeout = 10000;
axiosInstanceMainApi.defaults.timeoutErrorMessage = "Timeout, please try again!";

axiosInstanceMainApi.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    console.error("ERROR API --> ", error);
    return Promise.reject(error);
  }
);

// Niskala

const axiosInstanceNiskalaApi = axios.create();

axiosInstanceNiskalaApi.defaults.timeout = 10000;
axiosInstanceNiskalaApi.defaults.timeoutErrorMessage = "Timeout, please try again!";

axiosInstanceNiskalaApi.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    console.error("ERROR API --> ", error);
    return Promise.reject(error);
  }
);

export { axiosInstanceMainApi, axiosInstanceNiskalaApi };
