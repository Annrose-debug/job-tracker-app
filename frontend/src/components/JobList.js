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

                {/* dynamic styling based on job status */}
                <span className={`status-badge ${job.status.toLowerCase()}`}>
                  {job.status}
                </span>
              </div>

              {/* display date (or fallback if no date) */}
              <p className="job-date">
                Applied: {job.date_applied ? job.date_applied.slice(0, 10) : "No date"}
              </p>

              {/* only show notes if they exist */}
              {job.notes && <p className="job-notes">{job.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default JobList;