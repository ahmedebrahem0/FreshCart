import React from "react";
import { Link } from "react-router-dom";
import amazon from "../assets/images/amazon.webp";
import amirecan from "../assets/images/AMERICAN.webp";
import master from "../assets/images/master.webp";
import paypal from "../assets/images/paypal.webp";
import App_Store from "../assets/images/App_Store_Badge.svg.webp";
import Play_Store from "../assets/images/Google_Play_Store_badge_EN.svg.webp";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-gradient-to-br from-[#e8fbe8] via-[#f0f3f2] to-[#b2f2bb] dark:bg-[#020617] dark:bg-gradient-to-br dark:from-[#020617] dark:via-[#020617] dark:to-[#020617] text-[#222] dark:text-gray-200 border-t border-[#0aad0a]/10 dark:border-gray-800 pt-10 pb-3 shadow-inner"
    >
      <div className="container mx-auto px-4">
        {/* GRID MAIN CONTENT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* About Us */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-[#0aad0a] flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0aad0a]/10 text-[#0aad0a] text-xs">
                <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
              </span>
              <span>About FreshCart</span>
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              FreshCart is your one-stop shop for groceries, top brands, and
              fast delivery. Enjoy a seamless shopping experience with secure
              payment and exclusive offers.
            </p>

            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                Follow us
              </p>
              <div className="flex gap-3">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://www.facebook.com/ahmed.hema.37266136/"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 dark:bg-gray-900 shadow-sm hover:shadow-md text-[#1877F2] transition-all"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <i className="fa-brands fa-facebook" aria-hidden="true"></i>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 dark:bg-gray-900 shadow-sm hover:shadow-md text-[#E1306C] transition-all"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <i className="fa-brands fa-instagram" aria-hidden="true"></i>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 dark:bg-gray-900 shadow-sm hover:shadow-md text-[#1DA1F2] transition-all"
                  aria-label="Twitter"
                  title="Twitter"
                >
                  <i className="fa-brands fa-twitter" aria-hidden="true"></i>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1, y: -2, cursor: "pointer" }}
                  href="https://www.linkedin.com/in/ahmedebrahem/"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 dark:bg-gray-900 shadow-sm hover:shadow-md text-[#0A66C2] transition-all"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 dark:bg-gray-900 shadow-sm hover:shadow-md text-[#FF0000] transition-all"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <i className="fa-brands fa-youtube" aria-hidden="true"></i>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-[#0aad0a] mb-3 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0aad0a]/10 text-[#0aad0a] text-xs">
                <i className="fa-solid fa-link" aria-hidden="true" />
              </span>
              <span>Quick Links</span>
            </h4>
            <ul className="space-y-1.5 text-sm">
              {[
                { to: "/Home", label: "Home" },
                { to: "/Products", label: "Products" },
                { to: "/Categories", label: "Categories" },
                { to: "/Brands", label: "Brands" },
                { to: "/Cart", label: "Cart" },
                { to: "/Wishlist", label: "Wishlist" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group flex items-center justify-between px-2 py-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-[#0aad0a] hover:bg-white/40 dark:hover:bg-gray-800/70 transition-all duration-200"
                  >
                    <span>{item.label}</span>
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-xs">
                      <i
                        className="fa-solid fa-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold text-[#0aad0a] mb-3 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0aad0a]/10 text-[#0aad0a] text-xs">
                <i className="fa-solid fa-headset" aria-hidden="true" />
              </span>
              <span>Customer Service</span>
            </h4>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link
                  to="/allOrders"
                  className="group flex items-center justify-between px-2 py-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-[#0aad0a] hover:bg-white/40 dark:hover:bg-gray-800/70 transition-all duration-200"
                >
                  <span>My Orders</span>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-xs">
                    <i
                      className="fa-solid fa-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/Dashboard"
                  className="group flex items-center justify-between px-2 py-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-[#0aad0a] hover:bg-white/40 dark:hover:bg-gray-800/70 transition-all duration-200"
                >
                  <span>Dashboard</span>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-xs">
                    <i
                      className="fa-solid fa-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/Login"
                  className="group flex items-center justify-between px-2 py-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-[#0aad0a] hover:bg-white/40 dark:hover:bg-gray-800/70 transition-all duration-200"
                >
                  <span>Login</span>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-xs">
                    <i
                      className="fa-solid fa-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/Register"
                  className="group flex items-center justify-between px-2 py-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-[#0aad0a] hover:bg-white/40 dark:hover:bg-gray-800/70 transition-all duration-200"
                >
                  <span>Register</span>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-xs">
                    <i
                      className="fa-solid fa-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/ForgetPassword"
                  className="group flex items-center justify-between px-2 py-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-[#0aad0a] hover:bg-white/40 dark:hover:bg-gray-800/70 transition-all duration-200"
                >
                  <span>Forgot Password</span>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-xs">
                    <i
                      className="fa-solid fa-arrow-right"
                      aria-hidden="true"
                    ></i>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="text-lg font-bold text-[#0aad0a] mb-3 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0aad0a]/10 text-[#0aad0a] text-xs">
                <i className="fa-solid fa-credit-card" aria-hidden="true" />
              </span>
              <span>Payment Methods</span>
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              We support secure payments through trusted global providers.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[amazon, amirecan, master, paypal].map((src, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center rounded-xl bg-white/90 dark:bg-gray-900/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all p-2 dark:-zinc-100"
                >
                  <img
                    src={src}
                    alt="payment method"
                    className="w-16 h-8 object-contain"
                    loading="lazy"
                    decoding="async"
                    fetchpriority="low"
                    width="64"
                    height="32"
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Download App */}
          <div>
            <h4 className="text-lg font-bold text-[#0aad0a] mb-3 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0aad0a]/10 text-[#0aad0a] text-xs">
                <i className="fa-solid fa-mobile-screen" aria-hidden="true" />
              </span>
              <span>Get The App</span>
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Download FreshCart on your phone for the fastest and smoothest
              shopping experience.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              <a href="#">
                <motion.img
                  whileHover={{ scale: 1.05, y: -1 }}
                  src={App_Store}
                  alt="App Store"
                  className="w-32 rounded-lg shadow-sm hover:shadow-md transition-all"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  width="128"
                  height="40"
                  draggable="false"
                />
              </a>
              <a href="#">
                <motion.img
                  whileHover={{ scale: 1.05, y: -1 }}
                  src={Play_Store}
                  alt="Play Store"
                  className="w-32 rounded-lg shadow-sm hover:shadow-md transition-all"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  width="128"
                  height="40"
                  draggable="false"
                />
              </a>
            </div>

            <form className="mt-2 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <i className="fa-solid fa-envelope text-xs" />
                </span>
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full rounded bg-white dark:bg-gray-900 pl-9 pr-3 py-2 text-sm text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-[#0aad0a]"
                />
              </div>
              <button
                type="submit"
                className="py-2 px-4 bg-[#0aad0a] text-white rounded-md hover:bg-[#099409] transition-colors font-semibold text-sm shadow-sm hover:shadow-md whitespace-nowrap"
              >
                Share App Link
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-[#0aad0a]/10 dark:border-gray-800 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold">FreshCart</span>. All rights
            reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="hidden sm:inline">Secure & trusted checkout</span>
            <span className="flex items-center gap-1 text-[#0aad0a]">
              <i className="fa-solid fa-lock" aria-hidden="true" />
              <span>SSL Protected</span>
            </span>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
