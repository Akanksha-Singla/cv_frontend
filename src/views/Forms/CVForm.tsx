import React, { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import {
  IBasicDetails,
  IEducation,
  IExperience,
  IProject,
  ISkill,
  ISocialProfile,
} from "../../types/cvDetails";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BasicForm from "./BasicForm";
import EducationForm from "./EducationForm";
import ExperienceForm from "./ExperienceForm";
import SkillsForm from "./SkillsForm";
import ProjectForm from "./ProjectForm";
import {
  useCreateCVMutation,
  useUpdateCVMutation,
  useGetCVQuery,
} from "../../apis/cvapi";
import SocialProfileForm from "./SocialProfileForm";
import CVPreview from "../CVPreview";
import "../cvTemplete.css";
import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";

const CVForm = () => {
  const [createCV] = useCreateCVMutation();
  const { _id } = useParams();
  // Fetch CV data by ID (if editing an existing entry)
  const { data: existingCVData } = _id ? useGetCVQuery(_id) : { data: null };
  console.log("cvForm", existingCVData?.data.basicDetails);

  const initialBasicDetail = _id
    ? existingCVData?.data.basicDetails
    : {
        name: "Akanksha",
        email: "singla.akanksha92@gmail.com",
        phone: 9999999999,
        address: "Prince Ice Cream",
        city: "JInd",
        state: "Haryana",
        pincode: 126102,
        intro: "Software Developer",
      };
  const initialEducation = _id
    ? existingCVData?.data.education
    : [
        {
          degree: "B.tech",
          institution: "JIet",
          percentage: 80,
        },
      ];

  const initialExperience = _id
    ? existingCVData?.data.experience
    : [
        {
          organization: "Neosoft",
          location: "Mumbai",
          position: "developer",
          ctc: 3,
          startDate: new Date(),
          endDate: new Date(),
          technologies: "Javascript",
        },
      ];

  const initialSkills = _id
    ? existingCVData?.data.skills
    : [{ skillName: "React", proficiency: 56 }];
  const initialProjects = _id
    ? existingCVData?.data.projects
    : [
        {
          title: "CV_Builder",
          teamSize: 3,
          duration: "2 weeks",
          technologies: "React",
          description: "Mern Stack",
        },
      ];
  const initialSocialProfile = _id
    ? existingCVData?.data.socialProfiles
    : [{ platform: "Linked in", link: "" }];
  const [formData, setFormData] = useState({
    basicDetails: initialBasicDetail,
    education: initialEducation,

    experience: initialExperience,
    skills: initialSkills,
    projects: initialProjects,
    socialProfile: initialSocialProfile,
  });

  const upFormData = (section: string, data: any) => {
    console.log("basic updade form", section, data);
    setFormData((prev) => {
      return { ...prev, [section]: data };
    });
  };

  const steps = [
    "Basic Details",
    "Education",
    "Experience",
    "Skills",
    "Projects",
    "Social Profile",
  ];
  const basicDetailMethod = useForm<IBasicDetails>({
    defaultValues: {
      name: "",
      email: "",
      phone: 9999999999,
      address: "",
      city: "",
      state: "",
      pincode: 126102,
      intro: "",
    },
  });
  const educationMethod = useForm<IEducation>({
    defaultValues: { degree: "", institution: "", percentage: 0 },
  });
  const skillMethod = useForm<ISkill[]>({
    defaultValues: [{ skillName: "", proficiency: 56 }],
  });

  const projectMethod = useForm<IProject>({
    defaultValues: {
      title: "",
      teamSize: 3,
      duration: "",
      technologies: "",
      description: "",
    },
  });

  const experienceMethod = useForm<IExperience>({
    defaultValues: {
      organization: "",
      location: "",
      position: "",
      ctc: 2,
      startDate: new Date(),
      endDate: new Date(),
      technologies: "",
    },
  });

  const socialProfilesMethod = useForm<ISocialProfile>({
    defaultValues: { platform: "", link: "" },
  });

  const formMethods = {
    basicDetail: basicDetailMethod,
    education: educationMethod,
    skills: skillMethod,
    projects: projectMethod,
    experience: experienceMethod,
    socialProfiles: socialProfilesMethod,
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    //  const ans =  window.confirm("Have you submitted the details?")
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8, lg: 6 }}>
          <Box>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps: { completed?: boolean } = {};
                const labelProps: {
                  optional?: React.ReactNode;
                } = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>

            {activeStep == 0 && (
              <FormProvider {...basicDetailMethod}>
                <BasicForm
                  formData={formData.basicDetails}
                  onUpdate={(data: IBasicDetails) =>
                    upFormData("basicDetails", data)
                  }
                />
              </FormProvider>
            )}
            {activeStep == 1 && (
              <FormProvider {...educationMethod}>
                <EducationForm
                  onUpdate={(data: IEducation) => upFormData("education", data)}
                />
              </FormProvider>
            )}
            {activeStep == 2 && (
              <FormProvider {...experienceMethod}>
                <ExperienceForm
                  onUpdate={(data: IExperience) =>
                    upFormData("experience", data)
                  }
                />
              </FormProvider>
            )}
            {activeStep == 3 && (
              <FormProvider {...skillMethod}>
                <SkillsForm
                  onUpdate={(data: ISkill) => upFormData("skills", data)}
                />
              </FormProvider>
            )}

            {activeStep == 4 && (
              <FormProvider {...projectMethod}>
                <ProjectForm
                  onUpdate={(data: IProject) => upFormData("projects", data)}
                />
              </FormProvider>
            )}
            {activeStep == 5 && (
              <FormProvider {...socialProfilesMethod}>
                <SocialProfileForm
                  onUpdate={(data: ISocialProfile) =>
                    upFormData("socialProfile", data)
                  }
                />
              </FormProvider>
            )}

            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
                {/* Final Submit Button */}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Step {activeStep + 1}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )}
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>

        {
          <Grid size={{ xs: 12, md: 4, lg: 6 }}>
            <CVPreview formData={formData} />
          </Grid>
        }
      </Grid>
    </Box>
  );
};

export default CVForm;
