import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/input';

const staffTypes = [
  'pg_staff',
  'bt_staff',
  'sgt_staff',
  'primary_staff',
  'office_staff',
];

const staffLabels = {
  pg_staff: 'PG Staff',
  bt_staff: 'BT Staff',
  sgt_staff: 'SGT Staff',
  primary_staff: 'Primary Staff',
  office_staff: 'Office Staff',
};

const colors = {
  pg_staff: 'bg-purple-100 text-purple-700',
  bt_staff: 'bg-blue-100 text-blue-700',
  sgt_staff: 'bg-green-100 text-green-700',
  primary_staff: 'bg-yellow-100 text-yellow-700',
  office_staff: 'bg-red-100 text-red-700',
};

export default function FacultyDashboard() {
  const [faculty, setFaculty] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://consultancy-sea9.onrender.com/api/faculty?type=all')
      .then(res => res.json())
      .then(data => setFaculty(data))
      .catch(err => console.error('Error:', err));
  }, []);

  const filteredFaculty = faculty.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 mt-20 space-y-10 bg-gradient-to-b from-white to-blue-50 min-h-screen font-sans">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Faculty Showcase</h1>
        <Input
          placeholder="🔍 Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-60 shadow-md"
        />
      </div>

      {/* Grid layout for staff cards */}
      {staffTypes.map(type => {
        const staffList = filteredFaculty.filter(p => p.type === type);
        if (!staffList.length) return null;

        return (
          <div key={type} className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-600 ml-2">{staffLabels[type]}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 py-2">
              {staffList.map((person, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.06 }}
                  className={`bg-white/60 shadow-lg backdrop-blur-md rounded-xl p-4 cursor-pointer border border-gray-200 hover:border-blue-400 transition-all relative`}
                  onClick={() => setSelectedFaculty(person)}
                >
                  <div className="text-xl font-bold text-gray-800">{person.name}</div>
                  <div className="text-sm text-gray-600 italic">{person.qualification}</div>
                  <div className="text-sm font-medium text-gray-700 mt-2">
                    {person.designation}
                  </div>
                  <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs ${colors[person.type]}`}>
                    {staffLabels[person.type]}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Full-screen Detail Panel */}
      {selectedFaculty && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="fixed top-0 right-0 w-full sm:w-[420px] h-full bg-white/95 backdrop-blur-md z-50 shadow-lg p-6 overflow-y-auto transition-all"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Staff Profile</h2>
            <button
              onClick={() => setSelectedFaculty(null)}
              className="text-red-500 font-bold text-lg"
            >
              ✕
            </button>
          </div>
          <hr className="my-3" />
          <div className="space-y-3">
            <p className="text-lg font-bold">{selectedFaculty.name}</p>
            <p className="text-sm text-gray-600"><strong>Qualification:</strong> {selectedFaculty.qualification}</p>
            <p className="text-sm text-gray-600"><strong>Designation:</strong> {selectedFaculty.designation}</p>
            <p className="text-sm text-gray-600">
              <strong>Staff Type:</strong> {staffLabels[selectedFaculty.type]}
            </p>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-700">Class Info</h3>
              <ul className="text-sm list-disc ml-5 text-gray-600 space-y-1 mt-1">
                <li>Subject: English, History</li>
                <li>Class In-Charge: Grade 8 - Section B</li>
                <li>Available: 9 AM - 12 PM</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}