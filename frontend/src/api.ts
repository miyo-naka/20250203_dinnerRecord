import axios from "axios";

// 環境変数から API の URL を取得（デフォルトはローカル）
export const BASE_URL = "http://localhost:8000/api";

// `axios.create()` でカスタムインスタンスを作成
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
});

//CSRFトークンを自動付与するためのinterceptor
api.interceptors.request.use((config) => {
  const token = document.cookie
    .split(";")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];

  if (token) {
    config.headers["X-CSRFToken"] = token;
  }

  return config;
});

export default api;
