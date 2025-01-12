import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { supabase } from "../supabaseClient";

const localizer = momentLocalizer(moment);

const WeekViewCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [registrationMessage, setRegistrationMessage] = useState("");

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
        // Format events for `react-big-calendar`
        const formattedEvents = data.map((event) => ({
          title: event.title,
          start: new Date(event.start_time),
          end: new Date(event.end_time),
          id: event.id,
        }));
        setEvents(formattedEvents);
      }
    };

    fetchEvents();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email } = formData;

    if (!selectedEvent) {
      console.error("No event selected.");
      return;
    }

    const { error } = await supabase.from("registrations").insert({
      event_id: selectedEvent.id,
      first_name: firstName,
      last_name: lastName,
      email,
    });

    if (error) {
      if (error.code === "23505") {
        // PostgreSQL unique violation error code
        setRegistrationMessage("You have already registered for this event.");
      } else {
        console.error("Error registering user:", error.message);
        setRegistrationMessage("Registration failed. Please try again.");
      }
    } else {
      setRegistrationMessage(
        "Registration successful! Confirmation email sent."
      );
      setShowModal(false);
      setFormData({ firstName: "", lastName: "", email: "" });
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week"]}
        onSelectEvent={(event) => {
          setSelectedEvent(event);
          setShowModal(true);
        }}
      />

      {/* Modal for Registration */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Register for {selectedEvent.title}</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
              <button type="submit">Register</button>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
            {registrationMessage && <p>{registrationMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekViewCalendar;
