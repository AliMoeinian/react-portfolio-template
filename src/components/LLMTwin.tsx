import React, { useEffect, useRef, useState } from "react";
import { askLLMTwin, TwinResponse } from "../services/openrouter";
import "../assets/styles/LLMTwin.scss";

interface Message {
  from: "user" | "llm";
  text: string;
  email?: string;
}

function ContactActions({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
      alert("Copy failed. Please select and copy manually.");
    }
  };

  const handleMailto = () => {
    const subject = encodeURIComponent("Collaboration Inquiry");
    const body = encodeURIComponent(
      `Hi Ali,\n\nI’d like to collaborate on a project that matches your expertise.\n\nBest,\n[Your Name]`
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self");
  };

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent("Collaboration Inquiry")}`;

  return (
    <div className="contact-actions">
      {/* email pill + copy */}
      <div className="email-row" role="group" aria-label="Contact email">
        <span className="email-chip" title="Primary contact">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path
              d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {email}
        </span>

        <button
          type="button"
          className={`icon-btn ${copied ? "success" : ""}`}
          onClick={handleCopy}
          aria-live="polite"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path
                  d="m20 6-11 11-5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path
                  d="M16 3H5a2 2 0 0 0-2 2v11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <rect
                  x="8"
                  y="6"
                  width="13"
                  height="15"
                  rx="2"
                  ry="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* CTAs */}
      <div className="cta-grid">
        <button type="button" className="cta primary" onClick={handleMailto}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M4 4h16v16H4z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Email via Mail App
        </button>

        <a className="cta ghost" href={gmailUrl} target="_blank" rel="noreferrer">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path d="M3 7.5 12 13l9-5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          Open in Gmail
        </a>
      </div>

      <p className="micro-copy">
        If these buttons don’t work on your device, copy the email and paste it into your client.
      </p>
    </div>
  );
}

export default function LLMTwin({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // lock page scroll while open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // close on outside click
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (chatRef.current && !chatRef.current.contains(e.target as Node)) onClose();
  };

  // autoscroll
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userText = input.trim();
    if (!userText) return;

    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const result: TwinResponse = await askLLMTwin(userText);
      setMessages((prev) => [
        ...prev,
        { from: "llm", text: result.reply, email: result.email }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="llm-overlay" role="dialog" aria-modal="true" onMouseDown={onOverlayClick}>
      <div
        ref={chatRef}
        className="llm-chat"
        role="document"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="chat-header">
          <div className="brand">
            <div className="avatar" aria-hidden="true">
              Ali
            </div>
            <div className="titles">
              <h2 className="title">Please Describe Your Project to get Contact Info 👽</h2>
              
            </div>
          </div>
          <button className="close-button" onClick={onClose} aria-label="Close chat">
            ×
          </button>
        </header>

        <div ref={listRef} className="messages scrollable" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.from}`} role="group" aria-label={`${m.from} message`}>
              <p>{m.text}</p>

              {m.email && (
                <section className="contact-card" aria-label="Contact options">
                  <header className="contact-head">
                    <div className="badge">
                      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                        <path
                          d="m20 6-11 11-5-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="head-text">
                      <h4>Looks like a match</h4>
                      <span>Choose how you’d like to get in touch</span>
                    </div>
                  </header>

                  <ContactActions email={m.email} />

                  <footer className="contact-foot">
                    <span className="secure-dot" aria-hidden="true"></span>
                    <small>No spam. Your message goes straight to Ali.</small>
                  </footer>
                </section>
              )}
            </div>
          ))}

          {loading && (
            <div className="msg llm">
              <div className="typing-indicator" aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="composer" aria-label="Message composer">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your project..."
            aria-label="Project description"
          />
          <button type="submit" disabled={loading} aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2 21l20-9L2 3v7l14 2-14 2v7z" fill="currentColor" />
            </svg>
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
