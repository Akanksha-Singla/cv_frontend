import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { IBasicDetails } from '../../types/cvDetails';
import '../../styles/form.css'
import { useCreateCVMutation,useUpdateCVMutation ,useGetCVQuery} from '../../apis/cvapi';
import { setCvId } from '../../redux/cvSlice';
import { useDispatch, UseDispatch } from 'react-redux';
import { useLocation ,useParams} from 'react-router-dom';
import { useEffect } from 'react';


 // name: string
  // email: string
  // phone: number
  // address: string
  // city: string
  // state: string
  // pincode: number
  // intro: string

const BasicForm = () => {
const[createCV,{data}] = useCreateCVMutation();
const [updateCV] = useUpdateCVMutation();
const dispatch = useDispatch();
const location = useLocation();
const {_id} = useParams();

 // Fetch CV data by ID (if editing an existing entry)
 const { data: existingCVData } = _id ? useGetCVQuery(_id) : { data: null };
  
  const { register, handleSubmit,   formState: { errors},
  trigger,reset} = useForm<IBasicDetails>({
    mode: 'onTouched'  })

    useEffect(() => {
      if (existingCVData) {
        reset(existingCVData.basicDetails); // Populate form with existing data
      }
    }, [existingCVData, reset]);



  const onSubmit: SubmitHandler<IBasicDetails> = async(values) => {
    console.log("submit",values)
    const obj= {
      basicDetails:values
    }
    try {
      if (_id) {
        // Update existing CV
        const formData = { _id, basicDetails: values };
        await updateCV(formData);
        console.log('CV updated successfully');
      } else {
        // Create new CV
        const response = await createCV(obj).unwrap();
        const { cvId } = response.data;
        dispatch(setCvId(cvId));
        console.log('CV created successfully', cvId);
      }
    } catch (error) {
      console.error('Error submitting basic details:', error);
    }

   }
  return (
    <div className='formContainer'>
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label>First Name</label>
      <input
        {...register('name', { required: 'Name is required' })}
        type="text"
        placeholder="Enter your name"
      
      />
      {errors.name && <span>{errors.name.message}</span>}

      <label>Email</label>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Enter a valid email address',
          },
        })}
        type="email"
        placeholder="Enter your email"
      
      />
      {errors.email &&  <span>{errors.email.message}</span>}

      <label>Phone</label>
      <input
        {...register('phone', {
          required: 'Phone number is required',
          minLength: {
            value: 10,
            message: 'Phone number must be exactly 10 digits',
          },
          maxLength: {
            value: 10,
            message: 'Phone number must be exactly 10 digits',
          },
        })}
        type="number"
        placeholder="Enter your phone number"
      
      />
      {errors.phone && <span>{errors.phone.message}</span>}

      <label>Address</label>
      <input
        {...register('address', { required: 'Address is required' })}
        type="text"
        placeholder="Enter your address"
       
      />
      {errors.address && <span>{errors.address.message}</span>}

      <label>City</label>
      <input
        {...register('city', { required: 'City is required' })}
        type="text"
        placeholder="Enter your city"
        
      />
      {errors.city  && <span>{errors.city.message}</span>}

      <label>State</label>
      <input
        {...register('state', { required: 'State is required' })}
        type="text"
        placeholder="Enter your state"
       
      />
      {errors.state && <span>{errors.state.message}</span>}

      <label>Pincode</label>
      <input
        {...register('pincode', {
          required: 'Pincode is required',
          minLength: {
            value: 6,
            message: 'Pincode must be 6 digits',
          },
          maxLength: {
            value: 6,
            message: 'Pincode must be 6 digits',
          },
        })}
        type="number"
        placeholder="Enter your pincode"
        
      />
      {errors.pincode && <span>{errors.pincode.message}</span>}

      <label>Intro</label>
      <textarea
        {...register('intro', { required: 'Intro is required' })}
        placeholder="Tell us about yourself"
       
      />
      {errors.intro  && <span>{errors.intro.message}</span>}

      <input type="submit" className='btn-success'/>
    </form>
    </div>
   
  )
}

export default BasicForm

