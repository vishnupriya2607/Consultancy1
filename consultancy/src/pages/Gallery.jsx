import { useState, useEffect } from "react";
import "./GalleryModern.css";

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
      setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered, events.length]);

  const currentEvent = events[currentIndex] || {};

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery-container">
      <div className="animated-blobs">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="blob"
            style={{
              background: [
                "#a18cd1",
                "#fbc2eb",
                "#fad0c4",
                "#a1c4fd",
                "#c2e9fb",
                "#d4fc79",
                "#f9f586",
              ][i],
              top: `${10 + i * 10}%`,
              left: `${5 + i * 12}%`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
        <div className="ring"></div>
      </div>

      <h1 className="gallery-heading">CELEBRATIONS</h1>

      <div
        className="carousel-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {events.map((event, index) => (
          <img
            key={event.id || index}
            src={event.imageUrl}
            alt={event.title || "Event Image"}
            className={`carousel-image ${
              index === currentIndex ? "active" : "inactive"
            }`}
          />
        ))}

        <div className="overlay">
          <h2 className="overlay-title">{currentEvent.title}</h2>
          <p className="overlay-description">{currentEvent.description}</p>
        </div>

        <button className="nav-btn left" onClick={goPrev} aria-label="Previous">
          &#10094;
        </button>
        <button className="nav-btn right" onClick={goNext} aria-label="Next">
          &#10095;
        </button>
      </div>
    </div>
  );
}
