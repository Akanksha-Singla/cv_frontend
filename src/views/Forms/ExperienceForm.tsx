import React from 'react'
import { IExperience} from '../../types/cvDetails'
import { useForm, SubmitHandler } from "react-hook-form";
import '../../styles/form.css'
import { useCreateCVMutation ,useUpdateCVMutation,useGetCVQuery} from '../../apis/cvapi';
import { useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';




// organization: string
// location: string
// position: string
// ctc: number
// startDate: date
// endDate?: date
// technologies: string[]
const ExperienceForm = () => {
    const [createCV] = useCreateCVMutation()
    const [updateCV] = useUpdateCVMutation()

    const {_id} = useParams();
    // Fetch CV data by ID (if editing an existing entry)
    const { data: existingCVData } = _id ? useGetCVQuery(_id) : { data: null };
     
    const cvId = useSelector((state)=>state.cv.cvId)
    const { register, handleSubmit ,formState: { errors },reset } = useForm<IExperience>({
      mode:'onTouched'
    })

    useEffect(() => {
      if (existingCVData && existingCVData.experience.length > 0) {
        reset(existingCVData.experience[0]); 
      }
    }, [existingCVData, reset]);

    const onSubmit: SubmitHandler<IExperience> = (data) =>{
      console.log("in experience",data,cvId)
      if(_id){
        const formData={
          _id:_id,
          experience:[data]
        }
        updateCV(formData)
      }
      else
      { const formData={
        _id:cvId,
        experience:[data]
      }
      updateCV(formData)}
      }
     
      
    
  return (
    <div className='formContainer'>
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label>Organization</label>
      <input
        {...register('organization', { required: 'Organization is required' })}
        type="text"
        placeholder="Enter your organization"
      />
      {errors.organization && <span>{errors.organization.message}</span>}

      <label>Location</label>
      <input
        {...register('location', { required: 'Location is required' })}
        type="text"
        placeholder="Enter the location"
      />
      {errors.location && <span>{errors.location.message}</span>}

      <label>Position</label>
      <input
        {...register('position', {
          required: 'Position is required',
          maxLength: {
            value: 10,
            message: 'Position cannot exceed 10 characters',
          },
        })}
        type="text"
        placeholder="Enter your position"
      />
      {errors.position && <span>{errors.position.message}</span>}

      <label>CTC</label>
      <input
        {...register('ctc', {
          required: 'CTC is required',
          valueAsNumber: true, // Ensure it is treated as a number
          min: {
            value: 0,
            message: 'CTC must be greater than 0',
          },
        })}
        type="number"
        placeholder="Enter your CTC"
      />
      {errors.ctc && <span>{errors.ctc.message}</span>}

      <label>Start Date</label>
      <input
        {...register('startDate', {
          required: 'Start Date is required',
          valueAsDate: true, // Ensure it's treated as a date
        })}
        type="date"
        placeholder="Enter the start date"
      />
      {errors.startDate && <span>{errors.startDate.message}</span>}

      <label>End Date</label>
      <input
        {...register('endDate', {
          valueAsDate: true, // Optional date, ensure it’s a valid date
        })}
        type="date"
        placeholder="Enter the end date"
      />
      {errors.endDate && <span>{errors.endDate.message}</span>}

      <label>Technologies</label>
      <input
        {...register('technologies', { required: 'Technologies are required' })}
        type="text"
        placeholder="Enter technologies (comma separated)"
      />
      {errors.technologies && <span>{errors.technologies.message}</span>}

      <input type="submit" className='btn-success'/>
    </form>
    </div>
  )
}

export default ExperienceForm