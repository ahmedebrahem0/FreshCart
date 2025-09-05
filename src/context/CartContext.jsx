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
  // console.log(Token);
  useEffect(() => {
    if (Token) {
      getUserWishlist();
      getUserCart();
    } else {
      clearUI(); // إعادة تعيين الحالة إذا لم يكن هناك مستخدم مسجل دخوله
    }
  }, [Token]);

  function clearUI() {
    setAddProductToCart(null);
    setNumOfCartItems(0);
    setTotalCartPrice(0);
    setCartId(null);
    // setNumOfWishlist(0); // إعادة تعيين عدد العناصر في الـ Wishlist
  }

  async function addProduct(pId) {
    setShowing(false);
    return cartService
      .addToCart(pId)
      .then((res) => {
        setAddProductToCart(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setShowing(true);
        getUserCart();
        return { res, status: true };
      })
      .catch((error) => {
        setShowing(true);
        return { error, status: false };
      });
  }

  async function handelButton(Id, newCount) {
    return cartService
      .updateCartItem(Id, newCount)
      .then((res) => {
        setAddProductToCart(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  async function DeleteProduct(productId) {
    return cartService
      .removeFromCart(productId)
      .then((res) => {
        setAddProductToCart(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }
  async function DeleteFromWishlist(wishListId) {
    return cartService
      .removeFromWishlist(wishListId)
      .then((res) => {
        setNumOfWishlist(numOfWishlist);

        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  async function RemoveItems() {
    return cartService
      .clearCart()
      .then((res) => {
        setAddProductToCart(null);
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  async function getUserCart() {
    setIsCartLoading(true);
    return cartService
      .getUserCart()
      .then((res) => {
        setAddProductToCart(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setCartId(res.data.data._id);
        setShowing(true);
        setIsCartLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsCartLoading(false);
      });
  }

  async function handelWishlist(WishlistId) {
    // console.log("WishlistId hena", WishlistId);
    const WishlistIdCode = WishlistId;
    return cartService
      .addToWishlist(WishlistId)
      .then((res) => {
        // toast.success(res.data.message);
        console.log("res from handel ", res);
        if (WishlistIdCode === WishlistId) {
          return { res, status: true };
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        return { error, status: false };
      });
  }

  async function getUserWishlist() {
    return await cartService
      .getUserWishlist()
      .then((res) => {
        setAddProductToWishlist(res.data.data);

        const newWishlistCount = res.data.count;
        // console.log(newWishlistCount);
        if (newWishlistCount !== 0 && newWishlistCount === numOfWishlist) {
          // toast.error("already added"); // إزالة الرسالة المزعجة
          setNumOfWishlist(newWishlistCount);
          setHeart(null);
          // console.log('then')
          return { res, newWishlistCount };
        } else {
          // console.log("else me");
          setNumOfWishlist((prev) => prev + 1);
          setNumOfWishlist(newWishlistCount);
          // console.log("catch");
          // console.log(prev);
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
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
