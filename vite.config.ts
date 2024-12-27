import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
export default defineConfig({
  server: {
    // 配置开发服务器的端口
    port: 5174, // 可以改成你想要的端口
    // 配置绑定的 IP 地址，默认是 localhost（127.0.0.1），你可以改成 0.0.0.0 或指定你的局域网 IP
    host: "0.0.0.0", // 允许局域网访问
    open: true, // 启动后自动打开浏览器
    proxy: {
      // 代理的路径前缀
      "/api": {
        target: "http://localhost:26332", // 目标服务器的地址
        changeOrigin: true, // 允许跨域
      },
    },
  },
  base: "./",
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  optimizeDeps: {
    include: ["schart.js"],
  },
  resolve: {
    alias: {
      "@": "/src",
      "~": "/src/assets",
    },
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
  },
});
