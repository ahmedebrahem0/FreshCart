# Services Documentation

This directory contains all API services organized by functionality.

## Structure

```
services/
├── api.js              # Base API configuration with interceptors
├── authService.js      # Authentication related APIs
├── productService.js   # Product and category related APIs
├── cartService.js      # Cart and wishlist related APIs
├── orderService.js     # Order related APIs
├── index.js           # Export all services
└── README.md          # This documentation
```

## Usage

### Import Services
```javascript
import { authService, productService, cartService, orderService } from '../services';
```

### Authentication Service
```javascript
// Login
authService.login({ email, password })

// Register
authService.register({ name, email, password, phone })

// Forget Password
authService.forgetPassword(email)

// Verify Reset Code
authService.verifyResetCode(resetCode)

// Reset Password
authService.resetPassword({ email, newPassword })

// Change Password
authService.changePassword({ currentPassword, newPassword })

// Get User Profile
authService.getUserProfile()

// Update User Profile
authService.updateUserProfile(userData)
```

### Product Service
```javascript
// Get all products
productService.getAllProducts()

// Get product by ID
productService.getProductById(productId)

// Get all categories
productService.getAllCategories()

// Get all brands
productService.getAllBrands()

// Get products by category
productService.getProductsByCategory(categoryId)

// Get products by brand
productService.getProductsByBrand(brandId)

// Search products
productService.searchProducts(searchTerm)
```

### Cart Service
```javascript
// Get user cart
cartService.getUserCart()

// Add product to cart
cartService.addToCart(productId)

// Update cart item quantity
cartService.updateCartItem(itemId, count)

// Remove item from cart
cartService.removeFromCart(productId)

// Clear all cart items
cartService.clearCart()

// Get user wishlist
cartService.getUserWishlist()

// Add product to wishlist
cartService.addToWishlist(productId)

// Remove product from wishlist
cartService.removeFromWishlist(wishlistId)
```

### Order Service
```javascript
// Get all user orders
orderService.getAllOrders()

// Get order by ID
orderService.getOrderById(orderId)

// Create new order
orderService.createOrder(orderData)

// Cancel order
orderService.cancelOrder(orderId)

// Get order statistics
orderService.getOrderStats()
```

## Features

- **Centralized Configuration**: All API calls use the same base configuration
- **Automatic Token Handling**: Auth tokens are automatically added to requests
- **Error Handling**: Centralized error handling with interceptors
- **Type Safety**: Clear function signatures for better development experience
- **Reusability**: Services can be easily imported and used across components
- **Maintainability**: Easy to update API endpoints or add new functionality

## Benefits

1. **Better Organization**: API calls are organized by functionality
2. **Easier Testing**: Services can be easily mocked for testing
3. **Code Reusability**: No duplicate API call code
4. **Consistent Error Handling**: All API calls use the same error handling
5. **Easy Maintenance**: Changes to API endpoints only need to be made in one place 