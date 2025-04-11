import React from "react";
import "../../../componentsStyles/LandingPage/Accordion.css";

const Accordion = ({ title, answer, isOpen, onClick }) => {
  return (
    <div className="accordion">
      <button onClick={onClick} className={`accordion-btn ${isOpen ? "open" : ""}`}>
        <span className="accordion-title">{title}</span>

        <svg
          className={`accordion-icon ${isOpen ? "rotate" : ""}`}
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M6 10 L12 16 L18 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={`accordion-border ${isOpen ? "open" : ""}`}></div>

      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <div className="accordion-text">{answer}</div>
      </div>
    </div>
  );
};

export default Accordion;