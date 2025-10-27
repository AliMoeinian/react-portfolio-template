import React, { useState } from 'react';
import LLMTwin from './LLMTwin';
import '../assets/styles/ContactMe.scss'; // We will add styles here

function ContactMe() {
  const [open, setOpen] = useState(false);

  return (
    <div className="contactme-container section" id="contact">
      <h1 className="section-title">Contact for Collaboration</h1>

      {/* NEW: Wrapper for grid animation */}
      <div className={`contact-toggle-wrapper ${open ? 'chat-open' : 'prompt-open'}`}>
        
        {/* --- Prompt Content --- */}
        {/* This will now be animated by its grid-row */}
        <div className="contact-prompt">
          <p>Before emailing, talk to my LLM Twin to see if collaboration is a good fit.</p>
          <div className="contact-button-wrapper">
            <button className="contact-button" onClick={() => setOpen(true)}>
              Talk to My LLM Twin
            </button>
          </div>
          <p className="llm-help">
            It will help you find out if we can work together or not.
          </p>
        </div>

        {/* --- Chat Content --- */}
        {/* This will now be animated by its grid-row */}
        <div className="chat-wrapper">
          {/* We still only render LLMTwin when 'open' is true to reset its state
              when it's closed and re-opened. */}
          {open && <LLMTwin onClose={() => setOpen(false)} />}
        </div>
        
      </div> {/* End of contact-toggle-wrapper */}
    </div>
  );
}

export default ContactMe;