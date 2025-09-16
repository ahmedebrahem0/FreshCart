import React, { useContext, useEffect, useState, useMemo } from "react";
import img1 from "../../assets/images/slider-2.jpeg";
import img2 from "../../assets/images/grocery-banner-2.jpeg";
import HomeSlider from "../../components/HomeSlider";
import HomeCategory from "./../../components/HomeCategory";
import EnhancedProductCard from "../../components/EnhancedProductCard";
import LoginPrompt from "../../components/LoginPrompt";
import useProduct from "./../../hooks/useProduct";
import useCategories from "./../../hooks/useCategories";
import useBrands from "./../../hooks/useBrands";
import { Link } from "react-router-dom";
import { animate } from "motion";
import { useScroll, useSpring, motion } from "motion/react";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import {
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaTh,
  FaList,
  FaTimes,
  FaCheck,
  FaStar,
  FaRegHeart,
  FaShoppingCart,
  FaEye,
  FaFire,
  FaBox,
  FaUsers,
  FaPercent,
  FaTrophy,
  FaClock,
  FaSpinner,
} from "react-icons/fa";

// SkeletonCard Component for Loading State
function SkeletonCard() {
  return (
    <div className="product px-2 mb-3 bg-gray-200 animate-pulse rounded-lg shadow-md">
      <div className="w-full h-[270px] bg-gray-300 rounded-md mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
      <div className="flex justify-between items-center mt-2">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
}

// ProductCard Component with List and Grid support
function ProductCard({ product, viewMode }) {
  const { Token } = useContext(AuthContext);
  const { addProduct, handelWishlist } = useContext(CartContext);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

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

    setIsAddingToCart(true);
    const response = await addProduct(product._id);
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

    setIsAddingToWishlist(true);
    const response = await handelWishlist(product._id);
    setIsAddingToWishlist(false);
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
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
      >
        <div className="flex">
          <div className="relative w-64 h-48 flex-shrink-0">
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
                  {product.sold > 1000
                    ? `${(product.sold / 1000).toFixed(1)}k`
                    : product.sold}{" "}
                  sold
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

  // Grid view (default)
  return <EnhancedProductCard product={product} />;
}

export default function Home() {
  const [isFetching, setIsFetching] = useState(true); // حالة تحميل أولية
  const { Token } = useContext(AuthContext);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Advanced filtering states
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

  // Data hooks
  const { isError, isLoading, data } = useProduct();
  const { data: categoriesData } = useCategories();
  const { data: brandsData } = useBrands();

  const products = data?.data?.data || [];
  const categories = categoriesData?.data?.data || [];
  const brands = brandsData?.data?.data || [];

  // Category-Brand mapping
  const categoryBrandMapping = {
    "Men's Fashion": ["Puma", "Jack & Jones", "Adidas", "LC Waikiki"],
    "Women's Fashion": ["Defacto"],
    Electronics: ["Sony", "Canon", "Samsung","Dell"],
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
      // Filter brands based on category mapping
      const categoryName = categories.find(
        (cat) => cat._id === selectedCategory
      )?.name;
      const allowedBrandNames = categoryBrandMapping[categoryName] || [];

      return brands.filter((brand) =>
        allowedBrandNames.some((name) =>
          brand.name.toLowerCase().includes(name.toLowerCase())
        )
      );
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

  const minPrice = useMemo(
    () => Math.min(...products.map((p) => p.price)),
    [products]
  );
  const maxPrice = useMemo(
    () => Math.max(...products.map((p) => p.price)),
    [products]
  );

  // Advanced filtering and sorting
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

  useEffect(() => {
    // Scroll to top when component mounts
    animate(() => window.scrollY, 0, {
      duration: 0.8,
      easing: "ease-out",
      onUpdate: (value) => window.scrollTo(0, value),
    });
  }, []);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedBrand("");
    setPriceRange([0, 100000]);
    setRatingFilter(0);
    setSortBy("newest");
    setCurrentPage(1);
  };

  useEffect(() => {
    // عند انتهاء التحميل، قم بتحديث الحالة
    if (!isLoading) {
      setTimeout(() => setIsFetching(false), 1000); // عرض SkeletonCard لفترة قصيرة
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

  return (
    <>
      {/* Progress bar for scroll */}
      <motion.div
        className="progress-bar fixed top-0 left-0 h-1 bg-blue-500 z-50"
        style={{ scaleX }}
      />
      <div className="dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container w-[90%] mx-auto">
          <div className="pt-3 grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-80 px-2 mb-20">
            {/* Slider Section */}
            <div className="w-full h-60 md:h-80 md:col-span-2 md:mb-30 rounded-md">
              <HomeSlider />
            </div>

            {/* Side Images Section */}
            <div className="w-full h-60 md:h-80 grid gap-4 grid-rows-2 mt-[100px] sm:mt-0">
              <div className="h-full">
                <img
                  className="w-full h-full object-cover rounded-md"
                  src={img1}
                  alt="Image 1"
                />
              </div>
              <div className="h-full">
                <img
                  className="w-full h-full object-cover rounded-md"
                  src={img2}
                  alt="Image 2"
                />
              </div>
            </div>
          </div>
          {/* Login Prompt for Guest Users */}
          {!Token && <LoginPrompt />}

          {/* //Shop Popular Categories */}
          <div className="mt-5">
            <h2 className="text-lg my-1 dark:text-white">
              Shop Popular Categories
            </h2>
            <HomeCategory />
          </div>
          {/* Advanced Search and Filters */}
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
                  className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
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
                          {brand.name}{" "}
                          {brand.productCount ? `(${brand.productCount})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Price Range
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([+e.target.value, priceRange[1]])
                        }
                        placeholder="Min"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="number"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], +e.target.value])
                        }
                        placeholder="Max"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
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
                      <option value={3}>3+ Stars</option>
                      <option value={2}>2+ Stars</option>
                      <option value={1}>1+ Stars</option>
                    </select>
                  </div>
                </div>

                {/* Sort and Reset */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Sort by:
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="sold">Most Popular</option>
                    </select>
                  </div>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <FaTimes />
                    Reset Filters
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div> 
          {/* Products Display */}
          <div className="">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Products ({filteredProducts.length})
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Showing {paginatedProducts.length} of{" "}
                  {filteredProducts.length} products
                </span>
              </div>
            </div>

            <div
              className={`allProduct ${
                viewMode === "grid"
                  ? "grid md:grid-cols-3 lg:grid-cols-6"
                  : "grid grid-cols-1 gap-6"
              } mt-8`}
            >
              {isFetching
                ? Array(12)
                    .fill(0)
                    .map((_, index) => <SkeletonCard key={index} />)
                : paginatedProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 pb-3">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
