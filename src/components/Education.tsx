import React, { useState } from "react"; // ✅ فقط این اضافه شد
import "../assets/styles/Education.scss";
import uniLogo from "../assets/logos/university-of-isfahan.webp";
import iauLogo from "../assets/logos/iau-khorasgan.webp";
import highschoolLogo from "../assets/logos/imam-sadegh-highschool.webp";
import MiddleSchool from "../assets/logos/LoghmanHakim.webp";

const educationData = [
  {
    institution: "University of Isfahan",
    degree: "Master's degree, Computer Software Engineering (Data Science)",
    period: "2024 – Present",
    details: [
      "Accepted as an Exceptional Talent student into the Master's program",
      "Specialized focus on Data Science",
      "Currently exploring cutting-edge research in AI, RAG, LLMs, Agents"
    ],
    logo: uniLogo,
  },
  {
    institution: "Islamic Azad University of Isfahan (Khorasgan Branch)",
    degree: "Bachelor's degree, Computer Software Engineering",
    period: "2020 – 2024",
    details: [
      "Achieved outstanding GPA of 19.24/20 - First rank among All students",
      "Major project: Live Library Data Management System with real-time processing",
      "Exceptional Talent recognition for academic excellence"
    ],
    logo: iauLogo,
  },
  {
    institution: "Imam Sadegh Highschool",
    degree: "High school diploma (The Quest for Identity)",
    period: "2016 – 2019",
    details: [
      "Found my best friend here — still my partner in crime to this day!",
      "Group projects were 90% laughter, 10% actual work (and somehow it still worked!)",
      "The lab where my curiosity escaped containment and started running wild"
    ],
    logo: highschoolLogo,
  },
  {
    institution: "Loghman Hakim Middle School",
    degree: "Middle School (The Social Experiment)",
    period: "2013 – 2016",
    details: [
      "Mastered the art of speed-running homework before recess bell rang",
      "Got my first touchscreen phone & became the family’s tech support",
      "Traded MP3s over Bluetooth like it was an underground black-market"
    ],
    logo: MiddleSchool,
  },
  {
    institution: "Horr Elementary School",
    degree: "Elementary School (Welcome to Planet Earth)",
    period: "2007 – 2013",
    details: [
      "First encounter with structured learning—and unstructured playground diplomacy",
      "Fell in love with rainy school days",
      "Major scientific breakthrough: recess > everything else, forever"
    ],
    logo: null
  }
];

function Education() {
  const [showMore, setShowMore] = useState(false); // ✅ فقط برای دکمه

  return (
    <div className="education-container section" id="education">
      <h1 className="section-title">Education</h1>
      <ul className="education-list">
        {educationData.map((edu, idx) => (
          <li
            key={idx}
            className={`education-item ${idx >= 2 && showMore ? "show-more-visible" : ""}`} // ✅ فقط همین کلاس برای موبایل
          >
            {edu.logo && (
              <img 
                src={edu.logo} 
                alt={`${edu.institution} logo`} 
                loading="lazy"
              />
            )}
            <div className="content-wrapper">
              <h3>{edu.institution}</h3>
              <p className="degree">{edu.degree}</p>
              {edu.period && (
                <span className="period">{edu.period}</span>
              )}
              {edu.details && (
                <ul className="details">
                  {edu.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}

        {/* ✅ دکمه فقط برای موبایل استایل می‌گیرد چون در SCSS پنهان/نمایش می‌شود */}
        <li>
          <button
            className={`show-more-btn ${showMore ? "expanded" : ""}`}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "See Less" : "See More"}
            {/* آیکن ساده برای انیمیشن rotate در SCSS */}
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Education;
