import React from "react";
import book1 from "../assets/images/mock01.png";
import book2 from "../assets/images/mock02.png";
import book3 from "../assets/images/mock03.png";
import "../assets/styles/Publications.scss";

function Publications() {
  return (
    <div className="publications-container section" id="publications">
      <h1 className="section-title">Publications</h1>

      <div className="publications-grid">
        <div className="publication">
          <img src={book1} className="zoom" alt="Book cover" width="100%" />
          <h2>Example Book One</h2>
          <p>Brief description of the first example book to demonstrate layout.</p>
        </div>

        <div className="publication">
          <img src={book2} className="zoom" alt="Book cover" width="100%" />
          <h2>Example Book Two</h2>
          <p>Another placeholder description for the second sample publication.</p>
        </div>

        <div className="publication">
          <img src={book3} className="zoom" alt="Book cover" width="100%" />
          <h2>Example Book Three</h2>
          <p>Final example book entry. Replace these with real publications later.</p>
        </div>
      </div>
    </div>
  );
}

export default Publications;
