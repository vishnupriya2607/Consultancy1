import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaFlask, FaRunning } from "react-icons/fa";

export default function Features() {
  const shakeAnimation = {
    animate: {
      x: [-4, 4, -4], // Moves left and right
      transition: { repeat: Infinity, duration: 1, ease: "easeInOut" },
    },
  };

  const rotateAnimation = {
    animate: {
      rotate: [0, 360],
      transition: { repeat: Infinity, duration: 10, ease: "linear" },
    },
  };

  const features = [
    {
      title: "Expert Teachers",
      desc: "Guidance from the best educators.",
      icon: <FaChalkboardTeacher className="text-5xl text-purple-600" />,
    },
    {
      title: "Advanced Labs",
      desc: "Cutting-edge technology for hands-on learning.",
      icon: <FaFlask className="text-5xl text-blue-600" />,
    },
    {
      title: "Exciting Activities",
      desc: "A variety of programs to develop talents.",
      icon: <FaRunning className="text-5xl text-green-600" />,
    }
  ];

  return (
    <section id="features" className="relative py-20 px-6 bg-white text-gray-900 overflow-hidden">
      {/* Background Floating Elements */}
      <motion.div 
        className="absolute top-5 left-10 w-16 h-16 bg-blue-500 rounded-full opacity-20"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-5 right-20 w-24 h-24 bg-red-500 rounded-full opacity-20"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/3 left-1/2 w-14 h-14 bg-green-500 rounded-full opacity-20"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      {/* Rotating Square */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 border-4 border-yellow-500 opacity-30"
        {...rotateAnimation}
      />
      {/* Rotating Circle */}
      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 border-4 border-purple-500 rounded-full opacity-30"
        {...rotateAnimation}
      />

      {/* Wave-like animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-gray-200 to-transparent"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-200 to-transparent"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />

      <div className="max-w-6xl mx-auto text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-5xl font-bold mb-12 drop-shadow-lg uppercase tracking-wide"
        >
          Why Choose Us?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 200 } }}
              className="bg-gray-100 p-8 rounded-2xl shadow-lg border border-gray-200 text-center flex flex-col items-center"
            >
              {/* Apply the shake animation to icons */}
              <motion.div {...shakeAnimation}>{feature.icon}</motion.div>

              <h3 className="text-2xl font-semibold text-gray-900 mt-4">{feature.title}</h3>
              <p className="text-gray-700 mt-3 text-lg">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
