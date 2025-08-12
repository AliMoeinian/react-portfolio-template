import React from "react";
import "../assets/styles/Education.scss";
import uniLogo from "../assets/logos/university-of-isfahan.png";
import iauLogo from "../assets/logos/iau-khorasgan.png";
import highschoolLogo from "../assets/logos/imam-sadegh-highschool.png";
import MiddleSchool from "../assets/logos/LoghmanHakim.png";

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
      "Found my best friend here — still my partner in crime to this day! 👬",
      "Proudly studied at the coolest school in the city 😎",
      "Where I started chasing my curiosity to discover what I'm truly passionate about 🔍"
    ],
    logo: highschoolLogo,
  },
  {
    institution: "Loghman Hakim Middle School",
    degree: "Middle School (The Social Experiment)",
    period: "2013 – 2016",
    details: [
      "First squad of friends — because recess was more important than math 🏃‍♂️",
      "Got my very first touchscreen phone and felt like a hacker 📱",
      "First real encounter with technology: trading songs via Bluetooth like a pro 🎵"
    ],
    logo: MiddleSchool,
  },
  {
    institution: "Horr Elementary School",
    degree: "Elementary School (Welcome to Planet Earth)",
    period: "2007 – 2013",
    details: [
      "Just opened my eyes to see what this whole world thing is about 🌍",
      "Everything was brand new — from my first notebook to my first rainy school day ☔",
      "Major discovery: recess = pure happiness (some things never change!) ⭐"
    ],
    logo: null
  }
];

function Education() {
  return (
    <div className="education-container section" id="education">
      <h1 className="section-title">Education</h1>
      <ul className="education-list">
        {educationData.map((edu, idx) => (
          <li key={idx} className="education-item">
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
      </ul>
    </div>
  );
}

export default Education;