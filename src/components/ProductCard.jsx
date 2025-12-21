import React from "react";
import ComponentErrorBoundary from "./ComponentErrorBoundary";

const ProductCard = ({ product }) => {
  if (!product) {
    throw new Error("Product data is required");
  }

  return (
    <ComponentErrorBoundary
      fallback={
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Product unavailable
          </p>
        </div>
      }
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full aspect-[4/3] object-cover"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
            }}
          />
          {product.discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{product.discount}%
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                ${product.price}
              </span>
              {product.originalPrice &&
                product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
            </div>

            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {product.rating || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ComponentErrorBoundary>
  );
};

export default ProductCard;
