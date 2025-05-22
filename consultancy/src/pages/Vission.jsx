import { motion } from "framer-motion";
import { Heart, Lightbulb, BookOpen, Handshake, Users, Eye } from "lucide-react";

const visionData = [
  { title: "Serve", desc: "Joyful thought forever", icon: Heart },
  { title: "Admire", desc: "Ignite a life of knowledge with attitude", icon: Lightbulb },
  { title: "Teach", desc: "Culture, self-discipline, and encourage others", icon: BookOpen },
  { title: "Yield", desc: "Nourish relationships and live fully", icon: Handshake },
  { title: "Adopt", desc: "Act with balanced emotions while nurturing a child", icon: Users },
  { title: "Magnitude", desc: "Read a child's mind and guide them", icon: Eye },
];

export default function VisionMissionPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-20 px-8 md:px-32 font-serif relative max-w-7xl mx-auto">
      <h1 className="text-5xl font-black mb-20 text-gray-800 tracking-tight text-center">
        Our Vision
      </h1>

      <div className="relative">
        {/* Vertical line removed */}

        {/* Vision Items */}
        {visionData.map((item, index) => (
          <VisionStep key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

function VisionStep({ item, index }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.3 }}
      className={`mb-20 flex flex-col md:flex-row items-center md:items-start relative max-w-3xl mx-auto ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Circle + number on vertical line */}
      <div className="absolute left-1/2 md:left-auto md:right-0 top-0 transform -translate-x-1/2 md:translate-x-1/2 bg-white border-4 border-gray-800 rounded-full w-14 h-14 flex items-center justify-center font-bold text-xl text-gray-800 shadow-lg">
        {index + 1}
      </div>

      {/* Icon */}
      <div
        className={`flex-shrink-0 bg-gray-900 text-white rounded-full w-20 h-20 flex items-center justify-center shadow-xl ${
          isLeft ? "mr-10" : "ml-10"
        }`}
      >
        <item.icon size={36} />
      </div>

      {/* Text content */}
      <div className="max-w-xl">
        <h2 className="text-3xl font-extrabold mb-3 tracking-wide">{item.title}</h2>
        <p className="text-gray-700 text-lg leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}
