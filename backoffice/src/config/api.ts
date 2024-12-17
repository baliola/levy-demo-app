import axios from "axios";
import { getCookie } from 'cookies-next';
import { toast } from "react-toastify";
import Navigation from "../constants/navigation";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_URL
});

const ignoredUrls: string[] = [Navigation.login];

const shouldIgnoreUrl = (url: string | undefined): boolean => {
  if (url) return ignoredUrls.includes(url as string);
  return false;
};

axiosInstance.interceptors.request.use(
  async function (config) {
    const token = getCookie('accessToken') as string;
    // config.headers['ngrok-skip-browser-warning'] = 'true';

    if (!shouldIgnoreUrl(config.url)) {
      if (!token) {
        window.location.href = Navigation.login;
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (error.config.method !== 'get') {
      toast.error(error.response.data.error);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;

