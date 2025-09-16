import React, { useState } from "react";
import { MoonLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import UseResetCode from "../../hooks/UseResetCode";
import LoadingAuth from "../../components/LoadingAuth";

export default function VerifyResetCode() {
  const { Loading, Showing, VerifyResetCodeFormik } = UseResetCode();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10">
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
                <label
                  htmlFor="resetCode"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Verification Code
                </label>
                <input
                  value={VerifyResetCodeFormik.values.resetCode}
                  onChange={VerifyResetCodeFormik.handleChange}
                  onBlur={VerifyResetCodeFormik.handleBlur}
                  id="resetCode"
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="w-full rounded-xl bg-white dark:bg-gray-700 p-3 text-lg text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center tracking-widest"
                />
                {VerifyResetCodeFormik.errors.resetCode &&
                VerifyResetCodeFormik.touched.resetCode ? (
                  <div
                    className="p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
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
