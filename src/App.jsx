import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CalendarPage from "./pages/CalendarPage";
import ContactPage from "./pages/ContactPage";
import PartnerPage from "./pages/PartnerPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/partners" element={<PartnerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
