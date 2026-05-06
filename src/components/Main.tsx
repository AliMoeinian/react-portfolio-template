import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SchoolIcon from '@mui/icons-material/School'; 
import '../assets/styles/Main.scss';
import profilePic from '../assets/images/AliMoeinianProfilePicture.webp';

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.256 5.626L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

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
            <a href="https://x.com/alim0einian" target="_blank" rel="noreferrer"><XIcon /></a>
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
            <a href="https://x.com/alim0einian" target="_blank" rel="noreferrer"><XIcon /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;