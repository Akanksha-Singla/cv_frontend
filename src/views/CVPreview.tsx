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
import ResumeCard from "./ResumeCard";
import { LinkedIn } from "@mui/icons-material";
import ListItem from "@mui/material/ListItem";
import { useGetCVQuery } from "../apis/cvapi";
import { useSelector } from "react-redux";

interface IPreviewProps {
  formData: any;
}

const CVPreview: React.FC<IPreviewProps> = ({ formData }) => {
  const {
    basicDetails,
    socialProfile,
    skills,
    projects,
    experience,
    education,
  } = formData;
  return (
    <Box sx={{}}>
      <Grid container spacing={2}>
        {/* left column */}
        {/* profile */}

        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              alt={"emp Image"}
              src={empImage}
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h5" component="div" sx={{ mt: 2 }}>
              {basicDetails.name}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {basicDetails.address}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {basicDetails.city}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {basicDetails.state}
            </Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>
              {basicDetails.pincode}
            </Typography>
          </Box>
          {/* Contact Details */}
          <Divider sx={{ mt: 2 }} />
          <List>
            <ListItem sx={{ display: "flex" }}>
              <ListItemIcon>
                <EmailOutlined />
              </ListItemIcon>
              <ListItemText>{basicDetails.email}</ListItemText>
            </ListItem>
            <ListItem sx={{ display: "flex" }}>
              <ListItemIcon>
                <ContactPhoneOutlined />
              </ListItemIcon>
              <ListItemText>{basicDetails.phone}</ListItemText>
            </ListItem>
          </List>
          <Divider sx={{ mb: 2 }} />

          {/* Skills */}
          <Typography variant="h6" component="div" sx={{ mt: 2 }}>
            Skills
          </Typography>
          <List component="nav" dense>
            {skills.map((skill: ISkill, index: number) => (
              <ListItem sx={{ display: "flex" }}>
                <ListItemIcon>{skill.skillName}</ListItemIcon>
                <ListItemText>{skill.proficiency}</ListItemText>
              </ListItem>
            ))}
          </List>

          {/* Social Media Links */}

          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
            Social Media
          </Typography>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            {socialProfile.map((media: ISocialProfile, index: number) => (
              <IconButton color="primary" key={index}>
                <LinkedIn />
              </IconButton>
            ))}
          </Box>
        </Grid>
       

        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />


        {/* Right Column */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" component="div">
              Summary
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {basicDetails.intro}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {/* experience */}

          <Typography variant="h6" component="div">
            Experience
          </Typography>
          <Box sx={{ mt: 2 }}>
            {experience.map((experience: IExperience, index: number) => (
              <React.Fragment key={index}>
                <Box sx={{ mb: 3 }}>
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

          <Typography variant="h6" component="div">
            Education
          </Typography>
          <Box sx={{ mt: 2 }}>
            {education.map((education: IEducation, index: number) => (
              <React.Fragment key={index}>
                <Box sx={{ mb: 3 }}>
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

          <Typography variant="h6" component="div">
            Projects
          </Typography>
          <Box sx={{ mt: 2 }}>
            {projects.map((project: IProject, index: number) => (
              <React.Fragment key={index}>
                <Box sx={{ mb: 3 }}>
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
