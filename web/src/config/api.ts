import axios from "axios";
import { getCookie } from "cookies-next";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

api.defaults.timeout = 30000;
api.defaults.timeoutErrorMessage = "Timeout, please try again!";

api.interceptors.request.use(
  async function (config) {
    let access_token = getCookie("access_token");

    config.headers.Authorization = `Bearer ${access_token}`;
    config.headers["Access-Control-Allow-Credentials"] = true;

    return config;
  },
  function (error) {
    console.error("ERROR API --> ", error);
    return Promise.reject(error);
  }
);

export { api };
