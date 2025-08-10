import React, { useEffect, useRef, useState } from 'react';
import { askLLMTwin, TwinResponse } from '../services/openrouter';
import '../assets/styles/LLMTwin.scss';

interface Message {
  from: 'user' | 'llm';
  text: string;
  email?: string;
}

function ContactActions({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
      alert('Copy failed. Please select and copy manually.');
    }
  };

  const handleMailto = () => {
    const subject = encodeURIComponent('Collaboration Inquiry');
    const body = encodeURIComponent(
      `Hi Ali,\n\nI’d like to collaborate on a project that matches your expertise.\n\nBest,\n[Your Name]`
    );
    const url = `mailto:${email}?subject=${subject}&body=${body}`;
    // _self plays nicer with OS mail handlers than _blank in many setups
    window.open(url, '_self');
  };

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent('Collaboration Inquiry')}`;

  return (
    <div className="contact-actions">
      <div className="email-box">
        <input value={email} readOnly aria-label="Contact email" />
        <button className="copy-btn" onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <div className="cta-row">
        <button className="contact-button primary" onClick={handleMailto}>
          Email via Mail App
        </button>
        <a
          className="contact-button secondary"
          href={gmailUrl}
          target="_blank"
          rel="noreferrer"
        >
          Open in Gmail
        </a>
      </div>

      <div className="tiny-hint">
        If nothing works, copy the email above and paste it in your email client.
      </div>
    </div>
  );
}

export default function LLMTwin({
  onClose,
}: {
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Lock background scroll while modal is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Close when clicking outside the card
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { from: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    const result: TwinResponse = await askLLMTwin(userText);
    setMessages((prev) => [
      ...prev,
      { from: 'llm', text: result.reply, email: result.email },
    ]);
    setLoading(false);
  };

  return (
    <div
      className="llm-overlay"
      role="dialog"
      aria-modal="true"
      onMouseDown={onOverlayClick}
    >
      <div
        ref={chatRef}
        className="llm-chat"
        role="document"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="chat-header">
          <h2 className="title">This is Ali's LLM Twin, Talk about Your Project Please</h2>
          <button className="close-button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <p className="llm-instruction"><b>Describe your project. If it’s a fit, I’ll reveal the best way to contact me. 👇

        </b>
        </p>

        <div className="messages" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.from}`}>
              <p>{m.text}</p>

              {m.email && (
                <div className="contact-card">
                  <h4>Looks like a match ✅</h4>
                  <p>Choose the contact method that works for you:</p>
                  <ContactActions email={m.email} />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="msg llm">
              <p>Thinking…</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="composer">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your project..."
            aria-label="Project description"
          />
          <button type="submit" disabled={loading}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
