import React, { useMemo, useState } from "react";
import "../assets/styles/Project.scss";
import projectsData from "../data/ProjectsData.json";

// Import all project images
import web3FutureOfMoney from "../assets/images/web3-future-of-money.webp";
import edPatientRegistryAi from "../assets/images/ed-patient-registry-ai.webp";
import erpnextDeploymentDemo from "../assets/images/erpnext-deployment-demo.webp";
import smartLibrarian from "../assets/images/smart-librarian.webp";
import personalPortfolioLlm from "../assets/images/personal-portfolio-llm.webp";
import digitalHealthAssistant from "../assets/images/digital-health-assistant.webp";
import insideforge from "../assets/images/insideforge.webp";
import healthagent from "../assets/images/healthagent.webp";
import countryCityLanguageDw from "../assets/images/country-city-language-dw.webp";
import googlePlayAnalytics from "../assets/images/google-play-analytics.webp";
import persianRagChatbot from "../assets/images/persian-rag-chatbot.webp";
import diabetesRiskMl from "../assets/images/diabetes-risk-ml.webp";
import customerSegmentationClustering from "../assets/images/customer-segmentation-clustering.webp";
import trendIdentificationTextMining from "../assets/images/trend-identification-text-mining.webp";
import sparkHadoopTwitterTrends from "../assets/images/spark-hadoop-twitter-trends.webp";
import nycTaxiDeltaLakehouse from "../assets/images/nyc-taxi-delta-lakehouse.webp";
import industrialIotLakehouse from "../assets/images/industrial-iot-lakehouse.webp";
import complexNetworksGnn from "../assets/images/complex-networks-gnn.webp";

type ProjectItem = {
  slug: string;
  title: string;
  oneLiner: string;
  description: string;
  tags: string[];
  status: "Released" | "WIP" | "Concept";
  level: "Advanced" | "Intermediate" | "Beginner";
  category: "AI & NLP" | "Big Data & Lakehouse" | "Data Science & Analytics" | "System Design";
  image?: string | null;
  href?: string | null;
};

// Image mapping - maps slug to actual image
const imageMap: Record<string, string> = {
  "web3-future-of-money": web3FutureOfMoney,
  "ed-patient-registry-ai": edPatientRegistryAi,
  "erpnext-deployment-demo": erpnextDeploymentDemo,
  "smart-librarian": smartLibrarian,
  "personal-portfolio-llm": personalPortfolioLlm,
  "digital-health-assistant": digitalHealthAssistant,
  "insideforge": insideforge,
  "healthagent": healthagent,
  "country-city-language-dw": countryCityLanguageDw,
  "google-play-analytics": googlePlayAnalytics,
  "persian-rag-chatbot": persianRagChatbot,
  "diabetes-risk-ml": diabetesRiskMl,
  "customer-segmentation-clustering": customerSegmentationClustering,
  "trend-identification-text-mining": trendIdentificationTextMining,
  "spark-hadoop-twitter-trends": sparkHadoopTwitterTrends,
  "nyc-taxi-delta-lakehouse": nycTaxiDeltaLakehouse,
  "industrial-iot-lakehouse": industrialIotLakehouse,
  "complex-networks-gnn": complexNetworksGnn,
};

const CATEGORIES: Array<ProjectItem["category"] | "Featured"> = [
  "Featured",
  "AI & NLP",
  "Big Data & Lakehouse", 
  "Data Science & Analytics",
  "System Design",
];

// Featured projects - you can modify this list
const featuredSlugs = new Set<string>([
  "industrial-iot-lakehouse",
  "persian-rag-chatbot",
  "complex-networks-gnn",
  "diabetes-risk-ml",
  "web3-future-of-money",
  "digital-health-assistant"
]);

const levelClass = (lvl: ProjectItem["level"]) =>
  lvl === "Advanced" ? "level-adv" : lvl === "Intermediate" ? "level-int" : "level-beg";

const statusChip = (s: ProjectItem["status"]) =>
  s === "WIP" ? "chip wip" : s === "Released" ? "chip released" : "chip concept";

