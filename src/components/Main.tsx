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

const CvIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const CV_LINK = "https://drive.google.com/file/d/1KAG_Fseu-gX5_R4M4c5h_DhSnxerrSe_/view?usp=sharing";

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
            <a href="https://scholar.google.com/citations?user=iPgbWYkAAAAJ&hl=en" target="_blank" rel="noreferrer"><SchoolIcon/></a>
            <a href="https://x.com/alim0einian" target="_blank" rel="noreferrer"><XIcon /></a>
            <a href={CV_LINK} target="_blank" rel="noreferrer" aria-label="View CV"><CvIcon /></a>
          </div>

          <h1>Ali Moeinian</h1>
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
            <a href={CV_LINK} target="_blank" rel="noreferrer" aria-label="View CV"><CvIcon /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;