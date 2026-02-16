import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SchoolIcon from '@mui/icons-material/School'; 
import '../assets/styles/Main.scss';
import profilePic from '../assets/images/AliMoeinianProfilePicture.webp';

function Main() {
  return (
    <div className="container">
      <div className="about-section">
        {/* عکس پروفایل */}
        <div className="image-wrapper">
          <img src={profilePic} alt="Ali Moeinian" />
        </div>

        {/* متن و لینک‌ها */}
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/AliMoeinian" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/alimoeinian1/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="https://scholar.google.com/citations?user=iPgbWYkAAAAJ&hl=en" target="_blank" rel="noreferrer"><SchoolIcon/></a>
          </div>

          <h1>Ali Moeinian</h1>
          {/* Spoiler Title */}
          <p className="title">
            AI Agent Developer & Applied AI Engineer
            <br />
            M.Sc. Student in Data Science
          </p>

          <p className="description">
            <b>Open to academic collaborations and co-authoring research papers in RAG, Multi-Agent Systems and Data Science.</b>
          </p>

          <div className="mobile_social_icons">
            <a href="https://github.com/AliMoeinian" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/alimoeinian1/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
            <a href="https://scholar.google.com/citations?user=iPgbWYkAAAAJ&hl=en" target="_blank" rel="noreferrer"><SchoolIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
