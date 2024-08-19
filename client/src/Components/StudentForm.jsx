import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FieldContext } from "./Context/FieldContextProvider";
import { hobbiesContext } from "./Context/HobbiesContextProvider";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const phoneRegExp =
  /^\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().matches(emailRegex,"Invalid email").required("Required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("A phone number is required"),
  gender: Yup.string().required("Gender is required"),
  field: Yup.string().required("Field is required"),
  address: Yup.string().required("Address is required"),
  hobbies: Yup.array().min(1, "At least one hobby must be selected"),
  image: Yup.mixed().nullable(), // Make image optional for edit
  joiningDate: Yup.date().required("Joining date is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  field: "",
  address: "",
  hobbies: [],
  image: null,
  joiningDate: "",
};

const StudentForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [initialData, setInitialData] = useState(initialValues);
  const studentFieldData = useContext(FieldContext);
  const hobbiesOptions = useContext(hobbiesContext);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchStudentData = async () => {
        try {
          const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;
          const response = await axios.get(
            `${apiBaseUrl}/api/student/get-student-by-id/${id}`
          );
          const student = response.data.student;
         

          setInitialData({
            firstName: student.first_name || "",
            lastName: student.last_name || "",
            email: student.email || "",
            phone: student.phone || "",
            gender: student.gender || "",
            field: student.field || "",
            address: student.address || "",
            hobbies: student.hobbies || "",
            joiningDate: student.joining_date || "",
            image: null,
          });
       

          setImagePreview(
            student.image ? `${apiBaseUrl}/images/${student.image}` : null
          );

          setIsEdit(true);
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      };

      fetchStudentData();
    }
  }, [id]);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleHobbyChange = (event, setFieldValue, values) => {
    const value = event.target.value;
    setFieldValue(
      "hobbies",
      values.hobbies.includes(value)
        ? values.hobbies.filter((hobby) => hobby !== value)
        : [...values.hobbies, value]
    );
  };

  const submitHandler = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("gender", values.gender);
      formData.append("field", values.field);
      formData.append("address", values.address);
      formData.append("hobbies", values.hobbies.join(","));
      formData.append("joiningDate", values.joiningDate);
      if (values.image) {
        formData.append("image", values.image);
      }

      const apiBaseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

      if (isEdit) {
        await axios.put(
          `${apiBaseUrl}/api/student/edit-student/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(`${apiBaseUrl}/api/student/add-student`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      resetForm();
      navigate("/");
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Container>
      <Formik
        enableReinitialize={true}
        initialValues={initialData}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <div className="flex justify-center">
            <Form className="flex-col mt-2 rounded-md p-2 w-96">
              <Field name="firstName">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <ErrorMessage
                name="firstName"
                className="text-red-500 font-extrabold"
                component="div"
              />
              <Field name="lastName">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <ErrorMessage
                name="lastName"
                className="text-red-500 font-extrabold"
                component="div"
              />
              <Field name="email">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 font-extrabold"
              />
              <Field name="phone">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 font-extrabold"
              />
              <Field name="joiningDate">
                {({ field }) => (
                  <TextField
                    {...field}
                    type="date"
                    label="Joining Date"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                )}
              </Field>
              <ErrorMessage
                name="joiningDate"
                component="div"
                className="text-red-500 font-extrabold"
              />
              <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Gender</FormLabel>
                <Field name="gender">
                  {({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  )}
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 font-extrabold"
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="student-label">Field</InputLabel>
                <Field name="field" as={Select} labelId="student-label">
                  {studentFieldData.map((option) => (
                    <MenuItem key={option.id} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage
                  name="field"
                  component="div"
                  className="text-red-500 font-extrabold"
                />
              </FormControl>
              <Field name="address">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Address"
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                  />
                )}
              </Field>
              <ErrorMessage
                name="address"
                component="div"
                className="text-red-500 font-extrabold"
              />
              <FormGroup>
                <FormLabel component="legend">Hobbies</FormLabel>
                {hobbiesOptions.map((hobby) => (
                  <FormControlLabel
                    key={hobby.id}
                    control={
                      <Field
                        name="hobbies"
                        type="checkbox"
                        checked={values.hobbies.includes(hobby.name)}
                        onChange={(event) =>
                          handleHobbyChange(event, setFieldValue, values)
                        }
                        value={hobby.name}
                        as={Checkbox}
                      />
                    }
                    label={hobby.name}
                  />
                ))}
              </FormGroup>
              <ErrorMessage
                name="hobbies"
                component="div"
                className="text-red-500 font-extrabold"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleFileChange(event, setFieldValue)}
                style={{ marginTop: 16 }}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ marginTop: 16, maxWidth: "200px" }}
                />
              )}
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 font-extrabold"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                style={{ marginTop: "16px" }}
              >
                {isEdit ? "Update" : "Submit"}
              </Button>
            </Form>
          </div>
        )}
      </Formik>
    </Container>
  );
};

export default StudentForm;
