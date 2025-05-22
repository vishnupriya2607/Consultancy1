import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const EventFormWithBack = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const handleImageUpload = async () => {
    if (!image) return null;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "School_Events");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dvpdotfev/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const imageUrl = await handleImageUpload();
    if (!imageUrl) {
      setLoading(false);
      return;
    }

    const eventData = { title, description, imageUrl };

    try {
      await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      alert("Event added successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error adding event", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-10 flex flex-col items-center font-sans">
      <button
        onClick={() => navigate("/admin-dashboard")}
        className="self-start mb-6 text-blue-700 hover:text-blue-900 font-medium flex items-center gap-2"
      >
        ← Back to Dashboard
      </button>

      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center">
          Add New Event
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 font-semibold text-gray-700"
            >
              Event Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter event title"
              className="w-full rounded-lg border border-gray-300 px-5 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-indigo-400 transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 font-semibold text-gray-700"
            >
              Event Description
            </label>
            <textarea
              id="description"
              rows={5}
              placeholder="Write a brief description"
              className="w-full rounded-lg border border-gray-300 px-5 py-3 text-gray-900 placeholder-gray-400 resize-none focus:outline-none focus:ring-3 focus:ring-indigo-400 transition"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block mb-2 font-semibold text-gray-700"
            >
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="w-full cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-indigo-400 transition"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
            {image && (
              <p className="mt-2 text-sm text-gray-600 truncate">{image.name}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Submit Event"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setShowNotificationModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md flex items-center justify-center gap-2"
          >
            <FaBell /> Set Up Notifications
          </button>
        </div>
      </div>

      {showNotificationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Notification Setup</h2>
            <p className="mb-4">
              This is where you can configure notifications or manage related actions.
            </p>

            <div className="flex flex-col gap-3">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition"
                onClick={() => alert("Add Student feature coming soon!")}
              >
                ➕ Add Student
              </button>
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition"
                onClick={() => alert("Add Event feature coming soon!")}
              >
                📅 Add Event
              </button>
              <button
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition"
                onClick={() => alert("Bulk Upload feature coming soon!")}
              >
                📁 Bulk Upload
              </button>
            </div>

            <button
              onClick={() => setShowNotificationModal(false)}
              className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventFormWithBack;
