import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="calendar-main flex flex-col items-center min-h-screen bg-black text-white">
        <div className="contact-form bg-[#1a1a1a] shadow-lg rounded-lg p-8 mt-10 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-[rgba(255,145,145,0.95)]">Contact Us</h2>
          <form action="https://formsubmit.co/wluheartclub@gmail.com" method="POST" className="space-y-4">
            <input type="hidden" name="_subject" value="New Contact Form Submission" />
            <input type="hidden" name="_captcha" value="false" />
            
            <label className="block">Name:</label>
            <input type="text" name="name" required className="w-full p-2 border border-[#333] rounded-lg bg-[#121212] text-white focus:ring-2 focus:ring-[rgba(255,145,145,0.95)]" />
            
            <label className="block">Email:</label>
            <input type="email" name="email" required className="w-full p-2 border border-[#333] rounded-lg bg-[#121212] text-white focus:ring-2 focus:ring-[rgba(255,145,145,0.95)]" />
            
            <label className="block">Message:</label>
            <textarea name="message" required className="w-full p-2 border border-[#333] rounded-lg bg-[#121212] text-white h-32 focus:ring-2 focus:ring-[rgba(255,145,145,0.95)]"></textarea>
            
            <button type="submit" className="w-full bg-[rgba(255,145,145,0.95)] text-white py-2 rounded-lg hover:bg-[rgba(255,145,145,1)] transition">Send</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;
