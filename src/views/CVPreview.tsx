import React from "react";
// MUI
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Slider from "@mui/material/Slider";


import {
  ISocialProfile,
  IBasicDetails,
  IEducation,
  IExperience,
  IProject,
  ISkill,
} from "../types/cvDetails";
import empImage from "../assets/Images/emp1.jpg";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import ContactPhoneOutlined from "@mui/icons-material/ContactPhoneOutlined";
import Home from "@mui/icons-material/Home";

import { LinkedIn } from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import { useGetCVQuery } from "../apis/cvapi";
import { useSelector } from "react-redux";
import { Stack } from "@mui/material";

interface IPreviewProps {
  formData: any;
}

const CVPreview: React.FC<IPreviewProps> = ({ formData }) => {
  console.log("formdata",formData)
  const {
    basicDetails,
    socialProfile,
    skills,
    projects,
    experience,
    education,
  } = formData;
  return (
    <Box sx={{ mt:5, border: "1px solid var(--clr-dark)" ,p:3,borderRadius:"2px"}}>
           <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                background: "#fbb117",
               
              }}
              spacing={2} // Adds consistent spacing between element
            >
              <Typography
                variant="h3"
                sx={{
                  mt: { xs: 0, md: 2 }, // Adjust margin top based on screen size
                  flexGrow: 1, // Helps Typography to fill available space
                 }}
              >
                {basicDetails?.name}
              </Typography>
              <Avatar
                alt="Employee Image"
                src={empImage}
                sx={{
                  width: { xs: 80, md: 100 }, // Responsive size for different screen widths
                  height: { xs: 80, md: 100 },
                  borderRadius:"50%", 
                  px:2
                }}
              />
            </Stack>
      <Grid container spacing={2} >
        <Grid size={{ xs: 12, md: 4}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
             
            }}
          >
      </Box>
          {/* Contact Details */}
        
          <List sx={{ width: "100%" }}>
  {/* Adjust horizontal padding/margin and align items */}
  <ListItem sx={{ paddingY: 0.5 }}> {/* Reduced vertical padding */}
    <ListItemIcon sx={{ minWidth: "30px" }}> {/* Reduce icon container size */}
      <EmailOutlined />
    </ListItemIcon>
    <ListItemText 
      primaryTypographyProps={{ variant: "body2" }} // Reduce text size
      sx={{ margin: 0 }} // Remove default margin
    >
      {basicDetails?.email}
    </ListItemText>
  </ListItem>

  <ListItem sx={{ paddingY: 0.5 }}>
    <ListItemIcon sx={{ minWidth: "30px" }}>
      <ContactPhoneOutlined />
    </ListItemIcon>
    <ListItemText 
      primaryTypographyProps={{ variant: "body2" }}
      sx={{ margin: 0 }}
    >
      {basicDetails?.phone}
    </ListItemText>
  </ListItem>

  <ListItem sx={{ paddingY: 0.5 }}>
    <ListItemIcon sx={{ minWidth: "30px" }}>
      <Home />
    </ListItemIcon>
    <ListItemText 
      primaryTypographyProps={{ variant: "body2" }}
      sx={{ margin: 0 }}
    >
      {basicDetails?.address} | {basicDetails?.city} | {basicDetails?.state} | {basicDetails?.pincode}
    </ListItemText>
  </ListItem>
</List>

       
         
          <Divider sx={{ mb: 2 }} />

          {/* Skills */}
          <Typography
            variant="h6"
            component="div"
            sx={{ background: "#fbb117",textAlign: "left" }}
          >
            Skills
          </Typography>
          <List component="nav" dense>
  {skills?.map((skill: ISkill, index: number) => (
    <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
      <ListItemIcon sx={{ minWidth: "30px",color:"black" }}>{skill.skillName}</ListItemIcon>
      {/* Slider for proficiency */}
      <Slider
        value={skill.proficiency} // assuming proficiency is a number between 0-100
        aria-labelledby="proficiency-slider"
        step={10}
        marks
        min={0}
        max={100}
        valueLabelDisplay="auto" // shows the value above the slider
        sx={{ ml: 2, width: "150px" }} // adjust the width
        disabled // makes it read-only
      />
    </ListItem>
  ))}
</List>
          <Divider sx={{ mb: 2 }} />
          {/* Social Media Links */}

          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: "left", background: "#fbb117" }}
          >
            Social Media
          </Typography>
          <Box sx={{ mt: 2, textAlign: "left" }}>
            {socialProfile?.map((media: ISocialProfile, index: number) => (
              <Typography color="primary" key={index}>
               {media.platform} : {media.link} 
              </Typography>
            ))}
          </Box>
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Right Column */}
        <Grid size={{ xs: 12, md: 7}} >
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" component="div" sx={{ textAlign: "left", background: "#fbb117" }}>
              Summary
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 ,textAlign: "left"}}>
              {basicDetails?.intro}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {/* experience */}

          <Typography variant="h6" component="div" sx={{ textAlign: "left", background: "#fbb117" }}>
            Experience
          </Typography>
          <Box sx={{ mt: 2 }}>
            {experience?.map((experience: IExperience, index: number) => (
              <React.Fragment key={index}>
                <Box sx={{ mb: 3 ,textAlign: "left"}}>
                  <Typography variant="subtitle1">
                    {experience.organization}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {experience.position}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {experience.technologies}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {experience.ctc}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {/* {experience.startDate?.toString()} |    {experience.endDate?.toString()} */}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
              </React.Fragment>
            ))}
          </Box>

          {/* Education */}

          <Typography variant="h6" component="div" sx={{ textAlign: "left", background: "#fbb117" }}>
            Education
          </Typography>
          <Box sx={{ mt: 2 }}>
            {education?.map((education: IEducation, index: number) => (
              <React.Fragment key={index}>
                <Box sx={{ mb: 3,textAlign: "left" }}>
                  <Typography variant="subtitle1">
                    {education.degree}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {education.institution}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {education.percentage}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
              </React.Fragment>
            ))}
          </Box>

          {/*Projects */}

          <Typography variant="h6" component="div" sx={{ textAlign: "left", background: "#fbb117" }}>
            Projects
          </Typography>
          <Box sx={{ mt: 2 }}>
            {projects?.map((project: IProject, index: number) => (
              <React.Fragment key={index}>
                <Box sx={{ mb: 3 ,textAlign: "left"}}>
                  <Typography variant="subtitle1">{project.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Project completed in {project.duration} with a team of{" "}
                    {project.teamSize}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.technologies}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {project.description}
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />
              </React.Fragment>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CVPreview;
