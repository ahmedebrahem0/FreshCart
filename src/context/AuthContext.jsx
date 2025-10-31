// src/context/AuthContext.jsx
import { useEffect, useState, createContext, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export default function CreateContextProvider({ children }) {
  const [Token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  // استخدم تحذيرات في الديف فقط عشان Lighthouse ما يمسكش Errors في الإنتاج
  const isDev = import.meta.env?.DEV === true;

  // فلترة أي علامات/مسافات زيادة حوالين التوكن
  const normalizeToken = (raw) =>
    raw
      ? String(raw)
          .replace(/^"+|"+$/g, "")
          .trim()
      : "";

  // تعيين/مسح التوكن + التخزين + الديكود في خطوة واحدة
  const updateToken = useCallback(
    (newToken) => {
      const t = normalizeToken(newToken);

      if (t) {
        try {
          const decoded = jwtDecode(t);
          setToken(t);
          setDecodedToken(decoded);
          localStorage.setItem("tkn", t);
        } catch (err) {
          // بدون console.error في الإنتاج
          if (isDev)
            console.warn("Invalid token (decode failed):", err?.message || err);
          setToken(null);
          setDecodedToken(null);
          localStorage.removeItem("tkn");
        }
      } else {
        setToken(null);
        setDecodedToken(null);
        localStorage.removeItem("tkn");
      }
    },
    [isDev]
  );

  // تهيئة الحالة من localStorage عند أول تحميل
  useEffect(() => {
    const stored = normalizeToken(localStorage.getItem("tkn"));
    if (stored) {
      try {
        const decoded = jwtDecode(stored);
        setToken(stored);
        setDecodedToken(decoded);
      } catch (err) {
        if (isDev)
          console.warn("Invalid token in storage:", err?.message || err);
        localStorage.removeItem("tkn");
        setToken(null);
        setDecodedToken(null);
      }
    }
  }, [isDev]);

  // مزامنة بين التابات + دعم حدث logout اختياري
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "tkn") updateToken(e.newValue || "");
    };
    const onLogoutEvent = () => updateToken("");

    window.addEventListener("storage", onStorage);
    window.addEventListener("auth:logout", onLogoutEvent);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth:logout", onLogoutEvent);
    };
  }, [updateToken]);

  return (
    <AuthContext.Provider
      value={{
        Token,
        setToken, // للإبقاء على التوافق، لكن يفضَّل استخدام updateToken
        decodedToken,
        updateToken, // استخدمه لتعيين/مسح التوكن بشكل صحيح
        logout: () => updateToken(""),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
