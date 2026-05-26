import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewsCard from "../components/NewsCard";
import newsItems from "../data/newsItems";

function NewsPage() {
  return (
    <div className="news-page">
      <Navbar />
      <div className="news-hero">
        <span className="news-hero-eyebrow">Press &amp; Recognition</span>
        <h1 className="news-hero-title">In the News</h1>
        <p className="news-hero-subtitle">
          Stories, recognition, and milestones from the W&amp;L AHA Heart Club
          and the wider American Heart Association community.
        </p>
      </div>
      <div className="news-container">
        {newsItems.map((item, index) => (
          <NewsCard key={index} {...item} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default NewsPage;
