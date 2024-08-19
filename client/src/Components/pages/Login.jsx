import { Button, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";

const validationSchema = Yup.object({
  name: Yup.string().required("User Name is required"),
  password: Yup.string().min(6, "Too Short!").required("Password is Required"),
});

const initialValues = {
  name: "",
  password: "",
};

const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/user/login`, values, {
        withCredentials: true // Ensure cookies are sent and received
      });

      toast.success('Login successful!');
      
      // Fetch current user data
      const userResponse = await axios.get(`${apiBaseUrl}/api/user/current-user`, {
        withCredentials: true
      });

      // Store user data in Redux store
      dispatch(authLogin({ userData: userResponse.data.user }));

      navigate('/'); // Redirect to home or other page

    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred!');
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className="flex justify-center">
      <Toaster />
      <div className="border border-gray-700 rounded-lg p-6 mt-11 bg-white shadow-lg max-w-sm w-full">
        <Typography variant="h4" className="text-center mb-4 text-gray-700">
          Login
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
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

              <Typography align="center" className="mb-4">
                Dont have an account?
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Signup
                </Link>
              </Typography>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                className="mt-4"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
