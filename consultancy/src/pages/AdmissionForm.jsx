import React, { useState } from "react";

export default function SVASAdmissionForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    fatherName: "",
    motherName: "",
    profession: "",
    previousSchool: "",
    address: "",
    phone: "",
    aadhar: "",
    caste: "",
    disability: "",
    admissionStandard: "",
    photo: null,
    date: new Date().toISOString().split("T")[0],
    signature: "",
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, photo: file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "name", "gender", "dob", "fatherName", "motherName", "profession",
      "previousSchool", "address", "phone", "aadhar", "caste", "disability",
      "admissionStandard", "date", "signature"
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1')} field.`);
        return;
      }
    }

    if (!formData.photo) {
      alert("Please upload a student photograph.");
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await fetch("http://localhost:5000/submit-form", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("Thank you. We will reach out to you soon.");
        setFormData({
          name: "",
          gender: "",
          dob: "",
          fatherName: "",
          motherName: "",
          profession: "",
          previousSchool: "",
          address: "",
          phone: "",
          aadhar: "",
          caste: "",
          disability: "",
          admissionStandard: "",
          photo: null,
          date: new Date().toISOString().split("T")[0],
          signature: "",
        });
        setPhotoPreview(null);
      } else {
        const error = await res.json();
        alert("Submission failed: " + error.message);
      }
    } catch (err) {
      alert("Network error");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border">
        <div className="flex justify-between items-center mb-6">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-extrabold text-blue-900 uppercase">
              Chanakya Hi-Tech Matric School
            </h1>
            <p className="text-gray-600 text-sm mt-1">Admission Form (2025–2026)</p>
          </div>
          <div className="h-36 w-28 border border-gray-300 relative overflow-hidden rounded-lg shadow-sm">
            {photoPreview ? (
              <img src={photoPreview} alt="Student" className="object-cover w-full h-full" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-xs text-center px-1">
                Upload Student Photo
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          {[
            { label: "Name of the Student (IN CAPITAL LETTERS)", name: "name" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Father's Name / Guardian", name: "fatherName" },
            { label: "Mother's Name", name: "motherName" },
            { label: "Profession", name: "profession" },
            { label: "Name of the school, if studying at present", name: "previousSchool" },
            { label: "Permanent Address", name: "address", type: "textarea" },
            { label: "Phone Number", name: "phone" },
            { label: "Aadhar Number", name: "aadhar" },
            { label: "Caste", name: "caste" },
            { label: "Physically Handicapped (Yes/No)", name: "disability" },
            { label: "Admission Sought for Standard", name: "admissionStandard" },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="block text-gray-700 font-medium">{label}:</label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}
            </div>
          ))}

          <div className="flex gap-6 items-center">
            <span className="text-gray-700 font-medium">Gender:</span>
            {["Male", "Female"].map((g) => (
              <label key={g} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                />
                <span>{g}</span>
              </label>
            ))}
          </div>

          <div className="border-t pt-5 mt-6">
            <p className="italic text-gray-600 mb-3">
              I hereby declare that the information provided is true to the best of my knowledge. I agree to abide by the rules and regulations of the school.
            </p>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="ml-2 px-2 py-1 border rounded-md shadow-sm focus:ring-blue-400"
                />
              </div>
              <div>
                <label>Signature of Father / Guardian:</label>
                <input
                  type="text"
                  name="signature"
                  value={formData.signature}
                  onChange={handleChange}
                  placeholder="Enter Signature"
                  className="ml-2 px-3 py-1 border rounded-md shadow-sm w-64 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between text-xs uppercase mt-8 tracking-widest text-gray-600">
            <span>Admission In-charge</span>
            <span>Principal</span>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold tracking-wide transition duration-300 ease-in-out"
          >
            Submit Admission Form
          </button>
        </form>
      </div>
    </div>
  );
}
