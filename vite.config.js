import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  base: "/",
  // server: {
  //   port: 3005,
  //   open: true,
  // },
  // server: {
  //   proxy: "https://zion-backend.onrender.com/api/"
  // },
  // server: {
  //   port: 3000,
  //   open: true,
  //   proxy: {
  //     "/api": {
  //       // target: "https://zion-backend.onrender.com",
  //       target: "https://z-backend-2xag.onrender.com",
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});
