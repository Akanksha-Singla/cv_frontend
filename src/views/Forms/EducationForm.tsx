import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { IEducation } from '../../types/cvDetails';
import '../../styles/form.css'
import { useCreateCVMutation ,useUpdateCVMutation,useGetCVQuery} from '../../apis/cvapi';
import { useSelector, UseSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';




const EducationForm= () => {
  const [createCV]=useCreateCVMutation()
  const [updateCV] = useUpdateCVMutation()

  const cvId = useSelector((state)=> state.cv.cvId)
  console.log("cvId in education",cvId)

  const {_id} = useParams();
 // Fetch CV data by ID (if editing an existing entry)
 const { data: existingCVData } = _id ? useGetCVQuery(_id) : { data: null };
  
  // degree: string
  // institution: string
  // percentage: number
 


  const { register, handleSubmit, formState: { errors }, reset} = useForm<IEducation>({mode:'onTouched'})
  
  
  useEffect(() => {
    if (existingCVData && existingCVData.education.length > 0) {
      reset(existingCVData.education[0]); 
    }
  }, [existingCVData, reset]);
  const onSubmit: SubmitHandler<IEducation> = (data) =>{
    console.log(cvId,data)
    if(_id){
      const formData ={
        _id:_id,
         education:[data]
       }
       updateCV(formData)

    }else{
      const formData ={
        _id:cvId,
         education:[data]
       }
       updateCV(formData)
    }
 
  }
  

  return (
    <div className='formContainer'>
    <form onSubmit={handleSubmit(onSubmit)} className="form">
    <label>Degree</label>
    <input
      {...register('degree', { required: 'Degree is required' })}
      type="text"
      placeholder="Enter your degree"
    />
    {errors.degree && <span>{errors.degree.message}</span>}

    <label>Institution</label>
    <input
      {...register('institution', { required: 'Institution is required' })}
      type="text"
      placeholder="Enter your institution"
    />
    {errors.institution && <span>{errors.institution.message}</span>}

    <label>Percentage</label>
    <input
      {...register('percentage', {
        required: 'Percentage is required',
        min: {
          value: 0,
          message: 'Percentage must be at least 0',
        },
        max: {
          value: 100,
          message: 'Percentage cannot be more than 100',
        },
      })}
      type="number"
      placeholder="Enter your percentage"
    />
   
    {errors.percentage && <span>{errors.percentage.message}</span>}

    <input type="submit" className='btn-success'/>
  </form>
    </div>
    
  )
}

export default EducationForm