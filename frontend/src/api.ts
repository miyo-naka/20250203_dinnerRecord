import axios from "axios";

// CSRFトークンをクッキー名とヘッダー名に設定
axios.defaults.xsrfCookieName = "csrftoken"; // クッキー名
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"; // ヘッダー名
axios.defaults.withCredentials = true; // クッキーを送信する設定

export default axios;
