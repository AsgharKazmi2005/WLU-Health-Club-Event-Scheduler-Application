import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "@fortawesome/react-fontawesome";
// import { faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import "../adminconsole.css";

const AdminConsole = () => {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState({});
  const [form, setForm] = useState({
    title: "",
    desc: "",
    start_time: "",
    end_time: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [showRegistrations, setShowRegistrations] = useState(null);

  // Fetch all events
  const fetchEvents = async () => {
    const { data, error } = await supabase.from("events").select("*");
    if (error) console.error("Error fetching events:", error);
    else setEvents(data);
  };

  const fetchRegistrationCounts = async () => {
    const counts = {};
    for (const event of events) {
      const { count, error } = await supabase
        .from("registrations")
        .select("*", { count: "exact" })
        .eq("event_id", event.id);
      if (!error) {
        counts[event.id] = count;
      }
    }
    setRegistrations(counts);
  };

  // Fetch registrations for a specific event
  const fetchRegistrationsForEvent = async (eventId) => {
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("event_id", eventId);
    if (error) {
      console.error("Error fetching registrations:", error);
      return [];
    }
    return data;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Add a new event
  const addEvent = async () => {
    const { data, error } = await supabase.from("events").insert([form]);
    if (error) console.error("Error adding event:", error);
    else {
      fetchEvents();
      setForm({ title: "", desc: "", start_time: "", end_time: "" });
    }
  };

  // Edit an existing event
  const editEvent = async () => {
    const { data, error } = await supabase
      .from("events")
      .update(form)
      .eq("id", currentEventId);
    if (error) console.error("Error updating event:", error);
    else {
      fetchEvents();
      setForm({ title: "", desc: "", start_time: "", end_time: "" });
      setIsEditing(false);
      setCurrentEventId(null);
    }
  };

  // Delete an event
  const deleteEvent = async (id) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) console.error("Error deleting event:", error);
    else fetchEvents();
  };

  // Initialize event data on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch registration counts whenever events are updated
  useEffect(() => {
    if (events.length > 0) {
      fetchRegistrationCounts();
    }
  }, [events]);

  return (
    <div className="admin-console">
      <h1 className="admin-console-title">Admin Console</h1>

      {/* Event Form */}
      <div className="form-container">
        <h2>{isEditing ? "Edit Event" : "Add Event"}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isEditing ? editEvent() : addEvent();
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="desc"
            placeholder="Event Description"
            value={form.desc}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            required
          />
          <button className="form-submit-btn" type="submit">
            {isEditing ? "Update Event" : "Add Event"}
          </button>
          {isEditing && (
            <button
              className="form-cancel-btn"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Event List */}
      <div className="events-container">
        <h2 className="events-title">All Events</h2>
        <ul className="events-list">
          {events.map((event) => (
            <li key={event.id} className="event-item">
              <div className="event-header">
                <strong>{event.title}</strong>
              </div>
              <p className="event-time">
                {new Date(event.start_time).toLocaleString()} to{" "}
                {new Date(event.end_time).toLocaleString()}
              </p>
              <div className="event-actions">
                <button
                  className="icon-btn"
                  onClick={() => {
                    setForm(event);
                    setIsEditing(true);
                    setCurrentEventId(event.id);
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  className="icon-btn"
                  onClick={() => deleteEvent(event.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  className="icon-btn"
                  onClick={async () => {
                    const data = await fetchRegistrationsForEvent(event.id);
                    setShowRegistrations({ eventId: event.id, data });
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />{" "}
                  {registrations[event.id] || 0}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Show Registrations for an Event */}
      {showRegistrations && (
        <div className="registrations-container">
          <h3>Registrations for Event ID: {showRegistrations.eventId}</h3>
          <ul className="registrations-list">
            {showRegistrations.data.map((registration) => (
              <li key={registration.id}>
                {registration.first_name} {registration.last_name} -{" "}
                {registration.email}
              </li>
            ))}
          </ul>
          <button
            className="close-registrations-btn"
            onClick={() => setShowRegistrations(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminConsole;
