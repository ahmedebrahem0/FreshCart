import api from './api';

export const orderService = {
  // Get all user orders
  getAllOrders: () => {
    return api.get('/orders');
  },

  // Get order by ID
  getOrderById: (orderId) => {
    return api.get(`/orders/${orderId}`);
  },

  // Create new order
  createOrder: (orderData) => {
    return api.post('/orders', orderData);
  },

  // Cancel order
  cancelOrder: (orderId) => {
    return api.put(`/orders/${orderId}/cancel`);
  },

  // Get order statistics
  getOrderStats: () => {
    return api.get('/orders/stats');
  }
}; 