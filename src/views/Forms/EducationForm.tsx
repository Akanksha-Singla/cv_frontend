import React, { useEffect } from 'react';
import { useForm, SubmitHandler, useFieldArray,useWatch } from 'react-hook-form';
import { IEducation } from '../../types/cvDetails';
import '../../styles/form.css';
import { useCreateCVMutation, useUpdateCVMutation, useGetCVQuery } from '../../apis/cvapi';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export interface IEducationForm {
  education: IEducation[];
}
export interface IAllPreviewProps{
  onUpdate:any

}
const EducationForm:React.FC<IAllPreviewProps> = ({onUpdate}) => {
  const [createCV] = useCreateCVMutation();
  const [updateCV] = useUpdateCVMutation();

  const cvId = useSelector((state: any) => state.cv.cvId);
  console.log("cvId in education",cvId)
  const { _id } = useParams();
  
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<IEducationForm>({
    mode: 'onTouched',
    defaultValues: {
      education: [{ degree: '', institution: '', percentage: 0 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    name: 'education',
    control
  });

  // Fetch CV data by ID (if editing an existing entry)
  const { data: existingCVData } = _id ? useGetCVQuery(_id) : { data: null };
console.log(existingCVData?.data);

const watchedEducation = useWatch({
  control,
  name: 'education'
});

useEffect(()=>{
  onUpdate(watchedEducation)
},[watchedEducation])
 
useEffect(() => {
    if (existingCVData?.data && existingCVData?.data?.education?.length > 0) {
      reset({ education: existingCVData?.data?.education });
    }
  }, [existingCVData, reset]);

  const onSubmit: SubmitHandler<IEducationForm> = async(data) => {
    const formData = {
      _id: _id || cvId,
      education: data.education
    };

    if (_id) {
  const res =  await updateCV(formData).unwrap()
  console.log(res)

  } else {
       const res =  await updateCV(formData).unwrap()
  console.log(res)
    }
  };

  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        {fields.map((field, index) => (
          <section key={field.id}>
            <label>Degree</label>
            <input
              {...register(`education.${index}.degree`, { required: 'Degree is required' })}
              type='text'
              placeholder='Enter your degree'
              className='formInput'
            />
            {errors.education?.[index]?.degree && <span>{errors.education[index]?.degree?.message}</span>}

            <label>Institution</label>
            <input
              {...register(`education.${index}.institution`, { required: 'Institution is required' })}
              type='text'
              placeholder='Enter your institution'
              className='formInput'
            />
            {errors.education?.[index]?.institution && <span>{errors.education[index]?.institution?.message}</span>}

            <label>Percentage</label>
            <input
              {...register(`education.${index}.percentage`, {
                required: 'Percentage is required',
                min: { value: 0, message: 'Percentage must be at least 0' },
                max: { value: 100, message: 'Percentage cannot be more than 100' }
              })}
              type='number'
              placeholder='Enter your percentage'
              className='formInput'
            />
            {errors.education?.[index]?.percentage && <span>{errors.education[index]?.percentage?.message}</span>}

            <IconButton onClick={() => remove(index)} className='btn-danger'>
              <DeleteIcon />
            </IconButton>
          </section>
        ))}

        <IconButton
          onClick={() => append({ degree: '', institution: '', percentage: 0 })}
          className='btn-success'
        >
          <AddIcon /> 
        </IconButton>

        <input type='submit' className='btn-success' />
      </form>
    </div>
  );
};

export default EducationForm;
