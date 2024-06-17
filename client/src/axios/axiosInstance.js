import axios from "axios";
export const $axios = axios.create({
  baseURL: "https://movie-mania-api.vercel.app/",
  timeout: 5000,
});
//axios request interceptor
$axios.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
