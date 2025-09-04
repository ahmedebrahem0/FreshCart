Directory structure:
└── ahmedebrahem0-freshcart/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vite.config.js
    ├── public/
    │   └── _redirects
    └── src/
        ├── App.css
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── assets/
        │   └── images/
        │       └── apple-store-vector-icon_901408-728.avif
        ├── components/
        │   ├── ApiErrorBoundary.jsx
        │   ├── ComponentErrorBoundary.jsx
        │   ├── ErrorBoundaries.md
        │   ├── ErrorBoundary.jsx
        │   ├── ErrorDisplay.jsx
        │   ├── Footer.jsx
        │   ├── Header.jsx
        │   ├── HomeCategory.jsx
        │   ├── HomeSlider.jsx
        │   ├── Loading.jsx
        │   ├── LoadingAuth.jsx
        │   ├── Navbar.jsx
        │   ├── NotFound.jsx
        │   ├── OfflineMessage.jsx
        │   └── ProductCard.jsx
        ├── context/
        │   ├── AuthContext.jsx
        │   └── CartContext.jsx
        ├── hooks/
        │   ├── useBrands.jsx
        │   ├── useCategories.jsx
        │   ├── useErrorHandler.jsx
        │   ├── UseForgetPass.jsx
        │   ├── UseLogin.jsx
        │   ├── useProduct.jsx
        │   ├── useProductById.jsx
        │   ├── UseRegister.jsx
        │   ├── UseResetCode.jsx
        │   └── UseResetPass.jsx
        ├── layouts/
        │   ├── Layout.jsx
        │   └── ProtectedRoute.jsx
        ├── pages/
        │   ├── Authentication/
        │   │   ├── ChangePassword.jsx
        │   │   ├── ForgetPassword.jsx
        │   │   ├── Login.jsx
        │   │   ├── Register.jsx
        │   │   ├── ResetPassword.jsx
        │   │   └── VerifyResetCode.jsx
        │   ├── Cart/
        │   │   ├── AllOrders.jsx
        │   │   ├── Cart.jsx
        │   │   ├── Payment.jsx
        │   │   └── Wishlist.jsx
        │   └── main/
        │       ├── Brands.jsx
        │       ├── Categories.jsx
        │       ├── Dashbord.jsx
        │       ├── Home.jsx
        │       ├── ProductDetails.jsx
        │       ├── Products.jsx
        │       └── Profile.jsx
        ├── services/
        │   ├── README.md
        │   ├── api.js
        │   ├── authService.js
        │   ├── cartService.js
        │   ├── index.js
        │   ├── orderService.js
        │   └── productService.js
        └── validation/
            └── authValidation.js


Files Content:

================================================
FILE: README.md
================================================
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



================================================
FILE: eslint.config.js
================================================
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]



================================================
FILE: index.html
================================================
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="dist/assets/freshcart-logo-CC9Ez4_E.svg"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <title>FreshCart</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Encode+Sans+Expanded:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">

  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>



================================================
FILE: package.json
================================================
{
  "homepage": "https://ahmedebrahem0.github.io/e-commerce",
  "name": "my-project",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@fortawesome/fontawesome-free": "^6.7.1",
    "axios": "^1.7.9",
    "chart.js": "^4.4.7",
    "date-fns": "^4.1.0",
    "formik": "^2.4.6",
    "framer-motion": "^11.15.0",
    "jwt-decode": "^4.0.0",
    "motion": "^11.15.0",
    "ngx-skeleton-loader": "^9.0.0",
    "react": "^18.3.1",
    "react-chartjs-2": "^5.3.0",
    "react-detect-offline": "^2.4.5",
    "react-dom": "^18.3.1",
    "react-hot-toast": "^2.5.1",
    "react-icons": "^5.4.0",
    "react-lazy-load-image-component": "^1.6.3",
    "react-query": "^3.39.3",
    "react-router-dom": "^7.0.2",
    "react-slick": "^0.30.3",
    "react-spinners": "^0.15.0",
    "react-toastify": "^11.0.2",
    "slick-carousel": "^1.8.1",
    "swiper": "^11.2.1",
    "yup": "^1.6.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.15.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.15.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "gh-pages": "^6.3.0",
    "globals": "^15.12.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.16",
    "vite": "^6.0.1"
  }
}



================================================
FILE: postcss.config.js
================================================
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}



================================================
FILE: tailwind.config.js
================================================
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0aad0a',
          light: '#b2f2bb',
          dark: '#088708',
        },
        secondary: {
          DEFAULT: '#4361ee',
          light: '#a0c4ff',
          dark: '#185a9d',
        },
        accent: {
          DEFAULT: '#ff6b35',
          light: '#ffd4c4',
          dark: '#e55a2b',
        },
        success: '#43e97b',
        warning: '#ffc908',
        error: '#ff5858',
        info: '#0ea5e9',
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // ألوان الوضع الداكن المحسنة
        dark: {
          bg: {
            primary: '#0f172a',
            secondary: '#1e293b',
            tertiary: '#334155',
            card: '#1e293b',
            elevated: '#334155',
          },
          text: {
            primary: '#f8fafc',
            secondary: '#cbd5e1',
            tertiary: '#94a3b8',
            muted: '#64748b',
          },
          border: {
            primary: '#334155',
            secondary: '#475569',
            accent: '#0aad0a',
          },
          accent: {
            green: '#10b981',
            blue: '#3b82f6',
            purple: '#8b5cf6',
            orange: '#f59e0b',
            red: '#ef4444',
          }
        }
      },
      fontFamily: {
        'encode': ['Encode Sans Expanded', 'sans-serif'],
      },
      boxShadow: {
        'fresh': 'rgba(145,158,171,.2) 0px 2px 4px -1px,rgba(145,158,171,.14) 0px 4px 5px 0px,rgba(145,158,171,.12) 0px 1px 10px 0px',
        'dark-light': '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        'dark-medium': '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
        'dark-heavy': '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
      }
    },
  },
  plugins: [],
};




================================================
FILE: vite.config.js
================================================
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? "/FreshCart/" : "/",
  plugins: [react()],
  server: {
    port: 3000,
  },
});



================================================
FILE: public/_redirects
================================================
/*    /index.html   200 


================================================
FILE: src/App.css
================================================
[Empty file]


================================================
FILE: src/App.jsx
================================================
import React from "react";
import Footer from "./components/Footer";
import Home from "./pages/main/Home";
import Header from "./components/Header";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Layout from "./layouts/Layout";
import Brands from "./pages/main/Brands";
import Login from "./pages/Authentication/Login";
import Cart from "./pages/Cart/Cart";
import Products from "./pages/main/Products";
import Categories from "./pages/main/Categories";
import Register from "./pages/Authentication/Register";
import ForgetPassword from "./pages/Authentication/ForgetPassword";
import ChangeMyPassword from "./pages/Authentication/ChangePassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
import VerifyResetCode from "./pages/Authentication/VerifyResetCode";
import CreateContextProvider from "./context/AuthContext";
import ProtectedRoute from "./layouts/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./pages/main/ProductDetails";
import CartContextProvider from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import Payment from "./pages/Cart/Payment";
import AllOrders from "./pages/Cart/AllOrders";
import { Offline } from "react-detect-offline";
import OfflineMessage from "./components/OfflineMessage";
import Dashboard from "./pages/main/Dashbord";
import Profile from "./pages/main/Profile";
import Wishlist from "./pages/Cart//wishlist";
import { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import ApiErrorBoundary from "./components/ApiErrorBoundary";


const reactQueryConfig = new QueryClient();
//  console.log('skko')
// تعريف Router مع basename
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Navigate to="/Home" replace /> },
        { path: "*", element: <NotFound /> },
        {
          path: "Home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "Products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "Categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "Brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "Payment",
          element: (
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          ),
        },
        {
          path: "Cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "allOrders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "Dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "Profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        { path: "Register", element: <Register /> },
        { path: "Login", element: <Login /> },
        { path: "ForgetPassword", element: <ForgetPassword /> },
        { path: "VerifyResetCode", element: <VerifyResetCode /> },
        { path: "ChangeMyPassword", element: <ChangeMyPassword /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "Footer", element: <Footer /> },
        { path: "Wishlist", element: <Wishlist /> },
      ],
    },
  ],
  {
    basename: process.env.NODE_ENV === 'production' ? "/FreshCart/" : "/",
  }
);

export default function App() {
  // منطق تأخير ظهور رسالة Offline
  const [showOffline, setShowOffline] = useState(false);
  useEffect(() => {
    let timeout;
    function handleOffline() {
      timeout = setTimeout(() => setShowOffline(true), 2000); // انتظر 2 ثانية قبل الإظهار
    }
    function handleOnline() {
      clearTimeout(timeout);
      setShowOffline(false);
    }
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      <ErrorBoundary>
        <CreateContextProvider>
          <CartContextProvider>
            <QueryClientProvider client={reactQueryConfig}>
              <ApiErrorBoundary>
                <RouterProvider router={router} />
                <Offline pollingInterval={2000}>
                  {showOffline && <OfflineMessage />}
                </Offline>
                <ToastContainer hideProgressBar="true" />
              </ApiErrorBoundary>
            </QueryClientProvider>
          </CartContextProvider>
        </CreateContextProvider>
      </ErrorBoundary>
    </>
  ); 
}



================================================
FILE: src/index.css
================================================
@tailwind base;
@tailwind components;
@tailwind utilities;


:root {
  --main-color: #0aad0a;
  --light-color: #f0f3f2;
  --shadow: rgba(145, 158, 171, .2) 0px 2px 4px -1px, rgba(145, 158, 171, .14) 0px 4px 5px 0px, rgba(145, 158, 171, .12) 0px 1px 10px 0px;
  --font-family: 'Encode Sans Expanded', sans-serif;
  --rating-color: #ffc908;

  /* نظام ألوان محسن */
  --primary-green: #0aad0a;
  --primary-green-light: #b2f2bb;
  --primary-green-dark: #088708;

  --secondary-blue: #4361ee;
  --secondary-blue-light: #a0c4ff;
  --secondary-blue-dark: #185a9d;

  --accent-orange: #ff6b35;
  --accent-orange-light: #ffd4c4;
  --accent-orange-dark: #e55a2b;

  --success-green: #43e97b;
  --warning-yellow: #ffc908;
  --error-red: #ff5858;
  --info-blue: #0ea5e9;

  --neutral-gray-50: #f8fafc;
  --neutral-gray-100: #f1f5f9;
  --neutral-gray-200: #e2e8f0;
  --neutral-gray-300: #cbd5e1;
  --neutral-gray-400: #94a3b8;
  --neutral-gray-500: #64748b;
  --neutral-gray-600: #475569;
  --neutral-gray-700: #334155;
  --neutral-gray-800: #1e293b;
  --neutral-gray-900: #0f172a;

  /* ألوان الوضع الداكن المحسنة */
  --dark-bg-primary: #0f172a;
  --dark-bg-secondary: #1e293b;
  --dark-bg-tertiary: #334155;
  --dark-bg-card: #1e293b;
  --dark-bg-elevated: #334155;

  --dark-text-primary: #f8fafc;
  --dark-text-secondary: #cbd5e1;
  --dark-text-tertiary: #94a3b8;
  --dark-text-muted: #64748b;

  --dark-border-primary: #334155;
  --dark-border-secondary: #475569;
  --dark-border-accent: #0aad0a;

  --dark-shadow-light: rgba(0, 0, 0, 0.3);
  --dark-shadow-medium: rgba(0, 0, 0, 0.5);
  --dark-shadow-heavy: rgba(0, 0, 0, 0.7);

  --dark-accent-green: #10b981;
  --dark-accent-blue: #3b82f6;
  --dark-accent-purple: #8b5cf6;
  --dark-accent-orange: #f59e0b;
  --dark-accent-red: #ef4444;
}

body {
  font-family: var(--font-family) !important;
}

.active {
  border-bottom: 3px solid var(--primary-green);
  color: rgb(255, 255, 255);
  background-color: var(--primary-green);
  padding: 10px;
  border-radius: 10px;
  /* transition: all 1s; */
}

.active:hover {
  color: #fff !important
}

.alon {
  border-top: 1px solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
}

.rotating-lines {
  color: white !important;

}

.slick-prev:before,
.slick-next:before {
  color: rgb(157, 157, 157);
}

/* 
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: var(--red);
  transform-origin: 0%;
} */
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background-color: var(--primary-green);
  transform-origin: 0%;
  width: 100%;
  z-index: 1000;
}

/* styles.css */
.swiper-slide {
  transition: opacity 0.5s ease-in-out;
}

.swiper-slide-active {
  opacity: 1;
}

.swiper-slide-next,
.swiper-slide-prev {
  opacity: 0.5;
}

.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background-color: #fff;
  opacity: 0.5;
  transition: opacity 0.3s ease-in-out;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background-color: var(--secondary-blue);
}

.swiper-button-next,
.swiper-button-prev {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 50%;
  transition: background-color 0.3s ease-in-out;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.slick-dots li button:before {
  @apply text-gray-500;
  /* لون عادي في الوضع الفاتح */
}

.dark .slick-dots li button:before {
  @apply text-white;
  /* لون النقاط أبيض في الوضع الداكن */
}

.dark .slick-dots li.slick-active button:before {
  @apply text-white;
  /* لون النقطة النشطة في الوضع الداكن */
}

/* فئات ألوان محسنة */
.text-primary {
  color: var(--primary-green);
}

.text-secondary {
  color: var(--secondary-blue);
}

.text-accent {
  color: var(--accent-orange);
}

.text-success {
  color: var(--success-green);
}

.text-warning {
  color: var(--warning-yellow);
}

.text-error {
  color: var(--error-red);
}

.text-info {
  color: var(--info-blue);
}

.bg-primary {
  background-color: var(--primary-green);
}

.bg-secondary {
  background-color: var(--secondary-blue);
}

.bg-accent {
  background-color: var(--accent-orange);
}

.bg-success {
  background-color: var(--success-green);
}

.bg-warning {
  background-color: var(--warning-yellow);
}

.bg-error {
  background-color: var(--error-red);
}

.bg-info {
  background-color: var(--info-blue);
}

.border-primary {
  border-color: var(--primary-green);
}

.border-secondary {
  border-color: var(--secondary-blue);
}

.border-accent {
  border-color: var(--accent-orange);
}

/* فئات ألوان الوضع الداكن المحسنة */
.dark .bg-dark-primary {
  background-color: var(--dark-bg-primary);
}

.dark .bg-dark-secondary {
  background-color: var(--dark-bg-secondary);
}

.dark .bg-dark-tertiary {
  background-color: var(--dark-bg-tertiary);
}

.dark .bg-dark-card {
  background-color: var(--dark-bg-card);
}

.dark .bg-dark-elevated {
  background-color: var(--dark-bg-elevated);
}

.dark .text-dark-primary {
  color: var(--dark-text-primary);
}

.dark .text-dark-secondary {
  color: var(--dark-text-secondary);
}

.dark .text-dark-tertiary {
  color: var(--dark-text-tertiary);
}

.dark .text-dark-muted {
  color: var(--dark-text-muted);
}

.dark .border-dark-primary {
  border-color: var(--dark-border-primary);
}

.dark .border-dark-secondary {
  border-color: var(--dark-border-secondary);
}

.dark .border-dark-accent {
  border-color: var(--dark-border-accent);
}

.dark .shadow-dark-light {
  box-shadow: 0 4px 6px -1px var(--dark-shadow-light);
}

.dark .shadow-dark-medium {
  box-shadow: 0 10px 15px -3px var(--dark-shadow-medium);
}

.dark .shadow-dark-heavy {
  box-shadow: 0 25px 50px -12px var(--dark-shadow-heavy);
}

/* ألوان مميزة للوضع الداكن */
.dark .text-dark-accent-green {
  color: var(--dark-accent-green);
}

.dark .text-dark-accent-blue {
  color: var(--dark-accent-blue);
}

.dark .text-dark-accent-purple {
  color: var(--dark-accent-purple);
}

.dark .text-dark-accent-orange {
  color: var(--dark-accent-orange);
}

.dark .text-dark-accent-red {
  color: var(--dark-accent-red);
}

.dark .bg-dark-accent-green {
  background-color: var(--dark-accent-green);
}

.dark .bg-dark-accent-blue {
  background-color: var(--dark-accent-blue);
}

.dark .bg-dark-accent-purple {
  background-color: var(--dark-accent-purple);
}

.dark .bg-dark-accent-orange {
  background-color: var(--dark-accent-orange);
}

.dark .bg-dark-accent-red {
  background-color: var(--dark-accent-red);
}

/* img {
  filter :drop-shadow(10px 10px 10px black)
} */


================================================
FILE: src/main.jsx
================================================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./index.css";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>
)



