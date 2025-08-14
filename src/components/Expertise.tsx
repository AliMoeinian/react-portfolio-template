import React from "react";
import "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faBrain,
  faMicroscope,
  faDatabase
} from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/Expertise.scss";

function Expertise() {
  return (
    <div className="container section" id="expertise">
      <div className="expertise-container">
        <h1 className="section-title">Expertise</h1>

        <div className="expertise-grid">
          {/* Data Science & ML */}
          <div className="expertise-card">
            <FontAwesomeIcon icon={faChartLine} size="3x" />
            <h3>Data Science & Machine Learning</h3>
            <p>
              Analytical pipelines have been developed to extract insight from complex, large-scale datasets.
              Emphasis has been placed on clean evaluation, structured experimentation, and interpretability
              across a wide range of real-world problems.
            </p>
          </div>

          {/* LLMs & Agentic Systems */}
          <div className="expertise-card">
            <FontAwesomeIcon icon={faBrain} size="3x" />
            <h3>LLMs & Agentic Systems</h3>
            <p>
              Intelligent systems have been designed by combining language models with retrieval and reasoning capabilities.
              Special focus has been given to agent workflows, autonomous decision-making, and safe real-world deployment.
            </p>
          </div>

          {/* Backend & Data Platforms */}
          <div className="expertise-card">
            <FontAwesomeIcon icon={faDatabase} size="3x" />
            <h3>Backend & Data Platforms</h3>
            <p>
              Scalable platforms have been architected to support real-time data flow, secure access, and operational reliability.
              Infrastructures have been optimized for both analytical workloads and production deployment.
            </p>
          </div>

          {/* Research & Mentorship */}
          <div className="expertise-card">
            <FontAwesomeIcon icon={faMicroscope} size="3x" />
            <h3>Research & Mentorship</h3>
            <p>
              Technical knowledge has been transferred through teaching, publishing, and applied research.
              Teams and individuals have been mentored with a focus on clarity, creativity, and long-term growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expertise;
