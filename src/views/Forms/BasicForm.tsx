import React from 'react'
import { useForm, SubmitHandler,useWatch } from "react-hook-form";
import { IBasicDetails } from '../../types/cvDetails';
import '../../styles/form.css'
import { useCreateCVMutation,useUpdateCVMutation ,useGetCVQuery} from '../../apis/cvapi';
import { setCvId } from '../../redux/cvSlice';
import { useDispatch, UseDispatch } from 'react-redux';
import { useLocation ,useParams} from 'react-router-dom';
import { useEffect } from 'react';

export interface IBasicDetailForm {
  basicDetails: IBasicDetails;
}

interface IBasicDetailProps{
  formData:any,
  onUpdate:any
}
const BasicForm:React.FC<IBasicDetailProps> = ({formData,onUpdate}) => {
const[createCV,{data}] = useCreateCVMutation();
const [updateCV] = useUpdateCVMutation();
const dispatch = useDispatch();
const location = useLocation();
const {_id} = useParams();

 // Fetch CV data by ID (if editing an existing entry)
 const { data: existingCVData } = _id ? useGetCVQuery(_id) : { data: null };

 
  // console.log("basic existingCVData?.data ",existingCVData?.data)
  
  const { register, handleSubmit,   formState: { errors},
  trigger,reset,control} = useForm<IBasicDetailForm>({
    mode: 'onTouched' ,
    defaultValues:{
      basicDetails:formData
    }
 
})
const watchedBasicDetails = useWatch({
  control,
  name: 'basicDetails'
});

useEffect(() => {
  if (existingCVData?.data) {
    reset(existingCVData?.data?.basicDetails); // Populate form with existing data
  }
}, [existingCVData, reset]);

// useEffect(()=>{
//   onUpdate(watchedBasicDetails)
// },[watchedBasicDetails])
  
   
  
    


  const onSubmit: SubmitHandler<IBasicDetailForm> = async(values) => {
    const obj= {
      basicDetails:values.basicDetails
    }
    console.log(values)
    
    try {
      if (_id) {
        // Update existing CV
        const formData = { _id, basicDetails: values.basicDetails };
       const res = await updateCV(formData).unwrap();
        console.log('basic update res',res);
      } else {
        // Create new CV
        const response = await createCV(obj).unwrap();
        const { cvId } = response.data;
        // console.log("in basic cvid",cvId)
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
        {...register('basicDetails.name', { required: 'Name is required' })}
        type="text"
        placeholder="Enter your name"
      
      />
      {errors.basicDetails?.name && <span>{errors.basicDetails?.name.message}</span>}

      <label>Email</label>
      <input
        {...register('basicDetails.email', {
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Enter a valid email address',
          },
        })}
        type="email"
        placeholder="Enter your email"
      
      />
      {errors.basicDetails?.email &&  <span>{errors.basicDetails?.email.message}</span>}

      <label>Phone</label>
      <input
        {...register('basicDetails.phone', {
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
      {errors.basicDetails?.phone && <span>{errors.basicDetails?.phone.message}</span>}

      <label>Address</label>
      <input
        {...register('basicDetails.address', { required: 'Address is required' })}
        type="text"
        placeholder="Enter your address"
       
      />
      {errors.basicDetails?.address && <span>{errors.basicDetails?.address.message}</span>}

      <label>City</label>
      <input
        {...register('basicDetails.city', { required: 'City is required' })}
        type="text"
        placeholder="Enter your city"
        
      />
      {errors.basicDetails?.city  && <span>{errors.basicDetails?.city.message}</span>}

      <label>State</label>
      <input
        {...register('basicDetails.state', { required: 'State is required' })}
        type="text"
        placeholder="Enter your state"
       
      />
      {errors.basicDetails?.state && <span>{errors.basicDetails?.state.message}</span>}

      <label>Pincode</label>
      <input
        {...register('basicDetails.pincode', {
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
      {errors.basicDetails?.pincode && <span>{errors.basicDetails?.pincode.message}</span>}

      <label>Intro</label>
      <textarea
        {...register('basicDetails.intro', { required: 'Intro is required' })}
        placeholder="Tell us about yourself"
       
      />
      {errors.basicDetails?.intro  && <span>{errors.basicDetails?.intro.message}</span>}

      <input type="submit" className='btn-success'/>
    </form>
   </div>
   

     
   
  )
}

export default BasicForm

