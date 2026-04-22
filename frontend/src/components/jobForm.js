// import useState basically for storing and handling data 
import { useState } from "react";

// Core function: formData - holds the field CSSFontFeatureValuesRule, setFormData - updates changes 
function JobForm() {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    date_applied: "",
    notes: ""
  });

//   handles all changes to the form fields 
  const handleChange = (e) => {
    setFormData({
      ...formData,
    //   assign the value of the field to the corresponding key in the formData object
      [e.target.name]: e.target.value
    });
  };

//   prevents the default form submission behaviour and logs the formData to the console  for now 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // for now
  };


//   renders the form with inputs 
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="company"
        placeholder="Company"
        onChange={handleChange}
      />

      <input
        type="text"
        name="role"
        placeholder="Role"
        onChange={handleChange}
      />

      <select name="status" onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
      </select>

      <input
        type="date"
        name="date_applied"
        onChange={handleChange}
      />

      <textarea
        name="notes"
        placeholder="Notes"
        onChange={handleChange}
      />

      <button type="submit">Add Job</button>
    </form>
  );
}

export default JobForm;