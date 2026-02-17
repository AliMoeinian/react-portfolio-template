import React, { useRef, useState, useEffect, useCallback } from "react";
import "../assets/styles/Achievements.scss";

type Achievement = {
  title: string;
  description: string;
  year?: string;
};

const achievements: Achievement[] = [
    {
    title: "2nd Place – Idea Show (57th Edition)",
    description:
      "Presented and defended the project 'AI in Intelligent Detection of Financial Crimes', securing 2nd place.",
    year: "2026",
  },
  {
    title: "Top Satisfaction in Mentorship",
    description:
      "Received the highest satisfaction score in a mentorship program at Mobarakeh Steel Company.",
    year: "2024",
  },
  {
    title: "Exceptional Talent Admission",
    description:
      "Admitted to the M.Sc. program as an Exceptional Talent at the University of Isfahan.",
    year: "2024",
  },
  {
    title: "Top Student Award",
    description: "Ranked 1st out of 311 students in B.Sc. Computer Engineering (IAU Khorasgan).",
    year: "2023",
  },
  {
    title: "Highest GPA in Computer Engineering",
    description:
      "Achieved the highest GPA in the department and ranked within the top 1% university-wide.",
    year: "2023",
  },
  {
    title: "Member – Young Researchers and Elite Club",
    description:
      "Recognized by Islamic Azad University for academic and research excellence.",
    year: "2023",
  },
  {
    title: "LinkedIn Mentorship Impact",
    description: "Mentored 80+ professionals on resume and career profile improvement.",
  },
];


function Achievements() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('achievements');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  // Track current active dot based on scroll position
  const updateActiveDot = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const cardWidth = el.querySelector<HTMLElement>(".achievement-card")?.offsetWidth || 0;
    const gap = 20;
    const scrollLeft = el.scrollLeft;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    
    setCurrentIndex(Math.max(0, Math.min(newIndex, achievements.length - 1)));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const handleScroll = () => {
      updateActiveDot();
    };

    el.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => el.removeEventListener('scroll', handleScroll);
  }, [updateActiveDot]);

  // Scroll to specific card (for dot navigation)
  const scrollToCard = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    
    const card = el.querySelector<HTMLElement>(".achievement-card");
    const gap = 20;
    const scrollPosition = card ? index * (card.offsetWidth + gap) : index * el.clientWidth * 0.9;
    
    el.scrollTo({
      left: scrollPosition,
      behavior: "smooth"
    });
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (currentIndex > 0) scrollToCard(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (currentIndex < achievements.length - 1) scrollToCard(currentIndex + 1);
    }
  };

  // Touch/swipe support for better mobile UX
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < achievements.length - 1) {
      scrollToCard(currentIndex + 1);
    } else if (isRightSwipe && currentIndex > 0) {
      scrollToCard(currentIndex - 1);
    }
  };

  return (
    <section 
      className="achievements section" 
      id="achievements" 
      aria-labelledby="achievements-title"
      style={{ '--card-index': currentIndex } as React.CSSProperties}
    >
      <h1 className="section-title" id="achievements-title">
        Achievements & Accolades
      </h1>

      {/* Mobile: horizontal carousel with dots navigation */}
      <div className="carousel-wrapper">
        <div
          className="achievements-list"
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Achievements carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {achievements.map((item, idx) => (
            <article
              key={`${item.title}-${idx}`}
              className="achievement-card"
              aria-label={`Achievement ${idx + 1} of ${achievements.length}: ${item.title}${item.year ? `, ${item.year}` : ""}`}
              tabIndex={0}
              style={{ 
                '--card-index': idx + 1,
                transform: isVisible ? undefined : 'translateY(20px)',
                opacity: isVisible ? undefined : 0
              } as React.CSSProperties}
              onFocus={() => scrollToCard(idx)}
            >
              <header className="card-header">
                <h3 className="card-title">{item.title}</h3>
                {item.year && <span className="year-badge">{item.year}</span>}
              </header>
              <p className="card-desc">{item.description}</p>
            </article>
          ))}
        </div>

        {/* Dots navigation for mobile */}
        <div className="dots-navigation" role="tablist" aria-label="Achievement navigation">
          {achievements.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => scrollToCard(idx)}
              aria-label={`Go to achievement ${idx + 1}`}
              role="tab"
              aria-selected={idx === currentIndex}
            />
          ))}
        </div>
      </div>

      {/* Screen reader announcement for current position */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        Showing achievement {currentIndex + 1} of {achievements.length}
      </div>

      {/* Desktop: grid (same cards, layout switches via CSS) */}
      {/* No separate markup needed; CSS switches the layout at breakpoint */}
    </section>
  );
}

export default Achievements;