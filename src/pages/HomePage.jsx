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
      <Footer />
    </div>
  );
};

export default HomePage;
