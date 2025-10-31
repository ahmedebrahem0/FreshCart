import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPrompt = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-[#0aad0a] to-[#088708] rounded-xl p-6 text-white mb-8 shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-user-plus text-2xl"></i>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Welcome to Fresh Cart!</h3>
            <p className="text-green-100">
              Sign in to enjoy personalized shopping experience
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            to="/Login"
            className="bg-white text-[#0aad0a] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
          >
            <i className="fa-solid fa-sign-in-alt"></i>
            Sign In
          </Link>
          <Link
            to="/Register"
            className="bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors duration-200 flex items-center gap-2 border border-white/30"
          >
            <i className="fa-solid fa-user-plus"></i>
            Sign Up
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPrompt;



