// App.tsx یا App.js
// مطمئن شوید که تمام کامپوننت‌ها کلاس section را دارند

import React, { useState, lazy, Suspense } from "react";

import "./assets/styles/Section.scss"; // Import the unified section styles

const Navigation = lazy(() => import("./components/Navigation"));
const Footer = lazy(() => import("./components/Footer"));
const Main = lazy(() => import("./components/Main"));
const Expertise = lazy(() => import("./components/Expertise"));
const Skills = lazy(() => import("./components/Skills"));
const Timeline = lazy(() => import("./components/Timeline"));
const Project = lazy(() => import("./components/Project"));
const Publications = lazy(() => import("./components/Publications"));
const Education = lazy(() => import("./components/Education"));
const Achievements = lazy(() => import("./components/Achievements"));
const Mentoring = lazy(() => import("./components/Mentoring"));
const ContactMe = lazy(() => import("./components/ContactMe"));

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const handleModeChange = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className={`main-container ${mode}-mode`}>
      <Suspense fallback={<div className="loader">Loading...</div>}>
        <Navigation parentToChild={{ mode }} modeChange={handleModeChange} />
      </Suspense>

      {/* Hero section - special styling */}
      <Suspense fallback={<div className="loader">Loading...</div>}>
        <Main />
      </Suspense>

      {/* All other sections should have consistent spacing */}
      <div className="section" id="expertise">
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Expertise />
        </Suspense>
      </div>

      <div className="section" id="skills">
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Skills />
        </Suspense>
      </div>

      <div className="section" id="history">
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Timeline />
        </Suspense>
      </div>

      <div className="section" id="projects">
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Project />
        </Suspense>
      </div>

      <div className="section" id="publications">
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Publications />
        </Suspense>
      </div>

      <div className="section" id="achievements">
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Achievements />
        </Suspense>
      </div>

      <div className="section" id="mentoring">
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Mentoring />
        </Suspense>
      </div>

      <div className="section" id="education">
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <Education />
        </Suspense>
      </div>

      <div className="section" id="contact">
        <Suspense fallback={<div className="loader">Loading...</div>}>
          <ContactMe />
        </Suspense>
      </div>

      <Suspense fallback={<div>className="loader"Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
