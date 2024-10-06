import React from 'react'
import { IProject} from '../../types/cvDetails'
import { useForm, SubmitHandler } from "react-hook-form";
import '../../styles/form.css'
import { useCreateCVMutation,useUpdateCVMutation,useGetCVQuery } from '../../apis/cvapi';
import { useSelector, UseSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const ProjectForm = () => {
  const [createCV] = useCreateCVMutation()
  const [updateCV] = useUpdateCVMutation()
  const cvId=useSelector((state)=>state.cv.cvId)
  const { register, handleSubmit ,formState: { errors },reset} = useForm<IProject>({mode:'onTouched'})
  const {_id} = useParams();
  // Fetch CV data by ID (if editing an existing entry)
  const { data: existingCVData } = _id ? useGetCVQuery(_id) : { data: null };

  useEffect(() => {
    if (existingCVData && existingCVData.projects.length > 0) {
      reset(existingCVData.projects[0]); 
    }
  }, [existingCVData, reset]);

    const onSubmit: SubmitHandler<IProject> = (data) =>{
      console.log(data)
if(_id){
  const formData ={
    _id:_id,
    projects:[data]
  }
  updateCV(formData)

}
else{   const formData ={
  _id:cvId,
  projects:[data]
}
updateCV(formData)}
   
    
    }
    // title: string
    // teamSize: number
    // duration: string
    // technologies: string[]
    // description: string
  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label>Title</label>
      <input
        {...register('title', { required: 'Title is required' })}
        type="text"
        placeholder="Enter project title"
      />
      {errors.title && <span>{errors.title.message}</span>}

      <label>Team Size</label>
      <input
        {...register('teamSize', {
          required: 'Team size is required',
          valueAsNumber: true, // Ensures it's treated as a number
          min: {
            value: 1,
            message: 'Team size must be greater than 0',
          },
        })}
        type="number"
        placeholder="Enter team size"
      />
      {errors.teamSize && <span>{errors.teamSize.message}</span>}

      <label>Duration</label>
      <input
        {...register('duration', {
          required: 'Duration is required',
          maxLength: {
            value: 10,
            message: 'Duration cannot exceed 10 characters',
          },
        })}
        type="text"
        placeholder="Enter project duration"
      />
      {errors.duration && <span>{errors.duration.message}</span>}

      <label>Technologies</label>
      <input
        {...register('technologies', { required: 'Technologies are required' })}
        type="text"
        placeholder="Enter technologies (comma separated)"
      />
      {errors.technologies && <span>{errors.technologies.message}</span>}

      <label>Description</label>
      <textarea
        {...register('description', { required: 'Description is required' })}
        placeholder="Enter project description"
      />
      {errors.description && <span className='btn-success'>{errors.description.message}</span>}

      <input type="submit" />
    </form>
    </div>
    
  )
}

export default ProjectForm