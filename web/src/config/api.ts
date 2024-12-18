import axios from "axios";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

api.defaults.timeout = 10000;
api.defaults.timeoutErrorMessage = "Timeout, please try again!";

api.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (error) {
    console.error("ERROR API --> ", error);
    return Promise.reject(error);
  }
);

export { api };
