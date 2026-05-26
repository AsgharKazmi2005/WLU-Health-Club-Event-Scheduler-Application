import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../supabaseClient";
import "../App.css";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import newsItems from "../data/newsItems";

import { sliderImages } from "../data/galleryImages";

// NEW: club graphic
import clubGraphic from "../images/graphic.png";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [eventsOnSelectedDate, setEventsOnSelectedDate] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("start_time", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        setEvents(data);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const eventsForDate = events.filter((event) =>
      dayjs(event.start_time).isSame(selectedDate, "day")
    );
    setEventsOnSelectedDate(eventsForDate);
  }, [selectedDate, events]);

  useEffect(() => {
    setImages(
      sliderImages.map((src) => ({ original: src, thumbnail: src }))
    );
  }, []);

  const ServerDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const hasEvent = events.some((event) =>
      dayjs(event.start_time).isSame(day, "day")
    );

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        badgeContent={hasEvent ? "💞" : undefined}
        sx={{
          "& .MuiBadge-badge": {
            backgroundColor: "transparent",
            color: "inherit",
            fontSize: ".8rem",
          },
        }}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="mission-statement">
        <p>
          The American Heart Association (AHA) Heart Club is an organization that is
          focused on providing the W&amp;L and Lexington community with accessible and
          affordable CPR training as well as volunteering and donating to charities that
          encourage heart-healthy habits. We also make sure to educate our community about
          heart-healthy habits so that we can all keep our cardiovascular system as strong
          as possible.
        </p>
      </div>
      <div className="home-page">
        <div className="home-center">
          <div className="image-gallery-container">
            <ImageGallery
              items={images}
              autoPlay={true}
              slideInterval={5000}
              slideDuration={1000}
              infinite={true}
              showPlayButton={true}
              showFullscreenButton={true}
              showThumbnails={true}
              thumbnailPosition="bottom"
              lazyLoad={true}
              showNav={true}
              showBullets={true}
              additionalClass="responsive-gallery"
            />
            <Link to="/gallery" className="gallery-link-cta">
              View full gallery
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          <div className="home-cal">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                className="cal-pink"
                showDaysOutsideCurrentMonth
                fixedWeekNumber={6}
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                slots={{ day: ServerDay }}
                slotProps={{
                  day: {
                    sx: {
                      "&.Mui-selected": {
                        backgroundColor: "#692f2feb",
                        color: "white",
                      },
                      "&.Mui-selected:hover": {
                        backgroundColor: "#2b0000",
                      },
                      "&.Mui-focusVisible": {
                        backgroundColor: "#2b0000",
                        color: "white",
                        outline: "none",
                      },
                    },
                  },
                }}
                sx={{
                  backgroundColor: "#ee8888",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              />
            </LocalizationProvider>
            <div className="event-list">
              <h3>Events on {selectedDate.format("MMMM D, YYYY")}</h3>
              {eventsOnSelectedDate.length > 0 ? (
                <ul>
                  {eventsOnSelectedDate.map((event) => (
                    <li key={event.id}>{event.title}</li>
                  ))}
                </ul>
              ) : (
                <p>No Events</p>
              )}
            </div>
          </div>
        </div>

        {/* News cards: compact previews below the calendar/image gallery */}
        <section className="home-news">
          <div className="home-news-header">
            <h2 className="home-news-title">In the News</h2>
            <Link to="/news" className="home-news-link">
              View all →
            </Link>
          </div>
          <div className="home-news-grid">
            {newsItems.map((item, index) => (
              <NewsCard key={index} {...item} variant="compact" />
            ))}
          </div>
        </section>

        {/* NEW: Club graphic placed BELOW the calendar/images */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "0px",
            marginBottom: "16px",
          }}
        >
          <img
            src={clubGraphic}
            alt="Today: 256 Heart Clubs map and club spotlights for Washington & Lee Heart Club"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
