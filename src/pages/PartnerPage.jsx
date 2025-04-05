import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PartnerCard from "../components/PartnerCard";
import traveller from "../images/Partners/traveller.webp";
import bfg from "../images/Partners/bfg.webp";
import gslc from "../images/Partners/gslc.png";

function PartnerPage() {
  const partners = [
    {
      image: traveller,
      name: "Traveller",
      description: "W&L AHA Heart Club has partnered with the Traveller Safe Ride Program and the Department of Public Safety at W&L to make sure that all Traveller staff and Public Safety officers are certified in Basic Life Support according to AHA guidelines. In addition to common protocol, the LifeVac will be incorporating into training to ensure that all staff know how to do both the Heimlich protocol and how to use the LifeVac",
    },
    {
      image: bfg,
      name: "Beat for Good",
      description: "W&L AHA Heart Club is partnered with Beat For Good, an organization created in direct contact with the AHA. Our partnership is with connection to the AHA Heart Club at Cornell University and big thank you to them! Beat For Good has raised over $2000 dollars towards charitable causes that span multiple months and events. The AHA Heart Club at W&L will also participate in their fundraisers and stay tuned for more information on the fundraiser in April!",
    },
    {
      image: gslc,
      name: "Good Shepard Lutheran Church",
      description: "",
    }
  ];

  return (
    <div className="calendar-main">
      <Navbar />
      <div className="partners-container">
        {partners.map((partner, index) => (
          <PartnerCard key={index} {...partner} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default PartnerPage;
