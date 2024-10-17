import React, { useState } from "react";
import { ICVDetails } from "../types/cvDetails";
import { IconButton, Box, Avatar, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Button, Slider } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import empImage from "../assets/Images/emp1.jpg";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import ContactPhoneOutlined from "@mui/icons-material/ContactPhoneOutlined";
import Home from "@mui/icons-material/Home";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

type IProps = {
  cv: ICVDetails;
  deleteCVById: (id: string) => void;
};

const CVCard:React.FC<IProps> = (props) => {
  const [loader, setLoader] = useState(false);
  const { cv, deleteCVById } = props;
  const { basicDetails, education, experience, projects, skills, socialProfiles,cvImage } = cv;
  const [show, setShow] = useState(false);

  const downloadPdf = () => {
    const capture = document.querySelector(".cvTemplate");
    setLoader(true);
    html2canvas(capture!).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("cv.pdf");
    });
  };

  return (
    <Box className="cvTemplate" 
    sx={{ mt: 10, border: "1px solid var(--clr-dark)", p: 3 }} 
    onClick={()=> setShow(!show)}>
      {/* Action buttons for Edit and Delete */}
      {show && (
        <Stack>
          <Button
            onClick={() => deleteCVById(cv?._id)}
            startIcon={<Delete />}
            variant="contained"
            sx={{ position: "relative", float: "right", margin: "9px", background: "var(--clr-brown)" }}
          ></Button>
          <Button
            component="a"
            href={`/editCV/${cv._id}`}
            startIcon={<Edit />}
            variant="contained"
            sx={{ position: "relative", float: "left", margin: "9px", background: "var(--clr-brown)" }}
          ></Button>
        </Stack>
      )}

      {/* Header with Name and Image */}
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center", width: "100%", background: "#fbb117" }}
        spacing={2}
      >
        <Typography variant="h3" sx={{ mt: { xs: 0, md: 2 }, flexGrow: 1 }}>
          {basicDetails.name}
        </Typography>
        <Avatar
          alt="Employee Image"
          src={cvImage!==undefined?`data:image/png;base64,${cvImage}`:empImage}
          sx={{ width: { xs: 80, md: 100 }, height: { xs: 80, md: 100 }, borderRadius: "50%", px: 2 }}
        />
      </Stack>

      <Grid container spacing={2}>
        {/* Left Column: Contact Details and Skills */}
        <Grid  size={{ xs: 12, md: 4}}>
          <List sx={{ width: "100%" }}>
            <ListItem sx={{ paddingY: 0.5 }}>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <EmailOutlined />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "body2" }}>{basicDetails.email}</ListItemText>
            </ListItem>
            <ListItem sx={{ paddingY: 0.5 }}>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ContactPhoneOutlined />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "body2" }}>{basicDetails.phone}</ListItemText>
            </ListItem>
            <ListItem sx={{ paddingY: 0.5 }}>
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <Home />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: "body2" }}>
                {basicDetails.address} | {basicDetails.city} | {basicDetails.state} | {basicDetails.pincode}
              </ListItemText>
            </ListItem>
          </List>

          <Divider sx={{ mb: 2 }} />

          {/* Skills Section */}
          <Typography variant="h6" sx={{ background: "#fbb117", textAlign: "left" }}>
            Skills
          </Typography>
          <List dense>
            {skills && skills?.map((skill, index) => (
              <ListItem key={index} sx={{ display: "flex", alignItems: "center" }}>
                <ListItemIcon sx={{ minWidth: "30px", color: "black" }}>{skill.skillName}</ListItemIcon>
                <Slider
                  value={skill.proficiency}
                  step={10}
                  marks
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  sx={{ ml: 2, width: "150px" }}
                  disabled
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ mb: 2 }} />

          {/* Social Media Links */}
          <Typography variant="h6" sx={{ textAlign: "left", background: "#fbb117" }}>
            Social Media
          </Typography>
          <Box sx={{ mt: 2, textAlign: "left" }}>
            {socialProfiles && socialProfiles?.map((profile, index) => (
              <Typography key={index}>
                {profile.platform} : {profile.link}
              </Typography>
            ))}
          </Box>
        </Grid>

        <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

        {/* Right Column: Summary, Experience, Education, Projects */}
        <Grid size={{ xs: 12, md: 7}}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ textAlign: "left", background: "#fbb117" }}>
              Summary
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 , textAlign: "left"}}>
              {basicDetails.intro}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />

          {/* Experience Section */}
          <Typography variant="h6" sx={{ textAlign: "left", background: "#fbb117" }}>
            Experience
          </Typography>
          <Box sx={{ mt: 2 ,textAlign: "left"}}>
            {experience &&  experience?.map((exp, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1">{exp.organization}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {exp.position}
                </Typography>
                <Typography variant="body2">{exp.technologies}</Typography>
                <Typography variant="body2">{exp.ctc}</Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Education Section */}
          <Typography variant="h6" sx={{ textAlign: "left", background: "#fbb117" }}>
            Education
          </Typography>
          <Box sx={{ mt: 2,textAlign: "left" }}>
            {education && education?.map((edu, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1">{edu.degree}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {edu.institution}
                </Typography>
                <Typography variant="body2">{edu.percentage}</Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Projects Section */}
          <Typography variant="h6" sx={{ textAlign: "left", background: "#fbb117" }}>
            Projects
          </Typography>
          <Box sx={{ mt: 2,textAlign: "left"}}>
            {projects.map((project, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1">{project.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Project completed in {project.duration} with a team of {project.teamSize}
                </Typography>
                <Typography variant="body2">{project.technologies}</Typography>
                <Typography variant="body2">{project.description}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* Download Button */}
      <Button onClick={downloadPdf} variant="contained" sx={{ mt: 2, width: "100%" }}>
        {loader ? "Downloading" : "Download PDF"}
      </Button>
    </Box>
  );
};

export default CVCard;
