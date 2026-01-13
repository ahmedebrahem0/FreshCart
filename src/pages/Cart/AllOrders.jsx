import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { motion } from "framer-motion";
import {
  FaStar,
  FaShoppingCart,
  FaCreditCard,
  FaMoneyBillWave,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaPhone,
  FaTag,
  FaBox,
  FaReceipt,
} from "react-icons/fa";

export default function AllOrders() {
  const { decodedToken } = useContext(AuthContext); // User data
  const [orders, setOrders] = useState([]); // Initialize orders array
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch orders
  const fetchAllOrders = () => {
    if (!decodedToken?.id) {
      setLoading(false);
      return;
    }

    api
      .get(`/orders/user/${decodedToken.id}`)
      .then((res) => {
        setOrders(res?.data || []); // Set data or empty array if no data
      })
      .catch(() => {
        setOrders([]); // Set empty array in case of error
      })
      .finally(() => {
        setLoading(false); // Stop loading state
      });
  };

  // Call fetch when decodedToken is ready
  useEffect(() => {
    if (decodedToken?.id) {
      fetchAllOrders();
    }
  }, [decodedToken]);

  // Filter orders by payment method
  const cashOrders = orders.filter(
    (order) => order.paymentMethodType === "cash"
  );
  const cardOrders = orders.filter(
    (order) => order.paymentMethodType === "card"
  );

  // Calculate order statistics
  const totalOrders = orders.length;
  const paidOrders = orders.filter((order) => order.isPaid).length;
  const deliveredOrders = orders.filter((order) => order.isDelivered).length;
  const totalSpent = orders.reduce(
    (sum, order) => sum + order.totalOrderPrice,
    0
  );
  const averageOrderValue =
    totalOrders > 0 ? Math.round(totalSpent / totalOrders) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <Loading />
          </div>
        ) : orders && orders.length > 0 ? (
          <>
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 rounded-3xl shadow-2xl p-8 mb-8 relative overflow-hidden border border-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 blur-3xl" />

              <div className="relative">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                      <FaReceipt className="text-4xl text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-white mb-2">
                        Order History
                      </h1>
                      <p className="text-white/90 text-base flex gap-4 flex-wrap">
                        <span className="flex items-center gap-1">
                          <FaShoppingCart className="text-lg" />
                          {totalOrders} orders
                        </span>
                        <span className="flex items-center gap-1">
                          <FaMoneyBillWave className="text-lg" />
                          {totalSpent.toLocaleString()} EGP spent
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
                    <p className="text-white/80 text-sm font-medium">
                      Average Order Value
                    </p>
                    <p className="text-4xl font-bold text-white mt-1">
                      {averageOrderValue} <span className="text-lg">EGP</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-2xl shadow-lg p-6 border border-blue-200/50 dark:border-blue-700/30 hover:shadow-xl transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <FaShoppingCart className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      Total Orders
                    </p>
                    <p className="text-3xl font-bold text-blue-900 dark:text-blue-200 mt-1">
                      {totalOrders}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-2xl shadow-lg p-6 border border-green-200/50 dark:border-green-700/30 hover:shadow-xl transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <FaCheckCircle className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider">
                      Paid Orders
                    </p>
                    <p className="text-3xl font-bold text-green-900 dark:text-green-200 mt-1">
                      {paidOrders}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-2xl shadow-lg p-6 border border-purple-200/50 dark:border-purple-700/30 hover:shadow-xl transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <FaTruck className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                      Delivered
                    </p>
                    <p className="text-3xl font-bold text-purple-900 dark:text-purple-200 mt-1">
                      {deliveredOrders}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 rounded-2xl shadow-lg p-6 border border-amber-200/50 dark:border-amber-700/30 hover:shadow-xl transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                    <FaMoneyBillWave className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      Total Spent
                    </p>
                    <p className="text-3xl font-bold text-amber-900 dark:text-amber-200 mt-1">
                      {totalSpent.toLocaleString()} EGP
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Orders List */}
            <div className="space-y-5">
              {orders.map((order, orderIndex) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: orderIndex * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
                >
                  {/* Order Header */}
                  <div className="px-4 md:px-5 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-gray-50 dark:bg-gray-900/60">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <FaReceipt className="text-white text-sm" />
                      </div>
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                          Order #{order.id}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()} •{" "}
                          {order.cartItems.length} items
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:justify-end">
                      {/* Payment Status */}
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium ${
                          order.isPaid
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {order.isPaid ? <FaCheckCircle /> : <FaTimesCircle />}
                        <span>{order.isPaid ? "Paid" : "Pending"}</span>
                      </div>

                      {/* Delivery Status */}
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium ${
                          order.isDelivered
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {order.isDelivered ? <FaTruck /> : <FaClock />}
                        <span>
                          {order.isDelivered ? "Delivered" : "Processing"}
                        </span>
                      </div>

                      {/* Payment Method */}
                      <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium ${
                          order.paymentMethodType === "card"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {order.paymentMethodType === "card" ? (
                          <FaCreditCard />
                        ) : (
                          <FaMoneyBillWave />
                        )}
                        <span className="capitalize">
                          {order.paymentMethodType}
                        </span>
                      </div>

                      {/* Total Price */}
                      <p className="text-sm md:text-lg font-bold text-gray-900 dark:text-white ml-2">
                        {order.totalOrderPrice.toLocaleString()} EGP
                      </p>
                    </div>
                  </div>

                  {/* Body: Shipping row + Items */}
                  <div className="px-4 md:px-5 py-3 md:py-4 space-y-3">
                    {/* ==== Shipping small row (City / Phone / Details) ==== */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-700 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
                          <FaMapMarkerAlt className="text-white text-xs" />
                        </span>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Shipping Address
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {/* City */}
                        <div className="flex items-center gap-1 px-9  py-2 rounded-full bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 text-[11px]">
                          <FaMapMarkerAlt className="text-blue-500 text-[11px]" />
                          <div className="flex justify-center items-center leading-tight">
                            <span className="uppercase text-[9px] text-gray-500 dark:text-gray-400">
                              City
                            </span>
                            <span className="font-medium text-gray-800 dark:text-gray-100 ml-2 max-w-[120px] truncate">
                              {order.shippingAddress.city}
                            </span>
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-1 px-9  py-2 rounded-full bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 text-[11px]">
                          <FaPhone className="text-green-500 text-[11px]" />
                          <div className="flex justify-center items-center leading-tight">
                            <span className="uppercase text-[9px] text-gray-500 dark:text-gray-400">
                              Phone
                            </span>
                            <span className="font-medium text-gray-800 dark:text-gray-100 ml-2 max-w-[120px] truncate">
                              {order.shippingAddress.phone}
                            </span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex items-center gap-1 px-9  py-2 rounded-full bg-white dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 text-[11px]">
                          <FaBox className="text-purple-500 text-[11px]" />
                          <div className="flex justify-center items-center leading-tight">
                            <span className="uppercase text-[9px] text-gray-500 dark:text-gray-400">
                              Details
                            </span>
                            <span className="font-medium text-gray-800 dark:text-gray-100 ml-2 max-w-[180px] truncate">
                              {order.shippingAddress.details}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ==== Order Items تحتهم ==== */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-green-500 flex items-center justify-center">
                          <FaShoppingCart className="text-white text-xs" />
                        </span>
                        Items
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/40 text-[10px] font-bold text-green-700 dark:text-green-300">
                          {order.cartItems.length}
                        </span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {order.cartItems.map((item, itemIndex) => (
                          <motion.div
                            key={`${order._id}-${itemIndex}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: itemIndex * 0.05 }}
                            className="rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-3 flex flex-col"
                          >
                            {/* Product Image */}
                            <div className="relative w-full h-24 rounded-md border border-gray-100 dark:border-gray-700 mb-2 ">
                              <img
                                src={item.product.imageCover}
                                alt={item.product.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md border border-white dark:border-gray-900">
                                ×{item.count}
                              </div>
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 flex flex-col">
                              <p className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                                {item.product.title}
                              </p>

                              <div className="flex flex-wrap gap-1 mb-1">
                                {/* Brand */}
                                {item.product.brand && (
                                  <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-700/50">
                                    {/* {item.product.brand.image && (
                                      <img
                                        src={item.product.brand.image}
                                        alt={item.product.brand.name}
                                        className="w-3 h-3 rounded object-cover"
                                        onError={(e) => {
                                          e.target.style.display = "none";
                                        }}
                                      />
                                    )} */}
                                    <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-300 truncate">
                                      {item.product.brand.name}
                                    </span>
                                  </div>
                                )}

                                {/* Category */}
                                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900/40 border border-purple-100 dark:border-purple-700/50">
                                  <FaTag className="text-purple-500 text-[10px]" />
                                  <span className="text-[10px] font-semibold text-purple-700 dark:text-purple-300 truncate">
                                    {item.product.category.name}
                                  </span>
                                </div>
                              </div>

                              {/* Rating */}
                              <div className="flex items-center gap-1 mb-2">
                                <div className="flex items-center gap-[1px]">
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar
                                      key={i}
                                      className={`text-[10px] ${
                                        i <
                                        Math.floor(item.product.ratingsAverage)
                                          ? "text-yellow-400"
                                          : "text-gray-300 dark:text-gray-600"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-[11px] text-gray-600 dark:text-gray-400">
                                  {item.product.ratingsAverage}
                                </span>
                              </div>

                              {/* Prices */}
                              <div className="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-1">
                                  <div>
                                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                      Unit
                                    </p>
                                    <p className="text-xs font-bold text-green-600 dark:text-green-400">
                                      {item.price.toLocaleString()}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                      Total
                                    </p>
                                    <p className="text-xs font-bold text-green-700 dark:text-green-300">
                                      {(
                                        item.price * item.count
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-32 h-32 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <FaReceipt className="text-white text-5xl" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                No Orders Yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                You haven't placed any orders yet. Start shopping to see your
                order history here!
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
