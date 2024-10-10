import React, { useState,useRef } from "react";
import { ICVDetails } from "../types/cvDetails";
import "./cvTemplete.css";
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


type Iprops = {
  cv: ICVDetails;
  deleteCVById: (id?: string) => void;
};
const CVCard = (props: Iprops) => {
  const[loader,setLoader] = useState(false)
  const { cv, deleteCVById } = props;
  console.log("cv", cv);
  const {
    basicDetails,
    education,
    experience,
    projects,
    skills,
    socialProfiles,
  } = cv;
  const [show, setShow] = useState(false);

  const downloadPdf =()=>{
    console.log("download")
    const capture = document.querySelector('.cvTemplate');
    setLoader(true);
    html2canvas(capture).then((canvas)=>{
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4');

      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save('cv.pdf');
    })

  }
 




  return (
    <div className="cvTemplate" onClick={() => setShow(!show)} >
      {/* Header with Name and Optional Image */}
      {show && (
        <div>
          <Button
            component={Link}
            to={`/editCV/${cv._id}`}
            startIcon={<EditIcon />}
            // color="primary"
            variant="contained"
            style={{ position: "relative", float: "left", margin: "9px",background:"var(--clr-brown)",textAlign:"center"}}>
          
          </Button>
        
          <Button
            onClick={() => deleteCVById(cv?._id)}
            startIcon={<DeleteIcon />}
            // color="secondary"
            variant="contained"
            style={{ position: "relative", float: "right", margin: "9px",background:"var(--clr-brown)",textAlign:"center"}}
          >
           </Button>
         

        </div>
      )}
      <div className="header">
        <h1>{basicDetails.name}</h1>
        <p>
          {basicDetails.email} | {basicDetails.phone} | {basicDetails.address}
        </p>
      </div>

      {/* Main Body */}
      <div className="main">
        {/* Basic Details */}
        {/* Summary */}
        <div className="section">
          <h2>Summary</h2>
          <p>{basicDetails.intro}</p>
        </div>

        {/* Experience */}
        <div className="section">
          <h2>Experience</h2>
          <ul>
            {experience?.map((exp, index) => (
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
            {projects?.map((project, index) => (
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
            {education?.map((edu, index) => (
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
            {Array.isArray(skills)  && (
              skills.map((skill, index) => (
                <li key={index}>
                  {skill.skillName} - {skill.proficiency}
                </li>
              ))
            ) }
          </ul>
        </div>

        {/* Social Profiles */}
        <div className="section">
          <h2>Social Profiles</h2>
          <ul>
            {socialProfiles?.map((profile, index) => (
              <li key={index}>
                <a
                  href={profile.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={downloadPdf} className="btn-success">
              {
                loader?(<span>Downloading</span>):(<span>Download</span>)
              }
      </button>
    </div>
  );
};

export default CVCard;
