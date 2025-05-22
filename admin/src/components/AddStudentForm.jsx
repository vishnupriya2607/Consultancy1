import React, { useState } from 'react';
import axios from 'axios';

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    fatherName: '',
    motherName: '',
    profession: '',
    previousSchool: '',
    address: '',
    phone: '',
    aadhar: '',
    caste: '',
    disability: '',
    admissionStandard: '',
    date: '',
    signature: ''
  });

  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  const formDataToSubmit = new FormData();

  // Append form fields
  Object.keys(formData).forEach((key) => {
    formDataToSubmit.append(key, formData[key]);
  });

  if (photo) {
    formDataToSubmit.append('photo', photo);
  }

  try {
    // Ensure the correct API URL is being used
    const apiUrl = 'http://localhost:5000/admin-add-student'; // Change this to your backend API URL
    const response = await axios.post(apiUrl, formDataToSubmit, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setMessage(response.data.message);
  } catch (error) {
    console.error('Error adding student:', error.response ? error.response.data : error.message);
    setMessage('Error adding student');
  }
};

  return (
    <div className="form-container">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-field">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={formData.fatherName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <input
            type="text"
            name="motherName"
            placeholder="Mother's Name"
            value={formData.motherName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <input
            type="text"
            name="profession"
            placeholder="Profession"
            value={formData.profession}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <input
            type="text"
            name="previousSchool"
            placeholder="Previous School"
            value={formData.previousSchool}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-field">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <input
            type="text"
            name="aadhar"
            placeholder="Aadhar Number"
            value={formData.aadhar}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <input
            type="text"
            name="caste"
            placeholder="Caste"
            value={formData.caste}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <input
            type="text"
            name="disability"
            placeholder="Disability (if any)"
            value={formData.disability}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <input
            type="text"
            name="admissionStandard"
            placeholder="Admission Standard"
            value={formData.admissionStandard}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-field">
          <input
            type="date"
            name="date"
            placeholder="Date of Admission"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
      
        <div className="form-field">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <button type="submit" className="submit-btn">Add Student</button>
      </form>

      {message && <p className="message">{message}</p>}

      {/* Internal CSS Styling */}
      <style jsx>{`
        .form-container {
          width: 80%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9fafb;
          border-radius: 8px;
        }

        h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }

        .student-form {
          display: flex;
          flex-direction: column;
        }

        .form-field {
          margin-bottom: 15px;
        }

        input, textarea {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #d1d5db;
        }

        textarea {
          height: 80px;
        }

        button.submit-btn {
          background-color: #38a169;
          color: white;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button.submit-btn:hover {
          background-color: #2f855a;
        }

        .message {
          color: green;
          text-align: center;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

export default AddStudentForm;