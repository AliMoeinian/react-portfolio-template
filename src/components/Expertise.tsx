import React from "react";
import '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faBrain,
  faMicroscope,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
  "Python",
  "C++",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "Seaborn",
  "PySpark",
  "Kafka"
];

const labelsSecond = [
  "Prompt Engineering",
  "LangChain",
  "Agent Development",
  "Retrieval-Augmented Generation",
  "Large Language Models",
  "Small Language Models"
];

const labelsThird = [
  "Scientific Research",
  "Teaching & Mentorship",
  "System Design",
  "Agile Development"
];

const labelsFourth = [
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Dremio",
  "Delta Lake",
  "MinIO",
  "Docker",
  "Git"
];

function Expertise() {
  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>Expertise</h1>
        <div className="skills-grid">

          <div className="skill">
            <FontAwesomeIcon icon={faChartLine} size="3x" />
            <h3>Data Science & Machine Learning</h3>
            <p>
              With a solid academic foundation in Data Science, I build
              predictive models and perform deep statistical analyses to drive
              data-driven insights.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsFirst.map((label, idx) => (
                <Chip key={idx} className="chip" label={label} />
              ))}
            </div>
          </div>

          <div className="skill">
            <FontAwesomeIcon icon={faBrain} size="3x" />
            <h3>LLM & Agent Development</h3>
            <p>
              Passionate about cutting-edge AI: I design, prompt-engineer, and
              deploy language models and autonomous agents for real-world
              applications.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsSecond.map((label, idx) => (
                <Chip key={idx} className="chip" label={label} />
              ))}
            </div>
          </div>

          <div className="skill">
            <FontAwesomeIcon icon={faMicroscope} size="3x" />
            <h3>Research & Innovation</h3>
            <p>
              I thrive on scientific inquiry—conducting literature reviews,
              designing experiments, and publishing findings to push the
              boundaries of technology.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsThird.map((label, idx) => (
                <Chip key={idx} className="chip" label={label} />
              ))}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default Expertise;
