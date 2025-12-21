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
