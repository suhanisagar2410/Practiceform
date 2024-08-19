import { Button, Container, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string().required("User Name is required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().min(6, "Too Short!").required("Password is Required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL

const Signup = () => {
  const navigate = useNavigate()
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/user/signup`,
        values
      );
      console.log(response.data);
      toast.success(response.data.message);
      navigate('/login')
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.message || "An error occurred!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Toaster position="bottom-center" reverseOrder={true} />
      <div className="border border-gray-700 rounded-lg p-6 mt-11 bg-white shadow-lg max-w-sm w-full">
        <Typography variant="h4" className="text-center mb-4">
          Signup
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="flex flex-col">
              <Field name="name">
                {({ field, meta }) => (
                  <div className="mb-4">
                    <TextField
                      {...field}
                      label="Name"
                      fullWidth
                      margin="normal"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={<ErrorMessage name="name" />}
                    />
                  </div>
                )}
              </Field>

              <Field name="email">
                {({ field, meta }) => (
                  <div className="mb-4">
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      margin="normal"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={<ErrorMessage name="email" />}
                    />
                  </div>
                )}
              </Field>

              <Field name="password">
                {({ field, meta }) => (
                  <div className="mb-4">
                    <TextField
                      {...field}
                      type="password"
                      label="Password"
                      fullWidth
                      margin="normal"
                      error={meta.touched && Boolean(meta.error)}
                      helperText={<ErrorMessage name="password" />}
                    />
                  </div>
                )}
              </Field>

              <Typography className="mb-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-700">
                  Login
                </Link>
              </Typography>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                className="mt-4"
              >
                Signup
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
