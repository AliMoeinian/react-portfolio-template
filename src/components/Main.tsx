import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import profilePic from '../assets/images/AliMoeinianProfilePicture.png';

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
          </div>

          <h1>Ali Moeinian</h1>
          {/* Spoiler Title */}
          <p className="title"><u>AI Agent Developer & Applied AI Engineer</u></p>

          <p className="description">
            <b>Designing context-aware, tool-using AI systems that retrieve, reason, and act.</b>
          </p>

          <div className="mobile_social_icons">
            <a href="https://github.com/AliMoeinian" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/alimoeinian1/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
