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

import img11 from "../images/CPRClass/CPRClass/IMG_0477.webp";
import img12 from "../images/CPRClass/CPRClass/IMG_0479.webp";
import img13 from "../images/CPRClass/CPRClass/IMG_0480.webp";
import img14 from "../images/CPRClass/CPRClass/IMG_0478.webp";
import img15 from "../images/CPRClass/CPRClass/IMG_0481.webp";
import img16 from "../images/CPRClass/CPRClass/IMG_0482.webp";

import img17 from "../images/CPRClass/CPRClass/IMG_0597.jpg";
import img18 from "../images/CPRClass/CPRClass/IMG_0598.jpg";
import img19 from "../images/CPRClass/CPRClass/IMG_0599.jpg";
import img20 from "../images/CPRClass/CPRClass/IMG_0600.jpg";
import img21 from "../images/CPRClass/CPRClass/IMG_0479.jpg";



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
      { original: img11, thumbnail: img11 },
      { original: img2, thumbnail: img2 },
      { original: img12, thumbnail: img12 },
      { original: img3, thumbnail: img3 },
      { original: img13, thumbnail: img13 },
      { original: img4, thumbnail: img4 },
      { original: img14, thumbnail: img14 },
      { original: img5, thumbnail: img5 },
      { original: img15, thumbnail: img15 },
      { original: img6, thumbnail: img6 },
      { original: img21, thumbnail: img21 },
      { original: img7, thumbnail: img7 },
      { original: img20, thumbnail: img20 },
      { original: img8, thumbnail: img8 },
      { original: img19, thumbnail: img19 },
      { original: img9, thumbnail: img9 },
      { original: img18, thumbnail: img18 },
      { original: img10, thumbnail: img10 },
      { original: img17, thumbnail: img17 },
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
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
