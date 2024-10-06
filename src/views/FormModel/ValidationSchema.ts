import * as Yup from 'yup';
// Validation Schema
export const validationSchema = Yup.object({
    basicDetails: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      pincode: Yup.string().required('Required'),
      intro: Yup.string().required('Required'),
    }),
    education: Yup.array().of(
      Yup.object({
        degree: Yup.string().required('Required'),
        institution: Yup.string().required('Required'),
        percentage: Yup.number().min(0).max(100).required('Required'),
      })
    ),
    experience: Yup.array().of(
      Yup.object({
        organization: Yup.string().required('Required'),
        location: Yup.string().required('Required'),
        position: Yup.string().required('Required'),
        ctc: Yup.number().required('Required'),
        startDate: Yup.string().required('Required'),
        endDate: Yup.string(),
        technologies: Yup.array().of(Yup.string().required('Required'))
      })
    ),
    projects: Yup.array().of(
      Yup.object({
        title: Yup.string().required('Required'),
        teamSize: Yup.number().required('Required'),
        duration: Yup.string().required('Required'),
        technologies: Yup.array().of(Yup.string().required('Required')),
        description: Yup.string().required('Required')
      })
    ),
    skills: Yup.array().of(
      Yup.object({
        skillName: Yup.string().required('Required'),
        proficiency: Yup.number().min(1).max(10).required('Required')
      })
    ),
    socialProfiles: Yup.array().of(
      Yup.object({
        platform: Yup.string().required('Required'),
        link: Yup.string().url('Invalid URL').required('Required')
      })
    )
  });