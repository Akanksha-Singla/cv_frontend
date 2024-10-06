import React from "react";
import { ISocialProfile } from "../../types/cvDetails";
import { useForm, SubmitHandler } from "react-hook-form";
import "../../styles/form.css";
import { useCreateCVMutation,useUpdateCVMutation ,useGetCVQuery} from "../../apis/cvapi";
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

// platform: string
// link: string

const SocialProfileForm = () => {
  const [createCV] = useCreateCVMutation();
  const [updateCV] = useUpdateCVMutation()
   const cvId=useSelector((state)=>state.cv.cvId)
   const {_id} = useParams();
 // Fetch CV data by ID (if editing an existing entry)
 const { data: existingCVData } = _id ? useGetCVQuery(_id) : { data: null };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ISocialProfile>({
    mode:'onTouched'
  });

  useEffect(() => {
    if (existingCVData && existingCVData.socialProfiles.length > 0) {
      reset(existingCVData.socialProfiles[0]); 
    }
  }, [existingCVData, reset]);

  const onSubmit: SubmitHandler<ISocialProfile> = (data) => {

    if(_id){
      const formData ={
        _id:_id,
        socialProfiles
        :[data]
      }
      updateCV(formData)
    }
    else{ const formData ={
      _id:cvId,
      socialProfiles
      :[data]
    }
    updateCV(formData)}
   
  };
  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label>Platform</label>
        <input
          {...register('platform', { required: 'Platform is required' })}
          type="text"
          placeholder="Enter platform"
        />
        {errors.platform && <span>{errors.platform.message}</span>}

        <label>Link</label>
        <input
          {...register('link', {
            required: 'Link is required',
            pattern: {
              value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\/?].*)?$/,
              message: 'Enter a valid URL',
            },
          })}
          type="text"
          placeholder="Enter link (URL)"
        />
        {errors.link && <span>{errors.link.message}</span>}

        <input type="submit" className='btn-success'/>
      </form> 
      
    </div>
  );
};

export default SocialProfileForm;
