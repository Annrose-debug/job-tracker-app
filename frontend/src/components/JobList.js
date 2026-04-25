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

  return (
    <section className="jobs-section">
      <h2>Applications</h2>

      {/* if no jobs exist, show a message */}
      {jobs.length === 0 ? (
        <p className="empty-state">
          No applications yet. Add your first one above!
        </p>
      ) : (
        // if jobs exist, display them as cards
        <div className="jobs-list">
          {jobs.map((job) => (
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