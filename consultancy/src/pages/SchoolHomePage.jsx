import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CalendarDays, GraduationCap, Users, Globe, Mail, Phone, User } from "lucide-react";
import { Link } from "react-router-dom";
import Carousel from "./ImageCarousel.jsx";
import Features from "./Features.jsx";
import Footer from "./Footer.jsx";
import emailjs from '@emailjs/browser';

export default function SchoolHomePage() {
  // Contact form state and handlers
  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_g84gtl3",    // Replace with your EmailJS service ID
        "template_j9nbzo1",   // Replace with your EmailJS template ID
        formRef.current,
        "AcwHyKvGLHdGTDQpD"  // Replace with your EmailJS public key
      )
      .then(
        () => {
          alert("Message Sent Successfully! ✅");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("FAILED...", error);
          alert("Failed to send message. ❌ Please try again.");
        }
      );
  };

  return (
    <div className="bg-[#f5f5f5] min-h-screen text-gray-800">
      {/* Hero Section */}
      <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-center px-6 py-20 lg:py-32 mt-16 gap-10">
        {/* Left: Text */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-4">
            Welcome to Chankya Hi-Tech Matric School
          </h1>
          <p className="text-lg md:text-xl text-blue-900 mb-6">
            A place where education meets innovation. Explore a world of possibilities with us.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link
              to="/about"
              className="inline-block px-6 py-3 bg-blue-900 text-white font-semibold text-lg rounded-full shadow hover:bg-blue-800 transition"
            >
              Explore Now
            </Link>
          </div>
        </motion.div>

        {/* Right: Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            src="/images/school img.jpeg"
            alt="School"
            className="w-[750px] h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { value: "8", label: "Years of Excellence", icon: CalendarDays },
          { value: "300+", label: "Students", icon: GraduationCap },
          { value: "20+", label: "Qualified Staff", icon: Users },
          { value: "300+", label: "Alumni Network", icon: Globe },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-6 shadow-md text-center"
          >
            <div className="w-14 h-14 mx-auto mb-4 bg-blue-200 flex items-center justify-center rounded-full">
              <stat.icon size={30} className="text-blue-900" />
            </div>
            <h3 className="text-3xl font-bold text-blue-900">{stat.value}</h3>
            <p className="text-blue-900 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Carousel and Features */}
      <div className="mt-12 px-6 max-w-7xl mx-auto">
        <Carousel />
        <Features />
      </div>

      {/* Contact Section - just above Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="shadow-xl rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white"
        >
          {/* Left Side - Management Contacts */}
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              Management Contacts
            </h2>
            <div className="space-y-4">
              {[
                { role: "Chairman", name: "Mr. D. Senthilnathan", contact: "9361575222" },
                { role: "Secretary", name: "Mr. R. Ineyavan, M.E", contact: "9361535222" },
                { role: "Principal", name: "P. Selvaraju, M.Sc., M.Ed., M.Phil.", contact: "9361525222" },
                { role: "Principal", name: "S. Periyanayaki, M.A., M.Phil., M.Ed.", contact: "9361545222" },
              ].map((person, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="p-4 rounded-lg shadow-md border border-gray-200 flex items-center gap-4"
                >
                  <Phone size={28} className="text-blue-800" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{person.role}</h3>
                    <p className="text-gray-700">{person.name}</p>
                    <p className="text-gray-600">{person.contact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-6 rounded-xl shadow-md border border-gray-200 flex flex-col justify-center items-center relative"
          >
            <Mail size={100} className="text-gray-500 mb-2 opacity-70" />
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Send Us a Message
            </h3>

            <form ref={formRef} className="w-full space-y-4" onSubmit={handleSubmit}>
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 shadow-md">
                <User size={22} className="text-gray-700" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="bg-transparent w-full pl-3 outline-none text-gray-800"
                  value={formData.name}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 shadow-md">
                <Mail size={22} className="text-gray-700" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="bg-transparent w-full pl-3 outline-none text-gray-800"
                  value={formData.email}
                  required
                  onChange={handleChange}
                />
              </div>
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                className="w-full p-3 bg-gray-100 rounded-lg outline-none text-gray-800 resize-none shadow-md"
                value={formData.message}
                required
                onChange={handleChange}
              ></textarea>
             <motion.button
  type="submit"
  whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(255, 0, 0, 0.5)" }}
  whileTap={{ scale: 0.95 }}
  className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg shadow-md transition"
>
  Send Message
</motion.button>

            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
