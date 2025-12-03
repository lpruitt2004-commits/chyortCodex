import React, { useState } from "react";
import "./index.css";

const subjects = [
  "Art",
  "Artificial Intelligence",
  "Biology",
  "Chemistry",
  "Cybersecurity",
  "Electronics",
  "Finance",
  "Gardening",
  "Geography",
  "Health and Fitness",
  "History",
  "Literature",
  "Mathematics",
  "Music",
  "Philosophy",
  "Physics",
  "Programming",
  "Robotics",
  "Web Development",
];

const subjectContent = {
  Art: "Explore painting, sculpture, and digital art techniques.",
  "Artificial Intelligence":
    "Learn about machine learning, neural networks, and AI applications.",
  Biology: "Study cells, genetics, evolution, and ecosystems.",
  Chemistry: "Understand atoms, molecules, reactions, and lab safety.",
  Cybersecurity: "Protect systems, networks, and data from threats.",
  Electronics: "Discover circuits, microcontrollers, and hardware projects.",
  Finance: "Manage personal finance, investing, and economics.",
  Gardening: "Grow plants, design landscapes, and sustainable practices.",
  Geography: "Explore maps, climates, and world regions.",
  "Health and Fitness": "Improve wellness, exercise routines, and nutrition.",
  History:
    "Learn about ancient civilizations, world wars, and historical figures.",
  Literature: "Read classic novels, poetry, and literary analysis.",
  Mathematics: "Practice algebra, geometry, calculus, and statistics.",
  Music: "Play instruments, music theory, and composition.",
  Philosophy: "Discuss ethics, logic, and famous philosophers.",
  Physics: "Study motion, energy, and the laws of nature.",
  Programming: "Code in Python, JavaScript, and build software projects.",
  Robotics: "Build robots, sensors, and automation systems.",
  "Web Development": "Create websites, apps, and learn HTML/CSS/JS.",
};

function App() {
  const [view, setView] = useState("home");
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <div className="app-flex">
      <aside className="sidebar">
        <h1 className="sidebar-title">Raspberry Pi 5 Demo Kit</h1>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <button
                className="sidebar-btn"
                onClick={() => {
                  setView("home");
                  setSelectedSubject(null);
                }}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                onClick={() => setView("directory")}
              >
                The-Directory
              </button>
            </li>
            <li>
              <button
                className="sidebar-btn"
                onClick={() => setView("settings")}
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        {view === "home" && (
          <>
            <h2 className="main-title">Welcome!</h2>
            <p className="main-lead">
              This is a highly responsive, landscape-oriented React PWA/TUI for
              Raspberry Pi 5.
            </p>
            <p>
              Browse subjects from The-Directory and interact with content using
              touch or keyboard.
            </p>
          </>
        )}
        {view === "directory" && (
          <>
            <h2 className="main-title">Browse Subjects</h2>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                width: "100%",
              }}
            >
              {subjects.map((subject) => (
                <li key={subject}>
                  <button
                    className="sidebar-btn"
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject}
                  </button>
                </li>
              ))}
            </ul>
            {selectedSubject && (
              <div
                style={{
                  marginTop: "2rem",
                  textAlign: "center",
                }}
              >
                <h3>{selectedSubject}</h3>
                <p>{subjectContent[selectedSubject]}</p>
              </div>
            )}
          </>
        )}
        {view === "settings" && (
          <>
            <h2 className="main-title">Settings</h2>
            <p>Settings panel coming soon.</p>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
