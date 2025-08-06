import React from "react";
import "../assets/styles/Achievements.scss";

const achievements = [
  {
    title: "Top Student Award",
    description: "Recognized as the highest GPA student at IAU Isfahan.",
    year: "2023"
  },
  {
    title: "Exceptional Talent Admission",
    description:
      "Accepted as an Exceptional Talent student into the M.Sc. program at the University of Isfahan.",
    year: "2024"
  }
];

function Achievements() {
  return (
    <div className="achievements-container" id="achievements">
      <h1>Achievements & Accolades</h1>
      <div className="achievements-grid">
        {achievements.map((item, idx) => (
          <div key={idx} className="achievement-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="year">{item.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Achievements;
