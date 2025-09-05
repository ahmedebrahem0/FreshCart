import React, { useContext, useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { productService } from "../../services";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import LoadingAuth from "../../components/LoadingAuth";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import { motion } from "motion/react";
import {
  FaStar,
  FaRegHeart,
  FaShoppingCart,
  FaArrowLeft,
  FaBox,
  FaUsers,
  FaFire,
  FaTrophy,
  FaClock,
  FaPercent,
  FaSpinner,
  FaCheck,
  FaTimes,
  FaShare,
  FaHeart,
} from "react-icons/fa";

export default function ProductDetails() {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const sliderRef = useRef(null);

  const {
    addProduct,
    handelWishlist,
    getUserWishlist,
    cartItems,
    wishlistItems,
  } = useContext(CartContext);
  const { Token } = useContext(AuthContext);

  const { id } = useParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: () => productService.getProductById(id),
  });

  // Check if product is already in cart or wishlist
  useEffect(() => {
    if (data?.data?.data && cartItems) {
      const productInCart = cartItems.some((item) => item.product._id === id);
      setIsInCart(productInCart);
    }
  }, [data, cartItems, id]);

  useEffect(() => {
    if (data?.data?.data && wishlistItems) {
      const productInWishlist = wishlistItems.some((item) => item._id === id);
      setIsInWishlist(productInWishlist);
    }
  }, [data, wishlistItems, id]);

  // Helper functions
  const formatSold = (sold) => {
    if (!sold) return "New";
    if (sold > 1000000) return `${(sold / 1000000).toFixed(1)}M+`;
    if (sold > 1000) return `${(sold / 1000).toFixed(1)}K+`;
    return sold.toString();
  };

  const getBadgeType = (product) => {
    if (product.priceAfterDiscount) return "sale";
    if (product.ratingsAverage >= 4.5) return "top-rated";
    if (product.sold > 1000) return "bestseller";
    if (product.quantity < 10) return "limited";
    return null;
  };

  const getBadgeInfo = (type) => {
    switch (type) {
      case "sale":
        return {
          icon: FaPercent,
          text: "Sale",
          color: "bg-red-500",
          textColor: "text-white",
        };
      case "top-rated":
        return {
          icon: FaTrophy,
          text: "Top Rated",
          color: "bg-yellow-500",
          textColor: "text-white",
        };
      case "bestseller":
        return {
          icon: FaFire,
          text: "Bestseller",
          color: "bg-orange-500",
          textColor: "text-white",
        };
      case "limited":
        return {
          icon: FaClock,
          text: "Limited",
          color: "bg-purple-500",
          textColor: "text-white",
        };
      default:
        return null;
    }
  };

  // Handlers
  const handleAddToCart = async () => {
    if (!Token) {
      toast.info("Please login to add items to cart", {
        position: "top-center",
        style: { top: "80px", zIndex: 9999 },
      });
      setTimeout(() => {
        window.location.href = "/Login";
      }, 2000);
      return;
    }

    if (isInCart) {
      toast.info("This product is already in your cart", {
        position: "top-center",
        style: { top: "80px", zIndex: 9999 },
      });
      return;
    }

    setIsAddingToCart(true);
    const response = await addProduct(id);

    if (response.status === true) {
      toast.success(response.res.data.message);
      setIsInCart(true);
    } else {
      toast.error(response.error.response.data.message);
    }
    setIsAddingToCart(false);
  };

  const handleAddToWishlist = async () => {
    if (!Token) {
      toast.info("Please login to add items to wishlist", {
        position: "top-center",
        style: { top: "80px", zIndex: 9999 },
      });
      setTimeout(() => {
        window.location.href = "/Login";
      }, 2000);
      return;
    }

    if (isInWishlist) {
      toast.info("This product is already in your wishlist", {
        position: "top-center",
        style: { top: "80px", zIndex: 9999 },
      });
      return;
    }

    setIsAddingToWishlist(true);
    const response = await handelWishlist(id);

    if (response.status === true) {
      const res = await getUserWishlist();
      if (res === false) {
        toast.success(response.res.data.message);
        setIsInWishlist(true);
      }
    } else {
      toast.error(response.error.response.data.message);
    }
    setIsAddingToWishlist(false);
  };

  // Function to handle thumbnail click
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
    beforeChange: (current, next) => setCurrentImageIndex(next),
    ref: sliderRef,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTimes className="text-red-500 text-5xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error Loading Product
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Something went wrong while loading the product details.
          </p>
          <Link
            to="/Products"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const product = data?.data?.data;
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h2>
          <Link
            to="/Products"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const badgeType = getBadgeType(product);
  const badgeInfo = getBadgeInfo(badgeType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          to="/Products"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg mb-6"
        >
          <FaArrowLeft />
          Back to Products
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div className="space-y-10">
              {/* Main Image Slider */}
              <div className="relative">
                <Slider {...sliderSettings}>
                  {product.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`${product.title} - Image ${index + 1}`}
                        className="w-full h-96 lg:h-[500px] object-cover rounded-xl"
                      />
                      {badgeInfo && index === currentImageIndex && (
                        <div
                          className={`absolute top-4 left-4 ${badgeInfo.color} ${badgeInfo.textColor} px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2`}
                        >
                          <badgeInfo.icon className="text-sm" />
                          {badgeInfo.text}
                        </div>
                      )}
                      {product.priceAfterDiscount &&
                        index === currentImageIndex && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {Math.round(
                              ((product.price - product.priceAfterDiscount) /
                                product.price) *
                                100
                            )}
                            % OFF
                          </div>
                        )}
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`relative overflow-hidden rounded-lg transition-all duration-300 transform  ${
                      currentImageIndex === index
                        ? "ring-4 ring-gradient-to-r from-pink-500 to-purple-600 scale-110 shadow-xl"
                        : "hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-blue-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                    {currentImageIndex === index && (
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Category and Brand */}
              <div className="flex items-center justify-between gap-4">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer">
                  {product.category.name}
                </span>
                {product.brand && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 hover:from-green-200 hover:to-blue-200 dark:hover:from-green-800 dark:hover:to-blue-800 rounded-full transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    <img
                      src={product.brand.image}
                      alt={product.brand.name}
                      className="w-20 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div
                      className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm"
                      style={{ display: "none" }}
                    >
                      {product.brand.name.charAt(0)}
                    </div>
                    {/* <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {product.brand.name}
                    </span> */}
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xl transition-all duration-300 ${
                        i < Math.floor(product.ratingsAverage)
                          ? "text-yellow-400 drop-shadow-lg"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  {product.ratingsAverage}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  ({product.ratingsQuantity} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {product.price} EGP
                  </span>
                  {product.priceAfterDiscount && (
                    <span className="text-2xl text-gray-500 line-through font-medium">
                      {product.priceAfterDiscount} EGP
                    </span>
                  )}
                </div>
                {product.priceAfterDiscount && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold rounded-full">
                    <FaPercent className="text-xs" />
                    You save {product.price - product.priceAfterDiscount} EGP
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description.replace(/\t/g, " • ")}
                </p>
              </div>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                    <FaBox className="text-white text-sm" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      In Stock
                    </div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {product.quantity}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                    <FaUsers className="text-white text-sm" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Sold
                    </div>
                    <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {formatSold(product.sold)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart || isInCart}
                    className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2 ${
                      isInCart
                        ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-green-300 disabled:to-emerald-400 text-white"
                    }`}
                  >
                    {isAddingToCart ? (
                      <FaSpinner className="animate-spin" />
                    ) : isInCart ? (
                      <FaCheck />
                    ) : (
                      <FaShoppingCart />
                    )}
                    {isAddingToCart
                      ? "Adding..."
                      : isInCart
                      ? "In Cart"
                      : "Add to Cart"}
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    disabled={isAddingToWishlist || isInWishlist}
                    className={`px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:scale-100 disabled:shadow-none flex items-center justify-center ${
                      isInWishlist
                        ? "bg-gradient-to-r from-red-500 to-pink-600 text-white cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:from-pink-300 disabled:to-rose-400 text-white"
                    }`}
                  >
                    {isAddingToWishlist ? (
                      <FaSpinner className="animate-spin" />
                    ) : isInWishlist ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>

                <Link
                  to={`/Products`}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <FaShare />
                  see more products
                </Link>
              </div>

              {/* Additional Info */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Product ID
                    </div>
                    <div className="text-sm font-mono text-gray-700 dark:text-gray-300">
                      {product._id}
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                      Created
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    <div className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">
                      Updated
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                      Category
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {product.category.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
