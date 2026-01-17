import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import LoadingAuth from "../../components/LoadingAuth";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { paymentValidationSchema } from "../../validation/authValidation";

export default function Login() {
  const navigate = useNavigate();
  const [LoadingCash, setLoadingCash] = useState(true);
  const [LoadingOrder, setLoadingOrder] = useState(true);
  const [cashOrder, setCashOrder] = useState(true);

  const { CartId, clearUI } = useContext(CartContext);

  function detectOrder(value) {
    if (cashOrder) {
      createCashOrder(value);
      console.log("createCashOrder");
    } else {
      onlinePayment(value);
      console.log("online order");
    }
  }

  function createCashOrder(value) {
    setLoadingCash(false);
    console.log("cartID", CartId);
    const backendBody = {
      shippingAddress: value,
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,
        backendBody,
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        console.log(res);
        setTimeout(() => {
          setLoadingCash(true);
          toast.success("Order successfully");
          navigate("/allOrders");
        }, 2000);

        clearUI();
      })
      .catch((error) => {
        console.log(error);
        setLoadingCash(true);
        toast.error("Order Failed");
      });
  }
  function onlinePayment(value) {
    setLoadingOrder(false);
    console.log(value);
    const backendBody = {
      shippingAddress: value,
    };
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}`,
        backendBody,
        {
          headers: { token: localStorage.getItem("tkn") },
        },
        {
          params: { url: "http://localhost:3000" },
        }
      )
      .then((res) => {
        console.log("resres")
        setTimeout(() => {
          setLoadingOrder(true);
          console.log("hello");
          toast.success("Order online successfully ");
        }, 2000);
        window.open(res.data.session.url);

        clearUI();
      })
      .catch((error) => {
        console.log(error);
        setLoadingOrder(true);
        toast.error("Order Failed");
      });
  }

  const PaymentFormik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: paymentValidationSchema,
    onSubmit: detectOrder,
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Checkout
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Enter your shipping details and choose your payment method
            </p>
          </div>

          <form
            onSubmit={PaymentFormik.handleSubmit}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="details"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Address Details
                </label>
                <input
                  value={PaymentFormik.values.details}
                  onChange={PaymentFormik.handleChange}
                  onBlur={PaymentFormik.handleBlur}
                  id="details"
                  type="text"
                  placeholder="Street, Building, Apartment"
                  className="w-full rounded-xl bg-white dark:bg-gray-700 p-3 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {PaymentFormik.errors.details &&
                PaymentFormik.touched.details ? (
                  <div
                    className="p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                    role="alert"
                  >
                    {PaymentFormik.errors.details}
                  </div>
                ) : null}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    value={PaymentFormik.values.phone}
                    onChange={PaymentFormik.handleChange}
                    onBlur={PaymentFormik.handleBlur}
                    id="phone"
                    type="tel"
                    placeholder="01012345678"
                    className="w-full rounded-xl bg-white dark:bg-gray-700 p-3 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {PaymentFormik.errors.phone && PaymentFormik.touched.phone ? (
                    <div
                      className="p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                      role="alert"
                    >
                      {PaymentFormik.errors.phone}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    City
                  </label>
                  <input
                    value={PaymentFormik.values.city}
                    onChange={PaymentFormik.handleChange}
                    onBlur={PaymentFormik.handleBlur}
                    id="city"
                    type="text"
                    placeholder="Cairo"
                    className="w-full rounded-xl bg-white dark:bg-gray-700 p-3 text-base text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {PaymentFormik.errors.city && PaymentFormik.touched.city ? (
                    <div
                      className="p-3 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-300"
                      role="alert"
                    >
                      {PaymentFormik.errors.city}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Link
                  to="/cart"
                  className="inline-flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <span className="mr-2">←</span> Back to Cart
                </Link>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCashOrder(true)}
                    type="submit"
                    className="px-4 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50"
                    disabled={!LoadingCash}
                  >
                    {LoadingCash ? "Cash Order" : <LoadingAuth />}
                  </button>

                  <button
                    onClick={() => setCashOrder(false)}
                    type="submit"
                    className="px-4 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
                    disabled={!LoadingOrder}
                  >
                    {LoadingOrder ? "Online Order" : <LoadingAuth />}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
}
