import React from "react";

const ClassCard = ({ title, description, topics }) => {
  return (
    <div className="class-card">
      <h2 className="class-title">{title}</h2>
      <p className="class-description">{description}</p>
      <h3 className="class-subtitle">What does this course teach?</h3>
      <p className="class-topics-paragraph">
        {topics.join(", ")}
      </p>
    </div>
  );
};

export default ClassCard;
