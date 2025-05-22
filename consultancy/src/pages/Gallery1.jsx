import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Gallery1.css";

export default function GalleryModern() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      goNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  const currentEvent = events[currentIndex] || {};

  return (
    <div className="gallery-container">
      <div className="animated-blobs">
        <div className="blob" style={{ background: "#a18cd1", top: "10%", left: "5%", animationDelay: "0s" }}></div>
        <div className="blob" style={{ background: "#fbc2eb", top: "20%", left: "70%", animationDelay: "2s" }}></div>
        <div className="blob" style={{ background: "#fad0c4", top: "40%", left: "30%", animationDelay: "4s" }}></div>
        <div className="blob" style={{ background: "#a1c4fd", top: "60%", left: "80%", animationDelay: "6s" }}></div>
        <div className="blob" style={{ background: "#c2e9fb", top: "75%", left: "15%", animationDelay: "8s" }}></div>
        <div className="blob" style={{ background: "#d4fc79", top: "85%", left: "50%", animationDelay: "10s" }}></div>
        <div className="ring"></div>
      </div>
      <h1 className="gallery-heading">CELEBRATIONS</h1>

      <div
        className="carousel-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEvent.id || currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="image-container"
          >
            <img src={currentEvent.imageUrl} alt={currentEvent.title} className="carousel-image" />
            <div className="overlay">
              <h2 className="overlay-title">{currentEvent.title}</h2>
              <p className="overlay-description">{currentEvent.description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button className="nav-button left" onClick={goPrev}>
          <FaChevronLeft />
        </button>
        <button className="nav-button right" onClick={goNext}>
          <FaChevronRight />
        </button>

        <div className="carousel-dots">
          {events.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}