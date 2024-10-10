import React from "react";
import { useCreateUserMutation } from "../apis/registerapi";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IUserDetails } from "../types/userDetails";
import { Password } from "@mui/icons-material";
import "../styles/form.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


const Registration = () => {
  const [createUser,{isError}] = useCreateUserMutation();
  // console.log("data by usemutation",createUser)

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
    password: Yup.string(),
    confirmpassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });

  const onSubmit = async (values: IUserDetails) => {
    const {confirmpassword,profileImage,...userDetails} = values
    console.log("registration ", values);
    const response = await createUser(userDetails);

    console.log("🚀 ~ onSubmit ~ response:", response)

if(response.data)
   { console.log("🚀 ~ onSubmit ~ response:", response.data.message)
  
   }
else{
  // console.log(resonse.)
  {console.log("error", response.error)}

}
    
    
    // console.log('User registered successfully:', response);
  };
  return (
    <div className="formContainer">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="form">
            <h1 className="text-[var(--clr-brown)] font-bold">Register</h1>

            <div>
              <label htmlFor="username">User Name:</label>
              <Field name="username" type="text" className="formInput" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="mobile">Mobile:</label>
              <Field name="mobile" type="number" className="formInput" />
              <ErrorMessage name="mobile" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <Field name="email" type="email" className="formInput" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <Field name="password" type="password" className="formInput" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="confirmpassword">Confirm Password:</label>
              <Field name="confirmpassword" type="text" className="formInput" />
              <ErrorMessage
                name="confirmpassword"
                component="div"
                className="error"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-success"
            >
              Submit
            </button>
            <Button component={Link} to={"/login"}>
              Login Page{" "}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
