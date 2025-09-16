# FreshCart – Modern E‑Commerce (React + Vite)

FreshCart is a production‑ready, modern e‑commerce web app built with React 18, Vite, Tailwind CSS, and a service‑oriented architecture. It features authentication, product browsing, cart and wishlist, orders, online/cash payment flow, responsive UI, robust error handling, and deployment to GitHub Pages/Vercel.

## ✨ Features

- Authentication: Register, login, change/reset password with validation
- Product catalog: categories, brands, product details, sliders, search/sort
- Cart & Wishlist: add/remove, quantity controls with granular loading states
- Orders: checkout (cash/online), order history sorted by most recent
- Modern UI/UX: Tailwind CSS, dark mode ready, animated components
- Performance: lazy loading, memoized UI, React Query caching
- Resilience: error boundaries, API error interceptors, offline handling
- Deployment: GitHub Pages and Vercel configurations included

## 🧰 Tech Stack

- React 18, Vite 6
- Tailwind CSS 3, class-variance-authority, tailwind-merge
- React Router DOM 7
- Axios, React Query 3
- Formik + Yup
- React Toastify + React Hot Toast
- React Slick/Embla/Swiper, Framer Motion/Motion
- React Spinners, React Icons

## 📦 Project Structure

```
Fresh-Cart/
  public/
  src/
    components/
    context/
    hooks/
    layouts/
    pages/
    services/
    utils/ | lib/
```

## 🔐 Authentication Flow

- JWT stored in localStorage, decoded with `jwt-decode`
- Guards via `ProtectedRoute` and `AuthGuard`
- Forms managed with Formik, schemas with Yup
- Password visibility toggles and UX‑friendly error messages

## 🛒 Cart & Checkout

- Quantity updates with button‑level loading spinners (+/−)
- Cash order and online order (checkout session) with distinct loading
- Payment form validated (details/phone/city)

## 🧭 Routing

- `react-router-dom@7` for nested routes
- Error and component boundaries around critical routes

## 🧱 Error Handling & Offline

- `ErrorBoundary` and `ApiErrorBoundary`
- Axios interceptors for consistent network error toasts
- Offline banner via `react-detect-offline`

## 🚀 Getting Started

1. Install

```bash
npm install
```

2. Run dev server

```bash
npm run dev
```

3. Build

```bash
npm run build
```

## 🔧 Environment

No private environment file is required for basic usage. API base URLs are embedded in services; adjust as needed in `src/services`.

## 🧪 Quality & Linting

```bash
npm run lint
```

Strict ESLint (React/Hooks/Refresh) is enabled. Keep components small, typed props, early returns, and no silent catches.

## 🗂️ Key Directories

- `src/components`: `Navbar`, `Footer`, cards, carousels, loading and error UIs
- `src/pages/Authentication`: Login/Register/Forget/Verify/Reset/Change
- `src/pages/Cart`: Cart, Payment, Wishlist, AllOrders (sorted by latest)
- `src/pages/main`: Home, Products, ProductDetails, Categories, Brands
- `src/services`: `authService`, `productService`, `cartService`, `orderService`

## 🔄 Data Fetching

- React Query handles caching, revalidation, and loading states
- Service‑oriented functions isolate axios calls and error propagation

## 🎨 UI/UX Guidelines

- Consistent gradient backgrounds, rounded cards, focus rings
- Accessible labels, helper texts, and error feedback
- Responsive grid and spacing system using Tailwind

## 📦 Deployment

### GitHub Pages

```bash
npm run deploy
```

The app is built with `BASE_PATH` and pushed to `gh-pages` branch. Homepage: `https://ahmedebrahem0.github.io/FreshCart`.

### Vercel

- Included `vercel.json` for SPA rewrites
- Push to your repo and import in Vercel dashboard

## 🛠️ Useful Scripts

- `npm run dev`: start dev server
- `npm run build`: production build
- `npm run preview`: preview production build
- `npm run lint`: run ESLint
- `npm run deploy`: build and deploy to GitHub Pages

## 🧭 Roadmap

- Product filters and advanced search
- Address book and saved payment methods
- Admin dashboard for inventory/orders

## 👤 Author

Built by Ahmed Ebrahem – passionate about building robust, user‑centric web apps.

If you find this project useful, please star the repo and feel free to open issues/PRs.