// Generate placeholder with gradient
function generatePlaceholder(slug: string, title: string): string {
  const colors = [
    ['#3b82f6', '#8b5cf6'],
    ['#10b981', '#06b6d4'],
    ['#f59e0b', '#ef4444'],
    ['#8b5cf6', '#ec4899'],
    ['#06b6d4', '#3b82f6'],
    ['#ef4444', '#f59e0b'],
  ];
  
  const colorIndex = slug.length % colors.length;
  const [color1, color2] = colors[colorIndex];
  
  const initials = title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
    
  const svg = `
    <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${colorIndex}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad${colorIndex})" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
            fill="white" font-size="48" font-weight="bold" font-family="Arial, sans-serif"
            style="text-shadow: 0 2px 8px rgba(0,0,0,0.3);">
        ${initials}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function ProjectCard({ item }: { item: ProjectItem }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Try to get real image, fallback to placeholder
  const imageUrl = imageMap[item.slug] || generatePlaceholder(item.slug, item.title);
  
  const handleCardClick = () => {
    if (window.innerWidth <= 768) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleVisitClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    }
  };

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div 
      className={`card-wrapper ${isExpanded ? 'expanded' : ''}`}
      onClick={handleCardClick}
      onMouseEnter={() => window.innerWidth > 768 && setIsExpanded(true)}
      onMouseLeave={() => window.innerWidth > 768 && setIsExpanded(false)}
    >
      {children}
    </div>
  );

  return (
    <article className={`project-card reveal ${isExpanded ? "expanded" : ""}`}>
      <Wrapper>
        <div className="thumb">
          <img 
            src={imageUrl} 
            alt={`${item.title} cover`} 
            className="zoom"
            loading="lazy"
          />
          <span className={statusChip(item.status)}>{item.status}</span>
        </div>

        <div className="content">
          <header className="header">
            <h2 className="title">{item.title}</h2>
            <div className="meta">
              <span className={`level ${levelClass(item.level)}`}>
                {item.level}
              </span>
            </div>
          </header>

          <p className="desc">{item.oneLiner}</p>

          <ul className="tech-badges" aria-label="Tags">
            {item.tags.map((t) => (
              <li key={t} className="badge">
                {t}
              </li>
            ))}
          </ul>

          {/* Visit button - always visible */}
          {item.href && (
            <div className="card-actions" role="group" aria-label="Project actions">
              <button
                className="visit-btn"
                onClick={handleVisitClick}
                aria-label={`Visit Project: ${item.title} (opens in a new tab)`}
              >
                <svg
                  className="ext-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"
                    fill="currentColor"
                  />
                  <path
                    d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7z"
                    fill="currentColor"
                  />
                </svg>
                Visit Project
              </button>
            </div>
          )}
        </div>

        {/* 🔒 Minimal overlay: description only */}
        <div className="details-overlay">
          <div className="overlay-inner">
            <p className="overlay-description">{item.description}</p>
          </div>
        </div>
      </Wrapper>
    </article>
  );
}

export default function Project() {
  const [activeTab, setActiveTab] = useState<(typeof CATEGORIES)[number]>("Featured");

  const data = projectsData as ProjectItem[];

  const filtered = useMemo(() => {
    let list = data.slice();

    if (activeTab === "Featured") {
      list = list.filter((p) => featuredSlugs.has(p.slug));
    } else {
      list = list.filter((p) => p.category === activeTab);
    }

    return list;
  }, [data, activeTab]);

  return (
    <section className="projects-container section" id="projects">
      <h1 className="section-title">Projects</h1>

      <div className="projects-controls">
        <div className="tabs" role="tablist" aria-label="Project categories">
          {CATEGORIES.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="project-counter">
          <span className="counter-text">📊 Total Projects:</span>
          <span className="counter-number">{data.length}</span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-illustration">🗂️</div>
          <h3>No projects yet</h3>
          <p>Try another tab or sorting option.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {filtered.map((p) => (
            <ProjectCard key={p.slug} item={p} />
          ))}
        </div>
      )}
      
      <div className="projects-footer">
        <p>
          💡 <strong>{filtered.length}</strong> projects displayed • 
          Total: <strong>{data.length}</strong> projects
        </p>
      </div>
    </section>
  );
}
