import React, { useState } from 'react';

import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress
} from "@mui/material"

import { Formik, Form } from 'formik';

import BasicForm from '../../views/Forms/BasicForm';
import EducationForm from '../../views/Forms/EducationForm';
import ProjectForm from '../../views/Forms/ProjectForm';
import SkillsForm from '../../views/Forms/SkillsForm';
import ExperienceForm from '../../views/Forms/ExperienceForm';

import { formInitialValues } from '../../views/FormModel/cvFormInitialValues';
import { SxProps } from '@mui/material';

import { validationSchema } from '../../views/FormModel/ValidationSchema';
import { ICVDetails } from '../../types/cvDetails';
import {
  
  responsiveFontSizes,
  makeStyles,
} from '@mui/material';

import createPalette from '@mui/material/styles/createPalette';
import { createTheme } from '@mui/material';
import { blue, brown } from '@mui/material/colors';
import { Dashboard } from '@mui/icons-material';
// import { cyan } from '@mui/material';
let theme = createTheme({
  palette: {  primary: blue, secondary: brown },
});
theme = responsiveFontSizes(theme);

// import useStyle from './'

const steps = ['Basic Form','Experience','Education','Project','Skills']

// const {formId, formField} = checkoutModel;
const useStyle = makeStyles(() => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    // [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
    //   width: 600,
    //   marginLeft: 'auto',
    //   marginRight: 'auto',
    // },
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    // [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
    //   marginTop: theme.spacing(6),
    //   marginBottom: theme.spacing(6),
    //   padding: theme.spacing(3),
    // },
  },
}));


function _renderStepContent(step:number) {
  switch (step) {
    case 0:
      return <BasicForm  />;
    case 1:
      return <ExperienceForm />;
    case 2:
      return <EducationForm />;
      case 3:
      return <ProjectForm/>
      case 4:
        return <SkillsForm/>
default:
      return <div>Not Found</div>;
  }
}


export default function CheckoutPage() {
  const classes = useStyle 
  const [activeStep, setActiveStep] = useState(0);
  // const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function _submitForm(values:ICVDetails,actions:any) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values:any, actions:any) {
    if (isLastStep) {
      _submitForm(values, actions);//put api here to send data to backend
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Checkout
      </Typography>
      <Stepper activeStep={activeStep}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          // <CheckoutSuccess />
          <Dashboard/>
        ) : (
          <Formik
            initialValues={formInitialValues}
            // validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                <div>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack} >
                      Back
                    </Button>
                  )}
                  <div >
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      
                    >
                      {isLastStep ? 'Place order' : 'Next'}
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                       
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
}