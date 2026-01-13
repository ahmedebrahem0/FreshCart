// src/pages/Dashboard.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { orderService } from "../../services";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import Loading from "../../components/Loading";
import {
  FaShoppingCart,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaBoxOpen,
  FaPlus,
  FaMinus,
  FaChevronDown,
  FaHome,
  FaChartBar,
  FaUsers,
  FaCog,
  FaBars,
  FaTimes,
  FaClipboardList,
  FaBox,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { subDays, format } from "date-fns";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI State
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Statistics state variables
  // إجمالي الـ Orders في الـ DB (results من الـ API)
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0); // من الصفحة الحالية
  const [paidOrders, setPaidOrders] = useState(0);
  const [unpaidOrders, setUnpaidOrders] = useState(0);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [totalProductsSold, setTotalProductsSold] = useState(0);

  // Pagination state from metadata
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(1);

  // Reports filter
  // "today" | "7" | "30" | "all"
  const [reportRange, setReportRange] = useState("7");

  // Per-item loading: key = `${orderId}_${productId}`
  const [loadingItems, setLoadingItems] = useState({});
  // Toggle expand items for order rows
  const [expandedOrders, setExpandedOrders] = useState({}); // { [orderId]: boolean }

  const toggleExpand = (orderId) => {
    setExpandedOrders((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  // Fetch data from API (يدعم page لو الـ service بتبعتها للـ backend)
  const fetchOrders = useCallback(async (page = 1) => {
    try {
      setLoading(true);

      const response = await orderService.getAllOrders(page);
      // axios غالباً بيرجع { data: { results, metadata, data: [...] } }
      const payload = response?.data ?? response;

      setOrders(payload.data || []);
      setTotalOrders(payload.results || 0);

      setCurrentPage(payload.metadata?.currentPage || page || 1);
      setPageSize(payload.metadata?.limit || (payload.data || []).length || 0);
      setNumberOfPages(payload.metadata?.numberOfPages || 1);

      setLoading(false);
    } catch (err) {
      setError(err?.message || "Failed to load orders");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(1);
  }, [fetchOrders]);

  // 👤 Load user profile from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) {
      try {
        setUserProfile(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse userProfile:", err);
      }
    }
  }, []);

  // حساب الإحصائيات من orders الحالية (صفحة واحدة)
  useEffect(() => {
    if (orders.length === 0) {
      setTotalSales(0);
      setPaidOrders(0);
      setUnpaidOrders(0);
      setBestSellingProducts([]);
      setTotalProductsSold(0);
      return;
    }

    const _totalSales = orders.reduce(
      (sum, order) => sum + (order.totalOrderPrice || 0),
      0
    );
    setTotalSales(_totalSales);

    const _paidOrders = orders.filter((order) => order.isPaid).length;
    setPaidOrders(_paidOrders);
    setUnpaidOrders(orders.length - _paidOrders);

    const productSales = {};
    orders.forEach((order) => {
      (order.cartItems || []).forEach((item) => {
        const productId = item.product?._id;
        const productName = item.product?.title || "Unknown";
        const quantity = item.count || 0;

        if (!productSales[productId]) {
          productSales[productId] = { name: productName, quantity: 0 };
        }
        productSales[productId].quantity += quantity;
      });
    });

    const _bestSellingProducts = Object.values(productSales).sort(
      (a, b) => b.quantity - a.quantity
    );
    setBestSellingProducts(_bestSellingProducts.slice(0, 5));

    const _totalProductsSold = Object.values(productSales).reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    setTotalProductsSold(_totalProductsSold);
  }, [orders]);

  // آخر 7 أيام (labels) – ثابتة
  const last7Days = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) =>
        format(subDays(new Date(), 6 - i), "yyyy-MM-dd")
      ),
    []
  );

  // مبيعات آخر 7 أيام من الداتا الحالية (الصفحة)
  const salesLast7Days = useMemo(
    () =>
      last7Days.map((day) => {
        const dayOrders = orders.filter(
          (order) =>
            order.createdAt &&
            format(new Date(order.createdAt), "yyyy-MM-dd") === day
        );
        return dayOrders.reduce(
          (sum, order) => sum + (order.totalOrderPrice || 0),
          0
        );
      }),
    [orders, last7Days]
  );

  // Derived Customers Data (للصفحات العامة)
  const customerStats = useMemo(() => {
    const uniqueCustomers = new Set();
    const customerList = [];

    orders.forEach((order) => {
      if (order.user?.email && !uniqueCustomers.has(order.user.email)) {
        uniqueCustomers.add(order.user.email);
        customerList.push({
          name: order.user.name,
          email: order.user.email,
          lastOrder: order.createdAt,
          totalSpent: 0,
          orderCount: 0,
        });
      }
      const customer = customerList.find((c) => c.email === order.user?.email);
      if (customer) {
        customer.totalSpent += order.totalOrderPrice || 0;
        customer.orderCount += 1;
        if (new Date(order.createdAt) > new Date(customer.lastOrder)) {
          customer.lastOrder = order.createdAt;
        }
      }
    });

    return {
      count: uniqueCustomers.size,
      list: customerList.sort((a, b) => b.totalSpent - a.totalSpent),
    };
  }, [orders]);

  // Orders filtered for Reports tab only
  const reportOrders = useMemo(() => {
    if (!orders.length) return [];

    const now = new Date();

    return orders.filter((order) => {
      if (!order.createdAt) return false;

      const created = new Date(order.createdAt);
      const diffInDays =
        (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);

      if (reportRange === "today") {
        // آخر 24 ساعة تقريباً
        return diffInDays >= 0 && diffInDays < 1;
      }

      if (reportRange === "7") {
        // آخر 7 أيام
        return diffInDays >= 0 && diffInDays < 7;
      }

      if (reportRange === "30") {
        // آخر 30 يوم
        return diffInDays >= 0 && diffInDays < 30;
      }

      // "all" أو أي قيمة → مفيش فلترة
      return true;
    });
  }, [orders, reportRange]);

  // ===== CHARTS DATA (Modern Dashboard Style) =====

  // Top Products (Horizontal Bar) – من الصفحة الحالية
  const barChartData = {
    labels: bestSellingProducts.map((product) => product.name),
    datasets: [
      {
        label: "Units Sold",
        data: bestSellingProducts.map((product) => product.quantity),
        backgroundColor: "rgba(59, 130, 246, 0.7)", // blue-500
        borderRadius: 8,
        maxBarThickness: 24,
      },
    ],
  };

  // Line chart (Weekly Sales) – من الصفحة الحالية
  const lineChartData = {
    labels: last7Days.map((day) => format(new Date(day), "dd MMM")),
    datasets: [
      {
        label: "Sales (EGP)",
        data: salesLast7Days,
        borderColor: "rgba(34, 197, 94, 1)", // green-500
        backgroundColor: "rgba(34, 197, 94, 0.12)",
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "rgba(34, 197, 94, 1)",
        fill: true,
      },
    ],
  };

  // Payment methods – من الصفحة الحالية
  const paymentPieData = {
    labels: ["Cash", "Card"],
    datasets: [
      {
        data: [
          orders.filter((o) => o.paymentMethodType === "cash").length,
          orders.filter((o) => o.paymentMethodType === "card").length,
        ],
        backgroundColor: ["#22c55e", "#3b82f6"], // green-500, blue-500
        hoverBackgroundColor: ["#16a34a", "#2563eb"],
        borderWidth: 0,
      },
    ],
  };

  // ===== COMMON CHART OPTIONS =====

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `Sales: ${ctx.parsed.y.toLocaleString("en-US")} EGP`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6b7280", font: { size: 11 } }, // gray-500
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(148, 163, 184, 0.25)" }, // slate-400/25
        ticks: {
          color: "#6b7280",
          font: { size: 11 },
          callback: (value) => `${value}`,
        },
      },
    },
  };

  const horizontalBarOptions = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `Units: ${ctx.parsed.x}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: "rgba(148, 163, 184, 0.25)" },
        ticks: { color: "#6b7280", font: { size: 11 } },
      },
      y: {
        grid: { display: false },
        ticks: {
          color: "#111827",
          font: { size: 11, weight: "500" },
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
            const value = ctx.parsed;
            const percentage = total ? ((value / total) * 100).toFixed(1) : 0;
            return `${ctx.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  // ====== Quantity Update (with per-item loading + optimistic UI) ======
  const setItemLoading = (orderId, productId, value) => {
    const key = `${orderId}_${productId}`;
    setLoadingItems((prev) => ({ ...prev, [key]: value }));
  };

  const isItemLoading = (orderId, productId) =>
    !!loadingItems[`${orderId}_${productId}`];

  const handleUpdateQuantity = async (orderId, productId, newQty) => {
    if (newQty < 1) return;

    setItemLoading(orderId, productId, true);
    const prevOrders = JSON.parse(JSON.stringify(orders));

    const nextOrders = orders.map((ord) => {
      if (ord._id !== orderId) return ord;
      const updated = { ...ord };
      updated.cartItems = (updated.cartItems || []).map((ci) => {
        if (ci.product?._id !== productId) return ci;
        return { ...ci, count: newQty };
      });
      const total = (updated.cartItems || []).reduce((sum, ci) => {
        const price =
          ci.price ?? ci.product?.priceAfterDiscount ?? ci.product?.price ?? 0;
        return sum + price * (ci.count || 0);
      }, 0);
      return { ...updated, totalOrderPrice: total };
    });
    setOrders(nextOrders);

    try {
      await orderService.updateCartItem(orderId, productId, newQty);
      await fetchOrders(currentPage);
    } catch (err) {
      console.error(err);
      setOrders(prevOrders);
    } finally {
      setItemLoading(orderId, productId, false);
    }
  };

  const handleDelta = (orderId, productId, currentQty, delta) => {
    const target = (currentQty || 0) + delta;
    if (target < 1) return;
    if (isItemLoading(orderId, productId)) return;
    handleUpdateQuantity(orderId, productId, target);
  };

  // Pagination handler
  const handlePageChange = (page) => {
    if (page < 1 || page > numberOfPages) return;
    setCurrentPage(page);
    fetchOrders(page);
  };

  // --- SUB-COMPONENTS / RENDER FUNCTIONS ---

  const OrdersTable = ({ limit }) => {
    const displayOrders = limit ? orders.slice(0, limit) : orders;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {limit ? "Recent Orders" : "All Orders"}
          </h2>
          {limit && (
            <button
              onClick={() => setActiveSection("orders")}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              View All
            </button>
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 border-b-2 border-blue-200 dark:border-blue-900">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Delivery
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {displayOrders.map((order, idx) => (
                <React.Fragment key={order._id}>
                  <tr className="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold text-xs">
                          {idx + 1}
                        </span>
                        <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                          #{order._id?.slice(-6)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-white text-sm">
                          {order.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {order.user?.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {order.user?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {order.totalOrderPrice} EGP
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                          order.isPaid
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {order.isPaid ? "✓ Paid" : "✕ Unpaid"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-full ${
                          order.isDelivered
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {order.isDelivered ? (
                          <>
                            <FaBox size={12} />
                            Delivered
                          </>
                        ) : (
                          <>
                            <FaClock size={12} />
                            Pending
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "2-digit",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "-"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleExpand(order._id)}
                        className={`inline-flex items-center px-3 py-1.5 text-sm rounded-lg border transition ${
                          expandedOrders[order._id]
                            ? "bg-blue-100 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-500 dark:text-blue-400"
                            : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        <FaBoxOpen className="mr-2" size={14} />
                        {expandedOrders[order._id] ? "Hide" : "View"}
                        <FaChevronDown
                          className={`ml-2 transition-transform text-xs ${
                            expandedOrders[order._id] ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Row */}
                  {expandedOrders[order._id] && (
                    <tr className="bg-blue-50/30 dark:bg-gray-900/50">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="pl-4 border-l-2 border-blue-500 dark:border-blue-400">
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            <FaBox size={14} />
                            Order Items ({(order.cartItems || []).length})
                          </div>
                          {(order.cartItems || []).length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                              No items
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {(order.cartItems || []).map((item) => {
                                const pid = item.product?._id;
                                const key = `${order._id}_${pid}`;
                                return (
                                  <motion.div
                                    key={key}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-3 flex flex-col"
                                  >
                                    {/* Product Image */}
                                    <div className="relative w-full h-24 rounded-md border border-gray-100 dark:border-gray-700 mb-2 overflow-hidden">
                                      <img
                                        src={item.product?.imageCover}
                                        alt={item.product?.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                      />
                                      <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md border border-white dark:border-gray-900">
                                        ×{item.count}
                                      </div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 flex flex-col">
                                      <p className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                                        {item.product?.title}
                                      </p>

                                      <div className="flex flex-wrap gap-1 mb-1">
                                        {/* Brand */}
                                        {item.product?.brand && (
                                          <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/40 border border-blue-100 dark:border-blue-700/50">
                                            {item.product?.brand.image && (
                                              <img
                                                src={item.product?.brand.image}
                                                alt={item.product?.brand.name}
                                                className="w-3 h-3 rounded object-cover"
                                                onError={(e) => {
                                                  e.target.style.display =
                                                    "none";
                                                }}
                                              />
                                            )}
                                            <span className="text-[10px] font-semibold text-blue-700 dark:text-blue-300 truncate">
                                              {item.product?.brand.name}
                                            </span>
                                          </div>
                                        )}

                                        {/* Category */}
                                        <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900/40 border border-purple-100 dark:border-purple-700/50">
                                          <span className="text-[10px] font-semibold text-purple-700 dark:text-purple-300 truncate">
                                            {item.product?.category?.name}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Rating */}
                                      <div className="flex items-center gap-1 mb-2">
                                        <div className="flex items-center gap-[1px]">
                                          {[...Array(5)].map((_, i) => (
                                            <span
                                              key={i}
                                              className={`text-[10px] ${
                                                i <
                                                Math.floor(
                                                  item.product
                                                    ?.ratingsAverage || 0
                                                )
                                                  ? "text-yellow-400"
                                                  : "text-gray-300 dark:text-gray-600"
                                              }`}
                                            >
                                              ★
                                            </span>
                                          ))}
                                        </div>
                                        <span className="text-[11px] text-gray-600 dark:text-gray-400">
                                          {item.product?.ratingsAverage || 0}
                                        </span>
                                      </div>

                                      {/* Prices */}
                                      <div className="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                              Unit
                                            </p>
                                            <p className="text-xs font-bold text-green-600 dark:text-green-400">
                                              {item.price?.toLocaleString()}
                                            </p>
                                          </div>
                                          <div className="text-right">
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                              Total
                                            </p>
                                            <p className="text-xs font-bold text-green-700 dark:text-green-300">
                                              {(
                                                item.price * item.count
                                              )?.toLocaleString()}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-4">
          {displayOrders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-mono text-gray-500">
                    #{order._id?.slice(-6)}
                  </span>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {order.user?.name}
                  </div>
                  <div className="text-green-600 font-bold">
                    {order.totalOrderPrice} EGP
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      order.isPaid
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.isPaid ? "PAID" : "UNPAID"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleExpand(order._id)}
                className="w-full mt-2 py-2 flex items-center justify-center text-sm bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-sm"
              >
                {expandedOrders[order._id] ? "Hide Details" : "Show Details"}
              </button>
              {expandedOrders[order._id] && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(order.cartItems || []).map((item) => (
                    <motion.div
                      key={`${order._id}-${item.product?._id}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900/60 p-3 flex flex-col"
                    >
                      {/* Product Image */}
                      <div className="relative w-full h-20 rounded-md border border-gray-100 dark:border-gray-700 mb-2 overflow-hidden">
                        <img
                          src={item.product?.imageCover}
                          alt={item.product?.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md border border-white dark:border-gray-900">
                          ×{item.count}
                        </div>
                      </div>

                      {/* Product Details */}
                      <p className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
                        {item.product?.title}
                      </p>

                      {/* Prices */}
                      <div className="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">
                              Unit
                            </p>
                            <p className="text-xs font-bold text-green-600 dark:text-green-400">
                              {item.price?.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[11px] text-gray-500 dark:text-gray-400">
                              Tot
                            </p>
                            <p className="text-xs font-bold text-green-700 dark:text-green-300">
                              {(item.price * item.count)?.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const KPICard = ({ title, value, icon: Icon, colorClass, subtext }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${colorClass}`}>
          <Icon className="text-2xl" />
        </div>
      </div>
      {subtext && <div className="mt-4 text-sm font-medium">{subtext}</div>}
    </motion.div>
  );

  // --- VIEW RENDERS ---

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPIS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Orders (DB)"
          value={totalOrders}
          icon={FaShoppingCart}
          colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
          subtext={
            <span className="text-green-600">
              {/* Placeholder نمو وهمي لحد ما تعمل مقارنة شهرية من الـ backend */}
              +12% from last month
            </span>
          }
        />
        <KPICard
          title="Total Sales (Current Page)"
          value={`${totalSales.toLocaleString()} EGP`}
          icon={FaDollarSign}
          colorClass="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
          subtext={
            <span className="text-green-600">+8% from last month (sample)</span>
          }
        />
        <KPICard
          title="Paid Orders (Current Page)"
          value={paidOrders}
          icon={FaCheckCircle}
          colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
          subtext={
            <span className="text-emerald-600">
              {orders.length
                ? ((paidOrders / orders.length) * 100).toFixed(1)
                : 0}
              % success rate (page)
            </span>
          }
        />
        <KPICard
          title="Unpaid Orders (Current Page)"
          value={unpaidOrders}
          icon={FaTimesCircle}
          colorClass="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
          subtext={
            <span className="text-red-600">
              {orders.length
                ? ((unpaidOrders / orders.length) * 100).toFixed(1)
                : 0}
              % pending (page)
            </span>
          }
        />
      </div>

      <OrdersTable limit={5} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 h-80">
          <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">
            Weekly Sales (Current Page)
          </h3>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        {/* Top Products Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 h-80">
          <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">
            Top Products (Current Page)
          </h3>
          <Bar data={barChartData} options={horizontalBarOptions} />
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 h-80">
          <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">
            Order Trends (Current Page)
          </h3>
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 h-80 flex flex-col items-center">
          <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4 w-full text-left">
            Payment Methods (Current Page)
          </h3>
          <div className="h-full w-full flex justify-center">
            <Doughnut data={paymentPieData} options={doughnutOptions} />
          </div>
        </div>
      </div>

      <OrdersTable />

      {/* Pagination Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Total Orders in DB:{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalOrders}
          </span>
          {pageSize > 0 && (
            <>
              {" "}
              • Showing <span className="font-semibold">
                {orders.length}
              </span>{" "}
              per page
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700/60"
          >
            Prev
          </button>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{numberOfPages}</span>
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= numberOfPages}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 dark:border-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700/60"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 h-96">
        <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">
          Best Selling Products (Current Page)
        </h3>
        <Bar data={barChartData} options={horizontalBarOptions} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
          Product Performance (Current Page)
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 border-b-2 border-blue-200 dark:border-blue-900">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-right">
                  Units Sold
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-right">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {bestSellingProducts.map((p, idx) => {
                const maxQuantity = bestSellingProducts[0]?.quantity || 1;
                const percentage = (p.quantity / maxQuantity) * 100;
                const isTopProduct = idx === 0;

                return (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3">
                      <div
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                          idx === 0
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : idx === 1
                            ? "bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                            : idx === 2
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {idx + 1}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`font-semibold ${
                            isTopProduct
                              ? "text-blue-700 dark:text-blue-400"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {p.name}
                        </div>
                        {isTopProduct && (
                          <span className="inline-block text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded font-bold">
                            TOP SELLER
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {p.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              idx === 0
                                ? "bg-gradient-to-r from-blue-500 to-purple-500"
                                : idx === 1
                                ? "bg-gradient-to-r from-blue-400 to-blue-500"
                                : "bg-gradient-to-r from-blue-300 to-blue-400"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-400 w-8 text-right">
                          {percentage.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {bestSellingProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex flex-col items-center">
                      <FaBoxOpen className="text-3xl mb-2 opacity-30" />
                      <p>No sales data yet</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPICard
          title="Unique Customers (Current Page)"
          value={customerStats.count}
          icon={FaUsers}
          colorClass="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
          Top Customers (Current Page)
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 border-b-2 border-blue-200 dark:border-blue-900">
              <tr>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-center">
                  Orders
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-right">
                  Total Spent
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {customerStats.list.slice(0, 10).map((c, idx) => {
                const isVIP = c.totalSpent > 5000;
                return (
                  <tr
                    key={idx}
                    className="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  >
                    <td className="px-4 py-3">
                      <div
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-bold text-sm ${
                          idx === 0
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : idx === 1
                            ? "bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                            : idx === 2
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {idx + 1}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white text-sm ${
                            isVIP
                              ? "bg-gradient-to-r from-purple-500 to-pink-500"
                              : "bg-blue-500"
                          }`}
                        >
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {c.name}
                          </p>
                          {isVIP && (
                            <span className="inline-block text-[10px] px-1.5 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded font-bold">
                              VIP
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {c.email}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {c.orderCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <p className="font-bold text-lg text-green-600 dark:text-green-400">
                        {c.totalSpent.toLocaleString()} EGP
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Avg: {(c.totalSpent / c.orderCount).toFixed(0)} EGP
                      </p>
                    </td>
                  </tr>
                );
              })}
              {customerStats.list.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex flex-col items-center">
                      <FaUsers className="text-3xl mb-2 opacity-30" />
                      <p>No customers on this page</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPlaceholder = (title) => (
    <div className="flex flex-col items-center justify-center h-96 text-gray-500">
      <FaCog className="text-6xl mb-4 opacity-20" />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p>This module is currently under development.</p>
    </div>
  );

  const renderReports = () => {
    // إجمالي المبيعات للريبورت (من الداتا المتفلترة)
    const reportTotalSales = reportOrders.reduce(
      (sum, order) => sum + (order.totalOrderPrice || 0),
      0
    );

    const averageOrderValue = reportOrders.length
      ? (reportTotalSales / reportOrders.length).toFixed(2)
      : 0;

    // إجمالي المنتجات المباعة في الريبورت
    const reportProductSales = {};
    reportOrders.forEach((order) => {
      (order.cartItems || []).forEach((item) => {
        const productId = item.product?._id;
        const productName = item.product?.title || "Unknown";
        const quantity = item.count || 0;

        if (!reportProductSales[productId]) {
          reportProductSales[productId] = { name: productName, quantity: 0 };
        }
        reportProductSales[productId].quantity += quantity;
      });
    });

    const reportBestSellingProducts = Object.values(reportProductSales).sort(
      (a, b) => b.quantity - a.quantity
    );

    const reportTotalProductsSold = Object.values(reportProductSales).reduce(
      (sum, product) => sum + product.quantity,
      0
    );

    // Customers للريبورت بس
    const reportCustomerStats = (() => {
      const uniqueCustomers = new Set();
      const customerList = [];

      reportOrders.forEach((order) => {
        if (order.user?.email && !uniqueCustomers.has(order.user.email)) {
          uniqueCustomers.add(order.user.email);
          customerList.push({
            name: order.user.name,
            email: order.user.email,
            lastOrder: order.createdAt,
            totalSpent: 0,
            orderCount: 0,
          });
        }
        const customer = customerList.find(
          (c) => c.email === order.user?.email
        );
        if (customer) {
          customer.totalSpent += order.totalOrderPrice || 0;
          customer.orderCount += 1;
          if (new Date(order.createdAt) > new Date(customer.lastOrder)) {
            customer.lastOrder = order.createdAt;
          }
        }
      });

      return {
        count: uniqueCustomers.size,
        list: customerList.sort((a, b) => b.totalSpent - a.totalSpent),
      };
    })();

    // Charts للريبورت
    const reportSalesLast7Days = last7Days.map((day) => {
      const dayOrders = reportOrders.filter(
        (order) =>
          order.createdAt &&
          format(new Date(order.createdAt), "yyyy-MM-dd") === day
      );
      return dayOrders.reduce(
        (sum, order) => sum + (order.totalOrderPrice || 0),
        0
      );
    });

    const reportLineChartData = {
      labels: last7Days.map((day) => format(new Date(day), "dd MMM")),
      datasets: [
        {
          label: "Sales (EGP)",
          data: reportSalesLast7Days,
          borderColor: "rgba(34, 197, 94, 1)",
          backgroundColor: "rgba(34, 197, 94, 0.12)",
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: "rgba(34, 197, 94, 1)",
          fill: true,
        },
      ],
    };

    const reportPaymentPieData = {
      labels: ["Cash", "Card"],
      datasets: [
        {
          data: [
            reportOrders.filter((o) => o.paymentMethodType === "cash").length,
            reportOrders.filter((o) => o.paymentMethodType === "card").length,
          ],
          backgroundColor: ["#22c55e", "#3b82f6"],
          hoverBackgroundColor: ["#16a34a", "#2563eb"],
          borderWidth: 0,
        },
      ],
    };

    const rangeLabel =
      reportRange === "today"
        ? "today"
        : reportRange === "7"
        ? "last 7 days"
        : reportRange === "30"
        ? "last 30 days"
        : "all data on page";

    return (
      <div className="space-y-6">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-100 dark:border-gray-700 flex flex-wrap gap-3 items-center justify-between">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">
            Reports & Analytics
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setReportRange("today")}
              className={`px-3 py-1.5 text-sm rounded-lg border dark:border-gray-600 ${
                reportRange === "today"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setReportRange("7")}
              className={`px-3 py-1.5 text-sm rounded-lg border dark:border-gray-600 ${
                reportRange === "7"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Last 7 days
            </button>
            <button
              onClick={() => setReportRange("30")}
              className={`px-3 py-1.5 text-sm rounded-lg border dark:border-gray-600 ${
                reportRange === "30"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Last 30 days
            </button>
            <button
              onClick={() => setReportRange("all")}
              className={`px-3 py-1.5 text-sm rounded-lg border dark:border-gray-600 ${
                reportRange === "all"
                  ? "bg-blue-600 text-white border-blue-600"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Custom (Soon)
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Orders (DB)"
            value={totalOrders}
            icon={FaClipboardList}
            colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
            subtext={
              <span className="text-gray-600 dark:text-gray-300">
                All pages
              </span>
            }
          />
          <KPICard
            title={`Sales (${rangeLabel})`}
            value={`${reportTotalSales.toLocaleString()} EGP`}
            icon={FaDollarSign}
            colorClass="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
            subtext={
              <span className="text-gray-600 dark:text-gray-300">
                Based on current filter
              </span>
            }
          />
          <KPICard
            title="Avg Order Value"
            value={`${averageOrderValue} EGP`}
            icon={FaChartBar}
            colorClass="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
            subtext={
              <span className="text-gray-600 dark:text-gray-300">
                Current filter only
              </span>
            }
          />
          <KPICard
            title="Products Sold (Filter)"
            value={reportTotalProductsSold}
            icon={FaBoxOpen}
            colorClass="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
            subtext={
              <span className="text-gray-600 dark:text-gray-300">
                Units in filter
              </span>
            }
          />
        </div>

        {/* Charts Reuse */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 h-80">
            <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-4">
              Weekly Sales ({rangeLabel})
            </h4>
            <Line data={reportLineChartData} options={lineChartOptions} />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 h-80">
            <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-4">
              Payment Methods ({rangeLabel})
            </h4>
            <Doughnut data={reportPaymentPieData} options={doughnutOptions} />
          </div>
        </div>

        {/* Top Customers / Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Customers */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-4">
              Top Customers (Current Filter)
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 border-b-2 border-blue-200 dark:border-blue-900">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-right">
                      Spent
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {reportCustomerStats.list.slice(0, 5).map((c, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <td className="px-4 py-3">
                        <div
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${
                            idx === 0
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : idx === 1
                              ? "bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                              : idx === 2
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {idx + 1}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white text-xs bg-gradient-to-r from-blue-500 to-purple-500">
                            {c.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white truncate">
                            {c.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          {c.orderCount}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="font-bold text-green-600 dark:text-green-400">
                          {c.totalSpent.toLocaleString()} EGP
                        </p>
                      </td>
                    </tr>
                  ))}
                  {reportCustomerStats.list.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex flex-col items-center">
                          <FaUsers className="text-3xl mb-2 opacity-30" />
                          <p>No customer data</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <h4 className="font-bold text-gray-700 dark:text-gray-200 mb-4">
              Top Products (Current Filter)
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 border-b-2 border-blue-200 dark:border-blue-900">
                  <tr>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-right">
                      Units
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-right">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {reportBestSellingProducts.map((p, idx) => {
                    const maxQuantity =
                      reportBestSellingProducts[0]?.quantity || 1;
                    const percentage = (p.quantity / maxQuantity) * 100;
                    return (
                      <tr
                        key={idx}
                        className="hover:bg-blue-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                      >
                        <td className="px-4 py-3">
                          <div
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${
                              idx === 0
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : idx === 1
                                ? "bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                                : idx === 2
                                ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {idx + 1}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-semibold truncate ${
                                idx === 0
                                  ? "text-blue-700 dark:text-blue-400"
                                  : "text-gray-900 dark:text-white"
                              }`}
                            >
                              {p.name}
                            </span>
                            {idx === 0 && (
                              <span className="inline-block text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded font-bold whitespace-nowrap">
                                TOP
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                            {p.quantity}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  idx === 0
                                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                                    : idx === 1
                                    ? "bg-gradient-to-r from-blue-400 to-blue-500"
                                    : "bg-gradient-to-r from-blue-300 to-blue-400"
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-gray-600 dark:text-gray-400 w-6 text-right">
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {reportBestSellingProducts.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex flex-col items-center">
                          <FaBoxOpen className="text-3xl mb-2 opacity-30" />
                          <p>No products data</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600 mt-20">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 mt-20">Error: {error}</div>;
  }

  // --- LAYOUT ---
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: FaHome },
    { id: "orders", label: "Orders", icon: FaClipboardList },
    { id: "products", label: "Products", icon: FaBoxOpen },
    { id: "customers", label: "Customers", icon: FaUsers },
    { id: "reports", label: "Reports", icon: FaChartBar },
    // { id: "settings", label: "Settings", icon: FaCog },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden font-sans">
      {/* Sidebar Overlay (Mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-30 w-64 h-full bg-white dark:bg-gray-800 shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            FreshCart
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
              }`}
            >
              <item.icon className="text-lg" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-blue-500 to-purple-500 font-bold text-white text-lg">
              {userProfile?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <div>
              <p className="text-sm font-bold truncate">
                {userProfile?.name || "Admin User"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userProfile?.email || "admin@freshcart.com"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 p-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 md:hidden text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg"
          >
            <FaBars size={20} />
          </button>

          <h2 className="text-xl font-bold capitalize text-gray-800 dark:text-white ml-2 md:ml-0">
            {activeSection} Overview
          </h2>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative">
              <FaShoppingCart size={20} />
              {orders.length > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800" />
              )}
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === "dashboard" && renderDashboard()}
            {activeSection === "orders" && renderOrders()}
            {activeSection === "products" && renderProducts()}
            {activeSection === "customers" && renderCustomers()}
            {activeSection === "reports" && renderReports()}
            {/* {activeSection === "settings" &&renderPlaceholder("System Settings")} */}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
