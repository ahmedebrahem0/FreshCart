import React, { useContext, useEffect, useState, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { motion } from "framer-motion";
import img from "../assets/images/freshcart-logo.svg";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const { Token, setToken, decodedToken } = useContext(AuthContext);
  const { numOfCartItems, numOfWishlist, setNumOfWishlist, getUserWishlist } =
    useContext(CartContext);
  const [showUserData, setShowUserData] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();
  const userMenuRef = useRef();
  const userButtonRef = useRef();

  // useEffect(() => {
  //   console.log("useEffect in navbar");
  //   // getUserWishlist()
  //   setNumOfWishlist()
  // },[])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("tkn");
    const authToken = Token || tokenFromStorage;

    if (authToken) {
      // قراءة بيانات المستخدم من localStorage أولاً
      const savedUserProfile = localStorage.getItem("userProfile");
      if (savedUserProfile) {
        try {
          setUserProfile(JSON.parse(savedUserProfile));
        } catch (error) {
          console.error("Error parsing saved user profile:", error);
        }
      }

      // جلب بيانات المستخدم من API كـ fallback
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/users/profile`, {
          headers: { token: authToken },
        })
        .then((res) => {
          const apiUserProfile = res.data?.data;
          if (apiUserProfile) {
            setUserProfile(apiUserProfile);
            // حفظ البيانات الجديدة في localStorage
            localStorage.setItem("userProfile", JSON.stringify(apiUserProfile));
          }
        })
        .catch((error) => console.error("Error fetching user profile:", error));

      // جلب طلبات المستخدم (يتطلب userId)
      if (decodedToken?.id) {
        axios
          .get(
            `https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`
          )
          .then((res) => setUserOrders(res.data))
          .catch((error) => console.error("Error fetching orders:", error));
      }
    } else {
      // إعادة تعيين البيانات عند تسجيل الخروج
      setUserProfile(null);
      setUserOrders([]);
      localStorage.removeItem("userProfile");
    }
  }, [decodedToken, Token]);

  useEffect(() => {
    if (!showUserData) return;
    function handleClickOutside(event) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setShowUserData(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showUserData]);

  function handelLogout() {
    localStorage.removeItem("tkn");
    setToken(null);
    setDarkMode(null);
    setNumOfWishlist(0);
    toast.success("You are welcome anytime", { position: "top-left" });
    navigate("/login");
  }

  return (
    <nav className="text-[#909090] bg-[#f0f3f2] dark:bg-gray-900 dark:backdrop-blur shadow-md transition-colors duration-500 border-b-[0.5px] border-white dark:border-gray-700 relative z-[99999]">
      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and Hamburger */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-2xl text-gray-600 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
            <img src={img} alt="logo" className="h-12 w-auto max-sm:w-[70%]" />
          </div>

          {/* Middle Section - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {Token && (
              <ul className="flex items-center gap-6">
                <li>
                  <NavLink
                    to="/Home"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Products"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Products
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/Brands"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Categories"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Dashboard"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Dashboard
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* Right Section - Icons and User */}
          <div className="flex items-center gap-4 max-lg:ml-4">
            <div className="hidden md:flex items-center gap-4 ">
              {/* Social Media Icons */}
              {/* <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </div> */}

              {Token && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md"
                  >
                    {darkMode ? "🌑" : "🌞"}
                  </motion.button>

                  <Link to="/wishlist" className="relative">
                    <i className="fa-solid fa-heart text-xl text-black dark:text-white"></i>
                    {numOfWishlist > 0 && (
                      <span className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full text-white bg-[#0aad0a]">
                        {numOfWishlist}
                      </span>
                    )}
                  </Link>

                  <Link to="/cart" className="relative">
                    <i className="fa-solid fa-cart-shopping text-xl text-black dark:text-white"></i>
                    {numOfCartItems > 0 && (
                      <span className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full text-white bg-[#0aad0a]">
                        {numOfCartItems}
                      </span>
                    )}
                  </Link>
                </>
              )}
            </div>

            {/* User Section */}
            <div className="flex items-center gap-2">
              {Token ? (
                <div className="relative flex items-center gap-2">
                  <button
                    ref={userButtonRef}
                    onClick={() => setShowUserData((prev) => !prev)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                  >
                    <i className="fa-solid fa-user text-[#0aad0a]"></i>
                  </button>

                  {showUserData && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-3 w-80 rounded-2xl shadow-2xl z-[99999] overflow-hidden ring-1 ring-[#0aad0a]/10 border border-gray-100 dark:border-gray-700"
                      ref={userMenuRef}
                    >
                      {/* الجزء العلوي: بيانات المستخدم */}
                      <div className="p-6 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 dark:from-green-600 dark:via-blue-600 dark:to-purple-700 relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-8 translate-x-8"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

                        <div className="relative flex items-center space-x-4">
                          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-lg text-[#0aad0a] text-2xl font-bold">
                            {userProfile?.name?.charAt(0)?.toUpperCase() ||
                              userOrders[0]?.user?.name
                                ?.charAt(0)
                                ?.toUpperCase() || (
                                <i className="fa-solid fa-user"></i>
                              )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-1">
                              {userProfile?.name ||
                                userOrders[0]?.user?.name ||
                                "No Name"}
                            </h3>
                            <div className="space-y-1">
                              <p className="text-sm text-white/80 flex items-center">
                                <i className="fa-solid fa-envelope mr-2 text-yellow-300"></i>
                                {userProfile?.email ||
                                  userOrders[0]?.user?.email ||
                                  "No Email"}
                              </p>
                              <p className="text-sm text-white/80 flex items-center">
                                <i className="fa-solid fa-user-tag mr-2 text-blue-300"></i>
                                {userProfile?.role ||
                                  userOrders[0]?.user?.role ||
                                  "User"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* فاصل بسيط */}
                      <div className="h-1 w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 dark:from-green-600 dark:via-blue-600 dark:to-purple-700"></div>
                      {/* الجزء السفلي: الأزرار */}
                      <div className="flex flex-col gap-3 p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
                        <Link
                          to="/Profile"
                          className="w-full text-center py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          onClick={() => setShowUserData(false)}
                        >
                          <i className="fa-solid fa-user text-lg"></i>
                          <span className="font-bold tracking-wide">
                            My Profile
                          </span>
                        </Link>
                        <Link
                          to="/ChangeMyPassword"
                          className="w-full text-center py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          onClick={() => setShowUserData(false)}
                        >
                          <i className="fa-solid fa-key text-lg"></i>
                          <span className="font-bold tracking-wide">
                            Change Password
                          </span>
                        </Link>
                        <button
                          onClick={handelLogout}
                          className="w-full text-center py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <i className="fas fa-sign-out-alt text-lg"></i>
                          <span className="font-bold tracking-wide">
                            Sign Out
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex gap-4 justify-center items-center max-sm:ml-4">
                  <NavLink
                    to="/Login"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/Register"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {Token && (
              <div className="flex flex-col gap-4">
                <NavLink
                  to="/Home"
                  className="py-2 hover:text-[#0aad0a] active"
                >
                  Home
                </NavLink>
                <NavLink to="/Products" className="py-2 hover:text-[#0aad0a]">
                  Products
                </NavLink>
                <NavLink to="/Categories" className="py-2 hover:text-[#0aad0a]">
                  Categories
                </NavLink>
                <NavLink to="/Brands" className="py-2 hover:text-[#0aad0a]">
                  Brands
                </NavLink>
                <NavLink to="/Dashboard" className="py-2 hover:text-[#0aad0a]">
                  Dashboard
                </NavLink>
                <NavLink to="/Profile" className="py-2 hover:text-[#0aad0a]">
                  My Profile
                </NavLink>

                <div className="flex items-center gap-4 justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
                  >
                    {darkMode ? "🌑" : "🌞"}
                  </motion.button>

                  <div className="flex gap-4">
                    <Link to="/wishlist" className="relative">
                      <i className="fa-solid fa-heart text-xl"></i>
                      {numOfWishlist > 0 && (
                        <span className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full text-white bg-[#0aad0a]">
                          {numOfWishlist}
                        </span>
                      )}
                    </Link>
                    <Link to="/cart" className="relative">
                      <i className="fa-solid fa-cart-shopping text-xl"></i>
                      {numOfCartItems > 0 && (
                        <span className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full text-white bg-[#0aad0a]">
                          {numOfCartItems}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-4 justify-center">
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
