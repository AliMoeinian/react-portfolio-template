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
  "Python", "C++", "Pandas", "NumPy", "Matplotlib", "Seaborn", "PySpark", "Kafka"
];

const labelsSecond = [
  "Prompt Engineering", "LangChain", "Agent Development", "Retrieval-Augmented Generation", "Large Language Models", "Small Language"
];

const labelsThird = [
  "Scientific Research", "Teaching & Mentorship", "System Design", "Agile Development"
];

const labelsFourth = [
  "MySQL", "PostgreSQL", "MongoDB", "Dremio", "Delta Lake", "MinIO", "Docker", "Git"
];

function Expertise() {
  return (
    <div className="container" id="expertise">
      <div className="skills-container">
        <h1>Expertise</h1>
        <div className="skills-grid">

          {/* Data Science */}
          <div className="skill">
            <FontAwesomeIcon icon={faChartLine} size="3x" />
            <h3>Data Science & Machine Learning</h3>
            <p>
              I turn raw data into smart decisions — from building predictive models
              to real-time analytics using big data tools like PySpark and Kafka.
              With a deep understanding of statistics and machine learning, I bridge
              theory and production.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsFirst.map((label, idx) => (
                <Chip key={idx} className="chip" label={label} />
              ))}
            </div>
          </div>

          {/* LLM & Agents */}
          <div className="skill">
            <FontAwesomeIcon icon={faBrain} size="3x" />
            <h3>LLM & Agent Development</h3>
            <p>
              I specialize in building autonomous systems powered by LLMs.
              From prompt engineering to full-stack agent deployment using
              LangChain and RAG, I design intelligent workflows for real-world
              applications — including healthcare and enterprise use cases.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsSecond.map((label, idx) => (
                <Chip key={idx} className="chip" label={label} />
              ))}
            </div>
          </div>

          {/* Research */}
          <div className="skill">
            <FontAwesomeIcon icon={faMicroscope} size="3x" />
            <h3>Research & Innovation</h3>
            <p>
              My work blends academic rigor with applied innovation. From
              scientific research and system design to mentoring and teaching,
              I explore the frontier of AI to create scalable, ethical, and
              impactful solutions.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsThird.map((label, idx) => (
                <Chip key={idx} className="chip" label={label} />
              ))}
            </div>
          </div>

          {/* Backend & Infra */}
          <div className="skill">
            <FontAwesomeIcon icon={faDatabase} size="3x" />
            <h3>Backend & Data Infrastructure</h3>
            <p>
              I design scalable data pipelines and backend systems using tools
              like Kafka, Spark, and Docker. From streaming ingestion to
              lakehouse architectures, I turn infrastructure into a strategic
              advantage.
            </p>
            <div className="flex-chips">
              <span className="chip-title">Tech stack:</span>
              {labelsFourth.map((label, idx) => (
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
