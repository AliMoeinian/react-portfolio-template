import React, { useState } from 'react';
import LLMTwin from './LLMTwin';
import '../assets/styles/ContactMe.scss';

function ContactMe() {
  const [open, setOpen] = useState(false);

  return (
    <div className="contactme-container section" id="contact">
      <h1 className="section-title">Contact for Collaboration</h1>
      <p>Before emailing, talk to my LLM Twin to see if collaboration is a good fit.</p>

      <div className="contact-button-wrapper">
        <button className="contact-button" onClick={() => setOpen(true)}>
          Talk to My LLM Twin
        </button>
      </div>
      <p className="llm-help">
        It will help you find out if we can work together or not.
      </p>

      {open && <LLMTwin onClose={() => setOpen(false)} />}
    </div>
  );
}

export default ContactMe;
