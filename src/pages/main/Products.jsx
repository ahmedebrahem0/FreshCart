import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { animate } from "motion";
import { useScroll, useSpring, motion } from "motion/react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import useProduct from "./../../hooks/useProduct";
import useCategories from "./../../hooks/useCategories";
import useBrands from "./../../hooks/useBrands";
import {
  FaStar,
  FaRegHeart,
  FaShoppingCart,
  FaSearch,
  FaFilter,
  FaEye,
  FaFire,
  FaBox,
  FaCheck,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaTh,
  FaList,
  FaArrowUp,
  FaArrowDown,
  FaSpinner,
  FaTrophy,
  FaClock,
  FaUsers,
  FaPercent,
} from "react-icons/fa";

// Enhanced SkeletonCard Component
function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 animate-pulse">
      <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  isAddingToCart,
  isAddingToWishlist,
  viewMode,
}) {
  const { Token } = useContext(AuthContext);

  const handleAddToCart = () => {
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
    onAddToCart(product._id);
  };

  const handleAddToWishlist = () => {
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
    onAddToWishlist(product._id);
  };

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

  const badgeType = getBadgeType(product);
  const badgeInfo = getBadgeInfo(badgeType);

  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-lg dark:shadow-xl dark:shadow-slate-900/30 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-slate-900/50 transition-all duration-300 overflow-hidden group border dark:border-slate-600/20"
      >
        <div className="flex">
          <div className="relative w-64 aspect-[4/3] flex-shrink-0">
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {badgeInfo && (
              <div
                className={`absolute top-3 left-3 ${badgeInfo.color} ${badgeInfo.textColor} px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1`}
              >
                <badgeInfo.icon className="text-xs" />
                {badgeInfo.text}
              </div>
            )}
            {product.priceAfterDiscount && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                {Math.round(
                  ((product.price - product.priceAfterDiscount) /
                    product.price) *
                    100
                )}
                % OFF
              </div>
            )}
            <div
              className="absolute top-3 right-3 flex flex-col gap-2"
              style={{ top: product.priceAfterDiscount ? "60px" : "12px" }}
            >
              <button
                onClick={handleAddToWishlist}
                disabled={isAddingToWishlist}
                className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
              >
                {isAddingToWishlist ? (
                  <FaSpinner className="animate-spin text-red-500" />
                ) : (
                  <FaRegHeart className="text-red-500 hover:text-red-600" />
                )}
              </button>
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
              >
                {isAddingToCart ? (
                  <FaSpinner className="animate-spin text-green-500" />
                ) : (
                  <FaShoppingCart className="text-green-500 hover:text-green-600" />
                )}
              </button>
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {product.category.name}
                  </span>
                  {product.brand && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {product.brand.name}
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {product.price}{" "}
                  <span className="text-sm font-normal">EGP</span>
                </div>
                {product.priceAfterDiscount && (
                  <div className="text-sm text-gray-500 line-through">
                    {product.priceAfterDiscount} EGP
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(product.ratingsAverage)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  ({product.ratingsQuantity})
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <FaBox />
                  {product.quantity} in stock
                </span>
                <span className="flex items-center gap-1">
                  <FaUsers />
                  {formatSold(product.sold)} sold
                </span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <Link
                to={`/ProductDetails/${product._id}`}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                <FaEye />
                View Details
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  {isAddingToCart ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaShoppingCart />
                  )}
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-lg dark:shadow-xl dark:shadow-slate-900/30 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-slate-900/50 transition-all duration-300 overflow-hidden group border dark:border-slate-600/20"
    >
      <div className="relative">
        <img
          src={product.imageCover}
          alt={product.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {badgeInfo && (
          <div
            className={`absolute top-3 left-3 ${badgeInfo.color} ${badgeInfo.textColor} px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1`}
          >
            <badgeInfo.icon className="text-xs" />
            {badgeInfo.text}
          </div>
        )}

        <div
          className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ top: product.priceAfterDiscount ? "60px" : "12px" }}
        >
          <button
            onClick={handleAddToWishlist}
            disabled={isAddingToWishlist}
            className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          >
            {isAddingToWishlist ? (
              <FaSpinner className="animate-spin text-red-500" />
            ) : (
              <FaRegHeart className="text-red-500 hover:text-red-600" />
            )}
          </button>
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          >
            {isAddingToCart ? (
              <FaSpinner className="animate-spin text-green-500" />
            ) : (
              <FaShoppingCart className="text-green-500 hover:text-green-600" />
            )}
          </button>
        </div>

        {product.priceAfterDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {Math.round(
              ((product.price - product.priceAfterDiscount) / product.price) *
                100
            )}
            % OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            {product.category.name}
          </span>
          <div className="flex items-center gap-1">
            <FaStar className="text-yellow-400 text-sm" />
            <span className="text-sm font-medium dark:text-white">
              {product.ratingsAverage}
            </span>
            <span className="text-xs text-gray-500">
              ({product.ratingsQuantity})
            </span>
          </div>
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 text-sm">
          {product.title}
        </h3>

        {product.brand && (
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Brand: {product.brand.name}
            </span>
            <img
              src={product.brand.image}
              alt={product.brand.name}
              className="w-20 h-10 rounded object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            <div
              className="w-4 h-4 bg-gray-300 rounded flex items-center justify-center text-gray-600 text-xs font-bold"
              style={{ display: "none" }}
            >
              {product.brand.name.charAt(0)}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {product.price} <span className="text-sm font-normal">EGP</span>
            </div>
            {product.priceAfterDiscount && (
              <div className="text-sm text-gray-500 line-through">
                {product.priceAfterDiscount} EGP
              </div>
            )}
          </div>
          <div className="text-right text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <FaBox />
              {product.quantity}
            </div>
            <div className="flex items-center gap-1">
              <FaUsers />
              {formatSold(product.sold)}
            </div>
          </div>
        </div>

        <Link
          to={`/ProductDetails/${product._id}`}
          className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <FaEye />
          View Details
        </Link>
      </div>
    </motion.div>
  );
}

export default function Products() {
  // State management
  const [correct, setCorrect] = useState(null);
  const [heart, setHeart] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const {
    addProduct,
    handelWishlist,
    getUserWishlist,
    addProductToCart,
    addProductToWishlist,
  } = useContext(CartContext);
  const { isError, isLoading, data } = useProduct();
  const { data: categoriesData } = useCategories();
  const { data: brandsData } = useBrands();

  // Optimized scroll progress with throttling to reduce forced reflows
  const { scrollYProgress } = useScroll({
    layoutEffect: false, // Use effect instead of layoutEffect to reduce reflows
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200, // Increased stiffness for faster response
    damping: 30,
    restDelta: 0.001,
  });

  // Data processing
  const products = data?.data?.data || [];
  const categories = categoriesData?.data?.data || [];
  const brands = brandsData?.data?.data || [];

  // Category-Brand mapping
  const categoryBrandMapping = {
    "Men's Fashion": ["Puma", "Jack & Jones", "Adidas", "LC Waikiki"],
    "Women's Fashion": ["Defacto"],
    Electronics: ["Sony", "Canon", "Samsung", "Dell"],
  };

  // Filter brands based on selected category
  const availableBrands = useMemo(() => {
    if (!selectedCategory) {
      // If no category selected, show all brands with product count
      const brandCounts = {};
      products.forEach((product) => {
        if (product.brand) {
          brandCounts[product.brand._id] =
            (brandCounts[product.brand._id] || 0) + 1;
        }
      });

      return brands
        .filter((brand) => brandCounts[brand._id])
        .map((brand) => ({
          ...brand,
          productCount: brandCounts[brand._id],
        }))
        .sort((a, b) => b.productCount - a.productCount);
    } else {
      // Filter brands based on category mapping and show product count
      const categoryName = categories.find(
        (cat) => cat._id === selectedCategory
      )?.name;
      const allowedBrandNames = categoryBrandMapping[categoryName] || [];

      // Get product counts for brands in the selected category
      const brandCounts = {};
      products.forEach((product) => {
        if (product.brand && product.category._id === selectedCategory) {
          brandCounts[product.brand._id] =
            (brandCounts[product.brand._id] || 0) + 1;
        }
      });

      return brands
        .filter((brand) =>
          allowedBrandNames.some((name) =>
            brand.name.toLowerCase().includes(name.toLowerCase())
          )
        )
        .map((brand) => ({
          ...brand,
          productCount: brandCounts[brand._id] || 0,
        }))
        .filter((brand) => brand.productCount > 0) // Only show brands with products
        .sort((a, b) => b.productCount - a.productCount);
    }
  }, [brands, products, selectedCategory, categories]);

  // Filter categories that actually have products with count
  const availableCategories = useMemo(() => {
    const categoryCounts = {};
    products.forEach((product) => {
      categoryCounts[product.category._id] =
        (categoryCounts[product.category._id] || 0) + 1;
    });

    return categories
      .filter((category) => categoryCounts[category._id])
      .map((category) => ({
        ...category,
        productCount: categoryCounts[category._id],
      }))
      .sort((a, b) => b.productCount - a.productCount);
  }, [categories, products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (product.brand &&
            product.brand.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category._id === selectedCategory
      );
    }

    // Brand filter
    if (selectedBrand) {
      filtered = filtered.filter(
        (product) => product.brand && product.brand._id === selectedBrand
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(
        (product) => product.ratingsAverage >= ratingFilter
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
        break;
      case "sold":
        filtered.sort((a, b) => (b.sold || 0) - (a.sold || 0));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return filtered;
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedBrand,
    priceRange,
    ratingFilter,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalCategories = availableCategories.length;
    const totalBrands = availableBrands.length;
    const averagePrice =
      products.reduce((sum, p) => sum + p.price, 0) / totalProducts;
    const averageRating =
      products.reduce((sum, p) => sum + p.ratingsAverage, 0) / totalProducts;
    const totalSold = products.reduce((sum, p) => sum + (p.sold || 0), 0);

    return {
      totalProducts,
      totalCategories,
      totalBrands,
      averagePrice: Math.round(averagePrice),
      averageRating: Math.round(averageRating * 10) / 10,
      totalSold,
    };
  }, [products, availableCategories, availableBrands]);

  // Handlers
  async function handleAddToCart(id) {
    // If cart already contains this product, show info toast instead
    const alreadyInCart = addProductToCart?.some(
      (item) => item.product?._id === id
    );
    if (alreadyInCart) {
      toast.info("Product is already in your cart.");
      return;
    }

    setCorrect(id);
    const response = await addProduct(id);

    if (response.status === true) {
      setTimeout(() => setCorrect(null), 2000);
      toast.success(response.res.data.message);
    } else {
      setCorrect(null);
      toast.error(response.error.response.data.message);
    }
  }

  async function handleAddToWishlist(id) {
    // prevent duplicate wishlist additions
    const alreadyInWishlist = addProductToWishlist?.some((item) => item._id === id);
    if (alreadyInWishlist) {
      toast.info("Product is already in your wishlist.");
      return;
    }

    if (heart === id) return;
    setHeart(id);
    const response = await handelWishlist(id);

    if (response.status === true) {
      const res = await getUserWishlist();
      if (res !== false) {
        toast.success(response.res.data.message);
        setTimeout(() => setHeart(null), 2000);
      }
    } else {
      setHeart(null);
      toast.error(response.error.response.data.message);
    }
  }

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedBrand("");
    setPriceRange([0, 100000]);
    setRatingFilter(0);
    setSortBy("newest");
    setCurrentPage(1);
  };

  // Effects - optimized scroll to top
  useEffect(() => {
    // Scroll to top when component mounts - using instant scroll to avoid forced reflow
    // Use CSS scroll-behavior instead of JS animation for better performance
    window.scrollTo({ top: 0, behavior: "instant" });

    // If smooth scroll is needed, use requestAnimationFrame with throttling
    if (window.scrollY > 0) {
      const duration = 300; // Reduced duration
      const start = window.scrollY;
      const startTime = performance.now();

      const scrollStep = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = start * (1 - easeOut);

        window.scrollTo(0, current);

        if (progress < 1) {
          requestAnimationFrame(scrollStep);
        }
      };

      requestAnimationFrame(scrollStep);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => setIsFetching(false), 1000);
    }
  }, [isLoading]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    priceRange,
    ratingFilter,
    sortBy,
  ]);

  // Reset brand selection when category changes
  useEffect(() => {
    setSelectedBrand("");
  }, [selectedCategory]);

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTimes className="text-red-500 text-5xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error Loading Products
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Something went wrong while loading the products. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Progress bar - optimized with will-change */}
      <motion.div
        className="progress-bar fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
        style={{
          scaleX,
          willChange: "transform", // Hint browser to optimize
          transformOrigin: "0%",
        }}
      />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Products
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover amazing products with the best prices
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <div className="text-sm text-white/80">Products</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">
                  {stats.totalCategories}
                </div>
                <div className="text-sm text-white/80">Categories</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{stats.totalBrands}</div>
                <div className="text-sm text-white/80">Brands</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{stats.averagePrice}</div>
                <div className="text-sm text-white/80">Avg Price</div>
              </div>
              <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-2xl font-bold">{stats.averageRating}</div>
                <div className="text-sm text-white/80">Avg Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-slate-900/50 p-6 mb-8 border dark:border-slate-600/30"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products... (English only)"
                value={searchTerm}
                onChange={(e) => {
                  // Only allow English characters, numbers, and spaces
                  const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
                  setSearchTerm(value);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors duration-200 flex items-center gap-2"
            >
              <FaFilter />
              Filters
              {showFilters ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {/* View Mode */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <FaTh />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <FaList />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">All Categories</option>
                    {availableCategories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name} ({category.productCount})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Brand
                  </label>

                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">All Brands</option>
                    {availableBrands.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.name} ({brand.productCount})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price Range: {priceRange[0]} - {priceRange[1]} EGP
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([
                          parseInt(e.target.value) || 0,
                          priceRange[1],
                        ])
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([
                          priceRange[0],
                          parseInt(e.target.value) || 100000,
                        ])
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    value={ratingFilter}
                    onChange={(e) =>
                      setRatingFilter(parseFloat(e.target.value))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value={0}>All Ratings</option>
                    <option value={4}>4+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  Clear All Filters
                </button>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredProducts.length} products found
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Sort and Results */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
              {filteredProducts.length} products
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="sold">Most Sold</option>
            </select>
          </div>
        </div>

        {/* Products Grid/List */}
        {isFetching ? (
          <div
            className={`grid gap-6 ${
              viewMode === "list"
                ? "grid-cols-1"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {Array(12)
              .fill(0)
              .map((_, index) => (
                <SkeletonCard key={index} />
              ))}
          </div>
        ) : paginatedProducts.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === "list"
                ? "grid-cols-1"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                isAddingToCart={correct === product._id}
                isAddingToWishlist={heart === product._id}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-gray-400 text-5xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Products Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <FaArrowUp className="rotate-90" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <FaArrowDown className="rotate-90" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
