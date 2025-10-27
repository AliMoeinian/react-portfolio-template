import React, { useEffect, useState } from "react";
import "../assets/styles/Articles.scss";
import articlesData from "../data/ArticlesData.json";

type Article = {
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  link: string;
};

function Articles() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("articles");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section
      className="articles section"
      id="articles"
      aria-labelledby="articles-title"
    >
      <h1 className="section-title" id="articles-title">
        Articles & Writing
      </h1>

      <div className="articles-grid">
        {articlesData.map((article: Article, idx) => (
          <article
            key={`${article.title}-${idx}`}
            className="article-card"
            style={{
              transform: isVisible ? undefined : "translateY(20px)",
              opacity: isVisible ? undefined : 0,
              transitionDelay: `${idx * 0.1}s`,
            }}
          >
            <div className="card-header">
              <span className="category-badge">{article.category}</span>
              <span className="read-time">{article.readTime}</span>
            </div>

            <h3 className="article-title">{article.title}</h3>
            <p className="article-description">{article.description}</p>

            <div className="card-footer">
              <time className="article-date" dateTime={article.date}>
                {formatDate(article.date)}
              </time>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more"
                aria-label={`Read article: ${article.title}`}
              >
                Read Article
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Articles;