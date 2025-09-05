import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import AuthGuard from "./AuthGuard";

const EnhancedProductCard = ({ product }) => {
  const [correct, setCorrect] = useState(null);
  const [heart, setHeart] = useState(null);
  const { Token } = useContext(AuthContext);
  const {
    addProduct,
    getUserWishlist,
    handelWishlist,
    addProductToCart,
    addProductToWishlist,
  } = useContext(CartContext);

  // فحص إذا كان المنتج في السلة
  function isInCart(productId) {
    return addProductToCart?.some((item) => item.product._id === productId);
  }

  // فحص إذا كان المنتج في المفضلة
  function isInWishlist(productId) {
    return addProductToWishlist?.some((item) => item._id === productId);
  }

  // إضافة للسلة
  async function handelProduct(id) {
    if (!Token) {
      toast.info(
        <div className="flex flex-col items-center p-2">
          <div className="flex items-center gap-3 mb-2">
            <i className="fa-solid fa-cart-shopping text-3xl text-[#0aad0a]"></i>
            <div className="text-left">
              <p className="font-bold text-lg text-white">Login Required</p>
              <p className="text-sm text-green-100">
                Please login to add items to cart
              </p>
            </div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2 mt-2">
            <p className="text-sm text-white font-medium">
              <i className="fa-solid fa-arrow-right mr-2"></i>
              Redirecting to login page...
            </p>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: 4000,
          className: "auth-toast",
        }
      );

      // إعادة التوجيه بعد 2 ثانية
      setTimeout(() => {
        window.location.href = "/Login";
      }, 2000);
      return;
    }

    if (isInCart(id)) {
      toast.info("Product is already in your cart.");
      return;
    }

    const response = await addProduct(id);
    setCorrect(id);

    if (response.status === true) {
      setTimeout(() => {
        setCorrect(null);
      }, 2000);
      toast.success(response.res.data.message);
    } else {
      toast.error(response.error.response.data.message);
    }
  }

  // إضافة للمفضلة
  async function Wishlist(id) {
    if (!Token) {
      toast.info(
        <div className="flex flex-col items-center p-2">
          <div className="flex items-center gap-3 mb-2">
            <i className="fa-solid fa-heart text-3xl text-red-400"></i>
            <div className="text-left">
              <p className="font-bold text-lg text-white">Login Required</p>
              <p className="text-sm text-red-100">
                Please login to add to wishlist
              </p>
            </div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2 mt-2">
            <p className="text-sm text-white font-medium">
              <i className="fa-solid fa-arrow-right mr-2"></i>
              Redirecting to login page...
            </p>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: 4000,
          className: "auth-toast",
        }
      );

      // إعادة التوجيه بعد 2 ثانية
      setTimeout(() => {
        window.location.href = "/Login";
      }, 2000);
      return;
    }

    if (isInWishlist(id)) {
      toast.info("Product is already in your wishlist.");
      return;
    }

    if (heart === id) return;
    setHeart(id);
    const response = await handelWishlist(id);

    if (response.status === true) {
      const res = await getUserWishlist();
      if (res === false) {
        toast.success(response.res.data.message);
        setTimeout(() => {
          setHeart(null);
        }, 2000);
      }
    } else {
      setHeart(null);
      toast.error(response.error.response.data.message);
    }
  }

  return (
    <motion.div
      className="product mb-5 bg-white px-4 pb-2 rounded-lg shadow-md cursor-pointer dark:bg-[#2A3E4B] dark:shadow-gray-800"
      key={product._id}
      initial={{ opacity: 1 }}
      whileHover={{
        scale: 1.05,
        translateY: -5,
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
    >
      <div className="hover:shadow-orange-400 overflow-hidden pt-2 group relative">
        {/* زر إضافة للسلة */}
        <i
          onClick={() => handelProduct(product._id)}
          className={`
             ${
               correct === product._id
                 ? `fa fa-check bg-green-500`
                 : isInCart(product._id)
                 ? `fa-solid fa-cart-shopping bg-[#e63946]`
                 : `fa-solid fa-cart-shopping bg-[#0aad0a]`
             }
             hidden group-hover:flex 
             w-10 h-10 
             text-white 
             p-2 rounded-full shadow-md 
             items-center justify-center 
             absolute top-2 right-2 
             transition-all duration-300 ease-in-out`}
          style={{
            cursor: isInCart(product._id) ? "not-allowed" : "pointer",
          }}
        ></i>

        {/* زر إضافة للمفضلة */}
        <i
          onClick={() => Wishlist(product._id)}
          className={`
             ${
               heart === product._id
                 ? `fa fa-check bg-green-500`
                 : isInWishlist(product._id)
                 ? `fa-solid fa-heart bg-[#e63946]`
                 : `fa-solid fa-heart bg-[#0aad0a]`
             }
             hidden group-hover:flex 
             w-10 h-10 
             text-white 
             p-2 mt-1 rounded-full shadow-md 
             items-center justify-center 
             absolute top-12 right-2
             transition-all duration-300 ease-in-out`}
          style={{
            cursor: isInWishlist(product._id) ? "not-allowed" : "pointer",
          }}
        ></i>

        {/* رابط المنتج */}
        <Link to={`/ProductDetails/${product._id}`}>
          <img
            className="w-full h-[270px] object-cover rounded-md mb-2"
            src={product.imageCover}
            alt={product.title}
          />
          <h6 className="text-[#0aad0a] font-medium">
            {product.category.name}
          </h6>
          <h2 className="font-semibold text-gray-700 dark:text-white">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </h2>
          <div className="flex justify-between items-center mt-2">
            {product.priceAfterDiscount ? (
              <>
                <p className="line-through text-red-600 font-semibold flex items-center mr-2">
                  {product.price}
                  <span className="text-xs ml-1">EGP</span>
                </p>
                <p className="text-[#0aad0a] font-bold flex items-center">
                  {product.priceAfterDiscount}
                  <span className="text-xs ml-1">EGP</span>
                </p>
              </>
            ) : (
              <p className="text-[#0aad0a] font-bold flex items-center">
                {product.price}
                <span className="text-xs ml-1">EGP</span>
              </p>
            )}
            <p>
              <i className="fa-solid fa-star text-yellow-500"></i>
              <span className="dark:text-white ml-1">
                {product.ratingsAverage}
              </span>
            </p>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default EnhancedProductCard;
