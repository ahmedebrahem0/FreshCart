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
      className="bg-gradient-to-br from-[#e8fbe8] via-[#f0f3f2] to-[#b2f2bb] dark:bg-[#0f172a] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#0f172a] dark:to-[#0f172a] dark:shadow-gray-800 text-[#222] dark:text-gray-200 border-t border-[#0aad0a]/10 dark:border-gray-700 pt-10 pb-2 px-0  shadow-inner"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* About Us */}
        <div>
          <h4 className="text-lg font-bold text-[#0aad0a] mb-3">
            About FreshCart
          </h4>
          <p className="text-sm mb-4">
            FreshCart is your one-stop shop for fresh groceries, top brands, and
            fast delivery. Enjoy a seamless shopping experience with secure
            payment and exclusive offers.
          </p>
          <div className="flex gap-3 mt-2">
            <motion.a
              whileHover={{ scale: 1.2, color: "#0aad0a" }}
              href="#"
              className="text-2xl transition-colors"
              aria-label="Facebook"
              title="Facebook"
            >
              <i className="fa-brands fa-facebook" aria-hidden="true"></i>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, color: "#0aad0a" }}
              href="#"
              className="text-2xl transition-colors"
              aria-label="Instagram"
              title="Instagram"
            >
              <i className="fa-brands fa-instagram" aria-hidden="true"></i>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, color: "#0aad0a" }}
              href="#"
              className="text-2xl transition-colors"
              aria-label="Twitter"
              title="Twitter"
            >
              <i className="fa-brands fa-twitter" aria-hidden="true"></i>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, color: "#0aad0a" }}
              href="#"
              className="text-2xl transition-colors"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, color: "#0aad0a" }}
              href="#"
              className="text-2xl transition-colors"
              aria-label="YouTube"
              title="YouTube"
            >
              <i className="fa-brands fa-youtube" aria-hidden="true"></i>
            </motion.a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold text-[#0aad0a] mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/Home"
                className="hover:text-[#0aad0a] transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Products"
                className="hover:text-[#0aad0a] transition-colors"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/Categories"
                className="hover:text-[#0aad0a] transition-colors"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                to="/Brands"
                className="hover:text-[#0aad0a] transition-colors"
              >
                Brands
              </Link>
            </li>
            <li>
              <Link
                to="/Cart"
                className="hover:text-[#0aad0a] transition-colors"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/Wishlist"
                className="hover:text-[#0aad0a] transition-colors"
              >
                Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-lg font-bold text-[#0aad0a] mb-3">
            Customer Service
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/allOrders"
                className="hover:text-[#0aad0a] transition-colors"
              >
                My Orders
              </Link>
            </li>
            <li>
              <Link
                to="/Dashboard"
                className="hover:text-[#0aad0a] transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/Login"
                className="hover:text-[#0aad0a] transition-colors"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/Register"
                className="hover:text-[#0aad0a] transition-colors"
              >
                Register
              </Link>
            </li>
            <li>
              <Link
                to="/ForgetPassword"
                className="hover:text-[#0aad0a] transition-colors"
              >
                Forgot Password
              </Link>
            </li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div>
          <h4 className="text-lg font-bold text-[#0aad0a] mb-3">
            Payment Methods
          </h4>
          <div className="flex flex-wrap  justify-center flex-col gap-2 items-start">
            <img
              src={amazon}
              alt="amazon"
              className="w-20 h-10 object-contain rounded shadow"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              width="80"
              height="40"
              draggable="false"
            />
            <img
              src={amirecan}
              alt="american"
              className="w-20 h-10 object-contain rounded shadow"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              width="80"
              height="40"
              draggable="false"
            />
            <img
              src={master}
              alt="master"
              className="w-20 h-10 object-contain rounded shadow"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              width="80"
              height="40"
              draggable="false"
            />
            <img
              src={paypal}
              alt="paypal"
              className="w-20 h-10 object-contain rounded shadow"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              width="80"
              height="40"
              draggable="false"
            />
          </div>
        </div>

        {/* Download App */}
        <div>
          <h4 className="text-lg font-bold text-[#0aad0a] mb-3">Get The App</h4>
          <p className="text-sm mb-2">
            Download FreshCart on your phone for the best experience.
          </p>
          <div className="flex gap-2">
            <a href="#">
              <img
                src={App_Store}
                alt="App Store"
                className="w-28 hover:scale-105 transition-transform"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                width="112"
                height="40"
                draggable="false"
              />
            </a>
            <a href="#">
              <img
                src={Play_Store}
                alt="Play Store"
                className="w-28 hover:scale-105 transition-transform"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
                width="112"
                height="40"
                draggable="false"
              />
            </a>
          </div>

          <form className="mt-4 flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email..."
              className="rounded bg-white dark:bg-gray-800 px-3 py-2 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-[#0aad0a]"
            />
            <button
              type="submit"
              className="py-2 bg-[#0aad0a] text-white rounded hover:bg-[#099409] transition-colors font-semibold"
            >
              Share App Link
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 border-t border-[#0aad0a]/10 pt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} FreshCart. All rights reserved.
      </div>
    </motion.footer>
  );
}
