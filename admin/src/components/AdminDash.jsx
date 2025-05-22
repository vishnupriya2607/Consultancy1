import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, X, Users } from "lucide-react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
} from "recharts";

export default function AdmissionDashboard() {
  const [search, setSearch] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/admissions")
      .then((res) => res.json())
      .then((data) => {
        setApplicants(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = applicants.filter((a) =>
    a.name?.toLowerCase().includes(search.toLowerCase())
  );

  const gradeCounts = applicants.reduce((acc, curr) => {
    acc[curr.admissionStandard] = (acc[curr.admissionStandard] || 0) + 1;
    return acc;
  }, {});

  const genderCounts = applicants.reduce(
    (acc, curr) => {
      if (curr.gender === "Male") acc.male += 1;
      else if (curr.gender === "Female") acc.female += 1;
      return acc;
    },
    { male: 0, female: 0 }
  );

  const disabilityCount = applicants.reduce(
    (acc, curr) => (curr.disability ? acc + 1 : acc),
    0
  );

  const summary = {
    total: applicants.length,
    male: genderCounts.male,
    female: genderCounts.female,
    withDisability: disabilityCount,
  };

  const handleBulkUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      fetch("http://localhost:5000/api/admissions/bulk-upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Bulk upload successful!");
          setApplicants(data);
        })
        .catch(() => alert("Failed to upload file."));
    }
  };

  // Helper to format keys nicely
  const formatKey = (key) => {
    // e.g., convert camelCase or PascalCase to "Capitalized Words"
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-semibold mb-8 tracking-wide border-b border-gray-300 pb-4"
      >
        Admissions Dashboard
      </motion.h1>

      {/* Top Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-10 justify-end">
        <Link to="/add-student">
          <button className="btn-primary">+ Add Student</button>
        </Link>

        <Link to="/notification-setup">
          <button className="btn-secondary">Notification Setup</button>
        </Link>

        <button onClick={handleBulkUploadClick} className="btn-secondary">
          Bulk Upload
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={handleFileChange}
        />

        <Link to="/eventForm">
          <button className="">+ Add Event</button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <SummaryCard
          icon={<UserPlus className="text-blue-600" />}
          title="Total Applicants"
          value={summary.total}
          color="border-blue-600"
        />
        <SummaryCard
          icon={<Users className="text-green-600" />}
          title="Male Applicants"
          value={summary.male}
          color="border-green-600"
        />
        <SummaryCard
          icon={<Users className="text-pink-600" />}
          title="Female Applicants"
          value={summary.female}
          color="border-pink-600"
        />
        <SummaryCard
          icon={<UserPlus className="text-yellow-600" />}
          title="With Disabilities"
          value={summary.withDisability}
          color="border-yellow-600"
        />
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search applicants by name..."
          className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Applicants Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading applicants...</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-center text-gray-400">No applicants found.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((applicant, i) => (
                <tr
                  key={i}
                  onClick={() => setSelectedApplicant(applicant)}
                  className="cursor-pointer hover:bg-blue-50 transition"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {applicant.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {applicant.phoneNumber || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {applicant.admissionStandard}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {applicant.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Applicant Details Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
          >
            <button
              onClick={() => setSelectedApplicant(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
              aria-label="Close details"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Applicant Details
            </h2>
            <div className="space-y-4 text-gray-700 text-sm">
             {Object.entries(selectedApplicant).map(([key, value]) => {
  // Skip keys starting with "id" or "v_"
  if (key.startsWith("id") || key.startsWith("v_") || key === "photo" || key === "signature") return null;

  let displayValue;
  if (typeof value === "boolean") {
    displayValue = value ? "Yes" : "No";
  } else if (value === null || value === undefined || value === "") {
    displayValue = "-";
  } else {
    displayValue = value.toString();
  }

  return (
    <div key={key} className="flex justify-between border-b border-gray-200 pb-2">
      <span className="font-medium text-gray-600">{formatKey(key)}</span>
      <span className="text-gray-900">{displayValue}</span>
    </div>
  );
})}

              
              {selectedApplicant.photo && (
                <img
                  src={selectedApplicant.photo}
                  alt="Applicant"
                  className="mt-4 rounded-md w-32 h-32 object-cover border border-gray-300"
                />
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Grade Distribution Chart */}
      <section
        id="grade-distribution-chart"
        className="max-w-6xl mx-auto mt-14 bg-white p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Grade-wise Application Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={Object.entries(gradeCounts).map(([grade, count]) => ({
              grade,
              count,
            }))}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="grade" height={60}>
              <Label
                value="Grades"
                offset={-30}
                position="insideBottom"
                style={{ fontWeight: "bold" }}
              />
            </XAxis>
            <YAxis allowDecimals={false}>
              <Label
                value="Number of Applicants"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle", fontWeight: "bold" }}
              />
            </YAxis>
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}

function SummaryCard({ icon, title, value, color }) {
  return (
    <div
      className={`border-l-4 ${color} bg-white rounded-lg shadow-md px-6 py-4 flex items-center space-x-4`}
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-gray-700 font-semibold">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

