import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import Loading from "../../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaEye,
  FaTrash,
  FaTag,
  FaCalendarAlt,
  FaBox,
  FaFire,
} from "react-icons/fa";

export default function Wishlist() {
  const { addProductToWishlist, DeleteFromWishlist, getUserWishlist } =
    useContext(CartContext);
    // console.log("getUserWishlist", getUserWishlist());

  useEffect(() => {
    getUserWishlist();
  }, []);

  async function RemoveFromWishlist(productId) {
    const res = await DeleteFromWishlist(productId);
    if (res == true) {
      toast.success("Product Removed successfully");
      await getUserWishlist(); // تحديث البيانات من الخادم
    } else {
      toast.error("update failed");
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 dark:from-red-600 dark:via-pink-600 dark:to-purple-700 rounded-2xl shadow-2xl p-8 mb-8 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white shadow-lg text-red-500 text-3xl">
                  <FaHeart />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    My Wishlist
                  </h1>
                  <p className="text-white/80 text-lg">
                    {addProductToWishlist?.length || 0} items saved for later
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-white/80 text-sm">Total Items</p>
                  <p className="text-3xl font-bold text-white">
                    {addProductToWishlist?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          {addProductToWishlist ? (
            addProductToWishlist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {addProductToWishlist.map((product, index) => (
                  <motion.div
                key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 group"
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {product.ratingsAverage >= 4.5 && (
                          <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                            <FaStar className="mr-1" />
                            Top Rated
                          </span>
                        )}
                        {product.quantity < 10 && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            Limited Stock
                          </span>
                        )}
                      </div>

                      {/* Wishlist Heart */}
                      <div className="absolute top-4 right-4">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-red-500 shadow-lg">
                          <FaHeart />
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      {/* Brand */}
                      {product.brand && (
                        <div className="flex  flex-row justify-between items-center space-x-2 mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            Brand: {product.brand.name}
                          </span>
                          <div className="flex flex-row justify-end space-x-2 mb-2">
                            <img
                              src={product.brand.image}
                              alt={product.brand.name}
                              className="w-20 h-10 rounded object-cover border border-gray-200 dark:border-gray-600"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {product.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Category */}
                      {product.category && (
                        <div className="flex items-center space-x-2 mb-3">
                          <FaTag className="text-gray-400 text-sm" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {product.category.name}
                          </span>
                        </div>
                      )}

                      {/* Rating */}
                      {product.ratingsAverage && (
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`text-sm ${
                                  i < Math.floor(product.ratingsAverage)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            ({product.ratingsAverage}) •{" "}
                            {product.ratingsQuantity} reviews
                          </span>
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {product.price} EGP
                          </span>
                          {product.quantity && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {product.quantity} in stock
                            </p>
                          )}
                        </div>
                        {product.sold && (
                          <div className="text-right">
                            <div className="flex items-center space-x-1 text-orange-500">
                              <FaFire className="text-sm" />
                              <span className="text-sm font-medium">
                                {product.sold > 1000
                                  ? `${(product.sold / 1000).toFixed(1)}k`
                                  : product.sold}{" "}
                                sold
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-3">
                        <Link
                          to={`/ProductDetails/${product.id}`}
                          className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          <FaEye />
                          <span className="font-medium">View Details</span>
                        </Link>
                        <button
                          onClick={() => RemoveFromWishlist(product.id)}
                          className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          <FaTrash />
                        </button>
                      </div>

                      {/* Additional Info */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <FaCalendarAlt />
                            <span>
                              Added{" "}
                              {new Date(product.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaBox />
                            <span>ID: {product.id.slice(-8)}</span>
                    </div>
                  </div>
                </div>
              </div>
                  </motion.div>
            ))}
          </div>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl">
                  <FaHeart className="text-white text-5xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Your Wishlist is Empty
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                  Start adding products you love to your wishlist and they'll
                  appear here!
                </p>
                <Link
                  to="/Products"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <FaShoppingCart className="mr-3 text-lg" />
                  Start Shopping
                </Link>
              </motion.div>
            )
        ) : (
          <Loading />
        )}

        <Toaster />
        </div>
      </div>
    </>
  );
}





