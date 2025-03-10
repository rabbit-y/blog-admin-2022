import { PontCore } from "../services/pontCore";
import axios from "axios";

// -----------------axios请求拦截--------------------------------

// 访问服务器的axios实例
const axiosInstanceForDing = axios.create();
// axios响应拦截
axiosInstanceForDing.defaults.headers.common["X-Requested-With"] =
  "XMLHttpRequest";
axiosInstanceForDing.defaults.baseURL = "/api";
axiosInstanceForDing.interceptors.response.use((response) => {
  if (response.data.code === 0) {
    return Promise.resolve(response.data);
  } else if (response.data.code === 401) {
    localStorage.setItem("login", "false");
    return Promise.resolve("");
  } else {
    if (response.data.aaData) {
      return Promise.resolve(response.data);
    } else {
      return Promise.resolve("");
    }
  }
});

const pontCore = PontCore;
pontCore.useFetch((url, fetchOption) => {
  return axiosInstanceForDing(url, fetchOption);
});
