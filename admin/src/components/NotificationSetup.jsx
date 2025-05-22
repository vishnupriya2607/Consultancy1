import React, { useState } from 'react';
import axios from 'axios';

const NotificationSetup = () => {
  const [message, setMessage] = useState('');
  const [gender, setGender] = useState('');
  const [admissionStandard, setAdmissionStandard] = useState('');
  const [smsStatus, setSmsStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSmsStatus('Sending SMS...');

    const data = {
      message,
      gender,
      admissionStandard,
    };

    try {
      const response = await axios.post('http://localhost:5000/send-sms', data);
      setSmsStatus(response.data.message || 'SMS sent successfully!');
    } catch (error) {
      setSmsStatus('Error sending SMS');
      console.error('Error sending SMS:', error);
    }
  };

  return (
    <div className="notification-container">
      <h1 className="title">Notification Setup</h1>
      <form className="notification-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            className="input-field"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender (Optional):</label>
          <select
            id="gender"
            className="input-field"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="admissionStandard">Admission Standard (Optional):</label>
          <select
            id="admissionStandard"
            className="input-field"
            value={admissionStandard}
            onChange={(e) => setAdmissionStandard(e.target.value)}
          >
            <option value="">Select Admission Standard</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={`${i + 1}`}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">Send SMS</button>
      </form>

      <div className="status-message">
        <p>{smsStatus}</p>
      </div>
    </div>
  );
};

export default NotificationSetup;
const styles = `
.notification-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 600px;
  margin: 50px auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.notification-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.input-field {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.input-field:focus {
  border-color: #007bff;
}

.submit-btn {
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.status-message {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}
`;

// Inject CSS
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);



