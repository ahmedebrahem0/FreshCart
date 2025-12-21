// src/services/api.js
import axios from "axios";

// اضبط الـ base URL حسب الـ API الخاص بك
const API_BASE_URL = "https://ecommerce.routemisr.com/api/v1";

// Removed isDev check - we handle errors silently to avoid console pollution

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
    const url = error?.config?.url || "";

    // تنظيف تلقائي عند Unauthorized أو Bad Request للمصادقة
    if (status === 401 || (status === 400 && url.includes("profile"))) {
      // إزالة token غير صالح فقط، بدون طباعة أخطاء
      if (status === 401) {
        localStorage.removeItem("tkn");
        localStorage.removeItem("userProfile");
      }
      // للـ 400 في profile، نترك الطلب يفشل بصمت
      // لأن الـ catch handler في المكونات سيتعامل معه
    }

    // رجّع الخطأ للمستدعي (خليه يتعامل بـ try/catch أو Toast)
    // بدون طباعة أي شيء في console لتجنب Lighthouse warnings
    return Promise.reject(error);
  }
);

export default api;
