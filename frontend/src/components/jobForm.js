// import useState basically for storing and handling data
import { useState } from "react";

// import axios for making HTTP requests to the backend API
import axios from "axios";

// import the css file for styling the form
import "./jobForm.css";

// Core function: formData - holds the field values, setFormData - updates changes
function JobForm({ onJobAdded }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    date_applied: "",
    notes: ""
  });

  // handles all changes to the form fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      // assign the value of the field to the corresponding key in the formData object
      [e.target.name]: e.target.value
    });
  };

  // prevents the default form submission behaviour and sends the data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validates that company and role are filled
    if (!formData.company || !formData.role) {
      alert("Company and role are required");
      return;
    }

    // sends null instead of an empty string if no date is selected
    const dataToSend = {
      ...formData,
      date_applied: formData.date_applied || null
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/jobs",
        dataToSend
      );

      console.log("Success:", response.data);

      // triggers refresh in JobList
      onJobAdded();

      // clears the form after successful submission
      setFormData({
        company: "",
        role: "",
        status: "Applied",
        date_applied: "",
        notes: ""
      });
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  // renders the form with inputs
  return (
    <div className="form-card">
      <h2>Add a Job</h2>

      <form className="job-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <input
          type="date"
          name="date_applied"
          value={formData.date_applied}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default JobForm;