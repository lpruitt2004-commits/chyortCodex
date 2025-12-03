import React from "react";
import "./index.css";

function App() {
  return (
    <div className="app-flex">
      <aside className="sidebar">
        <h1 className="sidebar-title">Raspberry Pi 5 Demo Kit</h1>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <button className="sidebar-btn">Home</button>
            </li>
            <li>
              <button className="sidebar-btn">The-Directory</button>
            </li>
            <li>
              <button className="sidebar-btn">Settings</button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <h2 className="main-title">Welcome!</h2>
        <p className="main-lead">
          This is a highly responsive, landscape-oriented React PWA/TUI for
          Raspberry Pi 5.
        </p>
        <p>
          Browse subjects from The-Directory and interact with content using
          touch or keyboard.
        </p>
      </main>
    </div>
  );
}

export default App;
