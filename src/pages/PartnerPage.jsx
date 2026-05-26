import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PartnerCard from "../components/PartnerCard";
import traveller from "../images/Partners/traveller.webp";
import bfg from "../images/Partners/bfg.webp";
import gslc from "../images/Partners/gslc.png";
import manly from "../images/Partners/manly.png";

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
      image: manly,
      name: "Manly Memorial Baptist Church",
      description: "Manly Memorial Baptist Church has a history as rich as the community in which it exists. The church was founded in 1841, originally constructed by John Jordan, one of Lexington's earliest builders and entrepreneurs. The original membership consisted of 12 women and 4 men, with the Reverend Cornelius Tyree as the first pastor. This original building was located on Nelson Street between Main and Randolph Streets. It was not until 1920 that the Sanctuary at the current location was completed. The W&L AHA Heart Club has helped provide the church with heart-healthy food and has offered CPR classes at this location! Events happen in October of every year.",
    },
    {
      image: gslc,
      name: "Good Shepherd Lutheran Church",
      description: "",
    },
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
