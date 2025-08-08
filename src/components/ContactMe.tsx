import React from "react";
import "../assets/styles/ContactMe.scss";

function ContactMe() {
  return (
    <div className="contactme-container section" id="contact">
      <h1 className="section-title">Contact for Collaboration</h1>
      <p>Interested in collaborating? I'd love to hear from you!</p>
      <a className="contact-button" href="mailto:alimoeinianDev@gmail.com">
        Email Me
      </a>
    </div>
  );
}

export default ContactMe;
