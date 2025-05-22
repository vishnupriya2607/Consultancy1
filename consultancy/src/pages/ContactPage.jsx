import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, User } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function ContactSection() {
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
        'service_g84gtl3',      // Replace with your EmailJS service ID
        'template_j9nbzo1',     // Replace with your EmailJS template ID
        formRef.current,
        'AcwHyKvGLHdGTDQpD'    // Replace with your public key
      )
      .then(
        () => {
          alert('Message Sent Successfully! ✅');
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error('FAILED...', error);
          alert('Failed to send message. ❌ Please try again.');
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl w-full shadow-xl rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Left Side - Management Details */}
        <div>
          <h2 className="text-3xl font-extrabold text-[#000080] mb-6">
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
                <Phone size={28} className="text-[#000080]" />
                <div>
                  <h3 className="text-lg font-semibold text-[#000080]">{person.role}</h3>
                  <p className="text-[#000080]">{person.name}</p>
                  <p className="text-[#000080]">{person.contact}</p>
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
  whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 128, 0.5)" }}
  whileTap={{ scale: 0.95 }}
  style={{ backgroundColor: 'blue', color: 'white' }}
  className="bg-blue w-full font-bold py-3 rounded-lg shadow-md transition"
>
  Send Message
</motion.button>

          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
