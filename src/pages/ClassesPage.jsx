import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ClassCard from "../components/ClassCard";

function ClassesPage() {
  const classList = [
    {
      title: "Basic Life Support (BLS)",
      description:
        "The AHA’s BLS course trains participants to promptly recognize several life-threatening emergencies, give high-quality chest compressions, deliver appropriate ventilations, and provide early use of an AED. Reflects science and education from the American Heart Association Guidelines Update for CPR and Emergency Cardiovascular Care (ECC).",
      topics: [
        "High-quality CPR for adults, children, and infants",
        "The AHA Chain of Survival, specifically the BLS components",
        "Important early use of an AED",
        "Effective ventilations using a barrier device",
        "Importance of teams in multirescuer resuscitation and performance as an effective team member during multirescuer CPR",
        "Relief of foreign-body airway obstruction (choking) for adults and infants",
      ],
    },
  ];

  return (
    <div className="classes-page">
      <Navbar />
      <div className="classes-container">
        {classList.map((course, index) => (
          <ClassCard key={index} {...course} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ClassesPage;
