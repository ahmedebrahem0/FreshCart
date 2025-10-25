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
    authService
      .resetPassword(values)
      .then((data) => {
        console.log(data);
        setLoading(false);
        toast.success("password reset is done");
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
        setLoading(true);
      });
  };
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
