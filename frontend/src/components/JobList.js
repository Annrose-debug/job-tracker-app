// importing hooks to manage state and side effects
import { useEffect, useState } from "react";

// importing axios to fetch data from backend
import axios from "axios";

// importing css for styling the job list
import "./JobList.css";

// receiving refreshJobs from App so we know when to refetch data
function JobList({ refreshJobs }) {
  // this state stores all the jobs fetched from the backend
  const [jobs, setJobs] = useState([]);

  // adding the search and filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // this runs when the component loads AND whenever refreshJobs changes
  // meaning: whenever a new job is added, it fetches again automatically
  useEffect(() => {
    fetchJobs();
  }, [refreshJobs]);

  // function to get all jobs from the backend API
  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/jobs");

      // update the jobs state with data from the database
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // function to update job status
  const updateStatus = async (id, newStatus) => {
    try {
      // send PUT request to backend to update the status
      await axios.put(`http://localhost:5000/jobs/${id}`, {
        status: newStatus
      });

      // after updating, fetch jobs again so UI updates instantly
      fetchJobs();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // function to delete a job from the database
  const deleteJob = async (id) => {
    // asks for confirmation before deleting
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");

    if (!confirmDelete) {
      return;
    }

    try {
      // send DELETE request to backend using the job id
      await axios.delete(`http://localhost:5000/jobs/${id}`);

      // fetch jobs again so the deleted job disappears from the UI
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // this filters jobs based on the search input and selected status
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "All" || job.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <section className="jobs-section">
      <h2>Applications</h2>

      {/* stats section to show quick dashboard numbers */}
      <div className="stats">
        <div>Total: {jobs.length}</div>
        <div>Applied: {jobs.filter((job) => job.status === "Applied").length}</div>
        <div>Interview: {jobs.filter((job) => job.status === "Interview").length}</div>
        <div>Offer: {jobs.filter((job) => job.status === "Offer").length}</div>
        <div>Rejected: {jobs.filter((job) => job.status === "Rejected").length}</div>
      </div>

      {/* search and filter controls */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by company or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* if no jobs exist at all, show a message */}
      {jobs.length === 0 ? (
        <p className="empty-state">
          No applications yet. Add your first one above!
        </p>
      ) : filteredJobs.length === 0 ? (
        <p className="empty-state">
          No applications match your search or filter.
        </p>
      ) : (
        // if jobs exist, display the filtered jobs as cards
        <div className="jobs-list">
          {filteredJobs.map((job) => (
            <div className="job-card" key={job.id}>
              {/* top section of the card (company + role + status) */}
              <div className="job-card-header">
                <div>
                  <h3>{job.company}</h3>
                  <p>{job.role}</p>
                </div>

                {/* dropdown to update status directly from UI */}
                <select
                  value={job.status}
                  onChange={(e) => updateStatus(job.id, e.target.value)}
                >
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>

              {/* display date (or fallback if no date) */}
              <p className="job-date">
                Applied: {job.date_applied ? job.date_applied.slice(0, 10) : "No date"}
              </p>

              {/* only show notes if they exist */}
              {job.notes && <p className="job-notes">{job.notes}</p>}

              {/* button to delete job from UI and database */}
              <button
                className="delete-btn"
                onClick={() => deleteJob(job.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default JobList;