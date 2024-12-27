// src/config.ts
interface Config {
  API_URL: string;
}

const config: Config = {
  // 开发环境配置接口地址
  // API_URL: import.meta.env.VITE_API_URL || "http://172.16.17.106:26332",
  API_URL: "",
};

export default config;
