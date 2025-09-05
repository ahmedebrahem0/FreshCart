import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { authService } from "../services";
import { registerValidationSchema } from "../validation/authValidation";
import { AuthContext } from "../context/AuthContext";

export default function UseRegister() {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(true);
  const { updateToken } = useContext(AuthContext);

  const handelRegister = (values) => {
    setLoading(false);
    authService
      .register(values)
      .then((data) => {
        console.log("data", data.data.user);

        // حفظ بيانات المستخدم في localStorage
        const userData = data.data.user;
        localStorage.setItem("userProfile", JSON.stringify(userData));

        // تحديث AuthContext
        if (updateToken) {
          updateToken(data.data.token);
        }

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
