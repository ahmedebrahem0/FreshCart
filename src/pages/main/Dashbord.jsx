import React, { useEffect, useState } from "react";
import { orderService } from "../../services";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
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
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaBoxOpen,
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

  // Statistics state variables
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [paidOrders, setPaidOrders] = useState(0);
  const [unpaidOrders, setUnpaidOrders] = useState(0);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [totalProductsSold, setTotalProductsSold] = useState(0);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await orderService.getAllOrders();
        setOrders(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate statistics when orders data changes
  useEffect(() => {
    if (orders.length > 0) {
      setTotalOrders(orders.length);

      const totalSales = orders.reduce(
        (sum, order) => sum + order.totalOrderPrice,
        0
      );
      setTotalSales(totalSales);
      setAverageOrderValue(totalSales / orders.length);

      const paidOrders = orders.filter((order) => order.isPaid).length;
      setPaidOrders(paidOrders);
      setUnpaidOrders(orders.length - paidOrders);

      const productSales = {};
      orders.forEach((order) => {
        order.cartItems.forEach((item) => {
          const productId = item.product._id;
          const productName = item.product.title;
          const quantity = item.count;
          if (!productSales[productId]) {
            productSales[productId] = { name: productName, quantity: 0 };
          }
          productSales[productId].quantity += quantity;
        });
      });

      const bestSellingProducts = Object.values(productSales).sort(
        (a, b) => b.quantity - a.quantity
      );
      setBestSellingProducts(bestSellingProducts.slice(0, 5));

      const totalProductsSold = Object.values(productSales).reduce(
        (sum, product) => sum + product.quantity,
        0
      );
      setTotalProductsSold(totalProductsSold);
    }
  }, [orders]);

  // Data for charts
  const barChartData = {
    labels: bestSellingProducts.map((product) => product.name),
    datasets: [
      {
        label: "Units Sold",
        data: bestSellingProducts.map((product) => product.quantity),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // حساب مبيعات آخر 7 أيام
  const last7Days = Array.from({ length: 7 }, (_, i) =>
    format(subDays(new Date(), 6 - i), "yyyy-MM-dd")
  );
  const salesLast7Days = last7Days.map((day) => {
    const dayOrders = orders.filter(
      (order) => format(new Date(order.createdAt), "yyyy-MM-dd") === day
    );
    return dayOrders.reduce((sum, order) => sum + order.totalOrderPrice, 0);
  });
  // بيانات Line chart
  const lineChartData = {
    labels: last7Days.map((day) => format(new Date(day), "dd MMM")),
    datasets: [
      {
        label: "Sales (EGP)",
        data: salesLast7Days,
        borderColor: "#0aad0a",
        backgroundColor: "rgba(10,173,10,0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#0aad0a",
        fill: true,
      },
    ],
  };
  // Pie chart لطريقة الدفع
  const paymentPieData = {
    labels: ["Cash", "Card"],
    datasets: [
      {
        data: [
          orders.filter((o) => o.paymentMethodType === "cash").length,
          orders.filter((o) => o.paymentMethodType === "card").length,
        ],
        backgroundColor: ["#b2f2bb", "#a0c4ff"],
        borderColor: ["#0aad0a", "#4361ee"],
        borderWidth: 2,
      },
    ],
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600 mt-10">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Real-time insights and performance metrics
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Orders */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {totalOrders}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <FaShoppingCart className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <span className="font-medium">+12%</span>
              <span className="ml-1">from last month</span>
            </div>
          </motion.div>

          {/* Total Sales */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Sales
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {totalSales.toLocaleString()} EGP
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <FaDollarSign className="text-2xl text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <span className="font-medium">+8%</span>
              <span className="ml-1">from last month</span>
            </div>
          </motion.div>

          {/* Paid Orders */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Paid Orders
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {paidOrders}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                <FaCheckCircle className="text-2xl text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-emerald-600">
              <span className="font-medium">
                {((paidOrders / totalOrders) * 100).toFixed(1)}%
              </span>
              <span className="ml-1">success rate</span>
            </div>
          </motion.div>

          {/* Unpaid Orders */}
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Unpaid Orders
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {unpaidOrders}
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl">
                <FaTimesCircle className="text-2xl text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-red-600">
              <span className="font-medium">
                {((unpaidOrders / totalOrders) * 100).toFixed(1)}%
              </span>
              <span className="ml-1">pending</span>
            </div>
          </motion.div>
        </div>
        {/* Recent Orders Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Recent Orders
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Last 8 orders</span>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {orders.slice(0, 8).map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        #{order._id.slice(-6)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.user?.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {order.user?.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        {order.totalOrderPrice} EGP
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.paymentMethodType === "cash"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        {order.paymentMethodType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.isPaid
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {order.isPaid ? "Paid" : "Unpaid"}
                        </span>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.isDelivered
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {order.isDelivered ? "Delivered" : "Pending"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden space-y-4">
            {orders.slice(0, 8).map((order) => (
              <div
                key={order._id}
                className="bg-gray-50 dark:bg-[#0f172a] rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-mono text-sm text-gray-600 dark:text-gray-300">
                        #{order._id.slice(-6)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mb-2">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {order.user?.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {order.user?.email}
                      </div>
                    </div>
                    <div className="text-lg font-bold text-[#0aad0a]">
                      {order.totalOrderPrice} EGP
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.paymentMethodType === "cash"
                          ? "bg-[#b2f2bb] text-[#14532d]"
                          : "bg-[#a0c4ff] text-[#185a9d]"
                      }`}
                    >
                      {order.paymentMethodType}
                    </span>
                    <div className="flex flex-col space-y-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.isPaid
                            ? "bg-[#b2f2bb] text-[#14532d]"
                            : "bg-[#ffe0e0] text-[#ff5858]"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Unpaid"}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.isDelivered
                            ? "bg-[#a0c4ff] text-[#185a9d]"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.isDelivered ? "Delivered" : "Not Delivered"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Sales Trend
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Last 7 days
              </span>
            </div>
            <div className="h-80">
              <Line
                data={lineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      titleColor: "white",
                      bodyColor: "white",
                      borderColor: "#0aad0a",
                      borderWidth: 1,
                    },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      ticks: {
                        color: "#6b7280",
                        maxRotation: 45,
                        minRotation: 45,
                      },
                    },
                    y: {
                      grid: { color: "#f3f4f6" },
                      ticks: { color: "#6b7280" },
                    },
                  },
                }}
              />
            </div>
          </motion.div>

          {/* Best Selling Products */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Top Products
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Best sellers
              </span>
            </div>
            <div className="h-80">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      titleColor: "white",
                      bodyColor: "white",
                      borderColor: "#3b82f6",
                      borderWidth: 1,
                    },
                  },
                  scales: {
                    x: {
                      grid: { display: false },
                      ticks: {
                        color: "#6b7280",
                        maxRotation: 45,
                        minRotation: 45,
                      },
                    },
                    y: {
                      grid: { color: "#f3f4f6" },
                      ticks: { color: "#6b7280" },
                    },
                  },
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Payment Methods Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Payment Methods
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Distribution
            </span>
          </div>
          <div className="flex justify-center">
            <div className="w-80 h-80">
              <Doughnut
                data={paymentPieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: "60%",
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: {
                        padding: 20,
                        usePointStyle: true,
                        color: "#6b7280",
                      },
                    },
                    tooltip: {
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      titleColor: "white",
                      bodyColor: "white",
                    },
                  },
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
