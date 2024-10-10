import React from 'react';
import { useGetCVQuery } from '../apis/cvapi';
import { useSelector } from 'react-redux';
import './cvTemplete.css';
import { IEducation, IExperience, IProject, ISkill, ISocialProfile } from '../types/cvDetails';

const CVTemplete = () => {
  const cvId = useSelector((state:any) => state.cv.cvId); // Get cvId from Redux store
  console.log(cvId)
  const { data: cv } = useGetCVQuery(cvId, { skip: !cvId,pollingInterval: 5000 }); // Skip query if no cvId

  // Return empty div if no data
  if (!cv) {
    return <div>Submit basic details for preview</div>;
  }

  const {
    basicDetails,
    education,
    experience,
    projects,
    skills,
    socialProfiles,
  } = cv.data;

  return (
    <div className="cvTemplate">
      {/* Header */}
      <div className="header">
        <h1>{basicDetails.name}</h1>
        <p>
          {basicDetails.email} | {basicDetails.phone} | {basicDetails.address} 
        </p>
      </div>

      {/* Main Body */}
      <div className="main">
        {/* Summary */}
        <div className="section">
          <h2>Summary</h2>
          <p>{basicDetails.intro}</p>
        </div>

        {/* Experience */}
        <div className="section">
          <h2>Experience</h2>
          <ul>
            {experience?.map((exp:IExperience, index:number) => (
              <li key={index}>
                <strong>{exp.position}</strong> at {exp.organization} (
                {exp.startDate} - {exp.endDate})
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="section">
          <h2>Projects</h2>
          <ul>
            {projects?.map((project:IProject, index:number) => (
              <li key={index}>
                <strong>{project.title}</strong>
                <p>{project.description}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Education */}
        <div className="section">
          <h2>Education</h2>
          <ul>
            {education?.map((edu:IEducation, index:number) => (
              <li key={index}>
                <strong>{edu.degree}</strong> - {edu.institution} (
                {edu.percentage})
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div className="section">
          <h2>Skills</h2>
          <ul className="skills">
            {skills?.map((skill:ISkill, index:number) => (
              <li key={index}>
                {skill.skillName} - {skill.proficiency}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Profiles */}
        <div className="section">
          <h2>Social Profiles</h2>
          <ul>
            {socialProfiles?.map((profile:ISocialProfile, index:number) => (
              <li key={index}>
                <a href={profile.link} target="_blank" rel="noopener noreferrer">
                  {profile.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CVTemplete;
