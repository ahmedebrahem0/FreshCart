import api from './api';

export const cartService = {
  // Get user cart
  getUserCart: () => {
    return api.get('/cart');
  },

  // Add product to cart
  addToCart: (productId) => {
    return api.post('/cart', { productId });
  },

  // Update cart item quantity
  updateCartItem: (itemId, count) => {
    return api.put(`/cart/${itemId}`, { count });
  },

  // Remove item from cart
  removeFromCart: (productId) => {
    return api.delete(`/cart/${productId}`);
  },

  // Clear all cart items
  clearCart: () => {
    return api.delete('/cart');
  },

  // Get user wishlist
  getUserWishlist: () => {
    return api.get('/wishlist');
  },

  // Add product to wishlist
  addToWishlist: (productId) => {
    return api.post('/wishlist', { productId });
  },

  // Remove product from wishlist
  removeFromWishlist: (wishlistId) => {
    return api.delete(`/wishlist/${wishlistId}`);
  }
}; 