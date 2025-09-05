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
  const last7Days = Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), 6 - i), 'yyyy-MM-dd'));
  const salesLast7Days = last7Days.map(day => {
    const dayOrders = orders.filter(order => format(new Date(order.createdAt), 'yyyy-MM-dd') === day);
    return dayOrders.reduce((sum, order) => sum + order.totalOrderPrice, 0);
  });
  // بيانات Line chart
  const lineChartData = {
    labels: last7Days.map(day => format(new Date(day), 'dd MMM')),
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
        data: [orders.filter(o => o.paymentMethodType === 'cash').length, orders.filter(o => o.paymentMethodType === 'card').length],
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
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e8fbe8] to-[#a0c4ff] dark:bg-[#0f172a] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#0f172a] dark:to-[#0f172a] py-8 px-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-[#14532d] dark:text-white tracking-tight text-center drop-shadow-lg px-4">
          Dashboard
        </h1>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {/* Total Orders */}
          <motion.div whileHover={{ scale: 1.03 }} className="rounded-xl shadow bg-gradient-to-br from-[#e0f2fe] to-[#b2f2bb] dark:bg-[#0f172a] p-4 sm:p-5 flex flex-col items-center border border-[#e0e0e0] dark:border-gray-700 transition-all duration-300">
            <FaShoppingCart className="text-3xl text-[#4361ee] bg-[#e0f2fe] p-2 rounded-full shadow mb-2" />
            <span className="text-base font-semibold text-gray-700 dark:text-white">Total Orders</span>
            <span className="text-2xl font-extrabold text-[#14532d] dark:text-[#255a2c]">{totalOrders}</span>
          </motion.div>
          {/* Total Sales */}
          <motion.div whileHover={{ scale: 1.03 }} className="rounded-xl shadow bg-gradient-to-br from-[#b2f2bb] to-[#a0c4ff] dark:bg-[#0f172a] p-4 sm:p-5 flex flex-col items-center border border-[#e0e0e0] dark:border-gray-700 transition-all duration-300">
            <FaDollarSign className="text-3xl text-[#0aad0a] bg-[#b2f2bb] p-2 rounded-full shadow mb-2" />
            <span className="text-base font-semibold text-gray-700 dark:text-white">Total Sales</span>
            <span className="text-2xl font-extrabold text-[#0aad0a]">{totalSales.toLocaleString()} EGP</span>
          </motion.div>
          {/* Paid Orders */}
          <motion.div whileHover={{ scale: 1.03 }} className="rounded-xl shadow bg-gradient-to-br from-[#e0f2fe] to-[#b2f2bb] dark:bg-[#0f172a] p-4 sm:p-5 flex flex-col items-center border border-[#e0e0e0] dark:border-gray-700 transition-all duration-300">
            <FaCheckCircle className="text-3xl text-[#43e97b] bg-[#e0f2fe] p-2 rounded-full shadow mb-2" />
            <span className="text-base font-semibold text-gray-700 dark:text-white">Paid Orders</span>
            <span className="text-2xl font-extrabold text-[#43e97b]">{paidOrders}</span>
          </motion.div>
          {/* Unpaid Orders */}
          <motion.div whileHover={{ scale: 1.03 }} className="rounded-xl shadow bg-gradient-to-br from-[#f8fafc] to-[#a0c4ff] dark:bg-[#0f172a] p-4 sm:p-5 flex flex-col items-center border border-[#e0e0e0] dark:border-gray-700 transition-all duration-300">
            <FaTimesCircle className="text-3xl text-[#ff5858] bg-[#f8fafc] p-2 rounded-full shadow mb-2" />
            <span className="text-base font-semibold text-gray-700 dark:text-white">Unpaid Orders</span>
            <span className="text-2xl font-extrabold text-[#ff5858]">{unpaidOrders}</span>
          </motion.div>
        </div>
        {/* Last Orders Table */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="bg-white dark:bg-[#0f172a] rounded-xl shadow-xl p-4 sm:p-6 mb-10 border border-[#e0e0e0] dark:border-gray-700">
          <h2 className="text-lg font-bold mb-4 text-[#14532d] dark:text-white">Last Orders</h2>
          
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Order ID</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Customer</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Total</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Payment</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 8).map((order) => (
                  <tr key={order._id} className="hover:bg-[#b2f2bb]/30 dark:hover:bg-[#0aad0a]/10 transition-all">
                    <td className="px-4 py-2 font-mono text-xs text-gray-700 dark:text-gray-200">{order._id.slice(-6)}</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      <div className="font-bold">{order.user?.name}</div>
                      <div className="text-xs text-gray-500">{order.user?.email}</div>
                    </td>
                    <td className="px-4 py-2 text-[#0aad0a] font-bold">{order.totalOrderPrice} EGP</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.paymentMethodType === 'cash' ? 'bg-[#b2f2bb] text-[#14532d]' : 'bg-[#a0c4ff] text-[#185a9d]'}`}>
                        {order.paymentMethodType}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.isPaid ? 'bg-[#b2f2bb] text-[#14532d]' : 'bg-[#ffe0e0] text-[#ff5858]'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                      </span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${order.isDelivered ? 'bg-[#a0c4ff] text-[#185a9d]' : 'bg-gray-100 text-gray-700'}`}>
                        {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden space-y-4">
            {orders.slice(0, 8).map((order) => (
              <div key={order._id} className="bg-gray-50 dark:bg-[#0f172a] rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-mono text-sm text-gray-600 dark:text-gray-300">#{order._id.slice(-6)}</span>
                      <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="mb-2">
                      <div className="font-semibold text-gray-900 dark:text-white">{order.user?.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{order.user?.email}</div>
                    </div>
                    <div className="text-lg font-bold text-[#0aad0a]">{order.totalOrderPrice} EGP</div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.paymentMethodType === 'cash' ? 'bg-[#b2f2bb] text-[#14532d]' : 'bg-[#a0c4ff] text-[#185a9d]'}`}>
                      {order.paymentMethodType}
                    </span>
                    <div className="flex flex-col space-y-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.isPaid ? 'bg-[#b2f2bb] text-[#14532d]' : 'bg-[#ffe0e0] text-[#ff5858]'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.isDelivered ? 'bg-[#a0c4ff] text-[#185a9d]' : 'bg-gray-100 text-gray-700'}`}>
                        {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="bg-white dark:bg-[#0f172a] rounded-xl shadow-xl p-4 sm:p-6 border border-[#e0e0e0] dark:border-gray-700">
            <h2 className="text-lg font-bold mb-4 text-[#14532d] dark:text-white">Sales Last 7 Days</h2>
            <div className="h-64 sm:h-80">
              <Line 
                data={lineChartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: {
                      ticks: {
                        maxRotation: 45,
                        minRotation: 45
                      }
                    }
                  }
                }} 
              />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="bg-white dark:bg-[#0f172a] rounded-xl shadow-xl p-4 sm:p-6 border border-[#e0e0e0] dark:border-gray-700">
            <h2 className="text-lg font-bold mb-4 text-[#14532d] dark:text-white">Top 5 Best Selling Products</h2>
            <div className="h-64 sm:h-80">
              <Bar 
                data={barChartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: {
                      ticks: {
                        maxRotation: 45,
                        minRotation: 45
                      }
                    }
                  }
                }} 
              />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="bg-white dark:bg-[#0f172a] rounded-xl shadow-xl p-4 sm:p-6 border border-[#e0e0e0] dark:border-gray-700 lg:col-span-2">
            <h2 className="text-lg font-bold mb-4 text-[#14532d] dark:text-white">Payment Methods</h2>
            <div className="flex justify-center">
              <div className="w-48 sm:w-64 h-48 sm:h-64">
                <Doughnut 
                  data={paymentPieData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    cutout: '70%', 
                    plugins: { 
                      legend: { 
                        position: 'bottom',
                        labels: {
                          padding: 20,
                          usePointStyle: true
                        }
                      } 
                    } 
                  }} 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
