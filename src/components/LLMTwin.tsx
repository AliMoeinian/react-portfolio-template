import React, { useState } from 'react';
import { askLLMTwin, TwinResponse } from '../services/openrouter';
import '../assets/styles/LLMTwin.scss';

interface Message {
  from: 'user' | 'llm';
  text: string;
  email?: string;
}

export default function LLMTwin({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { from: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    const result: TwinResponse = await askLLMTwin(userText);
    setMessages(prev => [...prev, { from: 'llm', text: result.reply, email: result.email }]);
    setLoading(false);
  };

  return (
    <div className="llm-overlay">
      <div className="llm-chat">
        <button className="close-button" onClick={onClose}>×</button>
        <p className="llm-instruction">
          Please describe your request clearly so the LLM Twin can decide if collaboration makes sense.
        </p>

        <div className="messages">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.from}`}>
              <p>{m.text}</p>
              {m.email && (
                <a className="contact-button" href={`mailto:${m.email}`}>
                  Email Ali
                </a>
              )}
            </div>
          ))}
          {loading && <div className="msg llm"><p>...</p></div>}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Describe your project..."
          />
          <button type="submit" disabled={loading}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
