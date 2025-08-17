import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faChalkboardTeacher,
  faFlask,
  faCode,
  faRunning,
  faPenNib,
  faUsers,
  faUserGraduate,
  faBook
} from "@fortawesome/free-solid-svg-icons";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "../assets/styles/Timeline.scss";
import experienceData from "../data/experienceData.json";

const iconMap: { [key: string]: any } = {
  faBriefcase,
  faChalkboardTeacher,
  faFlask,
  faCode,
  faRunning,
  faPenNib,
  faUsers,
  faUserGraduate,
  faBook
};

function Timeline() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const checkTheme = () => {
      const mainContainer = document.querySelector(".main-container");
      const darkMode = mainContainer?.classList.contains("dark-mode") ?? true;
      setIsDarkMode(darkMode);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    const mainContainer = document.querySelector(".main-container");
    if (mainContainer) {
      observer.observe(mainContainer, {
        attributes: true,
        attributeFilter: ["class"]
      });
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <div id="history" className="items-container section">
        <h1 className="section-title">Career History</h1>
        <VerticalTimeline>
          {experienceData.map((item, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work timeline-card-hover"
              date={item.date}
              iconStyle={{
                background: isDarkMode ? "#facc15" : "#3b82f6",
                color: "white",
                boxShadow: isDarkMode
                  ? "0 0 20px rgba(250, 204, 21, 0.4)"
                  : "0 0 20px rgba(59, 130, 246, 0.4)"
              }}
              icon={<FontAwesomeIcon icon={iconMap[item.icon]} />}
              contentStyle={{
                background: isDarkMode
                  ? "linear-gradient(135deg, rgba(51, 65, 85, 0.4), rgba(30, 41, 59, 0.25))"
                  : "linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(248, 250, 252, 0.25))",
                border: isDarkMode ? "1px solid #facc15" : "1px solid #3b82f6",
                borderRadius: "16px",
                backdropFilter: "blur(12px)",
                boxShadow: isDarkMode
                  ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                  : "0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)"
              }}
              contentArrowStyle={{
                borderRight: isDarkMode
                  ? "7px solid rgba(250, 204, 21, 0.8)"
                  : "7px solid rgba(59, 130, 246, 0.8)"
              }}
            >
              {/* Background content that will be blurred */}
              <div className="timeline-background-content">
                <h3 className="vertical-timeline-element-title">{item.title}</h3>
                <h4 className="vertical-timeline-element-subtitle">
                  {item.subtitle}
                </h4>
                {item.location && (
                  <h5 className="vertical-timeline-element-location">
                    {item.location}
                  </h5>
                )}
                <p>{item.description}</p>
              </div>

              {/* Hover overlay for full description - separate from background */}
              <div className="timeline-details-overlay">
                <div className="overlay-inner">
                  <p className="overlay-description">{item.fullDescription}</p>
                </div>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;