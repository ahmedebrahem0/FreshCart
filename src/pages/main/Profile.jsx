import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaShoppingBag,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

export default function Profile() {
  const { decodedToken, Token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastToken, setLastToken] = useState(null);
  const [userStats, setUserStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    averageOrderValue: 0,
    favoriteCategories: [],
    recentActivity: []
  });

  // دالة لحساب إحصائيات المستخدم
  const calculateUserStats = (ordersData) => {
    if (!ordersData || ordersData.length === 0) {
      return {
        totalOrders: 0,
        totalSpent: 0,
        averageOrderValue: 0,
        favoriteCategories: [],
        recentActivity: []
      };
    }

    const totalOrders = ordersData.length;
    const totalSpent = ordersData.reduce((sum, order) => sum + (order.totalOrderPrice || 0), 0);
    const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

    // حساب الفئات المفضلة
    const categoryCount = {};
    ordersData.forEach(order => {
      order.cartItems?.forEach(item => {
        const categoryName = item.product?.category?.name;
        if (categoryName) {
          categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
        }
      });
    });

    const favoriteCategories = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // الأنشطة الأخيرة (آخر 5 طلبات)
    const recentActivity = ordersData
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(order => ({
        id: order._id,
        date: order.createdAt,
        total: order.totalOrderPrice,
        status: order.status,
        itemsCount: order.cartItems?.length || 0
      }));

    return {
      totalOrders,
      totalSpent,
      averageOrderValue,
      favoriteCategories,
      recentActivity
    };
  };

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem("tkn");

        // تجنب إعادة تحميل البيانات إذا لم يتغير التوكن
        if (token === lastToken && userData && orders.length >= 0) {
          setLoading(false);
          return;
        }

        setLoading(true);
        setLastToken(token);
        
        // فحص التوكن فقط، بدون فحص decodedToken
        if (!token) {
          setError("Please login to view your profile");
          setLoading(false);
          return;
        }

        // إذا لم يكن decodedToken متاحاً بعد، نحاول فك التوكن يدوياً
        let userId;
        if (decodedToken?.id || decodedToken?._id || decodedToken?.id_user) {
          userId = decodedToken._id || decodedToken.id_user || decodedToken.id;
        } else {
          // فك التوكن يدوياً إذا لم يكن متاحاً في Context
          try {
            const jwtDecode = (await import("jwt-decode")).jwtDecode;
            const decoded = jwtDecode(token);
            userId = decoded._id || decoded.id_user || decoded.id;
          } catch (decodeError) {
            console.error("Error decoding token:", decodeError);
            setError("Invalid token. Please login again.");
            setLoading(false);
            return;
          }
        }

        // Debug: طباعة محتوى decodedToken
        console.log("🔍 Full Decoded Token:", decodedToken);
        console.log("🔍 Available IDs:", {
          id: decodedToken?.id,
          id_user: decodedToken?.id_user,
          user_id: decodedToken?.user_id,
          _id: decodedToken?._id,
        });

        console.log("🔍 Using User ID:", userId);
        const ordersResponse = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
          {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!ordersResponse.ok) {
          throw new Error("Failed to fetch orders");
        }

        const ordersData = await ordersResponse.json();
        console.log("📦 Orders Data:", ordersData);
        setOrders(ordersData);

        // حساب الإحصائيات من الطلبات
        const stats = calculateUserStats(ordersData);
        setUserStats(stats);

        // استخراج بيانات المستخدم من أول طلب (إذا وجد)
        if (ordersData.length > 0 && ordersData[0].user) {
          setUserData(ordersData[0].user);
          console.log("👤 User Data from orders:", ordersData[0].user);
        } else {
          // إذا لم يكن هناك طلبات، نحاول جلب بيانات المستخدم من API مباشرة
          console.log("📝 No orders found, fetching user profile directly");
          try {
            const profileResponse = await fetch(
              `https://ecommerce.routemisr.com/api/v1/user/profile`,
              {
                headers: {
                  token: token,
                  "Content-Type": "application/json",
                },
              }
            );

            if (profileResponse.ok) {
              const profileData = await profileResponse.json();
              setUserData(profileData.data);
              console.log("👤 User Data from profile API:", profileData.data);
            } else {
              // إذا فشل جلب البيانات من API، نستخدم بيانات من decodedToken
              console.log("📝 Fallback to decodedToken data");
              setUserData({
                name: decodedToken?.name,
                email: decodedToken?.email,
                phone: decodedToken?.phone,
              });
            }
          } catch (profileError) {
            console.error("Error fetching profile:", profileError);
            // Fallback إلى بيانات decodedToken
          setUserData({
              name: decodedToken?.name,
              email: decodedToken?.email,
              phone: decodedToken?.phone,
            });
          }
        }
      } catch (err) {
        console.error("❌ Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [decodedToken, Token]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <FaCheckCircle className="text-green-500" />;
      case "cancelled":
        return <FaTimesCircle className="text-red-500" />;
      case "shipped":
        return <FaTruck className="text-blue-500" />;
      default:
        return <FaClock className="text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-md text-center"
        >
          <FaTimesCircle className="text-red-500 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 dark:from-green-600 dark:via-blue-600 dark:to-purple-700 rounded-2xl shadow-2xl p-8 mb-8 relative overflow-hidden z-10"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative flex items-center space-x-6">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white shadow-lg text-[#0aad0a] text-3xl font-bold">
              {userData?.name?.charAt(0)?.toUpperCase() ||
                decodedToken?.name?.charAt(0)?.toUpperCase() || (
                  <i className="fa-solid fa-user"></i>
                )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
              <h3 className="text-xl font-bold text-white mb-1">
                {userData?.name || decodedToken?.name || "No Name"}
              </h3>
              <div className="space-y-1">
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-envelope mr-2 text-yellow-300"></i>
                  {userData?.email || decodedToken?.email || "No Email"}
                </p>
                {(userData?.phone || decodedToken?.phone) && (
                  <p className="text-white/80 text-sm flex items-center">
                    <i className="fa-solid fa-phone mr-2 text-green-300"></i>
                    {userData?.phone || decodedToken?.phone}
                  </p>
                )}
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-shopping-bag mr-2 text-purple-300"></i>
                  {orders.length} orders • {userStats.totalSpent.toFixed(0)} EGP total
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-star mr-2 text-yellow-300"></i>
                  Member since {userData?.createdAt ? new Date(userData.createdAt).getFullYear() : new Date().getFullYear()}
                </p>
                {userStats.favoriteCategories[0] && (
                  <p className="text-white/80 text-sm flex items-center">
                    <i className="fa-solid fa-heart mr-2 text-red-300"></i>
                    Favorite: {userStats.favoriteCategories[0].name}
                  </p>
                )}
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-chart-line mr-2 text-blue-300"></i>
                  Avg Order: {userStats.averageOrderValue.toFixed(0)} EGP
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-calendar mr-2 text-green-300"></i>
                  Last Order: {orders.length > 0 ? new Date(orders[0].createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'None'}
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-trophy mr-2 text-yellow-300"></i>
                  Status: {userStats.totalOrders > 10 ? 'VIP' : userStats.totalOrders > 5 ? 'Premium' : 'Regular'}
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-shield mr-2 text-blue-300"></i>
                  Account: {userData?.role || 'User'}
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-clock mr-2 text-purple-300"></i>
                  Last Login: {userData?.lastLogin ? new Date(userData.lastLogin).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Today'}
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-gift mr-2 text-pink-300"></i>
                  Rewards: {userStats.totalOrders * 10} points
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-medal mr-2 text-yellow-300"></i>
                  Level: {userStats.totalOrders > 20 ? 'Gold' : userStats.totalOrders > 10 ? 'Silver' : 'Bronze'}
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-fire mr-2 text-red-300"></i>
                  Streak: {userStats.totalOrders > 0 ? Math.min(userStats.totalOrders, 30) : 0} days
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-crown mr-2 text-purple-300"></i>
                  Rank: #{userStats.totalOrders > 0 ? Math.max(1, 1000 - userStats.totalOrders) : 'N/A'}
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-badge mr-2 text-green-300"></i>
                  Badges: {userStats.totalOrders > 50 ? 'Legend' : userStats.totalOrders > 25 ? 'Master' : userStats.totalOrders > 10 ? 'Expert' : 'Beginner'}
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-star mr-2 text-yellow-300"></i>
                  Rating: {userStats.totalOrders > 0 ? (4.5 + (userStats.totalOrders * 0.01)).toFixed(1) : 'N/A'}
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-trophy mr-2 text-orange-300"></i>
                  Achievements: {userStats.totalOrders > 100 ? 'Hall of Fame' : userStats.totalOrders > 50 ? 'Champion' : userStats.totalOrders > 20 ? 'Hero' : 'Rookie'}
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-gem mr-2 text-blue-300"></i>
                  VIP Status: {userStats.totalSpent > 10000 ? 'Diamond' : userStats.totalSpent > 5000 ? 'Gold' : userStats.totalSpent > 1000 ? 'Silver' : 'Bronze'}
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-rocket mr-2 text-purple-300"></i>
                  Next Level: {userStats.totalOrders > 0 ? Math.ceil(userStats.totalOrders / 10) * 10 - userStats.totalOrders : 10} orders
                </p>
                <p className="text-white/80 text-sm flex items-center">
                  <i className="fa-solid fa-coins mr-2 text-yellow-300"></i>
                  Savings: {userStats.totalOrders * 50} EGP
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* إحصائيات المستخدم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* إجمالي الطلبات */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold">{userStats.totalOrders}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaShoppingBag className="text-2xl" />
              </div>
            </div>
          </div>

          {/* إجمالي المشتريات */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Spent</p>
                <p className="text-3xl font-bold">{userStats.totalSpent.toFixed(0)} EGP</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaMoneyBillWave className="text-2xl" />
              </div>
            </div>
          </div>

          {/* متوسط قيمة الطلب */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Avg Order Value</p>
                <p className="text-3xl font-bold">{userStats.averageOrderValue.toFixed(0)} EGP</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaCalendarAlt className="text-2xl" />
              </div>
            </div>
          </div>

          {/* الفئات المفضلة */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Favorite Category</p>
                <p className="text-lg font-bold">
                  {userStats.favoriteCategories[0]?.name || "None"}
                </p>
                {userStats.favoriteCategories[0] && (
                  <p className="text-orange-200 text-xs">
                    {userStats.favoriteCategories[0].count} orders
                  </p>
                )}
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaUser className="text-2xl" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* الفئات المفضلة */}
        {userStats.favoriteCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-gray-700/50 mb-8"
          >
            <div className="px-8 py-6 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 dark:from-orange-600/20 dark:via-red-600/20 dark:to-pink-600/20 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                  <FaUser className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Favorite Categories</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Your most shopped categories</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userStats.favoriteCategories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 border border-orange-200/50 dark:border-orange-700/50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">{category.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{category.count} orders</p>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* الأنشطة الأخيرة */}
        {userStats.recentActivity.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-gray-700/50 mb-8"
          >
            <div className="px-8 py-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
                  <FaClock className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Your latest shopping activities</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-4">
                {userStats.recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <FaShoppingBag className="text-white text-lg" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          Order #{activity.id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(activity.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {activity.total} EGP
                      </p>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(activity.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                          {activity.status || 'Pending'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.itemsCount} items
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-gray-700/50 z-10"
        >
          <div className="px-8 py-6 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 dark:from-green-600/20 dark:via-blue-600/20 dark:to-purple-600/20 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg">
                <FaShoppingBag className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  My Orders
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Track your shopping history
                </p>
              </div>
              <span className="ml-auto bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                {orders.length} orders
              </span>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center bg-gradient-to-br from-green-50/50 via-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:via-gray-700/50 dark:to-gray-800/50">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl">
                <FaShoppingBag className="text-white text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No Orders Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                You haven't placed any orders yet. Start shopping to see your
                orders here!
              </p>
              <div className="mt-6">
                <Link
                  to="/Products"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <i className="fa-solid fa-shopping-cart mr-3 text-lg"></i>
                  Start Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
              {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 hover:bg-gradient-to-r hover:from-green-50/50 hover:via-blue-50/50 hover:to-purple-50/50 dark:hover:from-gray-700/50 dark:hover:via-gray-600/50 dark:hover:to-gray-700/50 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status || "Pending"}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt className="text-gray-400 dark:text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaMoneyBillWave className="text-gray-400 dark:text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Total: {order.totalOrderPrice} EGP
                          </span>
                        </div>
                                                 <div className="flex items-center space-x-2">
                           <FaShoppingBag className="text-gray-400 dark:text-gray-500" />
                           <span className="text-gray-600 dark:text-gray-300">
                             {order.cartItems?.length || 0} items
                           </span>
                         </div>
                         <div className="flex items-center space-x-2">
                          <FaTruck className="text-gray-400 dark:text-gray-500" />
                           <span className="text-gray-600 dark:text-gray-300">
                            {order.paymentMethodType || "N/A"}
                           </span>
                         </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="lg:w-64">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Items:
                      </h4>
                      <div className="space-y-2">
                        {order.cartItems?.slice(0, 3).map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center space-x-3 text-sm"
                          >
                            <img
                              src={item.product?.imageCover}
                              alt={item.product?.title}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-900 dark:text-white truncate">
                                {item.product?.title}
                              </p>
                              <p className="text-gray-500 dark:text-gray-400">
                                Qty: {item.count} • {item.price} EGP
                              </p>
                              {item.product?.brand && (
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                  Brand: {item.product.brand.name}
                                </p>
                              )}
                              {item.product?.ratingsAverage && (
                                <div className="flex items-center space-x-1 mt-1">
                                  <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                      <i
                                        key={i}
                                        className={`fa-solid fa-star text-xs ${
                                          i < Math.floor(item.product.ratingsAverage)
                                            ? 'text-yellow-400'
                                            : 'text-gray-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-gray-400 dark:text-gray-500">
                                    ({item.product.ratingsAverage})
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        {order.cartItems?.length > 3 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            +{order.cartItems.length - 3} more items
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* زر عرض جميع الطلبات */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-8"
          >
            <Link
              to="/AllOrders"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <i className="fa-solid fa-list mr-3 text-lg"></i>
              View All Orders
              <i className="fa-solid fa-arrow-right ml-3"></i>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
} 
