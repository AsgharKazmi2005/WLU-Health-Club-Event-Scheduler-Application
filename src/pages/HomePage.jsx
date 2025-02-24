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

import img1 from "../images/CPRClass/CPRClass/DSC03608.jpg";
import img2 from "../images/CPRClass/CPRClass/DSC03610.jpg";
import img3 from "../images/CPRClass/CPRClass/DSC03611.jpg";
import img4 from "../images/CPRClass/CPRClass/DSC03613.jpg";
import img5 from "../images/CPRClass/CPRClass/DSC03619.jpg";
import img6 from "../images/CPRClass/CPRClass/DSC03621.jpg";
import img7 from "../images/CPRClass/CPRClass/DSC03625.jpg";
import img8 from "../images/CPRClass/CPRClass/DSC03628.jpg";
import img9 from "../images/CPRClass/CPRClass/DSC03633.jpg";
import img10 from "../images/CPRClass/CPRClass/DSC03636.jpg";

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
    setImages([
      { original: img1, thumbnail: img1 },
      { original: img2, thumbnail: img2 },
      { original: img3, thumbnail: img3 },
      { original: img4, thumbnail: img4 },
      { original: img5, thumbnail: img5 },
      { original: img6, thumbnail: img6 },
      { original: img7, thumbnail: img7 },
      { original: img8, thumbnail: img8 },
      { original: img9, thumbnail: img9 },
      { original: img10, thumbnail: img10 },
    ]);
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
      <div className="home-page">
        <div className="home-center">
          <div className="image-gallery-container">
          <ImageGallery
            items={images}
            autoPlay={true}             // Enables autoplay
            slideInterval={5000}        // Slide changes every 3 seconds
            slideDuration={1000}        // Slide transition duration is 1 second
            infinite={true}             // Infinite looping
            showPlayButton={true}       // Show play/pause button
            showFullscreenButton={true} // Show fullscreen button
            showThumbnails={true}       // Show thumbnails
            thumbnailPosition="bottom"
            lazyLoad={true}
            showNav={true}
            showBullets={true}
          />

          </div>
          <div className="home-cal">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
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
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
