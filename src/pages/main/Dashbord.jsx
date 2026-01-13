import React, { useContext, useEffect, useState, useMemo } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaShoppingCart,
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

const PAGE_SIZE = 5;

export default function AllOrders() {
  const { decodedToken } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all"); // all | paid | unpaid | delivered | processing
  const [paymentFilter, setPaymentFilter] = useState("all"); // all | cash | card
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest | totalDesc | totalAsc
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAllOrders = () => {
    if (!decodedToken?.id) {
      setLoading(false);
      return;
    }

    api
      .get(`/orders/user/${decodedToken.id}`)
      .then((res) => {
        setOrders(res?.data || []);
      })
      .catch(() => {
        setOrders([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (decodedToken?.id) {
      fetchAllOrders();
    }
  }, [decodedToken]);

  // ===== STATS =====
  const totalOrders = orders.length;
  const paidOrders = orders.filter((o) => o.isPaid).length;
  const deliveredOrders = orders.filter((o) => o.isDelivered).length;
  const totalSpent = orders.reduce(
    (sum, o) => sum + (o.totalOrderPrice || 0),
    0
  );
  const averageOrderValue =
    totalOrders > 0 ? Math.round(totalSpent / totalOrders) : 0;

  // ===== FILTER + SORT + PAGINATION =====

  const processedOrders = useMemo(() => {
    let result = [...orders];

    // Filter by status
    if (statusFilter === "paid") {
      result = result.filter((o) => o.isPaid);
    } else if (statusFilter === "unpaid") {
      result = result.filter((o) => !o.isPaid);
    } else if (statusFilter === "delivered") {
      result = result.filter((o) => o.isDelivered);
    } else if (statusFilter === "processing") {
      result = result.filter((o) => !o.isDelivered);
    }

    // Filter by payment method
    if (paymentFilter === "cash") {
      result = result.filter((o) => o.paymentMethodType === "cash");
    } else if (paymentFilter === "card") {
      result = result.filter((o) => o.paymentMethodType === "card");
    }

    // Sort
    result.sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      const aTotal = a.totalOrderPrice || 0;
      const bTotal = b.totalOrderPrice || 0;

      switch (sortBy) {
        case "oldest":
          return aDate - bDate;
        case "totalDesc":
          return bTotal - aTotal;
        case "totalAsc":
          return aTotal - bTotal;
        case "newest":
        default:
          return bDate - aDate;
      }
    });

    return result;
  }, [orders, statusFilter, paymentFilter, sortBy]);

  const totalFiltered = processedOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE));

  // Reset page to 1 عندما تتغير الفلاتر أو الـ sort
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, paymentFilter, sortBy]);

  const pagedOrders = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return processedOrders.slice(start, start + PAGE_SIZE);
  }, [processedOrders, currentPage]);

  const toggleExpand = (id) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => {
      if (direction === "prev") {
        return prev > 1 ? prev - 1 : prev;
      }
      if (direction === "next") {
        return prev < totalPages ? prev + 1 : prev;
      }
      return prev;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {orders && orders.length > 0 ? (
          <>
            {/* HEADER + STATS */}
            <div className="mb-8 space-y-4">
              {/* Simple header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                    <FaReceipt className="text-white text-lg" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Order History
                    </h1>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {totalOrders} orders • {totalSpent.toLocaleString()} EGP
                      total
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Average order value
                  </p>
                  <p className="text-xl font-semibold text-slate-900 dark:text-white">
                    {averageOrderValue} EGP
                  </p>
                </div>
              </div>

              {/* Compact stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard
                  icon={FaShoppingCart}
                  iconBg="bg-blue-100 text-blue-600"
                  label="Total Orders"
                  value={totalOrders}
                />
                <StatCard
                  icon={FaCheckCircle}
                  iconBg="bg-emerald-100 text-emerald-600"
                  label="Paid"
                  value={paidOrders}
                />
                <StatCard
                  icon={FaTruck}
                  iconBg="bg-indigo-100 text-indigo-600"
                  label="Delivered"
                  value={deliveredOrders}
                />
                <StatCard
                  icon={FaMoneyBillWave}
                  iconBg="bg-amber-100 text-amber-600"
                  label="Total Spent"
                  value={`${totalSpent.toLocaleString()} EGP`}
                />
              </div>
            </div>

            {/* FILTERS + SORT BAR */}
            <div className="mb-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between shadow-sm">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Status
                </span>
                <FilterChip
                  active={statusFilter === "all"}
                  onClick={() => setStatusFilter("all")}
                  label="All"
                />
                <FilterChip
                  active={statusFilter === "paid"}
                  onClick={() => setStatusFilter("paid")}
                  label="Paid"
                />
                <FilterChip
                  active={statusFilter === "unpaid"}
                  onClick={() => setStatusFilter("unpaid")}
                  label="Unpaid"
                />
                <FilterChip
                  active={statusFilter === "delivered"}
                  onClick={() => setStatusFilter("delivered")}
                  label="Delivered"
                />
                <FilterChip
                  active={statusFilter === "processing"}
                  onClick={() => setStatusFilter("processing")}
                  label="In progress"
                />
              </div>

              <div className="flex flex-wrap gap-3 items-center justify-between lg:justify-end">
                {/* Payment filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Payment
                  </span>
                  <FilterChip
                    active={paymentFilter === "all"}
                    onClick={() => setPaymentFilter("all")}
                    label="All"
                  />
                  <FilterChip
                    active={paymentFilter === "cash"}
                    onClick={() => setPaymentFilter("cash")}
                    label="Cash"
                  />
                  <FilterChip
                    active={paymentFilter === "card"}
                    onClick={() => setPaymentFilter("card")}
                    label="Card"
                  />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Sort
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs sm:text-sm px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="totalDesc">Highest total</option>
                    <option value="totalAsc">Lowest total</option>
                  </select>
                </div>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400">
                Showing{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {pagedOrders.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {totalFiltered}
                </span>{" "}
                orders (filtered)
              </div>
            </div>

            {/* ORDERS LIST */}
            <div className="space-y-3">
              {pagedOrders.map((order, index) => {
                const isExpanded = expandedOrderId === order._id;
                const itemCount = order.cartItems?.length || 0;

                return (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm"
                  >
                    {/* SUMMARY ROW */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(order._id)}
                      className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 text-left"
                    >
                      {/* Left: ID + date + items */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                          #{order.id}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {itemCount} item{itemCount !== 1 ? "s" : ""} •{" "}
                            {order.paymentMethodType}
                          </p>
                        </div>
                      </div>

                      {/* Middle: Status pills */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium ${
                            order.isPaid
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                              : "bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-200"
                          }`}
                        >
                          {order.isPaid ? (
                            <FaCheckCircle className="text-[10px]" />
                          ) : (
                            <FaTimesCircle className="text-[10px]" />
                          )}
                          {order.isPaid ? "Paid" : "Unpaid"}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium ${
                            order.isDelivered
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200"
                              : "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200"
                          }`}
                        >
                          {order.isDelivered ? (
                            <FaTruck className="text-[10px]" />
                          ) : (
                            <FaClock className="text-[10px]" />
                          )}
                          {order.isDelivered ? "Delivered" : "In progress"}
                        </span>
                      </div>

                      {/* Right: Total + chevron */}
                      <div className="flex items-center justify-between sm:justify-end gap-2 sm:min-w-[140px]">
                        <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">
                          {order.totalOrderPrice.toLocaleString()} EGP
                        </p>
                        <span
                          className={`text-xs text-slate-500 dark:text-slate-400 transition-transform ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        >
                          ▸
                        </span>
                      </div>
                    </button>

                    {/* DETAILS */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-slate-100 dark:border-slate-700"
                        >
                          <div className="px-4 py-3 space-y-4">
                            {/* Shipping info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                              <InfoRow
                                icon={FaMapMarkerAlt}
                                label="City"
                                value={order.shippingAddress?.city || "-"}
                              />
                              <InfoRow
                                icon={FaPhone}
                                label="Phone"
                                value={order.shippingAddress?.phone || "-"}
                              />
                              <InfoRow
                                icon={FaBox}
                                label="Address details"
                                value={order.shippingAddress?.details || "-"}
                              />
                            </div>

                            {/* Items list */}
                            <div className="border border-slate-100 dark:border-slate-700 rounded-lg p-3">
                              <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <FaShoppingCart className="text-emerald-500" />
                                Items ({itemCount})
                              </p>
                              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                                {order.cartItems.map((item, idx) => (
                                  <div
                                    key={`${order._id}-${idx}`}
                                    className="flex gap-3 items-center text-sm"
                                  >
                                    {/* Thumbnail */}
                                    <div className="relative flex-shrink-0">
                                      <img
                                        src={item.product.imageCover}
                                        alt={item.product.title}
                                        className="w-14 h-14 rounded-md object-cover bg-slate-100"
                                      />
                                      <div className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                                        {item.count}
                                      </div>
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-slate-900 dark:text-white leading-snug line-clamp-1">
                                        {item.product.title}
                                      </p>
                                      <div className="flex flex-wrap items-center gap-2 mt-0.5">
                                        {item.product.category?.name && (
                                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                                            <FaTag className="text-[10px]" />
                                            {item.product.category.name}
                                          </span>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-2 mt-1">
                                        <div className="flex items-center gap-0.5">
                                          {[...Array(5)].map((_, i) => (
                                            <FaStar
                                              key={i}
                                              className={`text-[10px] ${
                                                i <
                                                Math.floor(
                                                  item.product.ratingsAverage ||
                                                    0
                                                )
                                                  ? "text-amber-400"
                                                  : "text-slate-300 dark:text-slate-600"
                                              }`}
                                            />
                                          ))}
                                        </div>
                                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                          ({item.product.ratingsAverage}) •{" "}
                                          {item.product.ratingsQuantity} reviews
                                        </span>
                                      </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right text-xs sm:text-sm flex flex-col gap-0.5">
                                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                        {item.price.toLocaleString()} EGP
                                      </span>
                                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                                        Total:{" "}
                                        {(
                                          item.price * item.count
                                        ).toLocaleString()}{" "}
                                        EGP
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* PAGINATION FOOTER */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
              <p className="text-slate-600 dark:text-slate-400">
                Page{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  {currentPage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  {totalPages}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange("prev")}
                  disabled={currentPage <= 1}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange("next")}
                  disabled={currentPage >= totalPages}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          // EMPTY STATE
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-4">
              <FaReceipt className="text-slate-500 dark:text-slate-300 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text:white mb-2">
              No orders yet
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
              You haven&apos;t placed any orders yet. Start shopping and your
              order history will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ===== SMALL REUSABLE COMPONENTS =====

function StatCard({ icon: Icon, iconBg, label, value }) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${iconBg}`}
      >
        <Icon />
      </div>
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function FilterChip({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
        active
          ? "bg-emerald-500 border-emerald-500 text-white shadow-sm"
          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
      }`}
    >
      {label}
    </button>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-[3px] text-slate-400" />
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-sm text-slate-800 dark:text-slate-100 line-clamp-2">
          {value}
        </p>
      </div>
    </div>
  );
}
