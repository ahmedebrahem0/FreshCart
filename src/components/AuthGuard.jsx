import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const AuthGuard = ({
  children,
  action = "perform this action",
  showToast = true,
}) => {
  const { Token } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuthRequired = () => {
    if (!Token) {
      if (showToast) {
        toast.info(
          <div className="flex flex-col items-center">
            <div className="text-center">
              <i className="fa-solid fa-lock text-2xl text-blue-500 mb-2"></i>
              <p className="font-semibold text-gray-800 dark:text-white">
                Login Required
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Please login to {action}
              </p>
            </div>
          </div>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "auth-toast",
          }
        );
      }

      // إعادة التوجيه بعد ثانيتين
      setTimeout(() => {
        navigate("/Login");
      }, 2000);

      return false;
    }
    return true;
  };

  // إذا كان هناك توكن، اعرض المحتوى
  if (Token) {
    return children;
  }

  // إذا لم يكن هناك توكن، اعرض المحتوى العادي بدون حماية بصرية
  return children;
};

export default AuthGuard;
