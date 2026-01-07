import React from "react";

import { ToastContainer} from "react-toastify";
import { HiEye } from "react-icons/hi";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { useState } from "react";
import UseRegister from "./../../hooks/UseRegister";
import LoadingAuth from "../../components/LoadingAuth";

export default function Register() {
  const { Loading, RegisterFormik } = UseRegister();
  const [Showing, setShowing] = useState(false);
  const [ShowingConfirm, setShowingConfirm] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Create Account
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Join FreshCart and start shopping today.
            </p>
          </div>

          <form
            onSubmit={RegisterFormik.handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  value={RegisterFormik.values.name}
                  onChange={RegisterFormik.handleChange}
                  onBlur={RegisterFormik.handleBlur}
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-xl bg-white dark:bg-gray-700 p-3 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {RegisterFormik.errors.name && RegisterFormik.touched.name ? (
                  <div
                    className="p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                    role="alert"
                  >
                    {RegisterFormik.errors.name}
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  value={RegisterFormik.values.email}
                  onChange={RegisterFormik.handleChange}
                  onBlur={RegisterFormik.handleBlur}
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full rounded-xl bg-white dark:bg-gray-700 p-3 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {RegisterFormik.errors.email && RegisterFormik.touched.email ? (
                  <div
                    className="p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                    role="alert"
                  >
                    {RegisterFormik.errors.email}
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    value={RegisterFormik.values.password}
                    onChange={RegisterFormik.handleChange}
                    onBlur={RegisterFormik.handleBlur}
                    id="password"
                    type={Showing ? "text" : "password"}
                    placeholder="Enter a strong password"
                    className="w-full rounded-xl bg-white dark:bg-gray-700 p-3 pr-12 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {RegisterFormik.values.password ? (
                    <button
                      type="button"
                      onClick={() => setShowing(!Showing)}
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
                {RegisterFormik.errors.password &&
                RegisterFormik.touched.password ? (
                  <div
                    className="p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                    role="alert"
                  >
                    {RegisterFormik.errors.password}
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="rePassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    value={RegisterFormik.values.rePassword}
                    onChange={RegisterFormik.handleChange}
                    onBlur={RegisterFormik.handleBlur}
                    id="rePassword"
                    type={ShowingConfirm ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className="w-full rounded-xl bg-white dark:bg-gray-700 p-3 pr-12 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {RegisterFormik.values.rePassword ? (
                    <button
                      type="button"
                      onClick={() => setShowingConfirm(!ShowingConfirm)}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    >
                      {ShowingConfirm ? (
                        <HiEye className="w-5 h-5" />
                      ) : (
                        <HiMiniEyeSlash className="w-5 h-5" />
                      )}
                    </button>
                  ) : null}
                </div>
                {RegisterFormik.errors.rePassword &&
                RegisterFormik.touched.rePassword ? (
                  <div
                    className="p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                    role="alert"
                  >
                    {RegisterFormik.errors.rePassword}
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Phone
                </label>
                <input
                  value={RegisterFormik.values.phone}
                  onChange={RegisterFormik.handleChange}
                  onBlur={RegisterFormik.handleBlur}
                  id="phone"
                  type="tel"
                  placeholder="01012345678"
                  className="w-full rounded-xl bg-white dark:bg-gray-700 p-3 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {RegisterFormik.errors.phone && RegisterFormik.touched.phone ? (
                  <div
                    className="p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                    role="alert"
                  >
                    {RegisterFormik.errors.phone}
                  </div>
                ) : null}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors disabled:opacity-50"
                  disabled={!Loading}
                >
                  {Loading ? "Create Account" : <LoadingAuth />}
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
