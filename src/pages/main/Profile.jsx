import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components/Loading';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaCalendarAlt, FaMoneyBillWave, FaTruck, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

export default function Profile() {
  const { decodedToken } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('tkn');
        
        if (!token || !decodedToken?.id) {
          setError('Please login to view your profile');
          setLoading(false);
          return;
        }

        // Debug: طباعة محتوى decodedToken
        console.log('🔍 Full Decoded Token:', decodedToken);
        console.log('🔍 Available IDs:', {
          id: decodedToken.id,
          id_user: decodedToken.id_user,
          user_id: decodedToken.user_id,
          _id: decodedToken._id
        });

        // جلب طلبات المستخدم (تحتوي على بيانات المستخدم)
        // نستخدم decodedToken._id أو decodedToken.id_user أو decodedToken.id
        const userId = decodedToken._id || decodedToken.id_user || decodedToken.id;
        console.log('🔍 Using User ID:', userId);
        const ordersResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!ordersResponse.ok) {
          throw new Error('Failed to fetch orders');
        }

        const ordersData = await ordersResponse.json();
        console.log('📦 Orders Data:', ordersData);
        setOrders(ordersData);

        // استخراج بيانات المستخدم من أول طلب (إذا وجد)
        if (ordersData.length > 0 && ordersData[0].user) {
          setUserData(ordersData[0].user);
          console.log('👤 User Data from orders:', ordersData[0].user);
        } else {
          // إذا لم يكن هناك طلبات، نستخدم بيانات من decodedToken
          console.log('📝 No orders found, using decodedToken data');
          setUserData({
            name: decodedToken.name,
            email: decodedToken.email,
            phone: decodedToken.phone
          });
        }
      } catch (err) {
        console.error('❌ Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [decodedToken]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      case 'shipped':
        return <FaTruck className="text-blue-500" />;
      default:
        return <FaClock className="text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e8fbe8] to-[#a0c4ff] dark:bg-[#0f172a] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#0f172a] dark:to-[#0f172a] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#0f172a] p-8 rounded-xl shadow-xl text-center border border-[#e0e0e0] dark:border-gray-700"
        >
          <FaTimesCircle className="text-red-500 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e8fbe8] to-[#a0c4ff] dark:bg-[#0f172a] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#0f172a] dark:to-[#0f172a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#0f172a] rounded-xl shadow-xl p-6 mb-8 border border-[#e0e0e0] dark:border-gray-700"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <FaUser className="text-blue-600 dark:text-blue-300 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
              <p className="text-gray-600 dark:text-gray-300">Welcome back, {userData?.name || decodedToken?.name || 'User'}!</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{userData?.email || 'No email available'}</p>
              {userData?.phone && (
                <p className="text-gray-500 dark:text-gray-400 text-sm">📞 {userData.phone}</p>
              )}
              <p className="text-gray-500 dark:text-gray-400 text-sm">🛒 {orders.length} orders</p>
            </div>
          </div>
        </motion.div>

        {/* Orders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#0f172a] rounded-xl shadow-xl overflow-hidden border border-[#e0e0e0] dark:border-gray-700"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <FaShoppingBag className="text-blue-600 dark:text-blue-300 text-xl" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Orders</h2>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {orders.length} orders
              </span>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center">
              <FaShoppingBag className="text-gray-400 dark:text-gray-500 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Orders Yet</h3>
              <p className="text-gray-600 dark:text-gray-300">You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <div className="mt-4">
                <Link to="/Products" className="inline-flex items-center px-4 py-2 bg-[#0aad0a] text-white rounded-lg hover:bg-[#099409] transition-colors">
                  <i className="fa-solid fa-shopping-cart mr-2"></i>
                  Start Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status || 'Pending'}
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
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
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
                          <FaMoneyBillWave className="text-gray-400 dark:text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {order.paymentMethodType || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="lg:w-64">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Items:</h4>
                      <div className="space-y-2">
                        {order.cartItems?.slice(0, 3).map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-3 text-sm">
                            <img
                              src={item.product?.imageCover}
                              alt={item.product?.title}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-900 dark:text-white truncate">{item.product?.title}</p>
                              <p className="text-gray-500 dark:text-gray-400">Qty: {item.count}</p>
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
      </div>
    </div>
  );
} 