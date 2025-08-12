// App.tsx یا App.js
// مطمئن شوید که تمام کامپوننت‌ها کلاس section را دارند

import React, { useState } from "react";

import "./assets/styles/Section.scss"; // Import the unified section styles

import {
  Navigation,
  Footer,
  Main,
  Expertise,
  Timeline,
  Project,
  Publications,
  Education,
  Achievements,
  Mentoring,
  ContactMe
} from "./components";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const handleModeChange = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div className={`main-container ${mode}-mode`}>
      <Navigation parentToChild={{ mode }} modeChange={handleModeChange} />
      
      {/* Hero section - special styling */}
      <Main />
      
      {/* All other sections should have consistent spacing */}
      <div className="section" id="expertise">
        <Expertise />
      </div>
      
      <div className="section" id="history">
        <Timeline />
      </div>
      
      <div className="section" id="projects">
        <Project />
      </div>
      
      <div className="section" id="publications">
        <Publications />
      </div>
      
      <div className="section" id="achievements">
        <Achievements />
      </div>
      
      <div className="section" id="mentoring">
        <Mentoring />
      </div>
      
      <div className="section" id="education">
        <Education />
      </div>
      
      <div className="section" id="contact">
        <ContactMe />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;