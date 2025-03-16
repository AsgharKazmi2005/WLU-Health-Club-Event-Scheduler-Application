import React from "react";

const PartnerCard = ({ image, name, description }) => {
  return (
    <div className="partner-card">
      <img src={image} alt={name} className="partner-image" />
      <div className="partner-info">
        <h2 className="partner-name">{name}</h2>
        <p className="partner-description">{description}</p>
      </div>
    </div>
  );
};

export default PartnerCard;