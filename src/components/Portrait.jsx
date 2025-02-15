import React from "react";

function Portrait({ image, name, description }) {
  return (
    <div className="prt flex flex-col items-center bg-[#1a1a1a] p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] border border-transparent hover:border-[rgba(255,145,145,0.95)]  transition-all duration-700">
      <img src={image} alt={name} className="w-60 h-40 object-cover rounded-lg mb-3" />
      <h3 className="text-xl font-semibold text-[rgba(255,145,145,0.95)]">{name}</h3>
      <p className="text-white text-sm text-center">{description}</p>
    </div>
  );
}

export default Portrait;
