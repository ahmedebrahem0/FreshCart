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
  const userMenuRef = useRef(null);
  const userButtonRef = useRef(null);

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
    <nav className="text-gray-800 dark:text-gray-100 bg-[#f0f3f2] dark:bg-gray-900 dark:backdrop-blur shadow-md transition-colors duration-500 border-b-[0.5px] border-white dark:border-gray-700 relative z-[99999]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* ✅ Branding */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-2xl text-gray-700 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              ☰
            </button>
            <img
              src={img}
              alt="FreshCart logo"
              className="h-12 w-auto max-sm:w-[70%]"
            />
          </div>

          {/* ✅ Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {Token && (
              <ul className="flex items-center gap-6 font-medium">
                <li>
                  <NavLink
                    to="/Home"
                    aria-label="Home Page"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl transition-colors duration-200 ${
                        isActive
                          ? "bg-[#0aad0a] text-white hover:text-white shadow-md"
                          : "text-gray-600 hover:text-[#0aad0a]"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Products"
                    aria-label="Browse Products"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl transition-colors duration-200 ${
                        isActive
                          ? "bg-[#0aad0a] text-white hover:text-white shadow-md"
                          : "text-gray-600 hover:text-[#0aad0a]"
                      }`
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Brands"
                    aria-label="Browse Brands"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl transition-colors duration-200 ${
                        isActive
                          ? "bg[#0aad0a] text-white hover:text-white shadow-md"
                          : "text-gray-600 hover:text-[#0aad0a]"
                      }`.replace("bg[#0aad0a]", "bg-[#0aad0a]")
                    }
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Categories"
                    aria-label="Browse Categories"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl transition-colors duration-200 ${
                        isActive
                          ? "bg-[#0aad0a] text-white hover:text-white shadow-md"
                          : "text-gray-600 hover:text-[#0aad0a]"
                      }`
                    }
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Dashboard"
                    aria-label="Dashboard"
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl transition-colors duration-200 ${
                        isActive
                          ? "bg-[#0aad0a] text-white hover:text-white shadow-md"
                          : "text-gray-600 hover:text-[#0aad0a]"
                      }`
                    }
                  >
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
                  type="button"
                  aria-label={
                    darkMode ? "Switch to light mode" : "Switch to dark mode"
                  }
                >
                  {darkMode ? "🌑" : "🌞"}
                </motion.button>

                <Link
                  to="/wishlist"
                  className="relative"
                  aria-label={`Wishlist${
                    numOfWishlist > 0 ? ` (${numOfWishlist} items)` : ""
                  }`}
                  title="Wishlist"
                >
                  <i
                    className="fa-solid fa-heart text-xl text-black dark:text-white"
                    aria-hidden="true"
                  ></i>
                  {numOfWishlist > 0 && (
                    <span
                      className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full text-white bg-[#0aad0a]"
                      aria-hidden="true"
                    >
                      {numOfWishlist}
                    </span>
                  )}
                </Link>

                <Link
                  to="/cart"
                  className="relative"
                  aria-label={`Cart${
                    numOfCartItems > 0 ? ` (${numOfCartItems} items)` : ""
                  }`}
                  title="Cart"
                >
                  <i
                    className="fa-solid fa-cart-shopping text-xl text-black dark:text-white"
                    aria-hidden="true"
                  ></i>
                  {numOfCartItems > 0 && (
                    <span
                      className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full text-white bg-[#0aad0a]"
                      aria-hidden="true"
                    >
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
                    type="button"
                    aria-label={
                      showUserData ? "Close user menu" : "Open user menu"
                    }
                    aria-expanded={showUserData}
                    aria-controls="user-menu"
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                    data-testid="user-menu-button"
                  >
                    <i
                      className="fa-solid fa-user text-[#0aad0a]"
                      aria-hidden="true"
                    ></i>
                  </button>

                  {showUserData && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-3 w-80 rounded-2xl shadow-2xl z-[99999] overflow-hidden ring-1 ring-emerald-500/10 border border-gray-100 dark:border-gray-700"
                      ref={userMenuRef}
                      id="user-menu"
                      role="menu"
                    >
                      {/* ✅ Profile Data */}
                      <div className="p-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-700 relative overflow-hidden">
                        <div className="relative flex items-center space-x-4">
                          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-lg text-emerald-600 text-2xl font-bold">
                            {userProfile?.name?.charAt(0)?.toUpperCase() ||
                              userOrders[0]?.user?.name
                                ?.charAt(0)
                                ?.toUpperCase() || (
                                <i
                                  className="fa-solid fa-user"
                                  aria-hidden="true"
                                ></i>
                              )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-1">
                              {userProfile?.name ||
                                userOrders[0]?.user?.name ||
                                "No Name"}
                            </h3>
                            <div className="space-y-1">
                              <p className="text-sm text-white/90 flex items-center">
                                <i
                                  className="fa-solid fa-envelope mr-2 text-yellow-300"
                                  aria-hidden="true"
                                ></i>
                                {userProfile?.email ||
                                  userOrders[0]?.user?.email ||
                                  "No Email"}
                              </p>
                              <p className="text-sm text-white/90 flex items-center">
                                <i
                                  className="fa-solid fa-user-tag mr-2 text-blue-300"
                                  aria-hidden="true"
                                ></i>
                                {userProfile?.role ||
                                  userOrders[0]?.user?.role ||
                                  "User"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="h-1 w-full bg-gradient-to-r from-green-600 via-blue-600 to-purple-700"></div>

                      {/* ✅ Actions */}
                      <div className="flex flex-col gap-3 p-6 bg-white/95 dark:bg-gray-900/90 backdrop-blur-sm">
                        <Link
                          to="/Profile"
                          className="w-full text-center py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          onClick={() => setShowUserData(false)}
                        >
                          <i
                            className="fa-solid fa-user text-lg"
                            aria-hidden="true"
                          ></i>
                          <span>My Profile</span>
                        </Link>

                        <Link
                          to="/ChangeMyPassword"
                          className="w-full text-center py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          onClick={() => setShowUserData(false)}
                        >
                          <i
                            className="fa-solid fa-key text-lg"
                            aria-hidden="true"
                          ></i>
                          <span>Change Password</span>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full text-center py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          type="button"
                        >
                          <i
                            className="fas fa-sign-out-alt text-lg"
                            aria-hidden="true"
                          ></i>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex gap-4 justify-center items-center max-sm:ml-4">
                  <NavLink
                    to="/Login"
                    className={({ isActive }) =>
                      `px-3 py-1 rounded-lg ${
                        isActive
                          ? "bg-[#0aad0a] text-white hover:text-white shadow"
                          : "hover:text-[#0aad0a]"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/Register"
                    className={({ isActive }) =>
                      `px-3 py-1 rounded-lg ${
                        isActive
                          ? "bg-[#0aad0a] text-white hover:text-white shadow"
                          : "hover:text-[#0aad0a]"
                      }`
                    }
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden mt-4 pb-4">
            {Token && (
              <div className="flex flex-col gap-4">
                <NavLink
                  to="/Home"
                  aria-label="Home Page"
                  className={({ isActive }) =>
                    `py-2 px-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-[#0aad0a] text-white hover:text-white shadow"
                        : "text-gray-700 hover:text-[#0aad0a]"
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/Products"
                  aria-label="Browse Products"
                  className={({ isActive }) =>
                    `py-2 px-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-[#0aad0a] text-white hover:text-white shadow"
                        : "text-gray-700 hover:text-[#0aad0a]"
                    }`
                  }
                >
                  Products
                </NavLink>
                <NavLink
                  to="/Categories"
                  aria-label="Browse Categories"
                  className={({ isActive }) =>
                    `py-2 px-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-[#0aad0a] text-white hover:text-white shadow"
                        : "text-gray-700 hover:text-[#0aad0a]"
                    }`
                  }
                >
                  Categories
                </NavLink>
                <NavLink
                  to="/Brands"
                  aria-label="Browse Brands"
                  className={({ isActive }) =>
                    `py-2 px-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-[#0aad0a] text-white hover:text-white shadow"
                        : "text-gray-700 hover:text-[#0aad0aad0a]"
                    }`.replace("#0aad0aad0a", "#0aad0a")
                  }
                >
                  Brands
                </NavLink>
                <NavLink
                  to="/Dashboard"
                  aria-label="Dashboard"
                  className={({ isActive }) =>
                    `py-2 px-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-[#0aad0a] text-white hover:text-white shadow"
                        : "text-gray-700 hover:text-[#0aad0a]"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/Profile"
                  aria-label="My Profile"
                  className={({ isActive }) =>
                    `py-2 px-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "bg-[#0aad0a] text-white hover:text-white shadow"
                        : "text-gray-700 hover:text-[#0aad0a]"
                    }`
                  }
                >
                  My Profile
                </NavLink>
              </div>
            )}

            <div className="mt-4 flex gap-4 justify-center">
              <a
                href="#"
                className="text-2xl"
                aria-label="Instagram"
                title="Instagram"
              >
                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
              </a>
              <a
                href="#"
                className="text-2xl"
                aria-label="Facebook"
                title="Facebook"
              >
                <i className="fa-brands fa-facebook" aria-hidden="true"></i>
              </a>
              <a
                href="#"
                className="text-2xl"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
              </a>
              <a
                href="#"
                className="text-2xl"
                aria-label="Twitter"
                title="Twitter"
              >
                <i className="fa-brands fa-twitter" aria-hidden="true"></i>
              </a>
              <a
                href="#"
                className="text-2xl"
                aria-label="YouTube"
                title="YouTube"
              >
                <i className="fa-brands fa-youtube" aria-hidden="true"></i>
              </a>
              <a
                href="#"
                className="text-2xl"
                aria-label="TikTok"
                title="TikTok"
              >
                <i className="fa-brands fa-tiktok" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
