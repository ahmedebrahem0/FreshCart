import api from './api';

export const productService = {
  // Get all products
  getAllProducts: () => {
    return api.get('/products');
  },

  // Get product by ID
  getProductById: (productId) => {
    return api.get(`/products/${productId}`);
  },

  // Get all categories
  getAllCategories: () => {
    return api.get('/categories');
  },

  // Get all brands
  getAllBrands: () => {
    return api.get('/brands');
  },

  // Get products by category
  getProductsByCategory: (categoryId) => {
    return api.get(`/products?category=${categoryId}`);
  },

  // Get products by brand
  getProductsByBrand: (brandId) => {
    return api.get(`/products?brand=${brandId}`);
  },

  // Search products
  searchProducts: (searchTerm) => {
    return api.get(`/products?search=${searchTerm}`);
  }
}; 