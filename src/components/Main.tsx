import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import profilePic from '../assets/images/AliMoeinianProfilePicture.png';

function Main() {
  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={profilePic} alt="Ali Moeinian" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/AliMoeinian" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/alimoeinian1/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>

          <h1>Ali Moeinian</h1>
          <p className="title">AI Agent Developer & Applied AI Engineer</p>

          <p className="description">
            Designing intelligent systems with LLMs, RAG, and real-time data — blending AI engineering with hands-on research.
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
