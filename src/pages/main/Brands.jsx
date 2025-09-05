import React from "react";
import { useQuery } from "react-query";
import { productService } from "../../services";

export default function Brands() {
  const { data, isError, isLoading } = useQuery({
    queryKey: "brands",
    queryFn: productService.getAllBrands,
  });

  function SkeletonCard() {
    return (
      <div className="brand bg-gray-200 animate-pulse p-4 rounded-lg shadow-md">
        <div className="w-full h-60 bg-gray-300 rounded-md mb-3"></div>
        <h6 className="w-1/2 h-4 bg-gray-300 mx-auto rounded"></h6>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container w-[90%] mx-auto my-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <SkeletonCard key={index} />
            ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <h1 className="text-center text-red-600 my-8">Error fetching brands</h1>
    );
  }

  const brands = data?.data?.data || [];

  return (
    <div className="dark:bg-gray-900 min-h-screen py-8 ">
      <div className="container w-[90%] mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="brand bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out group overflow-hidden"
            >
              {console.log(brand)}
              <div className="relative overflow-hidden">
                {/* طبقة التدرج اللوني */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent dark:from-gray-800/50 dark:to-transparent z-10"></div>
                {/* إطار حول الصورة */}
                <div className="absolute inset-0 border-4 border-white/20 dark:border-gray-800/20 rounded-md"></div>
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-60 object-cover rounded-md transform group-hover:rotate-2 group-hover:scale-110 transition-all duration-300 ease-in-out"
                  loading="lazy" // تحسين أداء التحميل
                />
              </div>
              <h6 className="text-center text-gray-800 dark:text-white font-semibold text-lg mt-3 group-hover:text-[#0aad0a] transition-colors duration-300">
                {brand.name}
              </h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
