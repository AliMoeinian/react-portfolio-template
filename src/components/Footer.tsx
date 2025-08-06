import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Footer.scss';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__social">
        <a href="https://github.com/AliMoeinian" target="_blank" rel="noreferrer"><GitHubIcon /></a>
        <a href="https://www.linkedin.com/in/alimoeinian1/" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
      </div>
      <p className="footer__copyright">
        © {currentYear} Ali Moeinian | This Template is Customized for myslef, Original Repo is : <a href=""> GitHub </a>
      </p>
    </footer>
  );
}

export default Footer;
