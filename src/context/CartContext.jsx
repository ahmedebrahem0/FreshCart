// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import { cartService } from "../services";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [addProductToCart, setAddProductToCart] = useState(null);
  const [addProductToWishlist, setAddProductToWishlist] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [numOfWishlist, setNumOfWishlist] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [showing, setShowing] = useState(true);
  const [CartId, setCartId] = useState(null);
  const [heart, setHeart] = useState(null);
  const [isCartLoading, setIsCartLoading] = useState(false);

  const { Token } = useContext(AuthContext);
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    if (Token) {
      // عند تسجيل الدخول: حمّل القيم الأساسية
      getUserWishlist();
      getUserCart();
    } else {
      // لو مفيش توكن: صفّي الـUI
      clearUI();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Token]);

  function clearUI() {
    setAddProductToCart(null);
    setAddProductToWishlist(null);
    setNumOfCartItems(0);
    setNumOfWishlist(0);
    setTotalCartPrice(0);
    setCartId(null);
  }

  // ======================
  // Cart actions
  // ======================
  async function addProduct(pId) {
    try {
      setShowing(false);
      const res = await cartService.addToCart(pId);
      setAddProductToCart(res.data.data.products);
      setNumOfCartItems(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setShowing(true);
      // تأكيد التزامن من المصدر
      await getUserCart();
      return { res, status: true };
    } catch (error) {
      setShowing(true);
      if (isDev) console.warn("addProduct failed:", error?.message || error);
      return { error, status: false };
    }
  }

  async function handelButton(Id, newCount) {
    try {
      const res = await cartService.updateCartItem(Id, newCount);
      setAddProductToCart(res.data.data.products);
      setNumOfCartItems(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      return true;
    } catch (error) {
      if (isDev)
        console.warn("updateCartItem failed:", error?.message || error);
      return false;
    }
  }

  async function DeleteProduct(productId) {
    try {
      const res = await cartService.removeFromCart(productId);
      setAddProductToCart(res.data.data.products);
      setNumOfCartItems(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      return true;
    } catch (error) {
      if (isDev)
        console.warn("removeFromCart failed:", error?.message || error);
      return false;
    }
  }

  async function RemoveItems() {
    try {
      await cartService.clearCart();
      setAddProductToCart(null);
      setNumOfCartItems(0);
      setTotalCartPrice(0);
      return true;
    } catch (error) {
      if (isDev) console.warn("clearCart failed:", error?.message || error);
      return false;
    }
  }

  async function getUserCart() {
    try {
      setIsCartLoading(true);
      const res = await cartService.getUserCart();
      setAddProductToCart(res.data.data.products);
      setNumOfCartItems(res.data.numOfCartItems);
      setTotalCartPrice(res.data.data.totalCartPrice);
      setCartId(res.data.data._id);
      setShowing(true);
    } catch (error) {
      if (isDev) console.warn("getUserCart failed:", error?.message || error);
    } finally {
      setIsCartLoading(false);
    }
  }

  // ======================
  // Wishlist actions
  // ======================
  async function handelWishlist(WishlistId) {
    try {
      const res = await cartService.addToWishlist(WishlistId);
      // حدّث من المصدر بدل زيادات محلية
      await getUserWishlist();
      return { res, status: true };
    } catch (error) {
      // Toast للمستخدم بدل طباعة error في الإنتاج
      toast.error(error?.response?.data?.message || "Something went wrong");
      if (isDev) console.warn("addToWishlist failed:", error?.message || error);
      return { error, status: false };
    }
  }

  async function DeleteFromWishlist(wishListId) {
    try {
      const res = await cartService.removeFromWishlist(wishListId);
      // إعادة تحميل الـWishlist لضمان العداد والقائمة صحيحة
      await getUserWishlist();
      return true;
    } catch (error) {
      if (isDev)
        console.warn("removeFromWishlist failed:", error?.message || error);
      return false;
    }
  }

  async function getUserWishlist() {
    try {
      const res = await cartService.getUserWishlist();
      const items = res.data.data || [];
      const count = res.data.count ?? items.length;
      setAddProductToWishlist(items);
      setNumOfWishlist(count);
      return { res, newWishlistCount: count };
    } catch (error) {
      if (isDev)
        console.warn("getUserWishlist failed:", error?.message || error);
      return false;
    }
  }

  return (
    <CartContext.Provider
      value={{
        addProduct,
        totalCartPrice,
        numOfCartItems,
        addProductToCart,
        showing,
        CartId,
        getUserCart,
        handelButton,
        DeleteProduct,
        RemoveItems,
        setAddProductToCart,
        setNumOfCartItems,
        setTotalCartPrice,
        clearUI,
        setCartId,
        handelWishlist,
        getUserWishlist,
        numOfWishlist,
        setNumOfWishlist,
        heart,
        setHeart,
        addProductToWishlist,
        DeleteFromWishlist,
        isCartLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
