import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { supabase } from "../supabaseClient";
import "../App.css";
import Footer from "../components/Footer";

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
      <Navbar />

      {/* Site Development Message */}
      <div className="site-development-message">
        <h1>Site in Development</h1>
        <p>Check back later for updates!</p>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
