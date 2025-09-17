import React from "react";
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
  FaSpinner,
} from "react-icons/fa";

export default function Cart() {
  const {
    addProductToCart,
    totalCartPrice,
    handelButton,
    DeleteProduct,
    RemoveItems,
    isCartLoading,
  } = React.useContext(CartContext);

  // لودينج لكل منتج ولكل اتجاه (inc/dec)
  // structure: { [productId]: { inc: boolean, dec: boolean } }
  const [itemLoading, setItemLoading] = React.useState({});

const setLoadingFor = (pid, dir, v) =>
  setItemLoading((prev) => ({
    ...prev,
    [pid]: {
      inc: false,
      dec: false,
      remove: false,
      ...(prev[pid] || {}),
      [dir]: v,
    },
  }));


  const isAnyLoading = (pid) =>
    !!(itemLoading[pid]?.inc || itemLoading[pid]?.dec);

  async function handleQtyChange(
    productId,
    newCount,
    maxQty,
    dir /* 'inc' | 'dec' */
  ) {
    if (!productId) return;
    if (newCount < 1) return;
    if (typeof maxQty === "number" && newCount > maxQty) return;

    // امنع تداخل طلبات لنفس المنتج
    if (isAnyLoading(productId)) return;

    setLoadingFor(productId, dir, true);
    try {
      const ok = await handelButton(productId, newCount);
      if (ok === true) toast.success("Product updated successfully");
      else toast.error("Update failed");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoadingFor(productId, dir, false);
    }
  }

  async function removeAllProducts() {
    try {
      await RemoveItems();
      toast.success("Cart cleared");
    } catch {
      toast.error("Failed to clear cart");
    }
  }

  async function removeProduct(productId) {
    if (!productId) return;
    setLoadingFor(productId, "remove", true);
    try {
      const ok = await DeleteProduct(productId);
      if (ok === true) toast.success("Product removed successfully");
      else toast.error("Removal failed");
    } catch {
      toast.error("Removal failed");
    } finally {
      setLoadingFor(productId, "remove", false);
    }
  }

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
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 dark:from-green-600 dark:via-blue-600 dark:to-purple-700 rounded-2xl shadow-2xl p-8 mb-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />

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

            {/* Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {addProductToCart?.map((product, index) => {
                const pid = product?.product?._id;
                const maxQty = product?.product?.quantity ?? undefined;
                const unitPrice =
                  product?.price ??
                  product?.product?.priceAfterDiscount ??
                  product?.product?.price ??
                  0;

                return (
                  <motion.div
                    key={pid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                            <FaBox className="text-white text-lg" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              {product?.product?.title
                                ?.split(" ")
                                .slice(0, 5)
                                .join(" ") + 
                                (product?.product?.title?.split(" ").length > 5
                                  ? " ..."
                                  : "")}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              ID:{" "}
                              {String(product?.product?.id || pid).slice(-8)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeProduct(pid)}
                          className="w-10 h-10 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/40 rounded-full flex items-center justify-center transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isAnyLoading(pid)}
                          title="Remove item"
                        >
                          {itemLoading[pid]?.remove ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaTrash className="text-red-600 dark:text-red-400" />
                          )}
                        </button>
                      </div>

                      {/* Image */}
                      <div className="relative mb-4">
                        <img
                          src={product?.product?.imageCover}
                          alt={product?.product?.title}
                          className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col space-y-2">
                          {product?.product?.ratingsAverage >= 4.5 && (
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                              <FaStar className="mr-1" />
                              Top Rated
                            </span>
                          )}
                          {product?.product?.quantity < 10 && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              Limited Stock
                            </span>
                          )}
                        </div>

                        {/* Qty badge */}
                        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            Qty: {product?.count}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-3 mb-4">
                        {/* Brand */}
                        {product?.product?.brand && (
                          <div className="flex items-center justify-between space-x-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                              Brand: {product?.product?.brand?.name}
                            </span>
                            {product?.product?.brand?.image && (
                              <img
                                src={product?.product?.brand?.image}
                                alt={product?.product?.brand?.name}
                                className="w-20 h-10 rounded object-cover border border-gray-200 dark:border-gray-600"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            )}
                          </div>
                        )}

                        {/* Category */}
                        {product?.product?.category && (
                          <div className="flex items-center space-x-2">
                            <FaTag className="text-gray-400 text-sm" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {product?.product?.category?.name}
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
                                  i <
                                  Math.floor(
                                    product?.product?.ratingsAverage || 0
                                  )
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            ({product?.product?.ratingsAverage ?? 0}) •{" "}
                            {product?.product?.ratingsQuantity ?? 0} reviews
                          </span>
                        </div>

                        {/* Stock */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FaBox className="text-gray-400 text-sm" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {product?.product?.quantity} in stock
                            </span>
                          </div>
                          {product?.product?.sold > 0 && (
                            <div className="flex items-center space-x-1">
                              <FaFire className="text-sm text-orange-500" />
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                {product?.product?.sold > 1000
                                  ? `${(product?.product?.sold / 1000).toFixed(
                                      1
                                    )}k`
                                  : product?.product?.sold}{" "}
                                sold
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price + Qty Controls */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {unitPrice} EGP
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Total:{" "}
                            {(unitPrice * (product?.count || 0)).toFixed(2)} EGP
                          </p>

                          {product?.product?.priceAfterDiscount && (
                            <div className="space-y-1 mt-1">
                              <p className="text-xs text-gray-500 line-through">
                                Original: {product?.product?.priceAfterDiscount}{" "}
                                EGP each
                              </p>
                              <p className="text-xs text-red-500 font-medium">
                                Total Original:{" "}
                                {(
                                  (product?.product?.priceAfterDiscount || 0) *
                                  (product?.count || 0)
                                ).toFixed(2)}{" "}
                                EGP
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          {/* زر - */}
                          <button
                            className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() =>
                              handleQtyChange(
                                pid,
                                (product?.count || 1) - 1,
                                maxQty,
                                "dec"
                              )
                            }
                            disabled={
                              isAnyLoading(pid) || (product?.count || 1) <= 1
                            }
                            title="Decrease"
                          >
                            {itemLoading[pid]?.dec ? (
                              <FaSpinner className="animate-spin" />
                            ) : (
                              <FaMinus className="text-gray-600 dark:text-gray-300" />
                            )}
                          </button>

                          {/* qty */}
                          <div class="w-12 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                            {product?.count}
                          </div>

                          {/* زر + */}
                          <button
                            className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() =>
                              handleQtyChange(
                                pid,
                                (product?.count || 0) + 1,
                                maxQty,
                                "inc"
                              )
                            }
                            disabled={
                              isAnyLoading(pid) ||
                              (typeof maxQty === "number" &&
                                (product?.count || 0) >= maxQty)
                            }
                            title="Increase"
                          >
                            {itemLoading[pid]?.inc ? (
                              <FaSpinner className="animate-spin" />
                            ) : (
                              <FaPlus className="text-gray-600 dark:text-gray-300" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex flex-col lg:flex-row gap-6 mb-8">
              <motion.button
                onClick={removeAllProducts}
                className="flex items-center justify-center space-x-3 px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaTrash />
                <span className="font-semibold">Clear All Items</span>
              </motion.button>

              <Link
                to="/Home"
                className="flex items-center justify-center space-x-3 px-6 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaStore />
                <span className="font-semibold">Continue Shopping</span>
              </Link>
            </div>

            {/* Checkout */}
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
          // Empty cart
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
