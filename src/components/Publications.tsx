import React from "react";
import "../assets/styles/Publications.scss";

// Images
import emmetImg from "../assets/images/EMMET Plugin.webp";
import day21Img from "../assets/images/21DaywithPython.webp";
import gitImg from "../assets/images/GitGithub.webp";
import cyrusImg from "../assets/images/Cyrus.webp";
import pyscriptImg from "../assets/images/Pyscript.webp";
import licensesImg from "../assets/images/Licenses.webp";
import neumeronymsImg from "../assets/images/Neumeronyms.webp";

type PubItem = {
  title: string;
  description: string;
  img: string;
  downloadable: boolean;
  alt?: string;
  downloadUrl?: string;
  year?: string;
  category?: string;
  language?: string; // <-- NEW
};

const publications: PubItem[] = [
  {
    title: "EMMET Plugin",
    description:
      "Learn the Emmet plugin—shorthand expansions that help you write HTML/CSS much faster. A comprehensive guide for developers.",
    img: emmetImg,
    downloadable: true,
    alt: "EMMET Plugin cover",
    year: "2024",
    category: "Web Development",
    downloadUrl: "/downloads/emmet-plugin.pdf", // Placeholder
  },
  {
    title: "21 Days with Python",
    description:
      "A from‑zero, 21‑day introduction to Python programming for absolute beginners. Complete with exercises and projects.",
    img: day21Img,
    downloadable: true,
    alt: "21 Day with Python cover",
    year: "2024",
    category: "Programming",
    downloadUrl: "/downloads/21-days-python.pdf", // Placeholder
  },
  {
    title: "Git & GitHub",
    description:
      "Git & GitHub for complete beginners—version control basics, branching, commits, and pull requests. Essential for every developer.",
    img: gitImg,
    downloadable: true,
    alt: "Git & GitHub cover",
    year: "2024",
    category: "Version Control",
    downloadUrl: "/downloads/git-github.pdf", // Placeholder
  },
  {
    title: "Cyrus the Great",
    description:
      "A research book on Cyrus the Great, created in collaboration by my professor's invitation. Officially printed; not available for download.",
    img: cyrusImg,
    downloadable: false,
    alt: "Cyrus the Great cover",
    year: "2023",
    category: "History",
  },
  {
    title: "PyScript Tutorial",
    description:
      "The first Persian tutorial on PyScript, written within 24 hours of its initial announcement. Pioneering content for Python in browser.",
    img: pyscriptImg,
    downloadable: true,
    alt: "PyScript tutorial cover",
    year: "2022",
    category: "Web Development",
    downloadUrl: "/downloads/pyscript.pdf", // Placeholder
  },
  {
    title: "Open Source Licenses",
    description:
      "A practical guide to open‑source licenses on GitHub—an underrated but essential topic every developer should understand.",
    img: licensesImg,
    downloadable: true,
    alt: "Licenses on GitHub cover",
    year: "2023",
    category: "Open Source",
    downloadUrl: "/downloads/licenses.pdf", // Placeholder
  },
  {
    title: "Numeronyms in Software",
    description:
      "An introduction to numeronyms used in software projects (e.g., i18n, l10n, k8s) and when to use them effectively.",
    img: neumeronymsImg,
    downloadable: true,
    alt: "Numeronyms cover",
    year: "2023",
    category: "Software Engineering",
    downloadUrl: "/downloads/numeronyms.pdf", // Placeholder
  },
];

export default function Publications() {
  const handleDownload = (pub: PubItem) => {
    if (!pub.downloadable || !pub.downloadUrl) return;
    
    // For now, show a message that files will be available soon
    // In production, you'd link to actual PDF files
    alert(`📚 "${pub.title}" will be available for download soon!\n\nContact Ali for early access: alimoeinianDev@gmail.com`);
    
    // Future implementation:
    // const link = document.createElement('a');
    // link.href = pub.downloadUrl;
    // link.download = `${pub.title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  return (
    <div className="publications-container section" id="publications">
      <h1 className="section-title">Publications</h1>
      
      <div className="publications-intro">
        <p>
          A collection of <b>Persian</b> educational books and tutorials I've written to help developers 
          learn new technologies and improve their skills. Most are available for free download!
        </p>
      </div>

      <div className="publications-grid">
        {publications.map((pub, index) => (
          <article 
            className="publication-card" 
            key={pub.title}
            style={{ 
              '--card-index': index + 1,
            } as React.CSSProperties}
          >
            <div className="card-image-wrapper">
              <img
                src={pub.img}
                className="publication-image"
                alt={pub.alt || `${pub.title} cover`}
                loading="lazy"
              />
            </div>
            
            <div className="card-content">
            <div className="card-header">
              <h3 className="card-title">
                {pub.title}
                {pub.category && ` — ${pub.category}`}
              </h3>
            </div>
            <p className="card-description">{pub.description}</p>
              
              <div className="card-actions">
                {pub.downloadable ? (
                  <button
                    type="button"
                    className="download-button"
                    onClick={() => handleDownload(pub)}
                    aria-label={`Download ${pub.title}`}
                  >
                    <svg 
                      viewBox="0 0 24 24" 
                      width="18" 
                      height="18" 
                      aria-hidden="true"
                      className="download-icon"
                    >
                      <path 
                        d="M12 15.5L7 10.5h3V4h4v6.5h3L12 15.5z" 
                        fill="currentColor"
                      />
                      <path 
                        d="M5 18h14v2H5v-2z" 
                        fill="currentColor"
                      />
                    </svg>
                    Download Free
                  </button>
                ) : (
                  <div className="not-available">
                    <svg 
                      viewBox="0 0 24 24" 
                      width="16" 
                      height="16" 
                      aria-hidden="true"
                    >
                      <path 
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" 
                        fill="currentColor"
                      />
                    </svg>
                    Officially Published
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      
    </div>
  );
}