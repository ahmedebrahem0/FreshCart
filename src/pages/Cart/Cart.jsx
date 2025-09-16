import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import Loading from "../../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaStar,
  FaShoppingCart,
  FaTrash,
  FaTag,
  FaBox,
  FaFire,
  FaMinus,
  FaPlus,
  FaCreditCard,
  FaStore,
  FaHeart,
} from "react-icons/fa";

export default function Cart() {
  const {
    addProductToCart,
    totalCartPrice,
    handelButton,
    DeleteProduct,
    RemoveItems,
    productId,
    isCartLoading,
  } = useContext(CartContext);

  // useEffect(() => {
  //   setAddProductToCart();
  //   setNumOfCartItems();
  //   setTotalCartPrice();
  //   setCartId();
  // }, []);

  // console.log(localStorage.getItem('tkn'));
  function RemoveAllProduct() {
    // setAddProductToCart()

    RemoveItems();
    // console.log(x)
  }
  // console.log(localStorage.getItem("tkn"));

  async function handelBtnCount(productId, newCount) {
    const res = await handelButton(productId, newCount);
    if (res == true) {
      toast.success("Product updated successfully");
    } else {
      toast.error("update failed");
    }
  }

  console.log("productId", productId);

  async function RemoveProduct(productId) {
    const res = await DeleteProduct(productId);
    if (res == true) {
      toast.success("Product Removed successfully");
    } else {
      toast.error("update failed");
    }
  }

  // Show loading state while cart data is being fetched
  if (isCartLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
        {addProductToCart && addProductToCart.length > 0 ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 dark:from-green-600 dark:via-blue-600 dark:to-purple-700 rounded-2xl shadow-2xl p-8 mb-8 relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <FaShoppingCart className="text-3xl text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">
                      Shopping Cart
                    </h1>
                    <p className="text-white/80 text-lg">
                      {addProductToCart?.length || 0} items in your cart
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                    <p className="text-white/80 text-sm">Total Amount</p>
                    <p className="text-3xl font-bold text-white">
                      {totalCartPrice} EGP
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {addProductToCart?.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Product Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                          <FaBox className="text-white text-lg" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {product.product.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            ID: {product.product.id?.slice(-8)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => RemoveProduct(product.product._id)}
                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors duration-300"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    {/* Product Image */}
                    <div className="relative mb-4">
                      <img
                        src={product.product.imageCover}
                        alt={product.product.title}
                        className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {product.product.ratingsAverage >= 4.5 && (
                          <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                            <FaStar className="mr-1" />
                            Top Rated
                          </span>
                        )}
                        {product.product.quantity < 10 && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            Limited Stock
                          </span>
                        )}
                      </div>

                      {/* Quantity Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          Qty: {product.count}
                        </span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-3 mb-4">
                      {/* Brand */}
                      {product.product.brand && (
                        <div className="flex items-center justify-between space-x-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            Brand: {product.product.brand.name}
                          </span>
                          <img
                            src={product.product.brand.image}
                            alt={product.product.brand.name}
                            className="w-20 h-10 rounded object-cover border border-gray-200 dark:border-gray-600"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        </div>
                      )}

                      {/* Category */}
                      {product.product.category && (
                        <div className="flex items-center space-x-2">
                          <FaTag className="text-gray-400 text-sm" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {product.product.category.name}
                          </span>
                        </div>
                      )}

                      {/* Rating */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(product.product.ratingsAverage)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          ({product.product.ratingsAverage}) •{" "}
                          {product.product.ratingsQuantity} reviews
                        </span>
                      </div>

                      {/* Stock Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FaBox className="text-gray-400 text-sm" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {product.product.quantity} in stock
                          </span>
                        </div>
                        {product.product.sold > 0 && (
                          <div className="flex items-center space-x-1">
                            <FaFire className="text-sm text-orange-500" />
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              {product.product.sold > 1000
                                ? `${(product.product.sold / 1000).toFixed(1)}k`
                                : product.product.sold}{" "}
                              sold
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price and Quantity Controls */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {product.price} EGP
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {product.price * product.count} EGP each
                        </p>

                        {product.product.priceAfterDiscount && (
                          <div className="space-y-1">
                            <p className="text-xs text-gray-500 line-through">
                              Original: {product.product.priceAfterDiscount} EGP
                              each
                            </p>
                            <p className="text-xs text-red-500 font-medium">
                              Total Original:{" "}
                              {product.product.priceAfterDiscount *
                                product.count}{" "}
                              EGP
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() =>
                            handelBtnCount(
                              product.product._id,
                              product.count - 1
                            )
                          }
                          disabled={product.count <= 1}
                        >
                          <FaMinus className="text-gray-600 dark:text-gray-400" />
                        </button>

                        <div className="w-12 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                          {product.count}
                        </div>

                        <button
                          className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() =>
                            handelBtnCount(
                              product.product._id,
                              product.count + 1
                            )
                          }
                          disabled={product.count >= product.product.quantity}
                        >
                          <FaPlus className="text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Cart Actions */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              {/* Clear Cart Button */}
              <motion.button
                onClick={RemoveAllProduct}
                className="flex items-center justify-center space-x-3 px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaTrash />
                <span className="font-semibold">Clear All Items</span>
              </motion.button>

              {/* Continue Shopping */}
              <Link
                to="/Home"
                className="flex items-center justify-center space-x-3 px-6 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaStore />
                <span className="font-semibold">Continue Shopping</span>
              </Link>
            </div>

            {/* Checkout Section */}
            {addProductToCart && addProductToCart.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <FaCreditCard className="text-white text-xl" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Ready to Checkout?
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {addProductToCart.length} items • Total:{" "}
                        {totalCartPrice} EGP
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/Payment"
                    className="flex-1 flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-lg"
                  >
                    <FaCreditCard />
                    <span>Proceed to Payment</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          /* Empty Cart State */
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-32 h-32 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <FaShoppingCart className="text-white text-5xl" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. Start
                shopping to fill it up!
              </p>
              <Link
                to="/Home"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-lg"
              >
                <FaStore />
                <span>Start Shopping</span>
              </Link>
            </motion.div>
          </div>
        )}

        <Toaster />
      </div>
    </>
  );
}
