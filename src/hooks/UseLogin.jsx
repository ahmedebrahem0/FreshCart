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
  const { setToken, updateToken } = useContext(AuthContext);

  const { getUserCart, getUserWishlist } = useContext(CartContext);

  const handelLogin = (values) => {
    setLoading(false);
    authService
      .login(values)
      .then((data) => {
        localStorage.setItem("tkn", data.data.token);
        setToken(data.data.token);
        updateToken(data.data.token); // تحديث التوكن فوراً

        // حفظ بيانات المستخدم إذا كانت متوفرة
        if (data.data.user) {
          localStorage.setItem("userProfile", JSON.stringify(data.data.user));
        }

        getUserCart();
        getUserWishlist();
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

  return { Loading, Showing, setShowing, LoginFormik };
}
