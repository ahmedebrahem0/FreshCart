// src/services/api.js
import axios from "axios";

// اضبط الـ base URL حسب الـ API الخاص بك
const API_BASE_URL = "https://ecommerce.routemisr.com/api/v1";

// فلاغ بيئة التطوير (Vite)
const isDev =
  typeof import.meta !== "undefined"
    ? import.meta.env.DEV
    : process.env.NODE_ENV !== "production";

// Helper: تنظيف أي علامات/مسافات حول قيمة التوكن
function normalizeToken(raw) {
  if (!raw) return "";
  return String(raw)
    .replace(/^"+|"+$/g, "")
    .trim();
}

// إنشاء Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request Interceptor: إضافة التوكن تلقائيًا
api.interceptors.request.use(
  (config) => {
    const token = normalizeToken(localStorage.getItem("tkn"));
    if (token) {
      // نغطي كلا الحالتين: بعض الـAPIs تتوقع Bearer والبعض header باسم token
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.token = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: توحيد التعامل مع الأخطاء بدون إزعاج Lighthouse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // استخدم تحذير في التطوير فقط — بدون console.error في الإنتاج
    if (isDev) {
      console.warn(
        "[API]",
        (error?.config?.method || "GET").toUpperCase(),
        error?.config?.url,
        "| status:",
        status || "NO_RESPONSE",
        "| msg:",
        error?.message
      );
    }

    // تنظيف تلقائي عند Unauthorized
    if (status === 401) {
      localStorage.removeItem("tkn");
      localStorage.removeItem("userProfile");
      // يمكن إطلاق حدث عام لو حابب تسمعه في AuthContext:
      // window.dispatchEvent(new CustomEvent("auth:logout"));
    }

    // رجّع الخطأ للمستدعي (خليه يتعامل بـ try/catch أو Toast)
    return Promise.reject(error);
  }
);

export default api;
