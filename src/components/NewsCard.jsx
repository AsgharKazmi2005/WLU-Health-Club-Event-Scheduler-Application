import React from "react";

const HeartIcon = () => (
  <svg
    className="news-card-icon"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 21s-7.5-4.6-9.5-9.2C1.1 8.3 3 4.5 6.6 4.5c2 0 3.5 1.1 4.4 2.6h2c.9-1.5 2.4-2.6 4.4-2.6 3.6 0 5.5 3.8 4.1 7.3C19.5 16.4 12 21 12 21z"
      fill="currentColor"
    />
  </svg>
);

const ExternalIcon = () => (
  <svg
    className="news-card-external"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M14 4h6v6M20 4L10 14M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NewsCard = ({
  title,
  source,
  date,
  description,
  url,
  tag,
  variant = "full",
}) => {
  const className =
    variant === "compact" ? "news-card news-card-compact" : "news-card";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <div className="news-card-accent" aria-hidden="true">
        <HeartIcon />
        <span className="news-card-accent-label">News</span>
      </div>
      <div className="news-card-body">
        <div className="news-card-meta">
          <span className="news-card-chip">{source}</span>
          {tag && <span className="news-card-tag">{tag}</span>}
        </div>
        <h3 className="news-card-title">{title}</h3>
        {description && (
          <p className="news-card-description">{description}</p>
        )}
        <div className="news-card-footer">
          {date && <span className="news-card-date">{date}</span>}
          <span className="news-card-cta">
            Read article
            <ExternalIcon />
          </span>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
