// importing useState to help manage state in the app
import { useState } from "react";

// importing components (form for adding jobs and list for displaying jobs)
import JobForm from "./components/jobForm";
import JobList from "./components/JobList";

// importing css for styling the app layout
import "./App.css";

function App() {

  // this state is used to trigger a refresh whenever a new job is added
  const [refreshJobs, setRefreshJobs] = useState(false);

  // this function runs after a job is successfully added
  // it basically toggles the state so JobList knows it should fetch again
  const handleJobAdded = () => {
    setRefreshJobs(!refreshJobs);
  };

  return (
    <div className="app-container">

      {/* header section for the app */}
      <header className="header">
        <h1>Job Application Tracker</h1>
        <p>Keep track of your applications in one place</p>
      </header>

      {/* form component for adding new jobs */}
      <JobForm onJobAdded={handleJobAdded} />

      {/* job list component that displays jobs and updates when refreshJobs changes */}
      <JobList refreshJobs={refreshJobs} />

    </div>
  );
}

export default App;