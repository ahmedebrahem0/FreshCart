import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
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
  FaCalendarAlt,
  FaTag,
  FaBox,
  FaFire,
  FaUser,
  FaReceipt,
} from "react-icons/fa";

export default function AllOrders() {
  const { decodedToken } = useContext(AuthContext); // User data
  const [orders, setOrders] = useState([]); // Initialize orders array
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch orders
  const fetchAllOrders = () => {
    if (!decodedToken?.id) {
      console.error("User is not logged in or data is unavailable");
      return;
    }

    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`
      )
      .then((res) => {
        console.log("res all", res);
        setOrders(res.data || []); // Set data or empty array if no data
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
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
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600 dark:from-blue-600 dark:via-purple-600 dark:to-pink-700 rounded-2xl shadow-2xl p-8 mb-8 relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <FaReceipt className="text-3xl text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                      Order History
                    </h1>
                    <p className="text-white/80 text-lg">
                      {totalOrders} orders • {totalSpent.toLocaleString()} EGP
                      total spent
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-white/80 text-sm">Average Order</p>
                    <p className="text-3xl font-bold text-white">
                      {averageOrderValue} EGP
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <FaShoppingCart className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Orders
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {totalOrders}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Paid Orders
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {paidOrders}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <FaTruck className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Delivered
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {deliveredOrders}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                    <FaMoneyBillWave className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Total Spent
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {totalSpent.toLocaleString()} EGP
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Orders List */}
            <div className="space-y-6">
              {orders.map((order, orderIndex) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: orderIndex * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-6 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <FaReceipt className="text-white text-lg" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Order #{order.id}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()} •{" "}
                            {order.cartItems.length} items
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        {/* Payment Status */}
                        <div
                          className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${
                            order.isPaid
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {order.isPaid ? <FaCheckCircle /> : <FaTimesCircle />}
                          <span>
                            {order.isPaid ? "Paid" : "Pending Payment"}
                          </span>
                        </div>

                        {/* Delivery Status */}
                        <div
                          className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${
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
                          className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium ${
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
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            {order.totalOrderPrice.toLocaleString()} EGP
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-600">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-blue-500" />
                      Shipping Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {order.shippingAddress.city}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaPhone className="text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {order.shippingAddress.phone}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaBox className="text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {order.shippingAddress.details}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <FaShoppingCart className="mr-2 text-green-500" />
                      Order Items ({order.cartItems.length})
                    </h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {order.cartItems.map((item, itemIndex) => (
                        <motion.div
                          key={`${order._id}-${itemIndex}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIndex * 0.1 }}
                          className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                        >
                          {/* Product Image */}
                          <div className="relative">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                              {item.count}
                            </div>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
                              {item.product.title}
                            </h5>
                            <div className="flex flex-row justify-between items-center space-y-2">
                              {/* Brand */}
                              {item.product.brand && (
                                <div className="flex items-center space-x-2 mt-1">
                                  <img
                                    src={item.product.brand.image}
                                    alt={item.product.brand.name}
                                    className="w-20 h-10 rounded object-cover"
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                      e.target.nextSibling.style.display =
                                        "flex";
                                    }}
                                  />
                                  <div
                                    className="w-4 h-4 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-xs font-bold"
                                    style={{ display: "none" }}
                                  >
                                    {item.product.brand.name.charAt(0)}
                                  </div>
                                  <span className="text-xs text-gray-600 dark:text-gray-400">
                                    {item.product.brand.name}
                                  </span>
                                </div>
                              )}

                              {/* Category */}
                              <div className="flex items-center space-x-2 mt-1">
                                <FaTag className="text-gray-400 text-xs" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                  {item.product.category.name}
                                </span>
                              </div>
                            </div>
                            {/* Rating */}
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={`text-xs ${
                                      i <
                                      Math.floor(item.product.ratingsAverage)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                ({item.product.ratingsAverage}) •{" "}
                                {item.product.ratingsQuantity} reviews
                              </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm font-bold text-green-600 dark:text-green-400">
                                {item.price.toLocaleString()} EGP
                              </span>
                              <span className="text-xs text-blue-600 font-bold">
                                {item.price * item.count} EGP each
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
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

