// Mentoring.tsx
import React, { useState, useEffect, useCallback } from "react";
import "../assets/styles/Mentoring.scss";
import ScienceIcon from "@mui/icons-material/Science";
import DescriptionIcon from "@mui/icons-material/Description";
import CodeIcon from "@mui/icons-material/Code";
import PsychologyIcon from "@mui/icons-material/Psychology";
import WorkIcon from "@mui/icons-material/Work";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

interface MentoringItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

const mentoringItems: MentoringItem[] = [
  { title: "Data Science Mentoring",
    description: "Guidance on projects, research, and learning paths in data science, from exploratory data analysis to deploying ML models.",
    icon: ScienceIcon },
  { title: "Resume & Career Review",
    description: "Personalized feedback to improve your resume, portfolio, and LinkedIn, helping you stand out to employers.",
    icon: DescriptionIcon },
  { title: "Programming Fundamentals",
    description: "Entry-level training in Python and C++ with real-world examples, clean code practices, and problem-solving skills.",
    icon: CodeIcon },
  { title: "AI & Large Language Models (LLM)",
    description: "Learn to build, fine-tune, and apply LLMs, RAG systems, and AI Agents for real-world use cases.",
    icon: PsychologyIcon },
  { title: "Interview Preparation",
    description: "Mock sessions and strategies to confidently tackle technical and behavioral interview questions.",
    icon: WorkIcon }
];

export default function Mentoring() {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const nextSlide = useCallback(() => {
    setIndex(i => (i + 1) % mentoringItems.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex(i => (i - 1 + mentoringItems.length) % mentoringItems.length);
  }, []);

  const goToSlide = useCallback((slideIndex: number) => {
    setIndex(slideIndex);
  }, []);

  const togglePlayPause = () => setIsPlaying(p => !p);

  useEffect(() => {
    if (!isPlaying || isDragging) return;
    const id = setInterval(nextSlide, 4000);
    return () => clearInterval(id);
  }, [isPlaying, isDragging, nextSlide]);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setDragStart(clientX);
    setDragOffset(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    setDragOffset(clientX - dragStart);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    const threshold = 100;
    if (dragOffset > threshold) prevSlide();
    else if (dragOffset < -threshold) nextSlide();
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === " ") {
      e.preventDefault();
      togglePlayPause();
    }
  };

  const onRequestMentoring = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
  // In case any overlay blocks default navigation, force the mailto
  e.preventDefault();
  window.location.href = "mailto:alimoeinianDev@gmail.com?subject=Mentoring%20Request";
}, []);


  const translateX = -index * 100 + (dragOffset / window.innerWidth) * 100;

  return (
    <div className="mentoring-container section" id="mentoring">
      <h1 className="section-title">Free Mentoring</h1>

      <div
        className="carousel-wrapper"
        onMouseEnter={() => setIsPlaying(false)}
        onMouseLeave={() => setIsPlaying(true)}
      >
        <div
          className="carousel"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Mentoring services carousel"
        >
          <button className="nav prev" onClick={prevSlide} aria-label="Previous slide">
            <ChevronLeftIcon />
          </button>
          <div
            className={`carousel-track ${isDragging ? "dragging" : ""}`}
            style={{ transform: `translateX(${translateX}%)` }}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
          >
            {mentoringItems.map((item, idx) => {
              const isActive = idx === index;
              const Icon = item.icon;
              return (
                <div className={`slide ${isActive ? "active" : ""}`} key={idx}>
                  <div className="icon-container">
                    <Icon className="icon" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              );
            })}
          </div>
          <button className="nav next" onClick={nextSlide} aria-label="Next slide">
            <ChevronRightIcon />
          </button>
        </div>

        <div className="carousel-controls">
          <div className="dots-container">
            {mentoringItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`dot ${idx === index ? "active" : ""}`}
                aria-label={`Go to slide ${idx + 1}`}
              >
                {idx === index && isPlaying && (
                  <div className={`progress-bar ${isDragging ? "paused" : ""}`} />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={togglePlayPause}
            className="play-pause-btn"
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          >
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>

          <div className="slide-counter">
            {index + 1} of {mentoringItems.length}
          </div>
        </div>
      </div>

        <a
          className="mentoring-contact"
          href="mailto:alimoeinianDev@gmail.com"
          onClick={onRequestMentoring}
        >
          Request Mentoring
        </a>

    </div>
  );
}