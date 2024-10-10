import React, { useEffect } from 'react';
import { IProject } from '../../types/cvDetails';
import { useForm, SubmitHandler, useFieldArray,useWatch } from 'react-hook-form';
import '../../styles/form.css';
import { useCreateCVMutation, useUpdateCVMutation, useGetCVQuery } from '../../apis/cvapi';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { IAllPreviewProps } from './EducationForm';

export interface IProjectForm {
  projects: IProject[];
}

const ProjectForm:React.FC<IAllPreviewProps> = ({onUpdate}) => {
  const [createCV] = useCreateCVMutation();
  const [updateCV] = useUpdateCVMutation();
  const cvId = useSelector((state: any) => state.cv.cvId);
  
  // Set up form and control field arrays for projects
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<IProjectForm>({
    mode: 'onTouched',
    defaultValues: {
      projects: [{ title: '', teamSize: 1, duration: '', technologies: '', description: '' }]
    }
  });

  // Field array for dynamically adding/removing project fields
  const { fields, append, remove } = useFieldArray({
    name: 'projects',
    control
  });

  const { _id } = useParams();
  const { data: existingCVData } = _id ? useGetCVQuery(_id) : { data: null };

  const watchedProjects = useWatch({
    control,
    name: 'projects'
  });

  useEffect(()=>{
    onUpdate(watchedProjects)
  },[watchedProjects])

  useEffect(() => {
    if (existingCVData?.data && existingCVData?.data?.projects?.length > 0) {
      reset({ projects: existingCVData?.data?.projects }); // Reset form with existing project data
    }
  }, [existingCVData, reset]);

  const onSubmit: SubmitHandler<IProjectForm> =async(data) => {
    const formData = {
      _id: _id || cvId,
      projects: data.projects // Capture the dynamic list of projects
    };

    if (_id) {
      const res= await updateCV(formData).unwrap();
     console.log("res",res)
    } else {
      const res= await updateCV(formData).unwrap();
      console.log("res",res)
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {fields.map((field, index) => (
          <section key={field.id}>
            <label>Title</label>
            <input
              {...register(`projects.${index}.title`, { required: 'Title is required' })}
              type="text"
              placeholder="Enter project title"
              className="formInput"
            />
            {errors.projects?.[index]?.title && <span>{errors.projects[index].title?.message}</span>}

            <label>Team Size</label>
            <input
              {...register(`projects.${index}.teamSize`, {
                required: 'Team size is required',
                valueAsNumber: true,
                min: { value: 1, message: 'Team size must be greater than 0' }
              })}
              type="number"
              placeholder="Enter team size"
              className="formInput"
            />
            {errors.projects?.[index]?.teamSize && <span>{errors.projects[index].teamSize?.message}</span>}

            <label>Duration</label>
            <input
              {...register(`projects.${index}.duration`, {
                required: 'Duration is required',
                maxLength: { value: 10, message: 'Duration cannot exceed 10 characters' }
              })}
              type="text"
              placeholder="Enter project duration"
              className="formInput"
            />
            {errors.projects?.[index]?.duration && <span>{errors.projects[index].duration?.message}</span>}

            <label>Technologies</label>
            <input
              {...register(`projects.${index}.technologies`, { required: 'Technologies are required' })}
              type="text"
              placeholder="Enter technologies (comma-separated)"
              className="formInput"
            />
            {errors.projects?.[index]?.technologies && <span>{errors.projects[index].technologies?.message}</span>}

            <label>Description</label>
            <textarea
              {...register(`projects.${index}.description`, { required: 'Description is required' })}
              placeholder="Enter project description"
              className="formInput"
            />
            {errors.projects?.[index]?.description && <span>{errors.projects[index].description?.message}</span>}

            <IconButton onClick={() => remove(index)} className="btn-danger">
              <DeleteIcon />
            </IconButton>
          </section>
        ))}

        <IconButton
          onClick={() => append({ title: '', teamSize: 1, duration: '', technologies: '', description: '' })}
          className="btn-success"
        >
          <AddIcon/>
        </IconButton>

        <input type="submit" className="btn-success" />
      </form>
    </div>
  );
};

export default ProjectForm;
