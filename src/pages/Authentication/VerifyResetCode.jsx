import React, { useEffect, useMemo, useRef } from "react";
import { ToastContainer } from "react-toastify";
import UseResetCode from "../../hooks/UseResetCode";
import LoadingAuth from "../../components/LoadingAuth";

export default function VerifyResetCode() {
  const { Loading, VerifyResetCodeFormik } = UseResetCode();

  const CODE_LENGTH = 6;

  // refs for focusing between inputs
  const inputRefs = useRef([]);

  // derive digits array from formik value (always length CODE_LENGTH)
  const digits = useMemo(() => {
    const v = (VerifyResetCodeFormik.values.resetCode || "").replace(/\D/g, "");
    const arr = Array.from({ length: CODE_LENGTH }, (_, i) => v[i] || "");
    return arr;
  }, [VerifyResetCodeFormik.values.resetCode]);

  // helper to set full code back to formik as a single string
  const setCode = (nextDigits) => {
    const joined = nextDigits.join("").slice(0, CODE_LENGTH);
    VerifyResetCodeFormik.setFieldValue("resetCode", joined);
  };

  const focusIndex = (i) => {
    const el = inputRefs.current[i];
    if (el) el.focus();
  };

  const handleChange = (index, e) => {
    // allow only digits
    const raw = e.target.value;
    const onlyDigits = raw.replace(/\D/g, "");

    // if user typed/pasted multiple digits into one box
    if (onlyDigits.length > 1) {
      const next = [...digits];
      for (let k = 0; k < onlyDigits.length && index + k < CODE_LENGTH; k++) {
        next[index + k] = onlyDigits[k];
      }
      setCode(next);
      focusIndex(Math.min(index + onlyDigits.length, CODE_LENGTH - 1));
      return;
    }

    const next = [...digits];
    next[index] = onlyDigits; // either "" or one digit
    setCode(next);

    if (onlyDigits && index < CODE_LENGTH - 1) {
      focusIndex(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      // if current has value -> clear it
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        setCode(next);
        return;
      }
      // else move back and clear previous
      if (index > 0) {
        const next = [...digits];
        next[index - 1] = "";
        setCode(next);
        focusIndex(index - 1);
      }
    }

    // optional: left/right navigation
    if (e.key === "ArrowLeft" && index > 0) focusIndex(index - 1);
    if (e.key === "ArrowRight" && index < CODE_LENGTH - 1)
      focusIndex(index + 1);
  };

  const handlePaste = (e) => {
    const text = (e.clipboardData.getData("text") || "").replace(/\D/g, "");
    if (!text) return;

    e.preventDefault();
    const next = Array.from({ length: CODE_LENGTH }, (_, i) => text[i] || "");
    setCode(next);

    const lastFilled = Math.min(text.length, CODE_LENGTH) - 1;
    focusIndex(Math.max(0, lastFilled));
  };

  // optional: autofocus first box
  useEffect(() => {
    focusIndex(0);
  }, []);

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Verify Reset Code
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Enter the verification code sent to your email
            </p>
          </div>

          <form
            onSubmit={VerifyResetCodeFormik.handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Verification Code
                </label>

                {/* OTP inputs */}
                <div
                  className="flex items-center justify-between gap-2"
                  onPaste={handlePaste}
                >
                  {digits.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputRefs.current[i] = el)}
                      value={d}
                      onChange={(e) => handleChange(i, e)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      onBlur={() =>
                        VerifyResetCodeFormik.setFieldTouched("resetCode", true)
                      }
                      inputMode="numeric"
                      autoComplete={i === 0 ? "one-time-code" : "off"}
                      maxLength={1}
                      className={[
                        "h-8 w-8 sm:h-10 sm:w-10 text-center text-base font-semibold",
                        "rounded-lg bg-white dark:bg-gray-700",
                        "border focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                        "text-gray-900 dark:text-white",
                        VerifyResetCodeFormik.errors.resetCode &&
                        VerifyResetCodeFormik.touched.resetCode
                          ? "border-red-400 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600",
                      ].join(" ")}
                      aria-label={`Digit ${i + 1}`}
                    />
                  ))}
                </div>

                {/* error */}
                {VerifyResetCodeFormik.errors.resetCode &&
                VerifyResetCodeFormik.touched.resetCode ? (
                  <div
                    className="p-3 mt-3 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                    role="alert"
                  >
                    {VerifyResetCodeFormik.errors.resetCode}
                  </div>
                ) : null}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors disabled:opacity-50"
                  disabled={!Loading}
                >
                  {Loading ? "Verify Code" : <LoadingAuth />}
                </button>
              </div>
            </div>
          </form>

          <ToastContainer hideProgressBar="true" />
        </div>
      </div>
    </>
  );
}
