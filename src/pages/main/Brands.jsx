import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { productService } from "../../services";
import { FaSearch } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { Card, CardContent } from "../../components/ui/card";

export default function Brands() {
  // Fetch all brands
  const { data, isError, isLoading } = useQuery({
    queryKey: "brands",
    queryFn: productService.getAllBrands,
  });


  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch products by selected brand (if chosen) otherwise none
  const { data: brandProductsData, isLoading: isLoadingProducts } = useQuery(
    ["productsByBrand", selectedBrandId],
    () => productService.getProductsByBrand(selectedBrandId),
    {
      enabled: Boolean(selectedBrandId),
      keepPreviousData: true,
    }
  );

  function SkeletonCard() {
    return (
      <div className="brand bg-gray-200 animate-pulse p-4 rounded-lg shadow-md">
        <div className="w-full h-60 bg-gray-300 rounded-md mb-3"></div>
        <h6 className="w-1/2 h-4 bg-gray-300 mx-auto rounded"></h6>
      </div>
    );
  }

  const brands = data?.data?.data || [];

  // Only show the requested set of well-known brand names if present
  const targetBrandNames = [
    "DeFacto",
    "Adidas",
    "LC Waikiki",
    "Canon",
    "SONY",
    "Jack & Jones",
    "Puma",
    "Dell",
    "Samsung",
  ];

  const topBrands = useMemo(() => {
    if (!brands?.length) return [];
    // Keep order as in targetBrandNames
    const nameToBrand = new Map(
      brands.map((b) => [b.name?.toLowerCase?.() || "", b])
    );
    return targetBrandNames
      .map((name) => nameToBrand.get(name.toLowerCase()))
      .filter(Boolean);
  }, [brands]);

  const products = useMemo(() => {
    const list = brandProductsData?.data?.data || [];
    if (!searchTerm) return list;
    const term = searchTerm.toLowerCase();
    return list.filter(
      (p) =>
        p.title?.toLowerCase?.().includes(term) ||
        p.description?.toLowerCase?.().includes(term)
    );
  }, [brandProductsData, searchTerm]);

  if (isError) {
    return (
      <h1 className="text-center text-red-600 my-8">Error fetching brands</h1>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
      {/* Hero Section with Brand Images Carousel */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-700 dark:via-purple-700 dark:to-indigo-700 text-white py-5">
        <div className="max-w-10xl mx-auto sm:px-6 lg:px-0">
          <div className="text-center mb-5">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Brands</h1>
            <p className="text-xl text-white/90">
              Discover premium brands and their amazing products
            </p>
          </div>

          {/* Brand Images Horizontal Slider */}
          <div className="">
            {/* <h2 className="text-2xl font-semibold  text-center">
              Featured Brands
            </h2> */}
            <div className="slider-container relative">
              <style jsx>{`
                .slider-container::before,
                .slider-container::after {
                  content: "";
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  width: 50px;
                  z-index: 10;
                  pointer-events: none;
                  transition: opacity 0.3s ease;
                }
                .slider-container::before {
                  left: 0;
                  background: linear-gradient(
                    to right,
                    rgba(59, 130, 246, 0.8),
                    transparent
                  );
                  opacity: 0;
                }
                .slider-container::after {
                  right: 0;
                  background: linear-gradient(
                    to left,
                    rgba(147, 51, 234, 0.8),
                    transparent
                  );
                  opacity: 0;
                }
                .slider-container:hover::before,
                .slider-container:hover::after {
                  opacity: 1;
                }
                .slider-container .slick-track {
                  display: flex !important;
                  align-items: center;
                }
                .slider-container .slick-slide {
                  padding: 0 8px;
                }
                .slider-container .slick-list {
                  margin: 0;
                  padding: 0;
                }
              `}</style>
              <Slider
                dots={false}
                infinite={true}
                speed={10000}
                slidesToShow={Math.min(6, topBrands.length)}
                slidesToScroll={1}
                arrows={false}
                autoplay={true}
                // autoplay={false}
                autoplaySpeed={0}
                pauseOnHover={false}
                pauseOnFocus={false}
                cssEase="linear"
                swipeToSlide={true}
                touchMove={true}
                responsive={[
                  {
                    breakpoint: 1024,
                    settings: {
                      slidesToShow: Math.min(4, topBrands.length),
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: Math.min(3, topBrands.length),
                    },
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: Math.min(2, topBrands.length),
                    },
                  },
                ]}
              >
                {topBrands.map((brand) => (
                  <div key={brand._id} className="px-11">
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                      <CardContent className="flex flex-col items-center justify-center p-2">
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-25 h-20 object-contain rounded-lg"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/150x150/cccccc/666666?text=No+Image";
                          }}
                        />
                        {/* <h3 className="text-white font-semibold text-sm text-center">
                          {brand.name}
                        </h3> */}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Brand Selection Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-slate-900/50 p-6 mb-8 border dark:border-slate-600/30">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Select a Brand to View Products
          </h2>

          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4 py-4">
              {topBrands.map((brand) => {
                const active = selectedBrandId === brand._id;
                return (
                  <CarouselItem
                    key={brand._id}
                    className="pl-2 md:pl-4 basis-auto"
                  >
                    <button
                      onClick={() => setSelectedBrandId(brand._id)}
                      className={`brand-button flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-500 whitespace-nowrap transform hover:scale-110 hover:shadow-2xl group ${
                        active
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:border-green-400"
                          : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-600 dark:hover:to-gray-500 hover:border-blue-500 dark:hover:border-purple-500 hover:shadow-blue-500/30 dark:hover:shadow-purple-500/30"
                      }`}
                      title={brand.name}
                    >
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-12 h-8 rounded object-contain group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/48x32/cccccc/666666?text=No+Image";
                        }}
                      />
                      <span className="text-sm font-semibold group-hover:text-blue-600 dark:group-hover:text-purple-400 transition-colors duration-500">
                        {brand.name}
                      </span>
                    </button>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="bg-white dark:bg-gray-700 shadow-lg" />
            <CarouselNext className="bg-white dark:bg-gray-700 shadow-lg" />
          </Carousel>
        </div>

        {/* Search inside brand products */}
        {selectedBrandId && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-slate-900/50 p-6 mb-8 border dark:border-slate-600/30">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-lg font-semibold whitespace-nowrap">
                {isLoadingProducts
                  ? "Loading..."
                  : `${products.length} Products`}
              </div>
            </div>
          </div>
        )}

        {/* All Brands Grid */}
        {!selectedBrandId && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-slate-900/50 p-6 border dark:border-slate-600/30">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              All Available Brands
            </h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
              {(isLoading ? Array(8).fill(null) : brands).map((brand, idx) => (
                <div
                  key={brand?._id || idx}
                  className="brand bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out group overflow-hidden border dark:border-gray-600"
                >
                  {brand ? (
                    <>
                      {/* Brand Image */}
                      <div className="relative overflow-hidden mb-4">
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-full h-32 object-contain rounded-lg group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300x128/cccccc/666666?text=No+Image";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h6 className="text-center text-gray-800 dark:text-white font-bold text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">
                        {brand.name}
                      </h6>
                    </>
                  ) : (
                    <SkeletonCard />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products grid for selected brand */}
        {selectedBrandId && (
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4">
            {(isLoadingProducts ? Array(8).fill({}) : products).map((p, i) => (
              <div
                key={p?._id || i}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg hover:shadow-2xl overflow-hidden group border dark:border-gray-600 transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  {p?.imageCover ? (
                    <img
                      src={p.imageCover}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-500 animate-pulse flex items-center justify-center">
                      <span className="text-gray-400 text-2xl">📦</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-3 min-h-[2.5rem]">
                    {p?.title || "Loading..."}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                      {p?.price ? `${p.price} EGP` : "..."}
                    </span>
                    {p?.ratingsAverage && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-gray-600 dark:text-gray-300 text-sm">
                          {p.ratingsAverage}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
