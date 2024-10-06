import React from 'react'
import { useCreateUserMutation } from '../apis/registerapi'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IUserDetails } from '../types/userDetails';
import { Password } from '@mui/icons-material';
import "../styles/form.css"
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Registration = () => {
const [createUser]= useCreateUserMutation();
// console.log("data by usemutation",createUser)

    const initialValues:IUserDetails={
        username:"",
        email:"",
        mobile:909,
        password:"",
        profileImage:null
        }
    const validationSchema = Yup.object({
        username:Yup.string().required("Required"),
        email:Yup.string().email(),
        mobile:Yup.number().required("Required"),
        password:Yup.string()
   })
    const onSubmit=async(values:IUserDetails)=>{
        console.log(values)
        const response = await createUser(values);
        console.log('User registered successfully:', response);
        
     }
  return (
    <div className='formContaner'>
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
            <button type="submit" disabled={isSubmitting} className="btn-success">
              Submit
            </button>
            <Button component={Link} to={'/login'}>Login Page </Button>
            
          </Form>
        )}

  </Formik>
  </div>

  )
}

export default Registration
