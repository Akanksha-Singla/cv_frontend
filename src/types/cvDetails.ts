import { ISkillForm } from "../views/Forms/SkillsForm"

export interface ICVDetails {
    _id?:string,
    basicDetails: IBasicDetails
    education: IEducation[]
    experience: IExperience[]
    projects: IProject[]
    skills: ISkill[] 
    socialProfiles: ISocialProfile[]
  }
  
  export interface IBasicDetails {
    
    name: string
    email: string
    phone: number
    address: string
    city: string
    state: string
    pincode: number
    intro: string
  }
  
  export interface IEducation {
    degree: string
    institution: string
    percentage: number
  }

  export interface IExperience {
    organization: string
    location: string
    position: string
    ctc: number
    startDate: Date
    endDate?:Date
    technologies: string
  }
  
  export interface IProject {
    title: string
    teamSize: number
    duration: string
    technologies: string
    description: string
  }
  
  export interface ISkill {
    skillName: string
    proficiency: number
  }
  
  export interface ISocialProfile {
    platform: string
    link: string
  }
  