import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import galleryImages from "../data/galleryImages";

function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i - 1 + galleryImages.length) % galleryImages.length
      ),
    []
  );
  const showNext = useCallback(
    () =>
      setActiveIndex((i) =>
        i === null ? null : (i + 1) % galleryImages.length
      ),
    []
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  return (
    <div className="gallery-page">
      <Navbar />

      <div className="gallery-hero">
        <span className="gallery-hero-eyebrow">Photo Archive</span>
        <h1 className="gallery-hero-title">Gallery</h1>
        <p className="gallery-hero-subtitle">
          A look at our CPR classes, events, and community moments. Click any
          photo to view it full-size.
        </p>
      </div>

      <div className="gallery-grid">
        {galleryImages.map((src, i) => (
          <button
            type="button"
            key={i}
            className="gallery-item"
            onClick={() => setActiveIndex(i)}
            aria-label={`Open photo ${i + 1}`}
          >
            <img src={src} alt={`Heart Club photo ${i + 1}`} loading="lazy" />
            <span className="gallery-item-overlay" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                <path
                  d="M21 21l-5-5m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ×
          </button>
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <img
            className="gallery-lightbox-img"
            src={galleryImages[activeIndex]}
            alt={`Heart Club photo ${activeIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="gallery-lightbox-nav gallery-lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next photo"
          >
            ›
          </button>
          <div className="gallery-lightbox-counter">
            {activeIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default GalleryPage;
