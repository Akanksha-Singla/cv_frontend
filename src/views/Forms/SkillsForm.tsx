import React, { useEffect } from 'react';
import { ISkill } from '../../types/cvDetails';
import { useForm, SubmitHandler, useFieldArray ,useWatch} from 'react-hook-form';
import '../../styles/form.css';
import { useCreateCVMutation, useUpdateCVMutation, useGetCVQuery } from '../../apis/cvapi';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { IAllPreviewProps } from './EducationForm';


export interface ISkillForm {
  skills: ISkill[];
}

const SkillsForm:React.FC<IAllPreviewProps> = ({onUpdate}) => {
  const [createCV] = useCreateCVMutation();
  const [updateCV] = useUpdateCVMutation();
  const cvId = useSelector((state: any) => state.cv.cvId);

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<ISkillForm>({
    mode: 'onTouched',
    defaultValues: {
      skills: [{ skillName: '', proficiency: 56 }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    name: 'skills',
    control // You should control form state with this hook
  });

  const { _id } = useParams();
  const { data: existingCVData } = _id ? useGetCVQuery(_id) : { data: null };

  const watchedSkills = useWatch({
    control,
    name: 'skills'
  });

  useEffect(()=>{
    onUpdate(watchedSkills)
  },[watchedSkills])


  useEffect(() => {
    if (existingCVData?.data && existingCVData?.data?.skills?.length > 0) {
      reset({ skills: existingCVData?.data?.skills });
    }
  }, [existingCVData, reset]);

  const onSubmit: SubmitHandler<ISkillForm> = async (data) => {
    if (_id) {
      const formData = {
        _id,
        skills: data.skills
      };
      const res= await updateCV(formData).unwrap();
      console.log("res",res)
    } else {
      const formData = {
        _id: cvId,
        skills: data.skills
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
            <label>Skill Name</label>
            <input
              {...register(`skills.${index}.skillName`, { required: 'Skill name is required' })}
              type="text"
              placeholder="Enter skill name"
              className="formInput"
            />
            {errors.skills?.[index]?.skillName && <span>{errors.skills[index].skillName?.message}</span>}
            
            <label>Proficiency</label>
            <input
              {...register(`skills.${index}.proficiency`, {
                required: 'Proficiency is required',
                valueAsNumber: true,
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
              className="formInput"
            />
            {errors.skills?.[index]?.proficiency && <span>{errors.skills[index].proficiency?.message}</span>}
            
            <IconButton onClick={() => remove(index)} className="btn-danger"><DeleteIcon></DeleteIcon></IconButton>
          </section>
        ))}

        <IconButton
         onClick={() => append({ skillName: '', proficiency: 0 })}
          
        >
          <AddIcon></AddIcon>
        </IconButton>

        <input type="submit" className="btn-success" />
      </form>
    </div>
  );
};

export default SkillsForm;
