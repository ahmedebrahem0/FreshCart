# 🛒 Fresh Cart - Professional E-Commerce Platform

<div align="center">

![Fresh Cart Logo](src/assets/images/freshcart-logo.svg)

**A modern, responsive e-commerce platform built with React and cutting-edge technologies**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.16-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_Project-0aad0a?style=for-the-badge&logo=vercel&logoColor=white)](https://ahmedebrahem0.github.io/FreshCart/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ahmedebrahem0/FreshCart)

</div>

---

## 🚀 **Project Overview**

Fresh Cart is a comprehensive, professional-grade e-commerce platform that showcases modern web development practices. Built with React 18 and Vite, it delivers a seamless shopping experience with advanced features like real-time cart management, user authentication, and responsive design.

### ✨ **Key Highlights**

- 🎯 **Production-Ready** - Deployed and fully functional
- 🔐 **Secure Authentication** - JWT-based with password reset flow
- 🛒 **Advanced Cart System** - Real-time updates with wishlist functionality
- 📱 **Fully Responsive** - Optimized for all devices
- 🌙 **Dark/Light Mode** - User preference persistence
- ⚡ **Performance Optimized** - Lazy loading, skeleton screens, and caching
- 🛡️ **Error Handling** - Comprehensive error boundaries and offline detection

---

## 🛠️ **Technology Stack**

### **Frontend Core**

- **React 18.3.1** - Latest React with concurrent features
- **Vite 6.0.1** - Lightning-fast build tool and dev server
- **React Router DOM 7.0.2** - Client-side routing
- **Tailwind CSS 3.4.16** - Utility-first CSS framework

### **State Management & Data**

- **React Context API** - Global state management
- **React Query 3.39.3** - Server state management and caching
- **Axios 1.7.9** - HTTP client with interceptors

### **UI/UX Enhancement**

- **Framer Motion 11.15.0** - Smooth animations and transitions
- **React Icons 5.4.0** - Comprehensive icon library
- **React Toastify** - Elegant notifications
- **React Slick** - Carousel components

### **Forms & Validation**

- **Formik 2.4.6** - Form management
- **Yup 1.6.1** - Schema validation
- **JWT Decode 4.0.0** - Token handling

### **Development Tools**

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 🏗️ **Project Architecture**

```
src/
├── 📁 components/          # Reusable UI components
│   ├── Header.jsx         # Main header component
│   ├── Footer.jsx         # Footer with links
│   ├── Navbar.jsx         # Navigation with user menu
│   ├── ProductCard.jsx    # Product display component
│   ├── HomeSlider.jsx     # Hero carousel
│   └── ErrorBoundary.jsx  # Error handling components
├── 📁 context/            # Global state management
│   ├── AuthContext.jsx    # Authentication state
│   └── CartContext.jsx   # Shopping cart state
├── 📁 hooks/              # Custom React hooks
│   ├── useProduct.jsx     # Product data fetching
│   ├── useCategories.jsx # Category management
│   └── UseLogin.jsx      # Authentication logic
├── 📁 layouts/            # Page layouts
│   ├── Layout.jsx         # Main app layout
│   └── ProtectedRoute.jsx # Route protection
├── 📁 pages/              # Application pages
│   ├── Authentication/    # Login, register, password reset
│   ├── Cart/             # Shopping cart, checkout, orders
│   └── main/             # Home, products, categories
├── 📁 services/          # API services
│   ├── api.js            # Axios configuration
│   ├── authService.js    # Authentication API
│   ├── productService.js # Product API
│   └── cartService.js    # Cart API
└── 📁 validation/        # Form validation schemas
```

---

## 🔐 **Authentication System**

### **Features**

- ✅ **JWT Authentication** with automatic token refresh
- ✅ **Password Reset Flow** - Complete forgot password workflow
- ✅ **Protected Routes** - Secure page access
- ✅ **User Profile Management** - Update personal information
- ✅ **Session Persistence** - Remember login state

### **Security Measures**

- 🔒 Token-based authentication
- 🔒 Input validation and sanitization
- 🔒 Protected route implementation
- 🔒 Secure password handling

---

## 🛒 **Shopping Cart System**

### **Advanced Features**

- 🛒 **Real-time Cart Updates** - Instant quantity changes
- 💝 **Wishlist Management** - Save products for later
- 💰 **Price Calculations** - Automatic totals and discounts
- 📦 **Order History** - Complete purchase tracking
- 🔄 **Cart Synchronization** - Server-side persistence

### **User Experience**

- ⚡ Instant feedback on actions
- 🎯 Smart product recommendations
- 📱 Mobile-optimized cart interface
- 🌙 Dark mode support

---

## 🎨 **Design System**

### **Custom Tailwind Configuration**

```javascript
colors: {
  primary: '#0aad0a',      // Fresh green
  secondary: '#4361ee',     // Professional blue
  accent: '#ff6b35',       // Vibrant orange
}
```

### **Responsive Design**

- 📱 **Mobile First** - Optimized for smartphones
- 💻 **Tablet Support** - Perfect tablet experience
- 🖥️ **Desktop Enhanced** - Full desktop features
- 🎯 **Cross-browser** - Works on all modern browsers

---

## 🚀 **Performance Optimizations**

### **Loading & Caching**

- ⚡ **Lazy Loading** - Images load on demand
- 🦴 **Skeleton Screens** - Smooth loading states
- 💾 **React Query Caching** - Intelligent data caching
- 🎯 **Code Splitting** - Optimized bundle sizes

### **User Experience**

- 🌊 **Smooth Animations** - Framer Motion transitions
- 📡 **Offline Detection** - Graceful offline handling
- 🔔 **Toast Notifications** - User feedback system
- ⚡ **Instant Updates** - Real-time UI changes

---

## 🛡️ **Error Handling & Reliability**

### **Comprehensive Error Management**

- 🛡️ **Error Boundaries** - Component-level error catching
- 🌐 **API Error Handling** - Network error management
- 📱 **Offline Support** - Graceful offline experience
- 🔍 **Input Validation** - Form error prevention

### **Monitoring & Debugging**

- 📊 **Error Logging** - Comprehensive error tracking
- 🔍 **Development Tools** - React DevTools integration
- 📈 **Performance Monitoring** - Bundle analysis

---

## 📱 **Mobile Experience**

### **Responsive Features**

- 📱 **Touch Optimized** - Mobile-friendly interactions
- 🎯 **Gesture Support** - Swipe and touch gestures
- 📐 **Adaptive Layouts** - Content adjusts to screen size
- ⚡ **Fast Loading** - Optimized for mobile networks

---

## 🌙 **Dark Mode Implementation**

### **Advanced Theme System**

- 🌙 **System Preference Detection** - Automatic theme selection
- 💾 **User Preference Persistence** - Remembers choice
- 🎨 **Custom Dark Colors** - Carefully designed dark palette
- ⚡ **Instant Theme Switching** - No page reload required

---

## 🔧 **Development Setup**

### **Prerequisites**

- Node.js (v16 or higher)
- npm or yarn package manager

### **Installation**

```bash
# Clone the repository
git clone https://github.com/ahmedebrahem0/FreshCart.git

# Navigate to project directory
cd FreshCart

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Available Scripts**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run deploy   # Deploy to GitHub Pages
```

---

## 🌐 **API Integration**

### **Backend Services**

- **Base URL:** `https://ecommerce.routemisr.com/api/v1`
- **Authentication:** JWT token-based
- **Endpoints:** Products, Categories, Brands, Cart, Orders

### **API Features**

- 🔐 **Automatic Token Injection** - Seamless authentication
- ⚡ **Request/Response Interceptors** - Centralized error handling
- 🕐 **Timeout Configuration** - Network reliability
- 🔄 **Retry Logic** - Automatic retry on failure

---

## 📊 **Project Statistics**

<div align="center">

| Metric                | Value     |
| --------------------- | --------- |
| **Total Components**  | 15+       |
| **Custom Hooks**      | 8+        |
| **API Services**      | 5+        |
| **Pages**             | 12+       |
| **Dependencies**      | 25+       |
| **Bundle Size**       | Optimized |
| **Performance Score** | 95+       |

</div>

---

## 🎯 **Key Features Showcase**

### **🛒 Shopping Experience**

- Browse products with advanced filtering
- Real-time cart updates
- Wishlist functionality
- Secure checkout process

### **👤 User Management**

- Complete authentication flow
- Profile management
- Order history tracking
- Password reset functionality

### **📱 Modern UI/UX**

- Responsive design
- Dark/light mode
- Smooth animations
- Loading states

### **⚡ Performance**

- Lazy loading
- Code splitting
- Optimized images
- Caching strategies

---

## 🚀 **Deployment**

### **GitHub Pages**

- **Live URL:** [https://ahmedebrahem0.github.io/FreshCart/](https://ahmedebrahem0.github.io/FreshCart/)
- **Automatic Deployment** - GitHub Actions integration
- **Custom Domain Support** - Ready for custom domains

### **Production Optimizations**

- ✅ Minified bundles
- ✅ Optimized images
- ✅ CDN ready
- ✅ SEO optimized

---

## 🤝 **Contributing**

I welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### **Development Guidelines**

- Follow React best practices
- Use TypeScript for type safety
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **Developer**

<div align="center">

**Ahmed Ebrahem**

[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ahmedebrahem0)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/ahmedebrahem0)
[![Portfolio](https://img.shields.io/badge/Portfolio-View_Work-0aad0a?style=for-the-badge&logo=vercel&logoColor=white)](https://ahmedebrahem0.github.io)

</div>

---

## 🙏 **Acknowledgments**

- **React Team** - For the amazing framework
- **Vite Team** - For the lightning-fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **React Query** - For excellent data fetching

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Ahmed Ebrahem](https://github.com/ahmedebrahem0)

</div>
