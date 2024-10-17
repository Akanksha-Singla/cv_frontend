import React from "react";
import { useCreateUserMutation } from "../apis/registerapi";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IUserDetails } from "../types/userDetails";
import { Password } from "@mui/icons-material";
import "../styles/form.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Registration = () => {
  const [createUser, { isError }] = useCreateUserMutation();
  // console.log("data by usemutation",createUser)

  const navigate = useNavigate();

  const initialValues: IUserDetails = {
    username: "",
    email: "",
    mobile: 9999999999,
    password: "",
    confirmpassword: "",
    profileImage: null,
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    mobile: Yup.number().required("Required").min(1000000000).max(9999999999),
    password: Yup.string().min(6),
    confirmpassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });
  const [successfull, setSuccessful] = useState(false);
  const onSubmit = async (values: IUserDetails) => {
    const formData= new FormData();

    const { confirmpassword,profileImage, ...userDetails } = values;
    console.log(values)
      for(const key in userDetails){
         formData.append(key,userDetails[key])
     }
 
    if(profileImage){
      formData.append('profileImage',profileImage)
    }
    console.log("formdata enteries")
formData.forEach((value,key)=>console.log(key,value))
    // console.log("registration ", values);
    const response = await createUser(formData);
    // console.log("🚀 ~ onSubmit ~ response:", response);

    if (response.data) {
      // console.log("🚀 ~ onSubmit ~ response:", response.data.message);
      setSuccessful(true);
      navigate("/login");
    } else {
      // console.log(resonse.)
      {
        console.log("error", response.error);
      }
    }
  };
  return (
    <div className="formContainer">
      {successfull && <Alert severity="success">Rgistered Sucessfully</Alert>}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="form">
            <h1 className="text-[var(--clr-brown)] font-bold">Register</h1>

            <div>
              <label htmlFor="username">*User Name:</label>
              <Field name="username" type="text" className="formInput" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="mobile">*Mobile:</label>
              <Field name="mobile" type="number" className="formInput" />
              <ErrorMessage name="mobile" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="email">*Email:</label>
              <Field name="email" type="email" className="formInput" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="password">*Password:</label>
              <Field name="password" type="password" className="formInput" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="confirmpassword">*Confirm Password:</label>
              <Field name="confirmpassword" type="text" className="formInput" />
              <ErrorMessage
                name="confirmpassword"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label>Upload Image</label>
              <input
                name="profileImage"
                type="file"
                className="formInput"
                onChange={(event) => {
                  const file = event?.currentTarget?.files[0];
                  setFieldValue("profileImage", file);
                  }}
              />
              <ErrorMessage name="profileImage" component="div" className="error" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-success">
              Submit
            </button>
            
            <Button component={Link} to={"/login"}>
              Login Page
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
