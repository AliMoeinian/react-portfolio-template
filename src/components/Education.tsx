import React from "react";
import "../assets/styles/Education.scss";
import uniLogo from "../assets/logos/university-of-isfahan.png";
import iauLogo from "../assets/logos/iau-khorasgan.png";
import highschoolLogo from "../assets/logos/imam-sadegh-highschool.png";

const educationData = [
  {
    institution: "University of Isfahan",
    degree: "Master's degree, Computer Software Engineering (Data Science)",
    period: "Sep 2024 – Present",
    details: [
      "Accepted as an Exceptional Talent student into the Master's program"
    ],
    logo: uniLogo,
  },
  {
    institution: "Islamic Azad University of Isfahan (Khorasgan Branch)",
    degree: "Bachelor's degree, Computer Software Engineering",
    period: "2020 – 2024",
    details: [
      "Top performing student: Highest GPA and first rank of the university",
      "Exceptional Talent recognition"
    ],
    logo: iauLogo,
  },
  {
    institution: "Imam Sadegh Highschool",
    degree: "High school diploma",
    period: "2016 – 2019",
    details: [
      "An ordinary human trying to live a normal life, but curiosity wouldn't let him"
    ],
    logo: highschoolLogo,
  }
];

function Education() {
  return (
    <div className="education-container" id="education">
      <h1>Education</h1>
      <ul className="education-list">
        {educationData.map((edu, idx) => (
          <li key={idx} className="education-item">
            {edu.logo && (
              <img src={edu.logo} alt={`${edu.institution} logo`} />
            )}
            <div>
              <h3>{edu.institution}</h3>
              <p>{edu.degree}</p>
              {edu.period && <span className="period">{edu.period}</span>}
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
