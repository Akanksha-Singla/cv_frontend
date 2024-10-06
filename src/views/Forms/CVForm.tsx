import React from "react";
import { FormProvider, useForm } from "react-hook-form";
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
import { useCreateCVMutation,useUpdateCVMutation } from "../../apis/cvapi";
import SocialProfileForm from "./SocialProfileForm";


const CVForm = () => {
  const[createCV] = useCreateCVMutation()

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
  const skillMethod = useForm<ISkill>({
    defaultValues: { skillName: "", proficiency: 56 },
  });

  const projectMethod = useForm<IProject>({
    defaultValues: {
      title: "",
      teamSize: 3,
      duration: "",
      technologies: [""],
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
      technologies: [""],
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
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
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
    <Box sx={{ width: "100%" }}>
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

      {activeStep == 0 && <FormProvider {...basicDetailMethod}><BasicForm /></FormProvider>}
      {activeStep == 1 && <FormProvider {...educationMethod}><EducationForm/></FormProvider>}
      {activeStep == 2 && <FormProvider {...experienceMethod}><ExperienceForm /></FormProvider>}
      {activeStep == 3 && <FormProvider {...skillMethod}><SkillsForm /></FormProvider>}
      {activeStep == 4 && <FormProvider {...projectMethod}><ProjectForm /></FormProvider>}
      {activeStep == 5 && <FormProvider {...socialProfilesMethod}><SocialProfileForm /></FormProvider>}

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
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
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
  );
};

export default CVForm;
