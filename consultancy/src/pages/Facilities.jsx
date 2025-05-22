import React from "react";
import { motion } from "framer-motion";
import { School, MonitorCheck, Gamepad2 } from "lucide-react";

const facilities = [
  {
    title: "School Transport",
    image: "/images/bus.jpeg",
    icon: <School className="w-6 h-6 text-yellow-600" />,
    description:
      "Comfortable and secure transport services ensuring timely arrival and departure.",
  },
  {
    title: "Advanced Computer Labs",
    image: "/images/computer labs.jpeg",
    icon: <MonitorCheck className="w-6 h-6 text-teal-600" />,
    description:
      "Equipped with the latest technology for immersive digital learning and innovation.",
  },
  {
    title: "Sports & Play Zone",
    image: "/images/playing area2.jpeg",
    icon: <Gamepad2 className="w-6 h-6 text-red-500" />,
    description:
      "Spacious play areas encouraging fitness, teamwork, and creative fun for all ages.",
  },
];

const Facilities = () => {
  return (
    <section className="relative py-24 px-6 sm:px-12 lg:px-20 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto text-[#1F3A60]">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 tracking-tight">
          ✨ Our Premium Facilities
        </h2>
        <p className="max-w-xl mx-auto text-center text-lg mb-14">
          Explore the facilities that make our institution stand out. A perfect blend of learning and leisure.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {facilities.map((facility, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(31, 58, 96, 0.2)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-lg border border-yellow-200 overflow-hidden hover:border-yellow-400 transition duration-300 ease-in-out"
            >
              <img
                src={facility.image}
                alt={facility.title}
                className="w-full h-60 object-cover object-center"
              />
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-yellow-100 p-2 rounded-full shadow-sm">
                    {facility.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-[#1F3A60]">{facility.title}</h3>
                </div>
                <p className="text-[#1F3A60] text-base leading-relaxed">
                  {facility.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating animation background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div
          style={{
            position: "absolute",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(250,204,21,0.12) 0%, transparent 70%)",
            filter: "blur(100px)",
            top: "15%",
            left: "-10%",
            animation: "floatCircleWarm 30s ease-in-out infinite alternate",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(244,166,15,0.1) 0%, transparent 70%)",
            filter: "blur(100px)",
            bottom: "5%",
            right: "-12%",
            animation: "floatCircleWarm 40s ease-in-out infinite alternate",
            animationDelay: "3s",
          }}
        />
      </div>

      <style>{`
        @keyframes floatCircleWarm {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
          100% { transform: translate(-20px, 25px) scale(1); }
        }
      `}</style>
    </section>
  );
};

export default Facilities;
