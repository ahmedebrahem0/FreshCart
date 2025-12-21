
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import { HiEye } from "react-icons/hi";
import { HiMiniEyeSlash } from "react-icons/hi2";
import UseResetPass from "./../../hooks/UseResetPass";
import LoadingAuth from "../../components/LoadingAuth";

export default function ResetPassword() {
  const { ResetPasswordFormik, Showing, setShowing, Loading } = UseResetPass();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Reset Password
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Enter your email and new password to reset
            </p>
          </div>

          <form
            onSubmit={ResetPasswordFormik.handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email Address
                </label>
                <input
                  value={ResetPasswordFormik.values.email}
                  onChange={ResetPasswordFormik.handleChange}
                  onBlur={ResetPasswordFormik.handleBlur}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-xl bg-white dark:bg-gray-700 p-3 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {ResetPasswordFormik.errors.email &&
                ResetPasswordFormik.touched.email ? (
                  <div
                    className="p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                    role="alert"
                  >
                    {ResetPasswordFormik.errors.email}
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    value={ResetPasswordFormik.values.newPassword}
                    onChange={ResetPasswordFormik.handleChange}
                    onBlur={ResetPasswordFormik.handleBlur}
                    id="newPassword"
                    type={Showing ? "text" : "password"}
                    placeholder="Enter your new password"
                    className="w-full rounded-xl bg-white dark:bg-gray-700 p-3 pr-12 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {ResetPasswordFormik.values.newPassword ? (
                    <button
                      type="button"
                      onClick={() => {
                        setShowing(!Showing);
                      }}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    >
                      {Showing ? (
                        <HiEye className="w-5 h-5" />
                      ) : (
                        <HiMiniEyeSlash className="w-5 h-5" />
                      )}
                    </button>
                  ) : null}
                </div>
                {ResetPasswordFormik.errors.newPassword &&
                ResetPasswordFormik.touched.newPassword ? (
                  <div
                    className="p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                    role="alert"
                  >
                    {ResetPasswordFormik.errors.newPassword}
                  </div>
                ) : null}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors disabled:opacity-50"
                  disabled={!Loading}
                >
                  {Loading ? "Reset Password" : <LoadingAuth />}
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
