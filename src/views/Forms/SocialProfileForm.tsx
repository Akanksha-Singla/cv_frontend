import React, { useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray  ,useWatch} from "react-hook-form";
import { ISocialProfile } from "../../types/cvDetails";
import "../../styles/form.css";
import { useCreateCVMutation, useUpdateCVMutation, useGetCVQuery } from "../../apis/cvapi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CVPreview from "../CVPreview";
import { IAllPreviewProps } from "./EducationForm";

export interface ISocialProfileForm {
  socialProfiles: ISocialProfile[];
}

const SocialProfileForm:React.FC<IAllPreviewProps> = ({onUpdate}) => {
  const [createCV] = useCreateCVMutation();
  const [updateCV] = useUpdateCVMutation();
  
  const cvId = useSelector((state: any) => state.cv.cvId);
  const { _id } = useParams();

  const { register, handleSubmit, formState: { errors }, control, reset } = useForm<ISocialProfileForm>({
    mode: 'onTouched',
    defaultValues: {
      socialProfiles: [{ platform: '', link: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    name: 'socialProfiles',
    control
  });

  // Fetch CV data by ID (if editing an existing entry)
  const { data: existingCVData } = _id ? useGetCVQuery(_id) : { data: null };
  
  
  const watchedSocialProfiles = useWatch({
    control,
    name: 'socialProfiles'
  });

  useEffect(()=>{
    onUpdate(watchedSocialProfiles)
  },[watchedSocialProfiles])

  useEffect(() => {
    if (existingCVData?.data && existingCVData?.data?.socialProfiles?.length > 0) {
      reset({ socialProfiles: existingCVData?.data?.socialProfiles });
    }
  }, [existingCVData, reset]);

  const onSubmit: SubmitHandler<ISocialProfileForm> = async(data) => {
    const formData = {
      _id: _id || cvId,
      socialProfiles: data.socialProfiles
    };

    if (_id) {
     const res= await updateCV(formData).unwrap();
     console.log("res",res)
    } else {
      const res = await updateCV(formData).unwrap();
      console.log("res",res)
    }
  };
 

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {fields.map((field, index) => (
          <section key={field.id}>
            <label>Platform</label>
            <input
              {...register(`socialProfiles.${index}.platform`, { required: 'Platform is required' })}
              type="text"
              placeholder="Enter platform"
              className="formInput"
            />
            {errors.socialProfiles?.[index]?.platform && <span>{errors.socialProfiles[index]?.platform?.message}</span>}

            <label>Link</label>
            <input
              {...register(`socialProfiles.${index}.link`, {
                required: 'Link is required',
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\/?].*)?$/,
                  message: 'Enter a valid URL'
                }
              })}
              type="text"
              placeholder="Enter link (URL)"
              className="formInput"
            />
            {errors.socialProfiles?.[index]?.link && <span>{errors.socialProfiles[index]?.link?.message}</span>}

            <IconButton onClick={() => remove(index)} className="btn-danger">
              <DeleteIcon />
            </IconButton>
          </section>
        ))}

        <IconButton onClick={() => append({ platform: '', link: '' })} className="btn-success">
          <AddIcon />
        </IconButton>

        <input type="submit" className="btn-success" />
      </form>
          {/* Live Preview Section */}
          {/* <div className="previewContainer">
        <h3>Live Preview</h3>
        {watchedSocialProfiles && watchedSocialProfiles.map((profile, index) => (
          <div key={index} className="previewItem">
            <p><strong>Platform:</strong> {profile.platform || "N/A"}</p>
            <p><strong>Link:</strong> {profile.link || "N/A"}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default SocialProfileForm;
