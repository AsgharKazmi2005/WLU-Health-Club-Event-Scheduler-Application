import React from "react";
import WeekViewCalendar from "../components/WeekViewCalendar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CalendarPage() {
  return (
    <div className="calendar-main">
      <Navbar />
      <WeekViewCalendar />
      <Footer />
    </div>
  );
}

export default CalendarPage;
