import React from 'react'
import { ISkill} from '../../types/cvDetails'
import { useForm, SubmitHandler } from "react-hook-form";
import '../../styles/form.css';
import { useCreateCVMutation,useUpdateCVMutation,useGetCVQuery } from '../../apis/cvapi';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

// skillName: string
// proficiency: number
const SkillsForm = () => {
    const [createCV] = useCreateCVMutation()
   const [updateCV] = useUpdateCVMutation()
   const cvId=useSelector((state)=>state.cv.cvId)

    const { register, handleSubmit, formState: { errors },reset} = useForm<ISkill>({mode:'onTouched'})

    const {_id} = useParams();
  // Fetch CV data by ID (if editing an existing entry)
  const { data: existingCVData } = _id ? useGetCVQuery(_id) : { data: null };



  useEffect(() => {
    if (existingCVData && existingCVData.skills.length > 0) {
      reset(existingCVData.skills[0]); 
    }
  }, [existingCVData, reset]);
    const onSubmit: SubmitHandler<ISkill> = (data) => {
if(_id){
  const formData ={
    _id:_id,
   skills:[data]
  }
  updateCV(formData)
}
else{
  const formData ={
    _id:cvId,
   skills:[data]
  }
  updateCV(formData)
}
    
    }
    return(
        <div className='formContainer'>
     <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label>Skill Name</label>
      <input
        {...register('skillName', { required: 'Skill name is required' })}
        type="text"
        placeholder="Enter skill name"
      />
      {errors.skillName && <span>{errors.skillName.message}</span>}

      <label>Proficiency</label>
      <input
        {...register('proficiency', {
          required: 'Proficiency is required',
          valueAsNumber: true, // Ensures it's treated as a number
          min: {
            value: 0,
            message: 'Proficiency must be at least 0',
          },
          max: {
            value: 100,
            message: 'Proficiency cannot exceed 100',
          },
        })}
        type="number"
        placeholder="Enter proficiency (0-100)"
      />
      {errors.proficiency && <span>{errors.proficiency.message}</span>}

      <input type="submit" className='btn-success'/>
    </form>
    </div>
    )
    

}

export default SkillsForm