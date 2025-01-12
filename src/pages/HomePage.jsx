import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { supabase } from "../supabaseClient";
import "../App.css";
import WeekViewCalendar from "../components/WeekViewCalendar";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
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
    const eventsForDate = events.filter((event) => {
      const eventDate = new Date(event.start_time).toDateString();
      return eventDate === selectedDate.toDateString();
    });
    setEventsOnSelectedDate(eventsForDate);
  }, [selectedDate, events]);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="title-cont">
          <img
            className="heart"
            src="https://dn9tckvz2rpxv.cloudfront.net/american-heart-association/img2/AHA_H&T_HEX.png"
          ></img>
          <div className="divider"></div>
          <h1 className="navbar-title">WLU Heart Club</h1>
        </div>
      </nav>

      {/* Image Carousel */}
      <div className="carousel">
        <div className="carousel-images">
          <img
            src="https://images4.alphacoders.com/125/thumb-1920-1254199.jpg"
            alt="Slide 1"
          />
          <img
            src="https://images4.alphacoders.com/106/1062317.jpg"
            alt="Slide 2"
          />
          <img src="https://i.redd.it/f9zmgpgzlmi71.jpg" alt="Slide 3" />
        </div>
        <div className="carousel-fade"></div>
      </div>

      {/* Calendar Section */}
      <div className="homepage-container">
        <h1 className="homepage-title">Upcoming Events</h1>
        {/* <div className="calendar-container">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={({ date }) => {
              const hasEvent = events.some(
                (event) =>
                  new Date(event.start_time).toDateString() ===
                  date.toDateString()
              );
              return hasEvent ? <span className="event-dot">•</span> : null;
            }}
          />
        </div> */}

        <WeekViewCalendar />

        <div className="events-container">
          <h2 className="events-title">
            Events on {selectedDate.toDateString()}
          </h2>
          {eventsOnSelectedDate.length > 0 ? (
            <ul className="events-list">
              {eventsOnSelectedDate.map((event) => (
                <li className="event-item" key={event.id}>
                  <strong>{event.title}</strong> -{" "}
                  {new Date(event.start_time).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-events">No events on this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
