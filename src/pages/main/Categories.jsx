import React from "react";
import useCategories from "../../hooks/useCategories";

function SkeletonCard() {
  return (
    <div className="brand bg-gray-300 animate-pulse p-4 rounded-lg shadow-lg">
      <div className="w-full h-80 bg-gray-400 rounded-md mb-3"></div>
      <h6 className="w-1/2 h-4 bg-gray-400 mx-auto rounded"></h6>
    </div>
  );
}

export default function Categories() {
  const { data, isLoading, isError } = useCategories();
  const categories = data?.data?.data || [];

  if (isLoading) {
    return (
      <div className="container w-[80%] mx-auto my-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-3">
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
    return <h1>Error fetching categories</h1>;
  }

  return (
    <div className="dark:bg-gray-900 min-h-screen py-8">
      <div className="container w-[90%] mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="brand bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out group overflow-hidden"
            >
              {console.log(category)}
              <div className="relative overflow-hidden">
                {/* طبقة التدرج اللوني */}
                <div className="absolute inset-0  from-white/50 to-transparent dark:from-gray-800/50 dark:to-transparent z-10"></div>
                {/* إطار حول الصورة */}
                <div className="absolute inset-0 border-4 border-white/20 dark:border-gray-800/20 rounded-md"></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full aspect-[4/3] object-cover rounded-md transform group-hover:rotate-x-6 group-hover:rotate-y-6 group-hover:scale-110 transition-all duration-300 ease-in-out"
                  loading="lazy" // تحسين أداء التحميل
                />
              </div>
              <h6 className="text-center text-gray-800 dark:text-white font-semibold text-lg mt-3 group-hover:text-[#0aad0a] transition-colors duration-300">
                {category.name}
              </h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
