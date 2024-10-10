
import React from 'react'
import { ILoginResponse, ILoginValues } from '../types/userDetails'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLoginUserMutation } from '../apis/registerapi';
import { useNavigate } from 'react-router-dom';
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { setIsLogin } from '../redux/authSlice';
import { DialerSipSharp } from '@mui/icons-material';

const Login = () => {
    const [loginUser] = useLoginUserMutation()
    // console.log("isSuccess",isSuccess,"ERROR",error)
 const isLogin = useSelector((state:any)=>state.auth.isLogin)
 const diapatch = useDispatch()
   
    const navigate = useNavigate()
    const initialValues:ILoginValues={
        email:"",
        password:""
        }
    const validationSchema = Yup.object({
        email:Yup.string().required("Required"),
        password:Yup.string().required("Required")
   })
    const onSubmit= async(values:ILoginValues)=>{
        console.log(values)
        const response :any= await loginUser(values)
        console.log("response",response)
       if(response.data){
       window.alert("login Sucessful");
       let {data}=response;
       console.log("token",data?.token)
       window.localStorage.setItem('access_token',data?.token)
       diapatch(setIsLogin(true))

       navigate('/mycvs')
      //  window.location.reload()

     }
     
    }
  return (
    <div className='formContainer'>
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
            <Form className="form">
              <h1 className="text-[var(--clr-brown)] font-bold">Login</h1>
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
            </Form>
          )}
  
    </Formik>
    </div>
  )
}

export default Login