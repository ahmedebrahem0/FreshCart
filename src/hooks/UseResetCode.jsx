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
