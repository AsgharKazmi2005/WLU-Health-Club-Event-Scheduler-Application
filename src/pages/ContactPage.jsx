import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Portrait from "../components/Portrait";
import Daniel from "../images/Daniel.webp";
import Bariz from "../images/Bariz.webp";
import Gabe from "../images/Gabe.webp";
import David from "../images/David.webp";
import Elizabeth from "../images/elizabeth.png";
import Shaylin from "../images/shaylin.png";



function ContactPage() {
  return (
    <>
      <Navbar />
              {/* Team Section */}
        <div className="portraits">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 mt-12 rightsize">
          <Portrait image={Daniel} name="Daniel Volodarsky" description="Hey my name is Daniel Volodarsky and I am the Captain and Founder of the AHA Heart Club here at Washington and Lee University. I am a sophomore Biology and Music major on the pre-med track and am also proud to be an AHA licensed CPR Instructor. I love to talk to my friends, play violin, and study botany in my free time!" />
          <Portrait image={David} name="David Shepherd" description="My name is David Shepherd, and I’m the Vice President of the AHA Heart Club at Washington and Lee University. I’m a sophomore Neuroscience major looking for ways to improve my community, so I’m extremely grateful for the opportunity to spread health consciousness and skills to the people of Lexington, VA. When I’m not working, I like to draw, read, and explore new cultural experiences!" />
          <Portrait image={Bariz} name="Bariz Sultankhil" description="Hi, I'm Bariz Sultankhil! I live in Denver, Colorado, and I'm a neuroscience major on the pre-med track. I have a strong passion for research and healthcare.Outside of academics, I enjoy hiking, playing soccer, drawing, and learning new languages. I'm always excited to connect with others who share similar interests!" />
          <Portrait image={Elizabeth} name="Elizabeth Ainsworth" description="My name is Elizabeth Sawicki! I am in the class of 2029, majoring in Biology on a pre-veterinary track. I love being on the Women's Track and Field Team, I am a Hurdler and Triple Jumper." />
          <Portrait image={Shaylin} name="Shaylin Sawicki" description="My name is Shaylin Ainsworth! I am a neuroscience major, class of 2028 and I enjoy playing the violin!" />
          <Portrait image={Gabe} name="Gabe Castillo" description="My name is Gabe Castillo and I’m the CPR Instruction Chair of the AHA Heart Club here at Washington and Lee University. I’m a first-year studying Biology on the pre-med track. I’m passionate about global health equity and serving others through healthcare. I love exploring music, weightlifting, and playing piano." />
        </div>
        </div>
<div className="calendar-main flex flex-col items-center min-h-screen bg-[#402121]/95 text-white">
      <div className="contact-form w-[60%] bg-[#1a1a1a] shadow-lg rounded-lg p-8 mt-10 hover:shadow-xl hover:scale-[1.02] border border-transparent hover:border-[rgba(255,145,145,0.95)]  transition-all duration-700">
      <h2 className="text-3xl font-bold text-center mb-6 text-[rgba(255,145,145,0.95)]">Contact Us</h2>
          <form action="https://formsubmit.co/7da7c43e1f234e2e51c7abad9ea8c367" method="POST" className="space-y-4">
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
