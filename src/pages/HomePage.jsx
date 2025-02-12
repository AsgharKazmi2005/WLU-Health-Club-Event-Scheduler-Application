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

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [eventsOnSelectedDate, setEventsOnSelectedDate] = useState([]);

  // Fetch events from Supabase
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

  // Update events for the selected date
  useEffect(() => {
    const eventsForDate = events.filter((event) =>
      dayjs(event.start_time).isSame(selectedDate, "day")
    );
    setEventsOnSelectedDate(eventsForDate);
  }, [selectedDate, events]);

  const ServerDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
  
    // Check if this day has an event
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
            backgroundColor: "transparent", // Removes blue background
            color: "inherit", // Ensures emoji keeps its natural color
            fontSize: ".8rem", // Adjusts emoji size if needed
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
          <div className="site-development-message">
            <h1>Site in Development</h1>
            <p>Check back later for updates!</p>
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
                      backgroundColor: "#692f2feb", // Selected date color
                      color: "white",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#2b0000", // Hover color
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "#2b0000", // Change focus color
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
