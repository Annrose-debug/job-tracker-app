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

  // this state is used to switch between light mode and dark mode
  const [darkMode, setDarkMode] = useState(false);

  // this state controls whether the landing page or dashboard is shown
  const [showLanding, setShowLanding] = useState(true);

  // this function runs after a job is successfully added
  const handleJobAdded = () => {
    setRefreshJobs(!refreshJobs);
  };

  // this function switches the app between light mode and dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>

      {/* ── LANDING PAGE ─────────────────────────────── */}
      {showLanding ? (
        <div className="landing">

          {/* top nav: logo + dark-mode toggle */}
          <nav className="landing-nav">
            <span className="landing-logo">
              <span className="landing-logo-icon">📋</span>
              JobTrackr
            </span>
            <button className="landing-nav-toggle" onClick={toggleDarkMode}>
              {darkMode ? "☀ Light" : "☾ Dark"}
            </button>
          </nav>

          {/* hero section */}
          <div className="landing-hero">
            {/* decorative blobs */}
            <div className="landing-blob landing-blob-1" aria-hidden="true" />
            <div className="landing-blob landing-blob-2" aria-hidden="true" />

            <div className="landing-badge">✦ Free · No signup · Open source</div>

            <h1 className="landing-headline">
              Your job search,<br />
              <span className="landing-headline-accent">finally organised.</span>
            </h1>

            <p className="landing-sub">
              Track every application in one clean dashboard. Add roles, update
              statuses, jot notes, and spot patterns — so nothing slips through
              the cracks.
            </p>

            {/* primary CTA */}
            <button className="landing-cta" onClick={() => setShowLanding(false)}>
              Go to Dashboard
              <span className="landing-cta-arrow" aria-hidden="true">→</span>
            </button>
          </div>

          {/* feature highlights */}
          <div className="landing-features">
            {[
              { icon: "➕", label: "Add applications",  desc: "Log company, role, date & notes in seconds." },
              { icon: "🔄", label: "Update status",      desc: "Move jobs through Applied → Interview → Offer." },
              { icon: "🔍", label: "Search & filter",    desc: "Find any application instantly by name or status." },
              { icon: "📊", label: "Live stats",         desc: "See totals per status at a glance on the dashboard." },
            ].map(({ icon, label, desc }) => (
              <div className="landing-feature-card" key={label}>
                <div className="landing-feature-icon">{icon}</div>
                <strong>{label}</strong>
                <p>{desc}</p>
              </div>
            ))}
          </div>

          {/* footer nudge */}
          <p className="landing-footer-note">
            Ready?{" "}
            <button className="landing-footer-link" onClick={() => setShowLanding(false)}>
              Open the dashboard →
            </button>
          </p>
        </div>

      ) : (

        /* ── DASHBOARD (unchanged) ───────────────────── */
        <div className="app-container">

          {/* header section */}
          <header className="header">
            <div>
              <h1>Job Application Tracker</h1>
              <p>Keep track of your applications in one place</p>
            </div>

            {/* header buttons */}
            <div className="header-actions">
              <button className="toggle-btn back-btn" onClick={() => setShowLanding(true)}>
                ← Home
              </button>
              <button className="toggle-btn" onClick={toggleDarkMode}>
                {darkMode ? "☀ Light Mode" : "☾ Dark Mode"}
              </button>
            </div>
          </header>

          {/* form component for adding new jobs */}
          <JobForm onJobAdded={handleJobAdded} />

          {/* job list component that displays jobs and updates when refreshJobs changes */}
          <JobList refreshJobs={refreshJobs} />
        </div>
      )}
    </div>
  );
}

export default App;