================================================
FILE: src/assets/images/apple-store-vector-icon_901408-728.avif
================================================
[Binary file]


================================================
FILE: src/components/ApiErrorBoundary.jsx
================================================
import React from 'react';
import { FaWifi, FaServer, FaExclamationCircle } from 'react-icons/fa';

class ApiErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      errorType: null,
      retryCount: 0,
      maxRetries: 3
    };
  }

  static getDerivedStateFromError(error) {
    // Determine error type based on error message or properties
    let errorType = 'unknown';
    
    if (error.message?.includes('Network Error') || error.message?.includes('fetch')) {
      errorType = 'network';
    } else if (error.message?.includes('500') || error.message?.includes('Internal Server Error')) {
      errorType = 'server';
    } else if (error.message?.includes('404') || error.message?.includes('Not Found')) {
      errorType = 'notFound';
    } else if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
      errorType = 'unauthorized';
    } else if (error.message?.includes('403') || error.message?.includes('Forbidden')) {
      errorType = 'forbidden';
    }

    return { hasError: true, errorType };
  }

  componentDidCatch(error, errorInfo) {
    console.error('API Error caught by boundary:', error, errorInfo);
    
    // Increment retry count
    this.setState(prevState => ({
      retryCount: prevState.retryCount + 1
    }));
  }

  handleRetry = () => {
    if (this.state.retryCount < this.state.maxRetries) {
      this.setState({ 
        hasError: false, 
        errorType: null 
      });
    } else {
      // If max retries reached, show permanent error
      this.setState({ 
        hasError: true, 
        errorType: 'maxRetries' 
      });
    }
  };

  handleGoBack = () => {
    window.history.back();
  };

  getErrorContent = () => {
    const { errorType, retryCount, maxRetries } = this.state;

    switch (errorType) {
      case 'network':
        return {
          icon: <FaWifi className="text-3xl text-orange-500" />,
          title: 'Connection Error',
          message: 'Please check your internet connection and try again.',
          color: 'orange'
        };
      
      case 'server':
        return {
          icon: <FaServer className="text-3xl text-red-500" />,
          title: 'Server Error',
          message: 'Our servers are experiencing issues. Please try again later.',
          color: 'red'
        };
      
      case 'notFound':
        return {
          icon: <FaExclamationCircle className="text-3xl text-blue-500" />,
          title: 'Not Found',
          message: 'The requested resource could not be found.',
          color: 'blue'
        };
      
      case 'unauthorized':
        return {
          icon: <FaExclamationCircle className="text-3xl text-yellow-500" />,
          title: 'Unauthorized',
          message: 'Please log in to access this resource.',
          color: 'yellow'
        };
      
      case 'forbidden':
        return {
          icon: <FaExclamationCircle className="text-3xl text-purple-500" />,
          title: 'Access Denied',
          message: 'You don\'t have permission to access this resource.',
          color: 'purple'
        };
      
      case 'maxRetries':
        return {
          icon: <FaExclamationCircle className="text-3xl text-gray-500" />,
          title: 'Maximum Retries Reached',
          message: `We've tried ${maxRetries} times but couldn't load the data. Please try again later.`,
          color: 'gray'
        };
      
      default:
        return {
          icon: <FaExclamationCircle className="text-3xl text-red-500" />,
          title: 'Something Went Wrong',
          message: 'An unexpected error occurred. Please try again.',
          color: 'red'
        };
    }
  };

  render() {
    if (this.state.hasError) {
      const errorContent = this.getErrorContent();
      const { retryCount, maxRetries } = this.state;

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-200 dark:border-gray-700">
            {/* Error Icon */}
            <div className="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
              {errorContent.icon}
            </div>

            {/* Error Title */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {errorContent.title}
            </h1>

            {/* Error Message */}
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {errorContent.message}
            </p>

            {/* Retry Counter */}
            {retryCount > 0 && (
              <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Attempt {retryCount} of {maxRetries}
                </p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(retryCount / maxRetries) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {retryCount < maxRetries && (
                <button
                  onClick={this.handleRetry}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Try Again
                </button>
              )}
              
              <button
                onClick={this.handleGoBack}
                className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Go Back
              </button>
            </div>

            {/* Additional Help */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                If the problem persists, please contact support.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ApiErrorBoundary; 


================================================
FILE: src/components/ComponentErrorBoundary.jsx
================================================
import React from 'react';
import { FaBug, FaRedo, FaTimes } from 'react-icons/fa';

class ComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      showFallback: true
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Component Error caught by boundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  handleDismiss = () => {
    this.setState({ showFallback: false });
  };

  render() {
    if (this.state.hasError && this.state.showFallback) {
      return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 my-4">
          <div className="flex items-start space-x-3">
            {/* Error Icon */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <FaBug className="text-red-600 dark:text-red-400 text-sm" />
              </div>
            </div>

            {/* Error Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Component Error
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                This component encountered an error and couldn't render properly.
              </p>
              
              {/* Action Buttons */}
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={this.handleRetry}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
                >
                  <FaRedo className="mr-1 text-xs" />
                  Retry
                </button>
                
                <button
                  onClick={this.handleDismiss}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <FaTimes className="mr-1 text-xs" />
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (this.state.hasError && !this.state.showFallback) {
      // Return null or a minimal fallback when dismissed
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

export default ComponentErrorBoundary; 


================================================
FILE: src/components/ErrorBoundaries.md
================================================
# Error Boundaries Documentation

This document explains the error handling system implemented in the Fresh-Cart application.

## Overview

The application uses multiple layers of error boundaries to provide a robust error handling experience:

1. **ErrorBoundary** - Main application error boundary
2. **ApiErrorBoundary** - API-specific error handling
3. **ComponentErrorBoundary** - Component-level error handling
4. **useErrorHandler** - Hook for handling API errors
5. **ErrorDisplay** - Component for displaying errors

## Components

### 1. ErrorBoundary
Main error boundary that catches all JavaScript errors in the component tree.

**Features:**
- Catches all JavaScript errors
- Beautiful error UI with retry functionality
- Technical details toggle for developers
- Go to home functionality
- Dark mode support

**Usage:**
```jsx
import ErrorBoundary from './components/ErrorBoundary';

<ErrorBoundary>
  <YourApp />
</ErrorBoundary>
```

### 2. ApiErrorBoundary
Specialized error boundary for API-related errors.

**Features:**
- Detects different types of API errors (network, server, auth, etc.)
- Retry mechanism with counter
- Different UI for different error types
- Progress bar showing retry attempts

**Error Types:**
- Network errors (connection issues)
- Server errors (500, 502, etc.)
- Not found errors (404)
- Authorization errors (401, 403)
- Maximum retries reached

**Usage:**
```jsx
import ApiErrorBoundary from './components/ApiErrorBoundary';

<ApiErrorBoundary>
  <ComponentThatMakesApiCalls />
</ApiErrorBoundary>
```

### 3. ComponentErrorBoundary
Lightweight error boundary for individual components.

**Features:**
- Inline error display
- Retry and dismiss options
- Minimal UI impact
- Fallback prop support

**Usage:**
```jsx
import ComponentErrorBoundary from './components/ComponentErrorBoundary';

<ComponentErrorBoundary fallback={<div>Component failed</div>}>
  <RiskyComponent />
</ComponentErrorBoundary>
```

## Hooks

### useErrorHandler
Hook for handling API errors with toast notifications.

**Features:**
- Automatic error type detection
- Toast notifications
- Error state management
- Context tracking
- Error filtering by type

**Usage:**
```jsx
import { useErrorHandler } from './hooks/useErrorHandler';

const MyComponent = () => {
  const { handleError, errors, clearError } = useErrorHandler();

  const fetchData = async () => {
    try {
      const response = await api.get('/data');
      return response.data;
    } catch (error) {
      handleError(error, 'fetchData');
    }
  };

  return (
    <div>
      {/* Your component */}
      <ErrorDisplay 
        errors={errors} 
        onClearError={clearError} 
      />
    </div>
  );
};
```

## Components

### ErrorDisplay
Component for displaying error messages in a beautiful UI.

**Features:**
- Different styles for different error types
- Auto-dismiss functionality
- Clear all errors option
- Timestamp display
- Context information

**Usage:**
```jsx
import ErrorDisplay from './components/ErrorDisplay';

<ErrorDisplay 
  errors={errors} 
  onClearError={clearError}
  onClearAll={clearAllErrors}
/>
```

## Error Types

The system recognizes and handles different types of errors:

### API Errors
- **400** - Bad Request (warning)
- **401** - Unauthorized (warning)
- **403** - Forbidden (error)
- **404** - Not Found (info)
- **422** - Validation Error (warning)
- **429** - Too Many Requests (warning)
- **500** - Server Error (error)

### Network Errors
- Connection issues
- Timeout errors
- CORS errors

### Component Errors
- JavaScript runtime errors
- Render errors
- State errors

## Best Practices

### 1. Use Appropriate Error Boundaries
- Use `ErrorBoundary` for the entire app
- Use `ApiErrorBoundary` for API-heavy components
- Use `ComponentErrorBoundary` for risky components

### 2. Handle Errors Gracefully
```jsx
// Good
try {
  const data = await api.get('/data');
  setData(data);
} catch (error) {
  handleError(error, 'fetchData');
}

// Bad
const data = await api.get('/data'); // No error handling
```

### 3. Provide User-Friendly Messages
```jsx
// Good
errorMessage = 'Unable to load products. Please try again.';

// Bad
errorMessage = 'TypeError: Cannot read property of undefined';
```

### 4. Use Error Context
```jsx
handleError(error, 'ProductDetails.fetchProduct');
handleError(error, 'Cart.addToCart');
handleError(error, 'Auth.login');
```

## Configuration

### Toast Notifications
Error notifications are automatically shown using react-toastify:

```jsx
toast[errorType](errorMessage, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});
```

### Retry Configuration
- Maximum retries: 3
- Retry delay: Immediate
- Retry counter: Visible to user

## Testing Error Boundaries

To test error boundaries, you can create components that throw errors:

```jsx
const TestErrorComponent = () => {
  throw new Error('Test error');
};

// Wrap in error boundary
<ErrorBoundary>
  <TestErrorComponent />
</ErrorBoundary>
```

## Monitoring and Logging

All errors are logged to the console for debugging:

```javascript
console.error('Error caught by boundary:', error, errorInfo);
```

For production, you can add error reporting services:

```javascript
// Example with Sentry
import * as Sentry from '@sentry/react';

componentDidCatch(error, errorInfo) {
  Sentry.captureException(error, { extra: errorInfo });
}
```

## Benefits

1. **Better User Experience** - Users see friendly error messages instead of crashes
2. **Graceful Degradation** - App continues to work even when parts fail
3. **Easy Debugging** - Detailed error information for developers
4. **Consistent Error Handling** - Standardized approach across the app
5. **Retry Mechanisms** - Automatic recovery from temporary failures 


================================================
FILE: src/components/ErrorBoundary.jsx
================================================
import React from 'react';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDetails: false 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console for debugging
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDetails: false 
    });
  };

  handleGoHome = () => {
    window.location.href = '/home';
  };

  toggleDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center border border-red-200 dark:border-red-800">
            {/* Error Icon */}
            <div className="mx-auto w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
              <FaExclamationTriangle className="text-3xl text-red-600 dark:text-red-400" />
            </div>

            {/* Error Title */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Oops! Something went wrong
            </h1>

            {/* Error Message */}
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FaRedo className="text-sm" />
                <span>Try Again</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <FaHome className="text-sm" />
                <span>Go to Home</span>
              </button>
            </div>

            {/* Error Details Toggle */}
            {this.state.error && (
              <div className="mt-6">
                <button
                  onClick={this.toggleDetails}
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  {this.state.showDetails ? 'Hide' : 'Show'} Technical Details
                </button>

                {this.state.showDetails && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg text-left">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Error Details:
                    </h3>
                    <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto max-h-32">
                      {this.state.error && this.state.error.toString()}
                    </pre>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 mt-4">
                      Component Stack:
                    </h3>
                    <pre className="text-xs text-gray-600 dark:text-gray-300 overflow-auto max-h-32">
                      {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Contact Support */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                If this problem persists, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 


================================================
FILE: src/components/ErrorDisplay.jsx
================================================
import React from 'react';
import { FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaTimes } from 'react-icons/fa';

const ErrorDisplay = ({ errors, onClearError, onClearAll }) => {
  if (!errors || errors.length === 0) {
    return null;
  }

  const getIcon = (type) => {
    switch (type) {
      case 'error':
        return <FaExclamationTriangle className="text-red-500" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'info':
        return <FaInfoCircle className="text-blue-500" />;
      case 'success':
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaExclamationTriangle className="text-gray-500" />;
    }
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800';
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-red-800 dark:text-red-200';
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-200';
      case 'info':
        return 'text-blue-800 dark:text-blue-200';
      case 'success':
        return 'text-green-800 dark:text-green-200';
      default:
        return 'text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {/* Clear All Button */}
      {errors.length > 1 && (
        <div className="flex justify-end">
          <button
            onClick={onClearAll}
            className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Error Messages */}
      {errors.map((error) => (
        <div
          key={error.id}
          className={`${getBgColor(error.type)} border rounded-lg p-4 shadow-lg transform transition-all duration-300 hover:scale-105`}
        >
          <div className="flex items-start space-x-3">
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(error.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className={`text-sm font-medium ${getTextColor(error.type)}`}>
                    {error.message}
                  </p>
                  {error.context && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Context: {error.context}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {new Date(error.timestamp).toLocaleTimeString()}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => onClearError(error.id)}
                  className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ErrorDisplay; 


================================================
FILE: src/components/Footer.jsx
================================================
import React from 'react';
import { Link } from 'react-router-dom';
import amazon from "../assets/images/amazon.png";
import amirecan from "../assets/images/AMERICAN.png";
import master from "../assets/images/master.png";
import paypal from "../assets/images/paypal.png";
import App_Store from "../assets/images/App_Store_Badge.svg.png";
import Play_Store from "../assets/images/Google_Play_Store_badge_EN.svg.png";
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="bg-gradient-to-br from-[#e8fbe8] via-[#f0f3f2] to-[#b2f2bb] dark:bg-[#0f172a] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#0f172a] dark:to-[#0f172a] dark:shadow-gray-800 text-[#222] dark:text-gray-200 border-t border-[#0aad0a]/10 dark:border-gray-700 pt-10 pb-2 px-0 mt-10 shadow-inner"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* About Us */}
        <div>
          <h4 className="text-lg font-bold text-[#0aad0a] mb-3">About FreshCart</h4>
          <p className="text-sm mb-4">FreshCart is your one-stop shop for fresh groceries, top brands, and fast delivery. Enjoy a seamless shopping experience with secure payment and exclusive offers.</p>
          <div className="flex gap-3 mt-2">
            <motion.a whileHover={{ scale: 1.2, color: '#0aad0a' }} href="#" className="text-2xl transition-colors"><i className="fa-brands fa-facebook"></i></motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#0aad0a' }} href="#" className="text-2xl transition-colors"><i className="fa-brands fa-instagram"></i></motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#0aad0a' }} href="#" className="text-2xl transition-colors"><i className="fa-brands fa-twitter"></i></motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#0aad0a' }} href="#" className="text-2xl transition-colors"><i className="fa-brands fa-linkedin"></i></motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#0aad0a' }} href="#" className="text-2xl transition-colors"><i className="fa-brands fa-youtube"></i></motion.a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold text-[#0aad0a] mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/Home" className="hover:text-[#0aad0a] transition-colors">Home</Link></li>
            <li><Link to="/Products" className="hover:text-[#0aad0a] transition-colors">Products</Link></li>
            <li><Link to="/Categories" className="hover:text-[#0aad0a] transition-colors">Categories</Link></li>
            <li><Link to="/Brands" className="hover:text-[#0aad0a] transition-colors">Brands</Link></li>
            <li><Link to="/Cart" className="hover:text-[#0aad0a] transition-colors">Cart</Link></li>
            <li><Link to="/Wishlist" className="hover:text-[#0aad0a] transition-colors">Wishlist</Link></li>
          </ul>
        </div>
        {/* Customer Service */}
        <div>
          <h4 className="text-lg font-bold text-[#0aad0a] mb-3">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/allOrders" className="hover:text-[#0aad0a] transition-colors">My Orders</Link></li>
            <li><Link to="/Dashboard" className="hover:text-[#0aad0a] transition-colors">Dashboard</Link></li>
            <li><Link to="/Login" className="hover:text-[#0aad0a] transition-colors">Login</Link></li>
            <li><Link to="/Register" className="hover:text-[#0aad0a] transition-colors">Register</Link></li>
            <li><Link to="/ForgetPassword" className="hover:text-[#0aad0a] transition-colors">Forgot Password</Link></li>
          </ul>
        </div>
        {/* Payment Methods */}
        <div>
          <h4 className="text-lg font-bold text-[#0aad0a] mb-3">Payment Methods</h4>
          <div className="flex flex-wrap gap-2 items-center">
            <img src={amazon} alt="amazon" className="w-10 h-7 object-contain rounded shadow" />
            <img src={amirecan} alt="american" className="w-10 h-7 object-contain rounded shadow" />
            <img src={master} alt="master" className="w-10 h-7 object-contain rounded shadow" />
            <img src={paypal} alt="paypal" className="w-10 h-7 object-contain rounded shadow" />
          </div>
        </div>
        {/* Download App */}
        <div>
          <h4 className="text-lg font-bold text-[#0aad0a] mb-3">Get The App</h4>
          <p className="text-sm mb-2">Download FreshCart on your phone for the best experience.</p>
          <div className="flex gap-2">
            <a href="#"><img src={App_Store} alt="App Store" className="w-28 hover:scale-105 transition-transform" /></a>
            <a href="#"><img src={Play_Store} alt="Play Store" className="w-28 hover:scale-105 transition-transform" /></a>
          </div>
          <form className="mt-4 flex flex-col gap-2">
            <input type="email" placeholder="Email..." className="rounded bg-white dark:bg-gray-800 px-3 py-2 text-base text-gray-900 dark:text-white outline outline-1 outline-gray-300 dark:outline-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-2 focus:outline-[#0aad0a]" />
            <button type="submit" className="py-2 bg-[#0aad0a] text-white rounded hover:bg-[#099409] transition-colors font-semibold">Share App Link</button>
          </form>
        </div>
      </div>
      <div className="mt-8 border-t border-[#0aad0a]/10 pt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} FreshCart. All rights reserved.
      </div>
    </motion.footer>
  );
}



================================================
FILE: src/components/Header.jsx
================================================
import React from 'react'

export default function Header() {
  return <div className="bg-danger p-4 text-white">Header</div>;
}



================================================
FILE: src/components/HomeCategory.jsx
================================================
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useCategories from "./../hooks/useCategories";

// مكون الهيكل العظمي (Skeleton) أثناء التحميل
function SkeletonCategory() {
  return (
    <div className="px-2">
      <div className="h-32 w-full bg-gray-200 animate-pulse rounded-md"></div>
      <div className="h-4 bg-gray-300 rounded mt-2 w-3/4 mx-auto"></div>
    </div>
  );
}

// المكون الرئيسي لعرض الفئات
export default function HomeCategory() {
  // إعدادات السلايدر
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 10, // عدد الشرائح المعروضة على الشاشات الكبيرة
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // الشاشات المتوسطة
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768, // الشاشات الصغيرة
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480, // الشاشات الصغيرة جدًا
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  // جلب بيانات الفئات باستخدام الهوك المخصص
  const { data, isLoading, isError } = useCategories();
  const categories = data?.data?.data || [];

  // في حالة حدوث خطأ
  if (isError) {
    return <h1>Error fetching categories</h1>;
  }

  // دالة لتحديد زاوية الميل بناءً على موقع العنصر
  const getRotation = (index, total) => {
    const middle = Math.floor(total / 2); // الحصول على العنصر الأوسط
    const distanceFromMiddle = index - middle; // حساب المسافة من المنتصف
    const maxRotation = 15; // أقصى زاوية ميل
    return distanceFromMiddle * maxRotation; // زيادة زاوية الميل كلما ابتعدنا عن المنتصف
  };

  return (
    <Slider {...settings}>
      {isLoading
        ? Array(10) // عرض 10 هيكل عظمي أثناء التحميل
            .fill(0)
            .map((_, index) => <SkeletonCategory key={index} />)
        : categories.map((category, index) => (
            <div
              key={category._id}
              className="px-2"
              style={{
                transform: `rotate(${getRotation(
                  index,
                  categories.length
                )}deg)`, // تطبيق زاوية الميل
              }}
            >
              <img
                src={category.image}
                className="h-32 w-full object-cover rounded-md border-2 border-gray-300"
                alt={category.name}
              />
              <h6 className="text-center text-sm font-medium mt-2 text-gray-700 dark:text-white">
                {category.name}
              </h6>
            </div>
          ))}
    </Slider>
  );
}



================================================
FILE: src/components/HomeSlider.jsx
================================================
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../src/assets/images/blog-img-1.jpeg";
import img2 from "../../src/assets/images/blog-img-2.jpeg";
import img3 from "../../src/assets/images/slider-image-1.jpeg";
import img4 from "../../src/assets/images/slider-image-2.jpeg";
import img5 from "../../src/assets/images/slider-image-3.jpeg";
import img6 from "../../src/assets/images/slider-2.jpeg";
// import "./styles.css"; // استيراد ملف الـ CSS

export default function HomeSlider() {
  var settings = {
    dots: true , 
    infinite: true, 
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1, 
    arrows: false, 
    autoplay: true,
    autoplaySpeed: 3000, 
    fade: false, // تعطيل تأثير التلاشي
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)", 
  };

  return (

    <div className="slider-container ">
      <Slider {...settings}>
        <div>
          <img src={img5} className="h-80 w-full rounded-md" alt="" />
        </div>
        <div>
          <img src={img1} className="h-80 w-full rounded-md" alt="" />
        </div>
        <div>
          <img src={img3} className="h-80 w-full rounded-md" alt="" />
        </div>
        <div>
          <img src={img4} className="h-80 w-full rounded-md" alt="" />
        </div>
        <div>
          <img src={img2} className="h-80 w-full rounded-md" alt="" />
        </div>
        <div>
          <img src={img6} className="h-80 w-full rounded-md" alt="" />
        </div>
      </Slider>
    </div>
  );
}



================================================
FILE: src/components/Loading.jsx
================================================
import React from 'react'
import { GridLoader } from 'react-spinners';

export default function Loading() {
    return (
      <>
        <div className="h-screen flex justify-center items-center dark:bg-slate-900">
          <GridLoader color="#0aad0a" speedMultiplier={2} size={25} />
        </div>
      </>
    );
}




================================================
FILE: src/components/LoadingAuth.jsx
================================================
import React from 'react'
import { MoonLoader } from 'react-spinners';

export default function LoadingAuth() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <MoonLoader size={20} color="#FFFFFF" />
    </div>
  );
}



================================================
FILE: src/components/Navbar.jsx
================================================
import React, { useContext, useEffect, useState, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { motion } from "framer-motion";
import img from "../assets/images/freshcart-logo.svg";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const { Token, setToken, decodedToken } = useContext(AuthContext);
  const { numOfCartItems, numOfWishlist, setNumOfWishlist, getUserWishlist } = useContext(CartContext);
  const [showUserData, setShowUserData] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const navigate = useNavigate();
  const userMenuRef = useRef();
  const userButtonRef = useRef();

    // useEffect(() => {
    //   console.log("useEffect in navbar");
    //   // getUserWishlist()
    //   setNumOfWishlist()
    // },[])


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    if (decodedToken?.id) {
      axios
        .get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`
        )
        .then((res) => setUserOrders(res.data))
        .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [decodedToken]);

  useEffect(() => {
    if (!showUserData) return;
    function handleClickOutside(event) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        setShowUserData(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showUserData]);

  function handelLogout() {
    localStorage.removeItem("tkn");
    setToken(null);
    setDarkMode(null);
    setNumOfWishlist(0);
    toast.success("You are welcome anytime", { position: "top-left" });
    navigate("/login");
  }

  return (
    <nav className="text-[#909090] bg-[#f0f3f2] dark:bg-gray-900 dark:backdrop-blur shadow-md transition-colors duration-500 border-b-[0.5px] border-white dark:border-gray-700">
      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and Hamburger */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-2xl text-gray-600 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
            <img src={img} alt="logo" className="h-12 w-auto max-sm:w-[70%]" />
          </div>

          {/* Middle Section - Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {Token && (
              <ul className="flex items-center gap-6">
                <li>
                  <NavLink
                    to="/Home"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Products"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Categories"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Brands"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Dashboard"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Dashboard
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          {/* Right Section - Icons and User */}
          <div className="flex items-center gap-4 max-lg:ml-4">
            <div className="hidden md:flex items-center gap-4 ">
              {/* Social Media Icons */}
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a
                  href="#"
                  className="text-xl text-black dark:text-white hover:text-[#0aad0a]"
                >
                  <i className="fa-brands fa-tiktok"></i>
                </a>
              </div>

              {Token && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md"
                  >
                    {darkMode ? "🌑" : "🌞"}
                  </motion.button>

                  <Link to="/wishlist" className="relative">
                    <i className="fa-solid fa-heart text-xl text-black dark:text-white"></i>
                    {numOfWishlist > 0 && (
                      <span className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full text-white bg-[#0aad0a]">
                        {numOfWishlist}
                      </span>
                    )}
                  </Link>

                  <Link to="/cart" className="relative">
                    <i className="fa-solid fa-cart-shopping text-xl text-black dark:text-white"></i>
                    {numOfCartItems > 0 && (
                      <span className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full text-white bg-[#0aad0a]">
                        {numOfCartItems}
                      </span>
                    )}
                  </Link>
                </>
              )}
            </div>

            {/* User Section */}
            <div className="flex items-center gap-2">
              {Token ? (
                <div className="relative flex items-center gap-2">
                  <button
                    ref={userButtonRef}
                    onClick={() => setShowUserData((prev) => !prev)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                  >
                    <i className="fa-solid fa-user text-[#0aad0a]"></i>
                  </button>

                  {showUserData && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="absolute right-0 top-full mt-3 w-80 rounded-2xl shadow-2xl z-50 overflow-hidden ring-1 ring-[#0aad0a]/10 border border-gray-100 dark:border-gray-700"
                      ref={userMenuRef}
                    >
                      {/* الجزء العلوي: بيانات المستخدم */}
                      <div className="flex flex-col items-center gap-2 p-6 bg-gradient-to-br from-[#0aad0a]/90 via-[#e8fbe8] to-[#b2f2bb] dark:bg-gray-800">
                        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white border-4 border-[#0aad0a] shadow-lg text-[#0aad0a] text-4xl font-extrabold mb-2">
                          {userOrders[0]?.user?.name?.charAt(0)?.toUpperCase() || <i className='fa-solid fa-user'></i>}
                        </div>
                        <p className="text-xl font-bold text-[#0aad0a] dark:text-[#b2f2bb]">{userOrders[0]?.user?.name || "No Name"}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">{userOrders[0]?.user?.email || "No Email"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{userOrders[0]?.user?.phone || "No Phone"}</p>
                      </div>
                      {/* فاصل ملون */}
                      <div className="h-2 w-full bg-gradient-to-r from-[#0aad0a] via-[#b2f2bb] to-[#e8fbe8] dark:bg-gray-700"></div>
                      {/* الجزء السفلي: الأزرار */}
                      <div className="flex flex-col gap-2 p-5 bg-white dark:bg-gray-900">
                        <Link
                          to="/Profile"
                          className="w-full text-center py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 mb-1 shadow"
                          onClick={() => setShowUserData(false)}
                        >
                          <i className="fa-solid fa-user"></i> My Profile
                        </Link>
                        <Link
                          to="/ChangeMyPassword"
                          className="w-full text-center py-2 rounded-lg text-sm font-semibold text-white bg-[#0aad0a] hover:bg-[#099409] dark:bg-[#14532d] dark:hover:bg-[#0aad0a] transition-colors flex items-center justify-center gap-2 mb-1 shadow"
                          onClick={() => setShowUserData(false)}
                        >
                          <i className="fa-solid fa-key"></i> Change Password
                        </Link>
                        <button
                          onClick={handelLogout}
                          className="w-full text-center py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-red-500 via-red-400 to-red-600 hover:from-red-600 hover:to-red-700 dark:from-red-700 dark:to-red-900 transition-colors flex items-center justify-center gap-2 shadow"
                        >
                          <i className="fas fa-sign-out-alt"></i> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex gap-4 justify-center items-center max-sm:ml-4">
                  <NavLink
                    to="/Login"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/Register"
                    className="hover:text-[#0aad0a] transition-colors"
                  >
                    Register
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {Token && (
              <div className="flex flex-col gap-4">
                <NavLink
                  to="/Home"
                  className="py-2 hover:text-[#0aad0a] active"
                >
                  Home
                </NavLink>
                <NavLink to="/Products" className="py-2 hover:text-[#0aad0a]">
                  Products
                </NavLink>
                <NavLink to="/Categories" className="py-2 hover:text-[#0aad0a]">
                  Categories
                </NavLink>
                <NavLink to="/Brands" className="py-2 hover:text-[#0aad0a]">
                  Brands
                </NavLink>
                <NavLink to="/Dashboard" className="py-2 hover:text-[#0aad0a]">
                  Dashboard
                </NavLink>
                <NavLink to="/Profile" className="py-2 hover:text-[#0aad0a]">
                  My Profile
                </NavLink>

                <div className="flex items-center gap-4 justify-between">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full"
                  >
                    {darkMode ? "🌑" : "🌞"}
                  </motion.button>

                  <div className="flex gap-4">
                    <Link to="/wishlist" className="relative">
                      <i className="fa-solid fa-heart text-xl"></i>
                      {numOfWishlist > 0 && (
                        <span className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full text-white bg-[#0aad0a]">
                          {numOfWishlist}
                        </span>
                      )}
                    </Link>
                    <Link to="/cart" className="relative">
                      <i className="fa-solid fa-cart-shopping text-xl"></i>
                      {numOfCartItems > 0 && (
                        <span className="absolute -top-2 -right-2 px-2 py-1 text-xs rounded-full text-white bg-[#0aad0a]">
                          {numOfCartItems}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-4 justify-center">
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="#" className="text-2xl">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}



================================================
FILE: src/components/NotFound.jsx
================================================
import React from 'react'
import notFound from '../assets/images/error.svg'
export default function NotFound() {
  return (
    <>
      <div className='flex justify-center items-center p-3 dark:bg-slate-900'>
        <img src={notFound} alt="" />
      </div>
    </>
  )
}



================================================
FILE: src/components/OfflineMessage.jsx
================================================
import React from "react";

const OfflineMessage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-red-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          You're Offline
        </h2>
        <p className="text-gray-600 mb-4">
          Please check your internet connection and try again.
        </p>
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default OfflineMessage;



================================================
FILE: src/components/ProductCard.jsx
================================================
import React from 'react';
import ComponentErrorBoundary from './ComponentErrorBoundary';

const ProductCard = ({ product }) => {
  if (!product) {
    throw new Error('Product data is required');
  }

  return (
    <ComponentErrorBoundary 
      fallback={
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">Product unavailable</p>
        </div>
      }
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
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
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {product.rating || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ComponentErrorBoundary>
  );
};

export default ProductCard; 


================================================
FILE: src/context/AuthContext.jsx
================================================
import { useEffect, useState, createContext } from "react";
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export default function CreateContextProvider({ children }) {
  const [Token, setToken] = useState(null );
  // const [darkMode, setDarkMode] = useState(true);
  const [decodedToken, setDecodedToken] = useState(null);
  // console.log(Token);
  

  useEffect(() => {
    const userToken = localStorage.getItem("tkn");
    const darkMode = localStorage.getItem("theme");
    // console.log("darkMode", darkMode);
    // console.log("userToken", userToken);
    

    if (userToken) {
      setToken(userToken);

      // setDarkMode(true);
      try {
        const decoded = jwtDecode(userToken); // فك التوكن واستخراج البيانات
        // console.log("decoded", decoded.id);
        setDecodedToken(decoded); // تخزين البيانات المفكوكة
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ Token, setToken, decodedToken }}>
      {children}
    </AuthContext.Provider>
  );
}



================================================
FILE: src/context/CartContext.jsx
================================================
[Binary file]


================================================
FILE: src/hooks/useBrands.jsx
================================================
import { useQuery } from "react-query";
import { productService } from "../services";

export default function useBrands() {
  const res = useQuery({
    queryKey: ["brands"],
    queryFn: productService.getAllBrands,
  });

  return res;
} 


================================================
FILE: src/hooks/useCategories.jsx
================================================
import { useQuery } from "react-query";
import { productService } from "../services";

export default function useCategories() {
  const res = useQuery({
    queryKey: ["getCategories"],
    queryFn: productService.getAllCategories,
  });

  return res;
}



================================================
FILE: src/hooks/useErrorHandler.jsx
================================================
import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useErrorHandler = () => {
  const [errors, setErrors] = useState([]);

  const handleError = useCallback((error, context = '') => {
    console.error(`Error in ${context}:`, error);

    let errorMessage = 'An unexpected error occurred';
    let errorType = 'error';

    // Handle different types of errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          errorMessage = data?.message || 'Bad request. Please check your input.';
          errorType = 'warning';
          break;
        case 401:
          errorMessage = 'Please log in to continue.';
          errorType = 'warning';
          break;
        case 403:
          errorMessage = 'You don\'t have permission to perform this action.';
          errorType = 'error';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          errorType = 'info';
          break;
        case 422:
          errorMessage = data?.message || 'Validation error. Please check your input.';
          errorType = 'warning';
          break;
        case 429:
          errorMessage = 'Too many requests. Please try again later.';
          errorType = 'warning';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          errorType = 'error';
          break;
        default:
          errorMessage = data?.message || `Server error (${status})`;
          errorType = 'error';
      }
    } else if (error.request) {
      // Network error
      errorMessage = 'Network error. Please check your connection.';
      errorType = 'error';
    } else if (error.message) {
      // Other errors
      errorMessage = error.message;
      errorType = 'error';
    }

    // Add error to state
    const newError = {
      id: Date.now(),
      message: errorMessage,
      type: errorType,
      context,
      timestamp: new Date().toISOString(),
      originalError: error
    };

    setErrors(prev => [...prev, newError]);

    // Show toast notification
    toast[errorType](errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    return newError;
  }, []);

  const clearError = useCallback((errorId) => {
    setErrors(prev => prev.filter(error => error.id !== errorId));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const getErrorsByType = useCallback((type) => {
    return errors.filter(error => error.type === type);
  }, [errors]);

  const hasErrors = errors.length > 0;
  const hasErrorType = useCallback((type) => {
    return errors.some(error => error.type === type);
  }, [errors]);

  return {
    errors,
    handleError,
    clearError,
    clearAllErrors,
    getErrorsByType,
    hasErrors,
    hasErrorType
  };
}; 


================================================
FILE: src/hooks/UseForgetPass.jsx
================================================
import { useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { authService } from "../services";
import { forgetPasswordValidationSchema } from "../validation/authValidation";

export default function UseForgetPass() {
    const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);

  const handelForgetPass = (values) => {
    setLoading(true);
    authService.forgetPassword(values.email)
      .then((data) => {
        console.log(data);
        
        setLoading(false);
        toast.success("Check your email");
        setTimeout(() => {
          navigate("/VerifyResetCode");
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response?.data?.message || "An error occurred.");
      });
  };

  const ForgetPasswordFormik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      handelForgetPass(values);
    },
    validationSchema: forgetPasswordValidationSchema,
  });

  return { Loading, ForgetPasswordFormik };
}



================================================
FILE: src/hooks/UseLogin.jsx
================================================
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { authService } from "../services";
import { loginValidationSchema } from "../validation/authValidation";


export default function UseForgetPass() {
  const navigate = useNavigate();
  const [Showing, setShowing] = useState(false);
  const [Loading, setLoading] = useState(true);
  const { setToken } = useContext(AuthContext)
  
  const { getUserCart, getUserWishlist } = useContext(CartContext);

const handelLogin = (values) => {
    setLoading(false);
    authService.login(values)
      .then((data) => {
        localStorage.setItem("tkn",data.data.token);
        setToken(data.data.token);
        getUserCart()
        getUserWishlist()
        setLoading(false);
        toast.success("Successfully signed in ");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((error) => {
        setLoading(true);
        toast.error(error.response?.data?.message || "An error occurred.");
      });
  };  

  const LoginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handelLogin(values);
    },
    validationSchema: loginValidationSchema,
  });

  return { Loading,Showing,setShowing, LoginFormik };
}



================================================
FILE: src/hooks/useProduct.jsx
================================================
import { useQuery } from "react-query";
import { productService } from "../services";

export default function useProduct() {
  const res = useQuery({
    queryKey: ["allProduct"],
    queryFn: productService.getAllProducts,
  });

  return res;
}



================================================
FILE: src/hooks/useProductById.jsx
================================================
import { useQuery } from "react-query";
import { productService } from "../services";

export default function useProductById(productId) {
  const res = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.getProductById(productId),
    enabled: !!productId, // Only run query if productId exists
  });

  return res;
} 


================================================
FILE: src/hooks/UseRegister.jsx
================================================
import { useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { authService } from "../services";
import { registerValidationSchema } from "../validation/authValidation";

export default function UseRegister() {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);

  const handelRegister = (values) => {
    setLoading(false);
    authService.register(values)
      .then((data) => {
        console.log('data', data)
        setLoading(false);
        toast.success("Successfully signed up ");
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      })
      .catch((error) => {
        setLoading(true);
        toast.error(error.response?.data?.message || "An error occurred.");
      });
  };

  const RegisterFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (values) => {
      handelRegister(values);
    },
    validationSchema: registerValidationSchema,
  });

  return { Loading, RegisterFormik };
}



================================================
FILE: src/hooks/UseResetCode.jsx
================================================
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { authService } from "../services";
import { resetCodeValidationSchema } from "../validation/authValidation";


export default function UseResetCode() {
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(true);
  const [Showing, setShowing] = useState(false);
    

    const handelResetCode = (values) => {
        setLoading(false);
        authService.verifyResetCode(values.resetCode)
                .then((data) => {
                  console.log(data)
                  setLoading(false);
                  toast.success("code is correct");
                  setTimeout(() => {
                    navigate("/ResetPassword");
                  }, 2000);
                })
                .catch((error) => {
                  toast.error(
                    error.response?.data?.message || "An error occurred."
                  );
                  setLoading(true);
                })
    }
    
    const VerifyResetCodeFormik = useFormik({
      initialValues: {
        resetCode: "",
      },
      onSubmit: (values) => {
        handelResetCode(values);
      },
      validationSchema: resetCodeValidationSchema,
    });

  return { Loading, VerifyResetCodeFormik };
}



================================================
FILE: src/hooks/UseResetPass.jsx
================================================

import { useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { authService } from "../services";
import { resetPasswordValidationSchema } from "../validation/authValidation";

export default function UseResetPass() {
      let navigate = useNavigate();
      const [Loading, setLoading] = useState(true);
      const [Showing, setShowing] = useState(false);
    
    const handelResetPassword = (values) => {
        setLoading(false);
        authService.resetPassword(values)
                .then((data) => {
                  console.log(data)
                  setLoading(false);
                  toast.success("password reset is done");
                  setTimeout(() => {
                    navigate("/home");
                  }, 2000);
                })
                .catch((error) => {
                  toast.error(`${error.response.data.message}`);
                  setLoading(true);
                })
    }
    const ResetPasswordFormik = useFormik({
      initialValues: {
        email: "",
        newPassword: "",
      },
      onSubmit: (values) => {
        handelResetPassword(values);
      },
      validationSchema: resetPasswordValidationSchema,
    });

  return { ResetPasswordFormik, Showing, setShowing, Loading };
}



================================================
FILE: src/layouts/Layout.jsx
================================================
import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom';
import Footer from './../components/Footer';

export default function Layout() {
    return (
        <>
        <Navbar />
        <Outlet/>
        <Footer/>
        </>
    );
}



================================================
FILE: src/layouts/ProtectedRoute.jsx
================================================
import { Navigate } from "react-router-dom";
import Login from './../pages/Authentication/Login';

export default function ProtectedRoute({children}) {

    if (localStorage.getItem('tkn') == null) {
        
        return <Navigate to='/Login'></Navigate>
    }

    return<>
        {children}
    </>;
}



================================================
FILE: src/pages/Authentication/ChangePassword.jsx
================================================
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { authService } from "../../services";
import { changePasswordValidationSchema } from "../../validation/authValidation";

export default function ChangeMyPassword() {
  let navigate = useNavigate();
  const [Loading, setLoading] = useState(true);
  const ChangeMyPasswordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    onSubmit: (values) => {
      setLoading(false);
      authService.changePassword(values)
        .then((data) => {
          setLoading(false);
          toast.success("Password updated successfully");
          setTimeout(() => {
            navigate("/ResetPassword");
          }, 2000);
          console.log("success", data);
        })
        .catch((error) => {
          toast.error(`${error.response.data.message}`);
          setLoading(true);
          console.log(error);
        });
    },
    validationSchema: changePasswordValidationSchema,

    validate: (errors) => {
      console.log(errors);
    },
  });

  // console.log(ChangeMyPasswordFormik.values);

  return (
    <>
      <form onSubmit={ChangeMyPasswordFormik.handleSubmit}>
        <div className="flex flex-col justify-center items-center p-5 ">
          <div className=" w-[70%] mb-3">
            <div className="my-2 text-xl">
              <h1>ChangeMyPassword New:</h1>
            </div>
            <label htmlFor="name">currentPassword:</label>
            <input
              value={ChangeMyPasswordFormik.values.currentPassword}
              onChange={ChangeMyPasswordFormik.handleChange}
              onBlur={ChangeMyPasswordFormik.handleBlur}
              id="currentPassword"
              type="text"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {ChangeMyPasswordFormik.errors.currentPassword && ChangeMyPasswordFormik.touched.currentPassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {ChangeMyPasswordFormik.errors.currentPassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" w-[70%] my-2">
            <label htmlFor="password">password:</label>
            <input
              value={ChangeMyPasswordFormik.values.password}
              onChange={ChangeMyPasswordFormik.handleChange}
              onBlur={ChangeMyPasswordFormik.handleBlur}
              id="password"
              type="password"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {ChangeMyPasswordFormik.errors.password &&
            ChangeMyPasswordFormik.touched.password &&
            ChangeMyPasswordFormik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {ChangeMyPasswordFormik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" w-[70%] my-2">
            <label htmlFor="rePassword">re-Password:</label>
            <input
              value={ChangeMyPasswordFormik.values.rePassword}
              onChange={ChangeMyPasswordFormik.handleChange}
              onBlur={ChangeMyPasswordFormik.handleBlur}
              id="rePassword"
              type="password"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {ChangeMyPasswordFormik.errors.rePassword &&
            ChangeMyPasswordFormik.touched.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {ChangeMyPasswordFormik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>
          
          <div className="w-[70%] flex justify-end items-center mt-3 ">
            <button
              type="submit"
              className="bg-[#0aad0a] text-white py-2 px-3 rounded"
            >
              {Loading ? (
                "ChangeMyPassword"
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <MoonLoader size={20} color="#FFFFFF" />
                </div>
              )}
            </button>
            <ToastContainer hideProgressBar="true" />
          </div>
        </div>
      </form>
    </>
  );
}



================================================
FILE: src/pages/Authentication/ForgetPassword.jsx
================================================
import React from "react";
import { MoonLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import UseForgetPass from "../../hooks/UseForgetPass";
import LoadingAuth from "../../components/LoadingAuth";

export default function ForgetPassword() {
  const { Loading, ForgetPasswordFormik } = UseForgetPass();

  return (
    <>
      <form onSubmit={ForgetPasswordFormik.handleSubmit}>
        <div className="flex flex-col justify-center items-center p-5">
          <div className="w-[70%] mb-3">
            <div className="my-2 text-xl">
              <h1>ForgetPassword:</h1>
            </div>
          </div>

          <div className="w-[70%]">
            <label htmlFor="email">Email:</label>
            <input
              value={ForgetPasswordFormik.values.email}
              onChange={ForgetPasswordFormik.handleChange}
              onBlur={ForgetPasswordFormik.handleBlur}
              id="email"
              type="email"
              className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm"
            />
            {ForgetPasswordFormik.errors.email &&
            ForgetPasswordFormik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {ForgetPasswordFormik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="w-[70%] flex justify-end items-center mt-3">
            <button
              type="submit"
              className="bg-[#0aad0a] text-white py-2 px-3 rounded"
            >
              {Loading ? (
                                <LoadingAuth/>
              ) : (
                "ForgetPassword"
              )}
            </button>
            <ToastContainer hideProgressBar="true" />
          </div>
        </div>
      </form>
    </>
  );
}



================================================
FILE: src/pages/Authentication/Login.jsx
================================================
import React from "react";
import { MoonLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { HiEye } from "react-icons/hi";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import UseLogin from './../../hooks/UseLogin';
import LoadingAuth from "../../components/LoadingAuth";

export default function Login() {
  const { Loading, Showing, setShowing, LoginFormik } = UseLogin();

  return (
    <>
      <form onSubmit={LoginFormik.handleSubmit}>
        <div className="flex flex-col justify-center items-center p-5">
          <div className="w-[70%] mb-3">
            <div className="my-2 text-xl">
              <h1>Login:</h1>
            </div>
          </div>

          <div className="w-[70%]">
            <label htmlFor="email">Email:</label>
            <input
              value={LoginFormik.values.email}
              onChange={LoginFormik.handleChange}
              onBlur={LoginFormik.handleBlur}
              id="email"
              type="email"
              className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm"
            />
            {LoginFormik.errors.email && LoginFormik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {LoginFormik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="w-[70%] my-2">
            <label htmlFor="password">Password:</label>
            <div className="relative">
              <input
                value={LoginFormik.values.password}
                onChange={LoginFormik.handleChange}
                onBlur={LoginFormik.handleBlur}
                id="password"
                type={Showing ? "text" : "password"}
                className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm pr-10"
              />

              {LoginFormik.values.password ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowing(!Showing);
                  }}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black"
                >
                  {Showing ? <HiEye /> : <HiMiniEyeSlash />}
                </button>
              ) : (
                ""
              )}
            </div>
            {/* <HiMiniEyeSlash /> مغلق */}
            {LoginFormik.errors.password && LoginFormik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {LoginFormik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="w-[70%] flex justify-end items-center mt-3">
            <button
              type="submit"
              className="bg-[#0aad0a] text-white py-2 px-3 rounded"
            >
              {Loading ? (
                "Login"
              ) : (
                <LoadingAuth/>
                  
              )}
            </button>

            <Link
              to="/ForgetPassword"
              type="submit"
              className="bg-[#0aad0a] text-white py-2 px-3 ml-4 rounded"
            >
              ForgetPassword
            </Link>

          </div>
        </div>
      </form>
    </>
  );
}



================================================
FILE: src/pages/Authentication/Register.jsx
================================================
import React from 'react'
import { MoonLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import UseRegister from './../../hooks/UseRegister';
import LoadingAuth from '../../components/LoadingAuth';


export default function Register() {
    const { Loading, RegisterFormik } = UseRegister();  
  
  return (
    <>
      <form onSubmit={RegisterFormik.handleSubmit}>
        <div className="flex flex-col justify-center items-center p-5 ">
          <div className=" w-[70%] mb-3">
            <div className="my-2 text-xl">
              <h1>Register New:</h1>
            </div>
            <label htmlFor="name">name:</label>
            <input
              value={RegisterFormik.values.name}
              onChange={RegisterFormik.handleChange}
              onBlur={RegisterFormik.handleBlur}
              id="name"
              type="text"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {RegisterFormik.errors.name && RegisterFormik.touched.name ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {RegisterFormik.errors.name}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className=" w-[70%]">
            <label htmlFor="email">email:</label>
            <input
              value={RegisterFormik.values.email}
              onChange={RegisterFormik.handleChange}
              onBlur={RegisterFormik.handleBlur}
              id="email"
              type="email"
              placeholder="exe123@exe.com"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {RegisterFormik.errors.email && RegisterFormik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {RegisterFormik.errors.email}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" w-[70%] my-2">
            <label htmlFor="password">password:</label>
            <input
              value={RegisterFormik.values.password}
              onChange={RegisterFormik.handleChange}
              onBlur={RegisterFormik.handleBlur}
              id="password"
              type="password"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {RegisterFormik.errors.password &&
            RegisterFormik.touched.password &&
            RegisterFormik.touched.password ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {RegisterFormik.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" w-[70%] my-2">
            <label htmlFor="rePassword">re-Password:</label>
            <input
              value={RegisterFormik.values.rePassword}
              onChange={RegisterFormik.handleChange}
              onBlur={RegisterFormik.handleBlur}
              id="rePassword"
              type="password"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {RegisterFormik.errors.rePassword &&
            RegisterFormik.touched.rePassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {RegisterFormik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className=" w-[70%]">
            <label htmlFor="phone">phone:</label>
            <input
              value={RegisterFormik.values.phone}
              onChange={RegisterFormik.handleChange}
              onBlur={RegisterFormik.handleBlur}
              id="phone"
              type="tel"
              className=" w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300  focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm/6"
            />
            {RegisterFormik.errors.phone && RegisterFormik.touched.phone ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
                role="alert"
              >
                {RegisterFormik.errors.phone}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="w-[70%] flex justify-end items-center mt-3 ">
            <button
              type="submit"
              className="bg-[#0aad0a] text-white py-2 px-3 rounded"
            >
              {Loading ? (
                "Register"
              ) : (
                                <LoadingAuth/>
              )}
            </button>
            <ToastContainer hideProgressBar="true" />
          </div>
        </div>
      </form>
    </>
  );
}



================================================
FILE: src/pages/Authentication/ResetPassword.jsx
================================================
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { HiEye } from "react-icons/hi";
import { HiMiniEyeSlash } from "react-icons/hi2";
import UseResetPass from './../../hooks/UseResetPass';
import LoadingAuth from "../../components/LoadingAuth";

export default function ResetPassword() {

const { ResetPasswordFormik, Showing,setShowing, Loading } = UseResetPass();

  return (
    <>
      <form onSubmit={ResetPasswordFormik.handleSubmit}>
        <div className="flex flex-col justify-center items-center p-5">
          <div className="w-[70%] mb-3">
            <div className="my-2 text-xl">
              <h1>ResetPassword:</h1>
            </div>
          </div>

          <div className="w-[70%]">
            <label htmlFor="email">Email:</label>
            <input
              value={ResetPasswordFormik.values.email}
              onChange={ResetPasswordFormik.handleChange}
              onBlur={ResetPasswordFormik.handleBlur}
              id="email"
              type="email"
              className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm"
            />
            {ResetPasswordFormik.errors.email && ResetPasswordFormik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {ResetPasswordFormik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="w-[70%] my-2">
            <label htmlFor="newPassword">newPassword:</label>
            <div className="relative">
              <input
                value={ResetPasswordFormik.values.newPassword}
                onChange={ResetPasswordFormik.handleChange}
                onBlur={ResetPasswordFormik.handleBlur}
                id="newPassword"
                type={Showing ? "text" : "password"}
                className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm pr-10"
              />

              {ResetPasswordFormik.values.newPassword ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowing(!Showing);
                  }}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black"
                >
                  {Showing ? <HiEye /> : <HiMiniEyeSlash />}
                </button>
              ) : (
                ""
              )}
            </div>
            {/* <HiMiniEyeSlash /> مغلق */}
            {ResetPasswordFormik.errors.newPassword && ResetPasswordFormik.touched.newPassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {ResetPasswordFormik.errors.newPassword}
              </div>
            ) : null}
          </div>

          <div className="w-[70%] flex justify-end items-center mt-3">
            <button
              type="submit"
              className="bg-[#0aad0a] text-white py-2 px-3 rounded"
            >
              {Loading ? (
                "Login"
              ) : (
                                <LoadingAuth/>
              )}
            </button>

            <ToastContainer hideProgressBar="true" />
          </div>
        </div>
      </form>
    </>
  );
}



================================================
FILE: src/pages/Authentication/VerifyResetCode.jsx
================================================
import React, { useState } from "react";
import { MoonLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import UseResetCode from "../../hooks/UseResetCode";
import LoadingAuth from "../../components/LoadingAuth";


export default function VerifyResetCode() {
const { Loading, Showing, VerifyResetCodeFormik } = UseResetCode();

  return (
    <>
      <form onSubmit={VerifyResetCodeFormik.handleSubmit}>
        <div className="flex flex-col justify-center items-center p-5">
          <div className="w-[70%] mb-3">
            <div className="my-2 text-xl">
              <h1>VerifyResetCode:</h1>
            </div>
          </div>
          <div className="w-[70%] my-2">
            <label htmlFor="resetCode">Code:</label>
            <div className="relative">
              <input
                value={VerifyResetCodeFormik.values.resetCode}
                onChange={VerifyResetCodeFormik.handleChange}
                onBlur={VerifyResetCodeFormik.handleBlur}
                id="resetCode"
                type={Showing ? "password" : "text"}
                className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm pr-10"
              />

              {/* {VerifyResetCodeFormik.values.resetCode ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowing(!Showing);
                  }}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black"
                >
                  {Showing ? <HiMiniEyeSlash /> : <HiEye />}
                </button>
              ) : (
                ""
              )} */}
            </div>
            {/* <HiMiniEyeSlash /> مغلق */}
            {VerifyResetCodeFormik.errors.resetCode &&
            VerifyResetCodeFormik.touched.resetCode ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {VerifyResetCodeFormik.errors.resetCode}
              </div>
            ) : null}
          </div>

          <div className="w-[70%] flex justify-end items-center mt-3">
            <button
              type="submit"
              className="bg-[#0aad0a] text-white py-2 px-3 rounded"
            >
              {Loading ? (
                "VerifyResetCode"
              ) : (
                <LoadingAuth/>
              )}
            </button>
            <ToastContainer hideProgressBar="true" />
          </div>
        </div>
      </form>
    </>
  );
}



================================================
FILE: src/pages/Cart/AllOrders.jsx
================================================
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";

export default function AllOrders() {
  const { decodedToken } = useContext(AuthContext); // User data
  const [orders, setOrders] = useState([]); // Initialize orders array
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch orders
  const fetchAllOrders = () => {
    if (!decodedToken?.id) {
      console.error("User is not logged in or data is unavailable");
      return;
    }

    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${decodedToken.id}`
      )
      .then((res) => {
        console.log('res all',res)
        setOrders(res.data || []); // Set data or empty array if no data
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setOrders([]); // Set empty array in case of error
      })
      .finally(() => {
        setLoading(false); // Stop loading state
      });
  };

  // Call fetch when decodedToken is ready
  useEffect(() => {
    if (decodedToken?.id) {
      fetchAllOrders();
    }
  }, [decodedToken]);

  // Filter orders by payment method
  const cashOrders = orders.filter(
    (order) => order.paymentMethodType === "cash"
  );
  const cardOrders = orders.filter(
    (order) => order.paymentMethodType === "card"
  );

  return (
    <div className="p-6 min-h-screen w-[90%] mx-auto">
      <h1 className="text-2xl  mb-6 text-gray-800">All Orders</h1>

      {loading ? (
        <Loading />
      ) : orders && orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cash Orders Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-green-700">
              Cash Orders
            </h2>
            {cashOrders.length > 0 ? (
              <div className="grid gap-6">
                {cashOrders.map((order) =>
                  order.cartItems.map((item, index) => (
                    <div
                      key={`${order.id}-${index}`}
                      className="border p-4 rounded-lg shadow-md bg-white flex items-center justify-around 
                          transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                    >
                      {/* {console.log("order", order)} */}

                      <div className="w-[20%]">
                        {/* {console.log("item", item.product)} */}
                        <img
                          src={item.product.imageCover}
                          className=" h-32 object-cover w-full "
                          alt={item.product.title}
                        />
                      </div>
                      <div className="w-[70%]">
                        <h2 className="text-md font-semibold text-blue-600">
                          {item.product.category.name}
                        </h2>
                        <p className="text-sx text-[#0aad0a] my-2">
                          {item.product.title}
                        </p>
                        <p className="text-sm font-bold text-gray-600">
                          Price: {item.price} EGP
                        </p>
                        <p className="text-sm text-gray-600">
                          <i className="fa-solid fa-star text-yellow-500"></i>{" "}
                          {item.product.ratingsAverage}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-gray-600">No cash orders available.</p>
            )}
          </div>

          {/* Card Orders Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-blue-700">
              Card Orders
            </h2>
            {cardOrders.length > 0 ? (
              <div className="grid gap-6">
                {cardOrders.map((order) =>
                  order.cartItems.map((item, index) => (
                    <div
                      key={`${order.id}-${index}`}
                      className="border p-4 rounded-lg shadow-md bg-white flex items-center justify-around 
  transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                    >
                      {/* {console.log(order.product)} */}
                      <div className="w-[20%]">
                        <img
                          src={item.product.imageCover}
                          className=" h-32 object-cover  w-full"
                          alt={item.product.title}
                        />
                      </div>
                      <div className="w-[70%]">
                        <h2 className="text-md font-semibold text-blue-600">
                          {item.product.category.name}
                        </h2>
                        <p className="text-sx text-[#0aad0a] my-2">
                          {item.product.title}
                        </p>
                        <p className="text-sm font-bold text-gray-600">
                          Price: {item.price} EGP
                        </p>

                        <p className="text-sm text-gray-600">
                          <i className="fa-solid fa-star text-yellow-500"></i>{" "}
                          {item.product.ratingsAverage}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-gray-600">No card orders available.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No orders available yet.</p>
      )}
    </div>
  );
}



================================================
FILE: src/pages/Cart/Cart.jsx
================================================
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext';
import Loading from '../../components/Loading';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
    const {
      addProductToCart,
      totalCartPrice,
      handelButton,
      DeleteProduct,
      RemoveItems,
      productId,
    } = useContext(CartContext);

  // useEffect(() => {
  //   setAddProductToCart();
  //   setNumOfCartItems();
  //   setTotalCartPrice();
  //   setCartId();
  // }, []);

    // console.log(localStorage.getItem('tkn'));
  function RemoveAllProduct() {
    
    // setAddProductToCart()
    RemoveItems()
    // console.log(x)
  }
    // console.log(localStorage.getItem("tkn"));



  async  function handelBtnCount(productId, newCount) {
    const res = await handelButton(productId, newCount);
    if (res == true) {
      toast.success("Product updated successfully");
    }
    else {
    toast.error("update failed");
    }
  }

console.log('productId',productId);

  async function RemoveProduct(productId) {
    const res = await DeleteProduct(productId);
    if (res == true) {
      toast.success("Product Removed successfully");
    } else {
      toast.error("update failed");
    }
  }


  

  return (
    <>
      <div>
        {addProductToCart || [] ? (
          <div className="dark:bg-slate-900  py-3 ">
            {addProductToCart || [] ? (
              <div className="rounded-xl ">
                <div>
                  {console.log("addProductToCart", addProductToCart)}
                  <div
                    className=" py-4 px-4 mb-3 container shadow-md rounded-xl w-[90%]  mx-auto flex justify-between items-center
                    bg-[#f0f3f2]"
                  >
                    <div>
                      <h1 className="text-xl">Shop Cart</h1>
                      <h3 className="text-[#0aad0a]">
                        Total Cart Price : {totalCartPrice}
                        <span className="text-[#0aad0a] ml-1">EGP</span>
                      </h3>
                    </div>
                    <div className="text-red-500 cursor-pointer">
                      <button onClick={RemoveAllProduct}>
                        <i className="fa fa-trash text-red-500"></i> Remove All
                      </button>
                    </div>
                  </div>
                </div>

                {addProductToCart?.map((product) => (
                  <div
                    key={product._id}
                    className="container w-[90%] mx-auto mb-6 shadow-md rounded-xl bg-[#f0f3f2] dark:bg-[#2A3E4B]"
                  >
                    {/* {console.log(product)} */}
                    <div className=" flex justify-between items-center p-4">
                      <div className="flex justify-between items-center w-[70%] ">
                        <div className="mr-4 w-[10%]">
                          <img
                            src={product.product.imageCover}
                            alt={product.product.title}
                            className="w-full"
                          />
                        </div>
                        <div className="w-[90%] ">
                          <h3 className='dark:text-white'>{product.product.title}</h3>
                          {/* <h3>{product.product._id}id </h3> */}
                          <h5 className="text-[#0aad0a] my-2">
                            price :{product.price}
                          </h5>
                          <p
                            onClick={() => RemoveProduct(product.product._id)}
                            className="cursor-pointer text-red-500"
                          >
                            <i className="fa fa-trash text-red-500 mr-1"></i>
                            Remove
                          </p>
                        </div>
                      </div>
                      <div className=" flex justify-end items-center w-[25%]">
                        <button
                          className="px-2   border-2 border-[#0aad0a] rounded dark:text-white"
                          onClick={() =>
                            handelBtnCount(
                              product.product._id,
                              product.count + 1
                            )
                          }
                        >
                          +
                        </button>
                        <p className="mx-3">{product.count}</p>
                        {product.count === 1 ? (
                          <button className="p-3  border-2 border-[#0aad0a] bg-[#0aad0a] rounded"></button>
                        ) : (
                          <button
                            className="px-2  border-2 border-[#0aad0a] rounded  dark:text-white"
                            onClick={() =>
                              handelBtnCount(
                                product.product._id,
                                product.count - 1
                              )
                            }
                          >
                            -
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {/* {console.log(addProductToCart)} */}
                {addProductToCart && addProductToCart.length > 0 ? (
                  <div className="w-[90%] mx-auto text-center mb-4">
                    <Link
                      to="/Payment"
                      className="bg-[#0aad0a] w-1/4 mt-8  text-white rounded-xl p-4 transition-all duration-300 hover:bg-[#087508] hover:shadow-lg hover:scale-105"
                    >
                      Go to Payment
                    </Link>
                  </div>
                ) : null}
              </div>
            ) : (
              <Loading />
            )}
          </div>
        ) : (
          <Loading />
        )}

        <Toaster />
      </div>
    </>
  );
}



================================================
FILE: src/pages/Cart/Payment.jsx
================================================
    import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import LoadingAuth from "../../components/LoadingAuth";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { paymentValidationSchema } from "../../validation/authValidation";


    export default function Login() {
const navigate = useNavigate()
        const [LoadingCash, setLoadingCash] = useState(true);
        const [LoadingOrder ,setLoadingOrder]= useState(true)
        const [cashOrder ,setCashOrder]= useState(true)

      const { CartId, clearUI, } = useContext(CartContext);
      
      function detectOrder(value) {
        if (cashOrder) {
          createCashOrder(value);
          console.log("createCashOrder");

        } else {
          onlinePayment(value);
          console.log("online order");

        }
      }

        function createCashOrder(value) {
            setLoadingCash(false);
            console.log('cartID',CartId);
            const backendBody = {
                shippingAddress: value
            };
            axios
            .post(
                `https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,
                backendBody,
                {
                headers: { token: localStorage.getItem("tkn") },
                }
            )
            .then((res) => {
                console.log(res);
                setTimeout(() => {
                setLoadingCash(true);
                  toast.success("Order successfully")
                   navigate("/allOrders");
                }, 2000);
             
                clearUI()
            })
            .catch((error) => {
                console.log(error);
                setLoadingCash(true);
                toast.error("Order Failed");    
            })
      }
        function onlinePayment(value) {
            setLoadingOrder(false);
            console.log(value);
            const backendBody = {
                shippingAddress: value
            };
            axios
              .post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}`,
                backendBody,
                {
                  headers: { token: localStorage.getItem("tkn") },
                },
                {
                  params: { url: "http://localhost:3000" },
                }
              )
              .then((res) => {
                console.log(res);
                setTimeout(() => {
                  setLoadingOrder(true);
                  console.log("hello");
                  toast.success("Order online successfully ");
                }, 2000);
                window.open(res.data.session.url);

                clearUI();
              })
              .catch((error) => {
                console.log(error);
                setLoadingOrder(true);
                toast.error("Order Failed");
              });
      }


        const PaymentFormik = useFormik({
          initialValues: {
            details: "",
            phone: "",
            city: "",
          },
          validationSchema: paymentValidationSchema,
          onSubmit: detectOrder,
        });

    return (
      <>
        <form onSubmit={PaymentFormik.handleSubmit} className="dark:bg-gray-900 dark:text-white">
          <div className="flex flex-col justify-center items-center p-5">
            <div className="w-[70%] mb-3">
              <div className="my-2 text-xl">
                <h1>Cash Order :</h1>
              </div>
            </div>

            <div className="w-[70%]">
              <label htmlFor="details">details:</label>
              <input
                value={PaymentFormik.values.details}
                onChange={PaymentFormik.handleChange}
                onBlur={PaymentFormik.handleBlur}
                id="details"
                type="text"
                className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm"
              />
              {PaymentFormik.errors.details && PaymentFormik.touched.details ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  {PaymentFormik.errors.details}
                </div>
              ) : null}
            </div>

            <div className="w-[70%] my-2">
              <label htmlFor="phone">phone:</label>
              <input
                value={PaymentFormik.values.phone}
                onChange={PaymentFormik.handleChange}
                onBlur={PaymentFormik.handleBlur}
                id="phone"
                type="tel"
                className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm"
              />
              {PaymentFormik.errors.phone && PaymentFormik.touched.phone ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  {PaymentFormik.errors.phone}
                </div>
              ) : null}
            </div>

            <div className="w-[70%]">
              <label htmlFor="city">city:</label>
              <input
                value={PaymentFormik.values.city}
                onChange={PaymentFormik.handleChange}
                onBlur={PaymentFormik.handleBlur}
                id="city"
                type="tel"
                className="w-full rounded-md bg-white p-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#0aad0a] sm:text-sm"
              />
              {PaymentFormik.errors.city && PaymentFormik.touched.city ? (
                <div
                  className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                  role="alert"
                >
                  {PaymentFormik.errors.city}
                </div>
              ) : null}
            </div>

            <div className="w-[70%] flex justify-between items-center mt-3 ml-3">
              <div>
                <Link
                  to="/cart"
                  className="bg-[#0aad0a] text-white py-2 px-3 rounded mr-3"
                >
                  <i className="fa-solid fa-arrow-left mr-1"></i>
                  {/* <FontAwesomeIcon icon="fa-solid fa-arrow-left" /> */}
                  Back
                </Link>
              </div>
              <div>
                <button
                  onClick={() => {
                    setCashOrder(true);
                  }}
                  type="submit"
                  className="bg-[#0aad0a] text-white py-2 px-3 rounded"
                >
                  {/* Cash Order */}
                  {LoadingCash ? "Cash Order" : <LoadingAuth />}
                </button>

                <button
                  onClick={() => {
                    setCashOrder(false);
                  }}
                  type="submit"
                  className="bg-[#0aad0a] text-white mx-2 py-2 px-3 rounded"
                >
                  {/* Cash Order */}
                  {LoadingOrder ? "Online Order" : <LoadingAuth />}
                </button>
              </div>
            </div>
          </div>
        </form>
        <Toaster />
      </>
    );
    }



================================================
FILE: src/pages/Cart/Wishlist.jsx
================================================
import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import Loading from "../../components/Loading";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { addProductToWishlist, DeleteFromWishlist, getUserWishlist } =
    useContext(CartContext);
    // console.log("getUserWishlist", getUserWishlist());
  
  
  

  useEffect(() => {
    getUserWishlist
    console.log('my ahmed')
  }, []);

  async function RemoveFromWishlist(productId) {
    const res = await DeleteFromWishlist(productId);
    if (res == true) {
      toast.success("Product Removed successfully");
      await getUserWishlist(); // تحديث البيانات من الخادم
    } else {
      toast.error("update failed");
    }
  }

  return (
    <>
      <div className="dark:bg-slate-900 py-3">
        {addProductToWishlist ? (
          <div className="mb-3 rounded-xl">
            <div className="my-3">
              <div className="py-4 px-4 container shadow-md rounded-xl w-[90%]  mx-auto flex justify-between items-center bg-[#f0f3f2]">
                <div className="">
                  <h1 className="text-xl">Wishlist</h1>
                </div>
              </div>
            </div>

            {addProductToWishlist.map((product) => (
              <div
                key={product.id}
                className="container w-[90%] mx-auto mb-3 shadow-md rounded-xl bg-[#f0f3f2] dark:bg-[#2A3E4B]"
              >
                <div className="flex justify-between items-center p-4">
                  <div className="flex justify-between items-center w-[70%]">
                    <div className="mr-4 w-[10%]">
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full"
                      />
                    </div>
                    <div className="w-[90%]">
                      <h3 className=" dark:text-white">{product.title}</h3>
                      <h5 className="text-[#0aad0a] my-2">
                        Price: {product.price}
                      </h5>
                      <p
                        onClick={() => RemoveFromWishlist(product.id)}
                        className="cursor-pointer text-red-500"
                      >
                        <i className="fa fa-trash text-red-500 mr-1"></i>
                        Remove
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Loading />
        )}

        <Toaster />
      </div>
    </>
  );
}



================================================
FILE: src/pages/main/Brands.jsx
================================================
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



================================================
FILE: src/pages/main/Categories.jsx
================================================
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
          {Array(8) // عرض 8 بطاقات وهمية أثناء التحميل
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
              <div className="relative overflow-hidden">
                {/* طبقة التدرج اللوني */}
                <div className="absolute inset-0  from-white/50 to-transparent dark:from-gray-800/50 dark:to-transparent z-10"></div>
                {/* إطار حول الصورة */}
                <div className="absolute inset-0 border-4 border-white/20 dark:border-gray-800/20 rounded-md"></div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-80 object-cover rounded-md transform group-hover:rotate-x-6 group-hover:rotate-y-6 group-hover:scale-110 transition-all duration-300 ease-in-out"
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



================================================
FILE: src/pages/main/Dashbord.jsx
================================================
import React, { useEffect, useState } from "react";
import { orderService } from "../../services";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import Loading from "../../components/Loading";
import {
  FaShoppingCart,
  FaDollarSign,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaBoxOpen,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { subDays, format } from "date-fns";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Statistics state variables
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [paidOrders, setPaidOrders] = useState(0);
  const [unpaidOrders, setUnpaidOrders] = useState(0);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [totalProductsSold, setTotalProductsSold] = useState(0);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await orderService.getAllOrders();
        setOrders(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate statistics when orders data changes
  useEffect(() => {
    if (orders.length > 0) {
      setTotalOrders(orders.length);

      const totalSales = orders.reduce(
        (sum, order) => sum + order.totalOrderPrice,
        0
      );
      setTotalSales(totalSales);
      setAverageOrderValue(totalSales / orders.length);

      const paidOrders = orders.filter((order) => order.isPaid).length;
      setPaidOrders(paidOrders);
      setUnpaidOrders(orders.length - paidOrders);

      const productSales = {};
      orders.forEach((order) => {
        order.cartItems.forEach((item) => {
          const productId = item.product._id;
          const productName = item.product.title;
          const quantity = item.count;
          if (!productSales[productId]) {
            productSales[productId] = { name: productName, quantity: 0 };
          }
          productSales[productId].quantity += quantity;
        });
      });

      const bestSellingProducts = Object.values(productSales).sort(
        (a, b) => b.quantity - a.quantity
      );
      setBestSellingProducts(bestSellingProducts.slice(0, 5));

      const totalProductsSold = Object.values(productSales).reduce(
        (sum, product) => sum + product.quantity,
        0
      );
      setTotalProductsSold(totalProductsSold);
    }
  }, [orders]);

  // Data for charts
  const barChartData = {
    labels: bestSellingProducts.map((product) => product.name),
    datasets: [
      {
        label: "Units Sold",
        data: bestSellingProducts.map((product) => product.quantity),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // حساب مبيعات آخر 7 أيام
  const last7Days = Array.from({ length: 7 }, (_, i) => format(subDays(new Date(), 6 - i), 'yyyy-MM-dd'));
  const salesLast7Days = last7Days.map(day => {
    const dayOrders = orders.filter(order => format(new Date(order.createdAt), 'yyyy-MM-dd') === day);
    return dayOrders.reduce((sum, order) => sum + order.totalOrderPrice, 0);
  });
  // بيانات Line chart
  const lineChartData = {
    labels: last7Days.map(day => format(new Date(day), 'dd MMM')),
    datasets: [
      {
        label: "Sales (EGP)",
        data: salesLast7Days,
        borderColor: "#0aad0a",
        backgroundColor: "rgba(10,173,10,0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#0aad0a",
        fill: true,
      },
    ],
  };
  // Pie chart لطريقة الدفع
  const paymentPieData = {
    labels: ["Cash", "Card"],
    datasets: [
      {
        data: [orders.filter(o => o.paymentMethodType === 'cash').length, orders.filter(o => o.paymentMethodType === 'card').length],
        backgroundColor: ["#b2f2bb", "#a0c4ff"],
        borderColor: ["#0aad0a", "#4361ee"],
        borderWidth: 2,
      },
    ],
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600 mt-10">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e8fbe8] to-[#a0c4ff] dark:bg-[#0f172a] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#0f172a] dark:to-[#0f172a] py-8 px-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-[#14532d] dark:text-white tracking-tight text-center drop-shadow-lg px-4">
          Dashboard
        </h1>
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {/* Total Orders */}
          <motion.div whileHover={{ scale: 1.03 }} className="rounded-xl shadow bg-gradient-to-br from-[#e0f2fe] to-[#b2f2bb] dark:bg-[#0f172a] p-4 sm:p-5 flex flex-col items-center border border-[#e0e0e0] dark:border-gray-700 transition-all duration-300">
            <FaShoppingCart className="text-3xl text-[#4361ee] bg-[#e0f2fe] p-2 rounded-full shadow mb-2" />
            <span className="text-base font-semibold text-gray-700 dark:text-white">Total Orders</span>
            <span className="text-2xl font-extrabold text-[#14532d] dark:text-[#b2f2bb]">{totalOrders}</span>
          </motion.div>
          {/* Total Sales */}
          <motion.div whileHover={{ scale: 1.03 }} className="rounded-xl shadow bg-gradient-to-br from-[#b2f2bb] to-[#a0c4ff] dark:bg-[#0f172a] p-4 sm:p-5 flex flex-col items-center border border-[#e0e0e0] dark:border-gray-700 transition-all duration-300">
            <FaDollarSign className="text-3xl text-[#0aad0a] bg-[#b2f2bb] p-2 rounded-full shadow mb-2" />
            <span className="text-base font-semibold text-gray-700 dark:text-white">Total Sales</span>
            <span className="text-2xl font-extrabold text-[#0aad0a]">{totalSales.toLocaleString()} EGP</span>
          </motion.div>
          {/* Paid Orders */}
          <motion.div whileHover={{ scale: 1.03 }} className="rounded-xl shadow bg-gradient-to-br from-[#e0f2fe] to-[#b2f2bb] dark:bg-[#0f172a] p-4 sm:p-5 flex flex-col items-center border border-[#e0e0e0] dark:border-gray-700 transition-all duration-300">
            <FaCheckCircle className="text-3xl text-[#43e97b] bg-[#e0f2fe] p-2 rounded-full shadow mb-2" />
            <span className="text-base font-semibold text-gray-700 dark:text-white">Paid Orders</span>
            <span className="text-2xl font-extrabold text-[#43e97b]">{paidOrders}</span>
          </motion.div>
          {/* Unpaid Orders */}
          <motion.div whileHover={{ scale: 1.03 }} className="rounded-xl shadow bg-gradient-to-br from-[#f8fafc] to-[#a0c4ff] dark:bg-[#0f172a] p-4 sm:p-5 flex flex-col items-center border border-[#e0e0e0] dark:border-gray-700 transition-all duration-300">
            <FaTimesCircle className="text-3xl text-[#ff5858] bg-[#f8fafc] p-2 rounded-full shadow mb-2" />
            <span className="text-base font-semibold text-gray-700 dark:text-white">Unpaid Orders</span>
            <span className="text-2xl font-extrabold text-[#ff5858]">{unpaidOrders}</span>
          </motion.div>
        </div>
        {/* Last Orders Table */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="bg-white dark:bg-[#0f172a] rounded-xl shadow-xl p-4 sm:p-6 mb-10 border border-[#e0e0e0] dark:border-gray-700">
          <h2 className="text-lg font-bold mb-4 text-[#14532d] dark:text-white">Last Orders</h2>
          
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Order ID</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Customer</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Total</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Payment</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 8).map((order) => (
                  <tr key={order._id} className="hover:bg-[#b2f2bb]/30 dark:hover:bg-[#0aad0a]/10 transition-all">
                    <td className="px-4 py-2 font-mono text-xs text-gray-700 dark:text-gray-200">{order._id.slice(-6)}</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      <div className="font-bold">{order.user?.name}</div>
                      <div className="text-xs text-gray-500">{order.user?.email}</div>
                    </td>
                    <td className="px-4 py-2 text-[#0aad0a] font-bold">{order.totalOrderPrice} EGP</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.paymentMethodType === 'cash' ? 'bg-[#b2f2bb] text-[#14532d]' : 'bg-[#a0c4ff] text-[#185a9d]'}`}>
                        {order.paymentMethodType}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.isPaid ? 'bg-[#b2f2bb] text-[#14532d]' : 'bg-[#ffe0e0] text-[#ff5858]'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                      </span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${order.isDelivered ? 'bg-[#a0c4ff] text-[#185a9d]' : 'bg-gray-100 text-gray-700'}`}>
                        {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden space-y-4">
            {orders.slice(0, 8).map((order) => (
              <div key={order._id} className="bg-gray-50 dark:bg-[#0f172a] rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-mono text-sm text-gray-600 dark:text-gray-300">#{order._id.slice(-6)}</span>
                      <span className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="mb-2">
                      <div className="font-semibold text-gray-900 dark:text-white">{order.user?.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{order.user?.email}</div>
                    </div>
                    <div className="text-lg font-bold text-[#0aad0a]">{order.totalOrderPrice} EGP</div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.paymentMethodType === 'cash' ? 'bg-[#b2f2bb] text-[#14532d]' : 'bg-[#a0c4ff] text-[#185a9d]'}`}>
                      {order.paymentMethodType}
                    </span>
                    <div className="flex flex-col space-y-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.isPaid ? 'bg-[#b2f2bb] text-[#14532d]' : 'bg-[#ffe0e0] text-[#ff5858]'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.isDelivered ? 'bg-[#a0c4ff] text-[#185a9d]' : 'bg-gray-100 text-gray-700'}`}>
                        {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="bg-white dark:bg-[#0f172a] rounded-xl shadow-xl p-4 sm:p-6 border border-[#e0e0e0] dark:border-gray-700">
            <h2 className="text-lg font-bold mb-4 text-[#14532d] dark:text-white">Sales Last 7 Days</h2>
            <div className="h-64 sm:h-80">
              <Line 
                data={lineChartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: {
                      ticks: {
                        maxRotation: 45,
                        minRotation: 45
                      }
                    }
                  }
                }} 
              />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="bg-white dark:bg-[#0f172a] rounded-xl shadow-xl p-4 sm:p-6 border border-[#e0e0e0] dark:border-gray-700">
            <h2 className="text-lg font-bold mb-4 text-[#14532d] dark:text-white">Top 5 Best Selling Products</h2>
            <div className="h-64 sm:h-80">
              <Bar 
                data={barChartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    x: {
                      ticks: {
                        maxRotation: 45,
                        minRotation: 45
                      }
                    }
                  }
                }} 
              />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="bg-white dark:bg-[#0f172a] rounded-xl shadow-xl p-4 sm:p-6 border border-[#e0e0e0] dark:border-gray-700 lg:col-span-2">
            <h2 className="text-lg font-bold mb-4 text-[#14532d] dark:text-white">Payment Methods</h2>
            <div className="flex justify-center">
              <div className="w-48 sm:w-64 h-48 sm:h-64">
                <Doughnut 
                  data={paymentPieData} 
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    cutout: '70%', 
                    plugins: { 
                      legend: { 
                        position: 'bottom',
                        labels: {
                          padding: 20,
                          usePointStyle: true
                        }
                      } 
                    } 
                  }} 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}



================================================
FILE: src/pages/main/Home.jsx
================================================
import React, { useContext, useEffect, useState, useMemo } from "react";
import img1 from "../../assets/images/slider-2.jpeg";
import img2 from "../../assets/images/grocery-banner-2.jpeg";
import HomeSlider from "../../components/HomeSlider";
import HomeCategory from "./../../components/HomeCategory";
import useProduct from "./../../hooks/useProduct";
import { Link } from "react-router-dom";
import { animate } from "motion";
import { useScroll, useSpring, motion } from "motion/react";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

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

export default function Products() {
  const [correct, setCorrect] = useState(null);
  const [heart, setHeart] = useState(null);
  const [isFetching, setIsFetching] = useState(true); // حالة تحميل أولية
  const { addProduct, getUserWishlist, handelWishlist, addProductToCart, addProductToWishlist } =
    useContext(CartContext);
  
    async function Wishlist(id) {
    if (isInWishlist(id)) {
      toast.info("Product is already in your wishlist.");
      return;
    }
    if (heart === id) return; // إذا كان نفس المنتج مضاف بالفعل لا نفعل شيء
    setHeart(id); // تعيين المنتج الحالي في حالة الانتظار
    const response = await handelWishlist(id);
    console.log("response from handelWishlist", response);
  
    if (response.status === true) {
      // بعد نجاح العملية، قم بتحديث قائمة المفضلة
      const res = await getUserWishlist();
      console.log(res);
      if (res === false) {
        toast.success(response.res.data.message); // فقط عند النجاح
        console.log('res');
        setTimeout(() => {
          setHeart(null);
        }, 2000);
      }
    }
    else {
      setHeart(null);
      toast.error(response.error.response.data.message);
    }
  }

  function isInCart(productId) {
    return addProductToCart?.some(item => item.product._id === productId);
  }
  function isInWishlist(productId) {
    return addProductToWishlist?.some(item => item._id === productId);
  }

  async function handelProduct(id) {
    if (isInCart(id)) {
      toast.info("Product is already in your cart.");
      return;
    }
    const response = await addProduct(id);
    setCorrect(id);
    // لا تغير heart هنا إطلاقًا

    if (response.status === true) {
      setTimeout(() => {
        setCorrect(null);
      }, 2000);
      toast.success(response.res.data.message);
    } else {
      toast.error(response.error.response.data.message);
    }
  }

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedRating, setSelectedRating] = useState(0);

  const { isError, isLoading, data } = useProduct();

  const products = data?.data?.data || [];

  // استخراج كل التصنيفات والماركات والأسعار من المنتجات
  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category.name))), [products]);
  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand.name))), [products]);
  const minPrice = useMemo(() => Math.min(...products.map(p => p.price)), [products]);
  const maxPrice = useMemo(() => Math.max(...products.map(p => p.price)), [products]);

  // فلترة المنتجات
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory ? product.category.name === selectedCategory : true;
      const matchesBrand = selectedBrand ? product.brand.name === selectedBrand : true;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating = selectedRating ? Math.floor(product.ratingsAverage) >= selectedRating : true;
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating;
    });
  }, [products, search, selectedCategory, selectedBrand, priceRange, selectedRating]);


  useEffect(() => {
    // Scroll to top when component mounts
    animate(() => window.scrollY, 0, {
      duration: 0.8,
      easing: "ease-out",
      onUpdate: (value) => window.scrollTo(0, value),
    });
  }, []);

  useEffect(() => {
    // عند انتهاء التحميل، قم بتحديث الحالة
    if (!isLoading) {
      setTimeout(() => setIsFetching(false), 1000); // عرض SkeletonCard لفترة قصيرة
    }
  }, [isLoading]);

  return (
    <>
      {/* Progress bar for scroll */}
      <motion.div
        className="progress-bar fixed top-0 left-0 h-1 bg-blue-500 z-50"
        style={{ scaleX }}
      />
      <div className="dark:bg-gray-900">
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
          {/* //Shop Popular Categories */}
          <div className="mt-5">
            <h2 className="text-lg my-1 dark:text-white">
              Shop Popular Categories
            </h2>
            <HomeCategory />
          </div>
          {/* قبل عرض المنتجات: */}
          <div className="bg-white dark:bg-[#222] rounded-xl shadow p-4 mb-6 flex flex-col md:flex-row md:items-end gap-4">
            {/* شريط البحث */}
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1 text-[#0aad0a]">Search</label>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search for products..."
                className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#0aad0a] dark:bg-gray-800 dark:text-white"
              />
            </div>
            {/* فلتر التصنيف */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#0aad0a]">Category</label>
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#0aad0a] dark:bg-gray-800 dark:text-white"
              >
                <option value="">All</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {/* فلتر الماركة */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#0aad0a]">Brand</label>
              <select
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
                className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#0aad0a] dark:bg-gray-800 dark:text-white"
              >
                <option value="">All</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            {/* فلتر السعر */}
            <div className="flex flex-col min-w-[120px]">
              <label className="block text-sm font-semibold mb-1 text-[#0aad0a]">Price</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                  className="w-24 h-10 text-lg rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#0aad0a] dark:bg-gray-800 dark:text-white"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-24 h-10 text-lg rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#0aad0a] dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
            {/* فلتر التقييم */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-[#0aad0a]">Rating</label>
              <select
                value={selectedRating}
                onChange={e => setSelectedRating(Number(e.target.value))}
                className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:border-[#0aad0a] dark:bg-gray-800 dark:text-white"
              >
                <option value={0}>All</option>
                {[5,4,3,2,1].map(r => (
                  <option key={r} value={r}>{r}+</option>
                ))}
              </select>
            </div>
          </div>
          {/* عند عرض المنتجات: */}
          <div className="allProduct grid md:grid-cols-3 lg:grid-cols-6 mt-8">
            {isFetching
              ? Array(12)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />)
              : filteredProducts.map((product) => (
                  <motion.div
                    className="product  mb-5 bg-white px-4 pb-2 rounded-lg shadow-md cursor-pointer dark:bg-[#2A3E4B]  dark:shadow-gray-800"
                    key={product._id}
                    initial={{ opacity: 1 }}
                    whileHover={{
                      scale: 1.05,
                      translateY: -5,
                      opacity: 1, 
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <div className="hover:shadow-orange-400 overflow-hidden pt-2 group">
                      <i
                        onClick={() => handelProduct(product._id)}
                        className={`
                          ${correct === product._id
                            ? `fa fa-check bg-green-500`
                            : isInCart(product._id)
                              ? `fa-solid fa-cart-shopping bg-[#e63946]`
                              : `fa-solid fa-cart-shopping bg-[#0aad0a]`
                          }
                          hidden group-hover:flex 
                          w-10 h-10 
                          text-white 
                          p-2 rounded-full shadow-md 
                          items-center justify-center 
                          absolute top-2 right-2 
                          transition-all duration-300 ease-in-out`}
                        style={{ cursor: isInCart(product._id) ? 'not-allowed' : 'pointer' }}
                      ></i>
                      <i
                        onClick={() => Wishlist(product._id)}
                        className={`
                          ${heart === product._id
                            ? `fa fa-check bg-green-500`
                            : isInWishlist(product._id)
                              ? `fa-solid fa-heart bg-[#e63946]`
                              : `fa-solid fa-heart bg-[#0aad0a]`
                          }
                          hidden group-hover:flex 
                          w-10 h-10 
                          text-white 
                          p-2 mt-1 rounded-full shadow-md 
                          items-center justify-center 
                          absolute top-12 right-2
                          transition-all duration-300 ease-in-out`}
                        style={{ cursor: isInWishlist(product._id) ? 'not-allowed' : 'pointer' }}
                      >
                        {/* {console.log(product._id)} */}
                      </i>
                      <Link to={`/ProductDetails/${product._id}`}>
                        <img
                          className="w-full h-[270px] object-cover rounded-md mb-2"
                          src={product.imageCover}
                          alt={product.title}
                        />
                        <h6 className="text-[#0aad0a] font-medium">
                          {product.category.name}
                        </h6>
                        <h2 className="font-semibold text-gray-700 dark:text-white">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h2>
                        <div className="flex justify-between items-center mt-2">
                          {product.priceAfterDiscount ? (
                            <>
                              <p className="line-through text-red-600 font-semibold flex items-center mr-2">
                                {product.price}
                                <span className="text-xs ml-1">EGP</span>
                              </p>
                              <p className="text-[#0aad0a] font-bold flex items-center">
                                {product.priceAfterDiscount}
                                <span className="text-xs ml-1">EGP</span>
                              </p>
                            </>
                          ) : (
                            <p className="text-[#0aad0a] font-bold flex items-center">
                              {product.price}
                              <span className="text-xs ml-1">EGP</span>
                            </p>
                          )}
                          <p>
                            <i className="fa-solid fa-star text-yellow-500 "></i>
                            <span className="dark:text-white ml-1">{product.ratingsAverage}</span>
                          </p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}



================================================
FILE: src/pages/main/ProductDetails.jsx
================================================
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { productService } from '../../services';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CartContext } from '../../context/CartContext';
import LoadingAuth from '../../components/LoadingAuth';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';

export default function ProductDetails() {
  const { addProduct, showing } = useContext(CartContext);

  async function handelProduct(id) {
    const response = await addProduct(id);
    if (response.status === true) {
      toast.success(response.res.data.message);
    } else {
      toast.error(response.error.response.data.message);
    }
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    waitForAnimate: false,
    arrows: true,
  };

  const { id } = useParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["ProductDetails", id],
    queryFn: () => productService.getProductById(id),
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1>Error fetching product details</h1>;
  }

  const details = data?.data?.data || [];

  return (
    <div className="dark:bg-gray-900 py-8">
      <div className="container w-[80%] mx-auto flex justify-between items-center max-sm:flex-col">
        <div className="w-1/4 my-2">
          <Slider {...settings}>
            {details.images.map((image, index) => (
              <div key={index} className="p-2">
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={image}
                    alt={details.brand.name}
                    className="w-full h-64 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
                    loading="lazy" // تحسين أداء التحميل
                  />
                  {/* إطار حول الصورة */}
                  <div className="absolute inset-0 border-2 border-white/20 rounded-lg"></div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-[70%] dark:text-white">
          <h1 className="text-2xl font-bold dark:text-white">{details.category.name}</h1>
          <p className="text-[#9CA3AF] my-4 ml-2">{details.description}</p>
          <h5 className="text-xl font-semibold dark:text-white">{details.brand.name}</h5>
          <h5 className="my-3 text-xl font-semibold dark:text-white">
            {details.price}
            <span className="ml-1">EGP</span>
          </h5>

          <button
            className="bg-[#0aad0a] text-white p-3 rounded w-full hover:bg-[#088708] transition-colors duration-300"
            onClick={() => handelProduct(details._id)}
          >
            {showing ? "+ Add to cart" : <LoadingAuth />}
          </button>
        </div>
      </div>
    </div>
  );
}


================================================
FILE: src/pages/main/Products.jsx
================================================
import React, { useContext, useEffect, useState } from "react";
import img1 from "../../assets/images/slider-2.jpeg";
import img2 from "../../assets/images/grocery-banner-2.jpeg";
import HomeSlider from "../../components/HomeSlider";
import HomeCategory from "./../../components/HomeCategory";
import useProduct from "./../../hooks/useProduct";
import { Link } from "react-router-dom";
import { animate } from "motion";
import { useScroll, useSpring, motion } from "motion/react";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";

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

export default function Products() {
  const [correct, setCorrect] = useState(null);
  const [isFetching, setIsFetching] = useState(true); // حالة تحميل أولية

  const { addProduct, handelWishlist, getUserWishlist, heart, setHeart } =
    useContext(CartContext);
  // console.log(handelWishlist);

  // async function Wishlist(id) {
  //   setHeart(id);
  //   // setNumOfWishlist();
  //   const response = await handelWishlist(id);
  //   console.log(response);

  //   if(response.status === true){
  //     setTimeout(() => {
  //       setHeart(null);
  //     }, 2000);
  //     toast.success(response.res.data.message)
  //   } else {
  //     setHeart(null);
  //     toast.error(response.error.response.data.message);
  //   }
  // }

  async function Wishlist(id) {
    if (heart === id) return; // إذا كان نفس المنتج مضاف بالفعل لا نفعل شيء
    setHeart(id); // تعيين المنتج الحالي في حالة الانتظار
    const response = await handelWishlist(id);
    console.log("response from handelWishlist", response);
    if (response.status === true) {
      const res = await getUserWishlist();
      console.log(res);
      if (res === false) {
        toast.success(response.res.data.message); // فقط عند النجاح
        console.log("res");
        setTimeout(() => {
          setHeart(null);
        }, 2000);
      }
    } else {
      setHeart(null);
      toast.error(response.error.response.data.message);
    }
  }

  async function handelProduct(id) {
    const response = await addProduct(id);
    setCorrect(id);
    // setHeart(id);

    if (response.status === true) {
      setTimeout(() => {
        setCorrect(null);
        // setHeart(null);
      }, 2000);
      toast.success(response.res.data.message);
    } else {
      // setHeart(null);
      toast.error(response.error.response.data.message);
    }
  }

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Scroll to top when component mounts
    animate(() => window.scrollY, 0, {
      duration: 0.8,
      easing: "ease-out",
      onUpdate: (value) => window.scrollTo(0, value),
    });
  }, []);

  const { isError, isLoading, data } = useProduct();

  useEffect(() => {
    // عند انتهاء التحميل، قم بتحديث الحالة
    if (!isLoading) {
      setTimeout(() => setIsFetching(false), 1000); // عرض SkeletonCard لفترة قصيرة
    }
  }, [isLoading]);

  const products = data?.data?.data || [];

  return (
    <>
      {/* Progress bar for scroll */}
      <motion.div
        className="progress-bar fixed top-0 left-0 h-1 bg-blue-500 z-50"
        style={{ scaleX }}
      />
      <div className="dark:bg-gray-900  dark:text-white dark:shadow-lg  dark:shadow-gray-800">
        <div className="container w-[90%] mx-auto">
          <div className="allProduct grid md:grid-cols-3  lg:grid-cols-6 pt-8 shadow-black">
            {isFetching
              ? Array(12)
                  .fill(0)
                  .map((_, index) => <SkeletonCard key={index} />)
              : products.map((product) => (
                  <motion.div
                    className="product  mb-5 bg-white px-4 pb-2 rounded-lg shadow-md cursor-pointer dark:bg-[#2A3E4B] dark:shadow-gray-800"
                    key={product._id}
                    initial={{ opacity: 1 }}
                    whileHover={{
                      scale: 1.05,
                      translateY: -5,
                      opacity: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    <div className="hover:shadow-orange-400 overflow-hidden group pt-2">
                      <i
                        onClick={() => handelProduct(product._id)}
                        className={`${
                          correct === product._id
                            ? `fa fa-check`
                            : `fa-solid fa-cart-shopping `
                        }
                        hidden group-hover:flex 
                        w-10 h-10 
                        text-white bg-green-500 
                        p-2 rounded-full shadow-md 
                        items-center justify-center 
                        absolute top-2 right-2 
                        transition-all duration-300 ease-in-out`}
                      ></i>
                      <i
                        onClick={() => Wishlist(product._id)}
                        className={`${
                          heart === product._id
                            ? `fa fa-check`
                            : `fa-solid fa-heart `
                        }
                        hidden group-hover:flex 
                        w-10 h-10 
                        text-white bg-green-500 
                        p-2 mt-1 rounded-full shadow-md 
                        items-center justify-center 
                        absolute top-12 right-2
                        transition-all duration-300 ease-in-out`}
                      >
                        {/* {console.log(product._id)} */}
                      </i>
                      <Link
                        to={`/ProductDetails/${product._id}`}
                        className="dark:bg-black"
                      >
                        <img
                          className="w-full h-[270px] object-cover rounded-md mb-2"
                          src={product.imageCover}
                          alt={product.title}
                        />
                        <h6 className="text-[#0aad0a] font-medium">
                          {product.category.name}
                        </h6>
                        <h2 className="font-semibold text-gray-700 dark:text-white">
                          {product.title.split(" ").slice(0, 2).join(" ")}
                        </h2>
                        <div className="flex justify-between items-center mt-2">
                          {product.priceAfterDiscount ? (
                            <p className="line-through text-red-700 flex items-center">
                              {product.priceAfterDiscount}
                              <span className="text-xs bg-red">EGP</span>
                            </p>
                          ) : (
                            ""
                          )}
                          <p className="flex items-center">
                            {product.price}
                            <span className="text-xs">EGP</span>
                          </p>
                          <p>
                            <i className="fa-solid fa-star text-yellow-500"></i>{" "}
                            {product.ratingsAverage}
                          </p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}



================================================
FILE: src/pages/main/Profile.jsx
================================================
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components/Loading';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaCalendarAlt, FaMoneyBillWave, FaTruck, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

export default function Profile() {
  const { decodedToken } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('tkn');
        
        if (!token || !decodedToken?.id) {
          setError('Please login to view your profile');
          setLoading(false);
          return;
        }

        // Debug: طباعة محتوى decodedToken
        console.log('🔍 Full Decoded Token:', decodedToken);
        console.log('🔍 Available IDs:', {
          id: decodedToken.id,
          id_user: decodedToken.id_user,
          user_id: decodedToken.user_id,
          _id: decodedToken._id
        });

        // جلب طلبات المستخدم (تحتوي على بيانات المستخدم)
        // نستخدم decodedToken._id أو decodedToken.id_user أو decodedToken.id
        const userId = decodedToken._id || decodedToken.id_user || decodedToken.id;
        console.log('🔍 Using User ID:', userId);
        const ordersResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!ordersResponse.ok) {
          throw new Error('Failed to fetch orders');
        }

        const ordersData = await ordersResponse.json();
        console.log('📦 Orders Data:', ordersData);
        setOrders(ordersData);

        // استخراج بيانات المستخدم من أول طلب (إذا وجد)
        if (ordersData.length > 0 && ordersData[0].user) {
          setUserData(ordersData[0].user);
          console.log('👤 User Data from orders:', ordersData[0].user);
        } else {
          // إذا لم يكن هناك طلبات، نستخدم بيانات من decodedToken
          console.log('📝 No orders found, using decodedToken data');
          setUserData({
            name: decodedToken.name,
            email: decodedToken.email,
            phone: decodedToken.phone
          });
        }
      } catch (err) {
        console.error('❌ Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [decodedToken]);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      case 'shipped':
        return <FaTruck className="text-blue-500" />;
      default:
        return <FaClock className="text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e8fbe8] to-[#a0c4ff] dark:bg-[#0f172a] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#0f172a] dark:to-[#0f172a] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#0f172a] p-8 rounded-xl shadow-xl text-center border border-[#e0e0e0] dark:border-gray-700"
        >
          <FaTimesCircle className="text-red-500 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-300">{error}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e8fbe8] to-[#a0c4ff] dark:bg-[#0f172a] dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#0f172a] dark:to-[#0f172a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#0f172a] rounded-xl shadow-xl p-6 mb-8 border border-[#e0e0e0] dark:border-gray-700"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <FaUser className="text-blue-600 dark:text-blue-300 text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
              <p className="text-gray-600 dark:text-gray-300">Welcome back, {userData?.name || decodedToken?.name || 'User'}!</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{userData?.email || 'No email available'}</p>
              {userData?.phone && (
                <p className="text-gray-500 dark:text-gray-400 text-sm">📞 {userData.phone}</p>
              )}
              <p className="text-gray-500 dark:text-gray-400 text-sm">🛒 {orders.length} orders</p>
            </div>
          </div>
        </motion.div>

        {/* Orders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#0f172a] rounded-xl shadow-xl overflow-hidden border border-[#e0e0e0] dark:border-gray-700"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <FaShoppingBag className="text-blue-600 dark:text-blue-300 text-xl" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Orders</h2>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {orders.length} orders
              </span>
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center">
              <FaShoppingBag className="text-gray-400 dark:text-gray-500 text-4xl mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Orders Yet</h3>
              <p className="text-gray-600 dark:text-gray-300">You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <div className="mt-4">
                <Link to="/Products" className="inline-flex items-center px-4 py-2 bg-[#0aad0a] text-white rounded-lg hover:bg-[#099409] transition-colors">
                  <i className="fa-solid fa-shopping-cart mr-2"></i>
                  Start Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(order.status)}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status || 'Pending'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt className="text-gray-400 dark:text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaMoneyBillWave className="text-gray-400 dark:text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-300">
                            Total: {order.totalOrderPrice} EGP
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaShoppingBag className="text-gray-400 dark:text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {order.cartItems?.length || 0} items
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaMoneyBillWave className="text-gray-400 dark:text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-300">
                            {order.paymentMethodType || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="lg:w-64">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Items:</h4>
                      <div className="space-y-2">
                        {order.cartItems?.slice(0, 3).map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center space-x-3 text-sm">
                            <img
                              src={item.product?.imageCover}
                              alt={item.product?.title}
                              className="w-8 h-8 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-900 dark:text-white truncate">{item.product?.title}</p>
                              <p className="text-gray-500 dark:text-gray-400">Qty: {item.count}</p>
                            </div>
                          </div>
                        ))}
                        {order.cartItems?.length > 3 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            +{order.cartItems.length - 3} more items
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 


================================================
FILE: src/services/README.md
================================================
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


================================================
FILE: src/services/api.js
================================================
import axios from 'axios';

// Base configuration
const API_BASE_URL = 'https://ecommerce.routemisr.com/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tkn');
    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api; 


================================================
FILE: src/services/authService.js
================================================
import api from './api';

export const authService = {
  // Login
  login: (credentials) => {
    return api.post('/auth/signin', credentials);
  },

  // Register
  register: (userData) => {
    return api.post('/auth/signup', userData);
  },

  // Forget Password
  forgetPassword: (email) => {
    return api.post('/auth/forgotPasswords', { email });
  },

  // Verify Reset Code
  verifyResetCode: (resetCode) => {
    return api.post('/auth/verifyResetCode', { resetCode });
  },

  // Reset Password
  resetPassword: (resetData) => {
    return api.post('/auth/resetPassword', resetData);
  },

  // Change Password
  changePassword: (passwordData) => {
    return api.put('/auth/changeMyPassword', passwordData);
  },

  // Get User Profile
  getUserProfile: () => {
    return api.get('/user/profile');
  },

  // Update User Profile
  updateUserProfile: (userData) => {
    return api.put('/user/profile', userData);
  }
}; 


================================================
FILE: src/services/cartService.js
================================================
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


================================================
FILE: src/services/index.js
================================================
// Export all services
export { authService } from './authService';
export { productService } from './productService';
export { cartService } from './cartService';
export { orderService } from './orderService';
export { default as api } from './api'; 


================================================
FILE: src/services/orderService.js
================================================
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


================================================
FILE: src/services/productService.js
================================================
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


================================================
FILE: src/validation/authValidation.js
================================================
import * as yup from "yup";

// Login Validation Schema
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters"),
});

// Register Validation Schema
export const registerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters"),
  rePassword: yup
    .string()
    .required("Re-entering password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^01[01235][0-9]{8}$/, "Invalid phone number"),
});

// Forget Password Validation Schema
export const forgetPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
});

// Reset Code Validation Schema
export const resetCodeValidationSchema = yup.object().shape({
  resetCode: yup
    .string()
    .required("Reset code is required")
    .length(6, "Reset code must be exactly 6 characters")
    .matches(/^[0-9]+$/, "Reset code must contain only numbers"),
});

// Reset Password Validation Schema
export const resetPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(3, "Password must be at least 3 characters"),
});

// Change Password Validation Schema
export const changePasswordValidationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current password is required"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(3, "Password must be at least 3 characters")
    .notOneOf([yup.ref("currentPassword")], "New password must be different from current password"),
  rePassword: yup
    .string()
    .required("Re-entering password is required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

// Payment Validation Schema
export const paymentValidationSchema = yup.object().shape({
  details: yup
    .string()
    .required("Address details are required")
    .min(4, "Address details must be at least 4 characters")
    .max(50, "Address details must be less than 50 characters"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^01[01235][0-9]{8}$/, "Invalid phone number"),
  city: yup
    .string()
    .required("City is required")
    .min(4, "City must be at least 4 characters")
    .max(10, "City must be less than 10 characters"),
}); 

