import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
#hi
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/facilities", label: "Provisions" },
    { to: "/faculty", label: "Staffs" },
    { to: "/about", label: "About" },
    { to: "/gallery", label: "Events" },
    { to: "/AdmissionForm", label: "Admission Form" },
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white shadow-lg fixed top-0 left-0 w-full z-50 p-4"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/images/school logo.png" alt="School Logo" width="30" height="30" />
          <h1 className="text-2xl font-bold text-blue-900">Chanakya Hi-Tech Matric School</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <Link key={item.to} to={item.to} className="hover:text-blue-500 transition">
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden mt-4 flex flex-col space-y-2"
          >
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block py-2 px-4 rounded hover:bg-blue-100 text-gray-800"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
