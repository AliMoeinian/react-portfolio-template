import React from "react";
import ScienceIcon from "@mui/icons-material/Science";
import DescriptionIcon from "@mui/icons-material/Description";
import "../assets/styles/Mentoring.scss";

interface MentoringService {
  title: string;
  description: string;
  icon: React.ElementType;
}

const mentoringServices: MentoringService[] = [
  {
    title: "Data Science Mentoring",
    description: "Guidance on projects, research, and learning paths in data science.",
    icon: ScienceIcon
  },
  {
    title: "Resume Review",
    description: "Get feedback to improve your resume and stand out to employers.",
    icon: DescriptionIcon
  }
];

function Mentoring() {
  return (
    <div className="mentoring-container section" id="mentoring">
      <h1 className="section-title">Mentoring</h1>
      <div className="services-list">
        {mentoringServices.map((service, idx) => (
          <div key={idx} className="service-card">
            <h3>
              <service.icon className="service-icon" />
              {service.title}
            </h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
      <a className="mentoring-contact" href="mailto:alimoeinianDev@gmail.com">
        Request Mentoring
      </a>
    </div>
  );
}

export default Mentoring;
