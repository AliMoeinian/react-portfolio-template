import React, { useState } from 'react';
import LLMTwin from './LLMTwin';
import '../assets/styles/ContactMe.scss';

const REAL_EMAIL = 'alimoeinian.dev@gmail.com';
const DISPLAY_EMAIL = 'alimoeinian[.]dev [at] gmail[.]com';

function ContactMe() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(REAL_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('Copy failed. Please copy manually: ' + REAL_EMAIL);
    }
  };

  return (
    <div className="contactme-container section" id="contact">
      <h1 className="section-title">Contact for Collaboration</h1>

      <div className={`contact-toggle-wrapper ${open ? 'chat-open' : 'prompt-open'}`}>

        {/* --- Prompt Content --- */}
        <div className="contact-prompt">
          <p>Have a project or collaboration idea? Reach out directly!</p>

          {/* Obfuscated email display */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              margin: '20px auto',
              padding: '14px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(128,128,128,0.2)',
              maxWidth: '420px',
              backdropFilter: 'blur(8px)',
              background: 'rgba(128,128,128,0.08)',
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '1rem',
                letterSpacing: '0.5px',
                userSelect: 'none',
              }}
            >
              {DISPLAY_EMAIL}
            </span>

            <button
              onClick={handleCopy}
              title={copied ? 'Copied!' : 'Copy real email'}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.2s',
                opacity: copied ? 1 : 0.7,
                flexShrink: 0,
              }}
              aria-label={copied ? 'Email copied!' : 'Copy email address'}
            >
              {copied ? (
                /* Checkmark icon */
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m20 6-11 11-5-5" />
                </svg>
              ) : (
                /* Copy icon */
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M16 3H5a2 2 0 0 0-2 2v11" />
                  <rect x="8" y="6" width="13" height="15" rx="2" ry="2" />
                </svg>
              )}
            </button>
          </div>

          <p className="llm-help" style={{ fontSize: '0.85rem', opacity: 0.65 }}>
            Click the copy icon to get the real email address 📋
          </p>
        </div>

        {/* --- Chat Content (kept intact, just never shown for now) --- */}
        <div className="chat-wrapper">
          {open && <LLMTwin onClose={() => setOpen(false)} />}
        </div>

      </div>
    </div>
  );
}

export default ContactMe;