import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { HiEye } from "react-icons/hi";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { authService } from "../../services";
import { changePasswordValidationSchema } from "../../validation/authValidation";
import LoadingAuth from "../../components/LoadingAuth";

export default function ChangeMyPassword() {
  let navigate = useNavigate();
  const [Loading, setLoading] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const ChangeMyPasswordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    onSubmit: (values) => {
      setLoading(false);
      authService
        .changePassword(values)
        .then((data) => {
          setLoading(false);
          toast.success("Password updated successfully");
          setTimeout(() => {
            navigate("/ResetPassword");
          }, 2000);
          console.log("success", data);
        })
        .catch((error) => {
          toast.error(`${error.response.data.message}`);
          setLoading(true);
          console.log(error);
        });
    },
    validationSchema: changePasswordValidationSchema,

    validate: (errors) => {
      console.log(errors);
    },
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Change Password
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Update your password to keep your account secure
            </p>
          </div>

          <form
            onSubmit={ChangeMyPasswordFormik.handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Current Password
                </label>
                <div className="relative">
                  <input
                    value={ChangeMyPasswordFormik.values.currentPassword}
                    onChange={ChangeMyPasswordFormik.handleChange}
                    onBlur={ChangeMyPasswordFormik.handleBlur}
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter your current password"
                    className="w-full rounded-xl bg-white dark:bg-gray-700 p-3 pr-12 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {ChangeMyPasswordFormik.values.currentPassword ? (
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    >
                      {showCurrentPassword ? (
                        <HiEye className="w-5 h-5" />
                      ) : (
                        <HiMiniEyeSlash className="w-5 h-5" />
                      )}
                    </button>
                  ) : null}
                </div>
                {ChangeMyPasswordFormik.errors.currentPassword &&
                ChangeMyPasswordFormik.touched.currentPassword ? (
                  <div
                    className="p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                    role="alert"
                  >
                    {ChangeMyPasswordFormik.errors.currentPassword}
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  New Password
                </label>
                <div className="relative">
                  <input
                    value={ChangeMyPasswordFormik.values.password}
                    onChange={ChangeMyPasswordFormik.handleChange}
                    onBlur={ChangeMyPasswordFormik.handleBlur}
                    id="password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    className="w-full rounded-xl bg-white dark:bg-gray-700 p-3 pr-12 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {ChangeMyPasswordFormik.values.password ? (
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    >
                      {showNewPassword ? (
                        <HiEye className="w-5 h-5" />
                      ) : (
                        <HiMiniEyeSlash className="w-5 h-5" />
                      )}
                    </button>
                  ) : null}
                </div>
                {ChangeMyPasswordFormik.errors.password &&
                ChangeMyPasswordFormik.touched.password ? (
                  <div
                    className="p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                    role="alert"
                  >
                    {ChangeMyPasswordFormik.errors.password}
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="rePassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    value={ChangeMyPasswordFormik.values.rePassword}
                    onChange={ChangeMyPasswordFormik.handleChange}
                    onBlur={ChangeMyPasswordFormik.handleBlur}
                    id="rePassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    className="w-full rounded-xl bg-white dark:bg-gray-700 p-3 pr-12 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {ChangeMyPasswordFormik.values.rePassword ? (
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <HiEye className="w-5 h-5" />
                      ) : (
                        <HiMiniEyeSlash className="w-5 h-5" />
                      )}
                    </button>
                  ) : null}
                </div>
                {ChangeMyPasswordFormik.errors.rePassword &&
                ChangeMyPasswordFormik.touched.rePassword ? (
                  <div
                    className="p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                    role="alert"
                  >
                    {ChangeMyPasswordFormik.errors.rePassword}
                  </div>
                ) : null}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors disabled:opacity-50"
                  disabled={!Loading}
                >
                  {Loading ? "Update Password" : <LoadingAuth />}
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
