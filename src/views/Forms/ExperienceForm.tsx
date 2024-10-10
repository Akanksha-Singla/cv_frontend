import React, { useEffect } from 'react';
import { IExperience } from '../../types/cvDetails';
import { useForm, SubmitHandler, useFieldArray,useWatch } from 'react-hook-form';
import '../../styles/form.css';
import { useCreateCVMutation, useUpdateCVMutation, useGetCVQuery } from '../../apis/cvapi';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IAllPreviewProps } from './EducationForm';

export interface IExperienceForm {
  experience: IExperience[];
}

const ExperienceForm:React.FC<IAllPreviewProps> = ({onUpdate}) => {
  const [createCV] = useCreateCVMutation();
  const [updateCV] = useUpdateCVMutation();

  const cvId = useSelector((state: any) => state.cv.cvId);
  
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<IExperienceForm>({
    mode: 'onTouched',
    defaultValues: {
      experience: [{ organization: '', location: '', position: '', ctc: 0, startDate: new Date(), endDate: new Date(), technologies: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    name: 'experience',
    control
  });

  const { _id } = useParams();
  const { data: existingCVData} = _id ? useGetCVQuery(_id) : { data: null };
  const watchedExperience = useWatch({
    control,
    name: 'experience'
  });

  useEffect(()=>{
    onUpdate(watchedExperience)
  },[watchedExperience])

  useEffect(() => {
    if (existingCVData?.data && existingCVData?.data?.experience?.length > 0) {
      reset({ experience: existingCVData?.data?.experience });
    }
  }, [existingCVData, reset]);

  const onSubmit: SubmitHandler<IExperienceForm> = async(data) => {
    console.log(data)
    
    if (_id) {
      const formData = {
        _id: _id ,
        experience: data.experience // Handle dynamic array of experience
      };
  
      const res= await updateCV(formData).unwrap();
      console.log("res",res)
    } else {
      const formData = {
        _id: cvId,
        experience: data.experience // Handle dynamic array of experience
      };
      const res= await updateCV(formData).unwrap();
     console.log("res",res)
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {fields.map((field, index) => (
          <section key={field.id}>
            <label>Organization</label>
            <input
              {...register(`experience.${index}.organization`, { required: 'Organization is required' })}
              type="text"
              placeholder="Enter your organization"
              className="formInput"
            />
            {errors.experience?.[index]?.organization && <span>{errors.experience[index].organization?.message}</span>}

            <label>Location</label>
            <input
              {...register(`experience.${index}.location`, { required: 'Location is required' })}
              type="text"
              placeholder="Enter the location"
              className="formInput"
            />
            {errors.experience?.[index]?.location && <span>{errors.experience[index].location?.message}</span>}

            <label>Position</label>
            <input
              {...register(`experience.${index}.position`, {
                required: 'Position is required',
                maxLength: { value: 10, message: 'Position cannot exceed 10 characters' }
              })}
              type="text"
              placeholder="Enter your position"
              className="formInput"
            />
            {errors.experience?.[index]?.position && <span>{errors.experience[index].position?.message}</span>}

            <label>CTC</label>
            <input
              {...register(`experience.${index}.ctc`, {
                required: 'CTC is required',
                valueAsNumber: true,
                min: { value: 0, message: 'CTC must be greater than 0' }
              })}
              type="number"
              placeholder="Enter your CTC"
              className="formInput"
            />
            {errors.experience?.[index]?.ctc && <span>{errors.experience[index].ctc?.message}</span>}

            <label>Start Date</label>
            <input
              {...register(`experience.${index}.startDate`, { required: 'Start Date is required', valueAsDate: true })}
              type="date"
              className="formInput"
            />
            {errors.experience?.[index]?.startDate && <span>{errors.experience[index].startDate?.message}</span>}

            <label>End Date</label>
            <input
              {...register(`experience.${index}.endDate`, { valueAsDate: true })}
              type="date"
              className="formInput"
            />
            {errors.experience?.[index]?.endDate && <span>{errors.experience[index].endDate?.message}</span>}

            <label>Technologies</label>
            <input
              {...register(`experience.${index}.technologies`, { required: 'Technologies are required' })}
              type="text"
              placeholder="Enter technologies (comma-separated)"
              className="formInput"
            />
            
           
            {errors.experience?.[index]?.technologies && <span>{errors.experience[index].technologies?.message}</span>}

            <IconButton onClick={() => remove(index)} className="btn-danger">
              <DeleteIcon />
            </IconButton>
          </section>
        ))}

        <IconButton
          onClick={() => append({ organization: '', location: '', position: '', ctc: 0, startDate:new Date(), endDate:new Date(), technologies: ''})}
          className="btn-success"
        >
          <AddIcon/>
        </IconButton>

        <input type="submit" className="btn-success" />
      </form>
    </div>
  );
};

export default ExperienceForm;
