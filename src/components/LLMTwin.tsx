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
      alert("Copy failed. Please select and copy manually.");
    }
  };

  const handleMailto = () => {
    const subject = encodeURIComponent("Collaboration Inquiry");
    const body = encodeURIComponent(
      `Hi Ali,\n\nI'd like to collaborate on a project that matches your expertise.\n\nBest,\n[Your Name]`
    );
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self");
  };

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent("Collaboration Inquiry")}`;

  return (
    <div className="contact-actions">
      <div className="email-display">
        <span className="email-text">{email}</span>
        <button
          type="button"
          className={`copy-btn ${copied ? "copied" : ""}`}
          onClick={handleCopy}
          aria-label={copied ? "Email copied" : "Copy email"}
        >
          {copied ? (
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
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
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
          )}
        </button>
      </div>

      <div className="action-buttons">
        <button type="button" className="email-btn primary" onClick={handleMailto}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M4 4h16v16H4z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Email via Mail App
        </button>

        <a className="email-btn secondary" href={gmailUrl} target="_blank" rel="noreferrer">
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
    </div>
  );
}

export default function LLMTwin({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages
  useEffect(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userText = input.trim();
    if (!userText || loading) return;

    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const result: TwinResponse = await askLLMTwin(userText);
      setMessages((prev) => [
        ...prev,
        { from: "llm", text: result.reply, email: result.email },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "llm", text: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container" role="dialog" aria-modal="false" aria-label="AI Assistant">
      {/* Header */}
      <header className="chat-header">
        <div className="header-content">
          <div className="avatar">A</div>
          <div className="header-text">
            <h2>Ali's AI Assistant</h2>
            <p>Describe your project to get contact info</p>
          </div>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Close chat">
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path
              d="M18 6 6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>

      {/* Messages */}
      <div className="messages-container" aria-live="polite" ref={messagesContainerRef}>
        {messages.length === 0 && (
          <div className="message assistant">
            <div className="message-content">
              <p>
                👋 Hi! I'm Ali's AI assistant. Tell me about your project or collaboration
                idea, and I'll help determine if it's a good fit. If so, I'll share the best
                way to reach out!
              </p>
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`message ${m.from === "user" ? "user" : "assistant"}`}>
            <div className="message-content">
              <p>{m.text}</p>

              {m.email && (
                <div className="contact-card">
                  <div className="card-header">
                    <div className="success-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                        <path
                          d="m20 6-11 11-5-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4>Perfect Match!</h4>
                      <span>Your project aligns well with Ali's expertise</span>
                    </div>
                  </div>

                  <ContactActions email={m.email} />
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="message assistant">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your project, collaboration idea..."
          aria-label="Project description"
          disabled={loading}
          maxLength={500}
        />
        <button type="submit" disabled={loading || !input.trim()} aria-label="Send message">
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M2 21l20-9L2 3v7l14 2-14 2v7z" fill="currentColor" />
          </svg>
        </button>
      </form>
    </div>
  );
}