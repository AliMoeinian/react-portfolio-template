import React from "react";
import "../assets/styles/Mentoring.scss";

const mentoringServices = [
  {
    title: "Data Science Mentoring",
    description:
      "Guidance on projects, research, and learning paths in data science."
  },
  {
    title: "Resume Review",
    description: "Get feedback to improve your resume and stand out to employers."
  }
];

function Mentoring() {
  return (
    <div className="mentoring-container" id="mentoring">
      <h1>Mentoring</h1>
      <div className="services-list">
        {mentoringServices.map((service, idx) => (
          <div key={idx} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
      <a
        className="mentoring-contact"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = "mailto:alimoeinianDev@gmail.com";
        }}
      >
        Request Mentoring
      </a>
    </div>
  );
}

export default Mentoring;
