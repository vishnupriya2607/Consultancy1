import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const images = [
  "/images/playing.jpeg",
  "/images/planting.jpeg",
  "/images/temple.jpeg",
  "/images/playing.jpeg",
  "/images/planting.jpeg",
  "/images/temple.jpeg",
];

export default function ImageGallerySlider() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full bg-gray-100 overflow-hidden pt-6 px-4">

      <h2 className="text-4xl md:text-6xl font-bold text-center text-gray-900 mb-12">
        Our Journey Moments
      </h2>

      <div className="relative w-full max-w-7xl mx-auto z-10">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: false,
            pauseOnMouseEnter: true,
          }}
          speed={1000}
          loop={true}
          slidesPerView={3}
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="overflow-hidden"
        >
          {images.map((src, idx) => (
            <SwiperSlide key={idx}>
              <motion.img
                src={src}
                alt={`Slide ${idx + 1}`}
                className="rounded-lg shadow-lg object-cover h-96 w-full"
                initial={{ opacity: 0.7 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
