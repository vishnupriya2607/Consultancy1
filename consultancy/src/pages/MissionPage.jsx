import { motion } from "framer-motion";

const missions = [
  "Adapt children with holistic education with appropriate tolerance.",
  "Teaching activity-based learning in the school curricular.",
  "Host the teacher and support staff regularly to meet the growth needs for education.",
  "Yoke value and character in the minds of the children from their early days.",
  "Achieve obedience to the regulatory module during applicable practices.",
  "Multifaceted the learning track and methodology to express the needs of today's world.",
  "Sanction the role of teachers, parents, and others in the continuance of effective child development.",
];

export default function Mission() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-tr from-indigo-50 to-indigo-100 rounded-xl shadow-xl">
      <motion.h2
        className="text-4xl font-extrabold text-center text-indigo-900 mb-16 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Mission
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {missions.map((mission, i) => (
          <motion.div
            key={i}
            className="relative bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-indigo-200 hover:shadow-indigo-400 transition-shadow cursor-default"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 30px rgba(99, 102, 241, 0.4)" }}
          >
            {/* Glowing Number Circle */}
            <div className="absolute -top-6 left-8 w-14 h-14 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xl
                            shadow-[0_0_12px_rgba(99,102,241,0.8)]">
              {i + 1}
            </div>

            {/* Mission Text */}
            <p className="mt-6 text-indigo-900 font-semibold text-lg leading-relaxed">
              {mission}
            </p>

            {/* Decorative underline */}
            <div className="w-14 h-1 bg-indigo-400 rounded-full mt-6 opacity-70"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}