import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../supabaseClient";
import "../App.css";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventsOnSelectedDate, setEventsOnSelectedDate] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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

  const renderCalendar = () => {
    const today = new Date(); // Get today's date

    // Get the first day of the current month and the total number of days in the month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Generate an array of dates for the current month
    const currentMonthDays = Array.from(
      { length: daysInMonth },
      (_, i) => new Date(currentYear, currentMonth, i + 1)
    );

    // Add additional days from the next month if the current month has fewer than 31 days
    const extraDaysCount = 31 - daysInMonth;
    const nextMonthDays = Array.from({ length: extraDaysCount }, (_, i) => {
      return new Date(currentYear, currentMonth + 1, i + 1);
    });

    // Combine current month and next month days to create the full 31-day calendar
    const allDays = [...currentMonthDays, ...nextMonthDays];

    return (
      <div className="mini-calendar">
        <div className="calendar-header">
          <button onClick={() => navigateMonth(-1)}>&lt; Prev</button>
          <h2>
            {firstDay.toLocaleString("default", { month: "long" })}{" "}
            {currentYear}
          </h2>
          <button onClick={() => navigateMonth(1)}>Next &gt;</button>
        </div>
        <div className="calendar-grid">
          {allDays.map((day, index) => {
            // Check if the day belongs to the current or next month
            const isCurrentMonth = day.getMonth() === currentMonth;

            // Check if the day is today
            const isToday =
              day.toDateString() === today.toDateString() &&
              day.getMonth() === today.getMonth() &&
              day.getFullYear() === today.getFullYear();

            // Find events for the specific day
            const dayEvents = events.filter(
              (event) =>
                new Date(event.start_time).toDateString() === day.toDateString()
            );

            return (
              <div
                key={index}
                className={`calendar-day ${isCurrentMonth ? "" : "faded-day"} ${
                  dayEvents.length > 0 ? "has-event" : ""
                } ${isToday ? "today" : ""}`}
                onClick={() => isCurrentMonth && setSelectedDate(day)}
              >
                <span>{day.getDate()}</span>
                {dayEvents.length > 0 && <div className="event-dot"></div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Navigate to previous or next month
  const navigateMonth = (offset) => {
    const newMonth = currentMonth + offset;
    if (newMonth < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
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
            {renderCalendar()}
            <div className="event-list">
              <h3>Events on {selectedDate.toDateString()}</h3>
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
