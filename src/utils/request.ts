import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import configUrl from "../config"; // 导入配置文件
import { useRouter } from "vue-router";
import routes from "../router";

const service: AxiosInstance = axios.create({
  timeout: 5000,
});

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 拼接接口地址
    if (config.url) {
      config.url = `${configUrl.API_URL}${config.url}`;
    }

    // 从本地存储或其他地方获取 token
    const token = localStorage.getItem("token");

    // 如果 token 存在，添加到请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // 通常是 Bearer 方案
    }

    return config;
    // return config;
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject();
  }
);
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data;
    } else {
      Promise.reject();
    }
    console.error("response", response);
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.error("未授权，请重新登录");
      // 清除 token 或用户信息
      localStorage.removeItem("vuems_name");
      localStorage.removeItem("rolePerData");
      localStorage.removeItem("token");
      // 跳转到登录页面
      routes.push("/login");
    } else {
      console.error("其他错误：", error.message);
    }
    return Promise.reject();
  }
);
export default service;
