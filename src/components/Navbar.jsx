import React, { useContext, useEffect, useState, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
import { motion } from "framer-motion";
import img from "../assets/images/freshcart-logo.svg";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { Token, setToken, decodedToken } = useContext(AuthContext);
  const { numOfCartItems, numOfWishlist, setNumOfWishlist } =
    useContext(CartContext);

  const [showUserData, setShowUserData] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const navigate = useNavigate();
  const userMenuRef = useRef();
  const userButtonRef = useRef();

  const isDev = import.meta.env.DEV;
  const fetchedRef = useRef(false);
  const profileAbortRef = useRef(null);
  const ordersAbortRef = useRef(null);

  // 🌙 Dark Mode Persistence
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // 🧠 Fetch Profile + Orders (once when token exists)
  useEffect(() => {
    const tokenLocal = localStorage.getItem("tkn");
    const authToken = Token || tokenLocal;

    if (!authToken) {
      setUserProfile(null);
      setUserOrders([]);
      localStorage.removeItem("userProfile");
      fetchedRef.current = false;
      return;
    }

    if (fetchedRef.current) return;
    fetchedRef.current = true;

    // ✅ Load cached user profile first
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) {
      try {
        setUserProfile(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("userProfile");
      }
    }

    const profileCtrl = new AbortController();
    const ordersCtrl = new AbortController();
    profileAbortRef.current = profileCtrl;
    ordersAbortRef.current = ordersCtrl;

    // ✅ Fetch profile
    api
      .get("/users/profile", { signal: profileCtrl.signal })
      .then((res) => {
        const profile = res?.data?.data;
        if (profile) {
          setUserProfile(profile);
          localStorage.setItem("userProfile", JSON.stringify(profile));
        }
      })
      .catch((err) => {
        if (isDev) console.warn("Profile fetch failed:", err?.message);
        if (err?.response?.status === 401) {
          localStorage.removeItem("tkn");
          localStorage.removeItem("userProfile");
          setToken(null);
        }
      });

    // ✅ Fetch orders
    if (decodedToken?.id) {
      api
        .get(`/orders/user/${decodedToken.id}`, {
          signal: ordersCtrl.signal,
        })
        .then((res) => setUserOrders(res?.data || []))
        .catch((err) => {
          if (isDev) console.warn("Orders fetch failed:", err?.message);
          if (err?.response?.status === 401) {
            localStorage.removeItem("tkn");
            localStorage.removeItem("userProfile");
            setToken(null);
          }
        });
    }

    return () => {
      try {
        profileCtrl.abort();
        ordersCtrl.abort();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Token ? 1 : 0, decodedToken?.id || 0]);

  // 🔐 Close profile menu on click outside
  useEffect(() => {
    if (!showUserData) return;
    function close(e) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(e.target)
      ) {
        setShowUserData(false);
      }
    }
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [showUserData]);

  // 🚪 Logout
  function handleLogout() {
    localStorage.removeItem("tkn");
    localStorage.removeItem("userProfile");
    setToken(null);
    setDarkMode(false);
    setNumOfWishlist(0);
    toast.success("You are welcome anytime", {
      position: "top-left",
    });
    navigate("/login");
  }

  return (
    <nav className="text-[#909090] bg-[#f0f3f2] dark:bg-gray-900 dark:backdrop-blur shadow-md transition-colors duration-500 border-b-[0.5px] border-white dark:border-gray-700 relative z-[99999]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* ✅ Branding */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-2xl text-gray-600 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
            <img src={img} alt="logo" className="h-12 w-auto max-sm:w-[70%]" />
          </div>

          {/* ✅ Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {Token && (
              <ul className="flex items-center gap-6">
                <li>
                  <NavLink to="/Home" className="hover:text-[#0aad0a]">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Products" className="hover:text-[#0aad0a]">
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Brands" className="hover:text-[#0aad0a]">
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Categories" className="hover:text-[#0aad0a]">
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/Dashboard" className="hover:text-[#0aad0a]">
                    Dashboard
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* ✅ User + icons */}
          <div className="flex items-center gap-4 max-lg:ml-4">
            {Token && (
              <div className="hidden md:flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
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
              </div>
            )}

            {/* ✅ Profile Menu */}
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
                      transition={{
                        duration: 0.22,
                        ease: "easeOut",
                      }}
                      className="absolute right-0 top-full mt-3 w-80 rounded-2xl shadow-2xl z-[99999] overflow-hidden ring-1 ring-[#0aad0a]/10 border border-gray-100 dark:border-gray-700"
                      ref={userMenuRef}
                    >
                      {/* ✅ Profile Data */}
                      <div className="p-6 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 dark:from-green-600 dark:via-blue-600 dark:to-purple-700 relative overflow-hidden">
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

                      <div className="h-1 w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-600"></div>

                      {/* ✅ Actions */}
                      <div className="flex flex-col gap-3 p-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
                        <Link
                          to="/Profile"
                          className="w-full text-center py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          onClick={() => setShowUserData(false)}
                        >
                          <i className="fa-solid fa-user text-lg"></i>
                          <span>My Profile</span>
                        </Link>

                        <Link
                          to="/ChangeMyPassword"
                          className="w-full text-center py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          onClick={() => setShowUserData(false)}
                        >
                          <i className="fa-solid fa-key text-lg"></i>
                          <span>Change Password</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full text-center py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <i className="fas fa-sign-out-alt text-lg"></i>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex gap-4 justify-center items-center max-sm:ml-4">
                  <NavLink to="/Login" className="hover:text-[#0aad0a]">
                    Login
                  </NavLink>
                  <NavLink to="/Register" className="hover:text-[#0aad0a]">
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {Token && (
              <div className="flex flex-col gap-4">
                <NavLink to="/Home" className="py-2 hover:text-[#0aad0a]">
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
