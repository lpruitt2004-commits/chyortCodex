import React, { useState } from "react";
import Messages from "./Messages";
import Tasks from "./Tasks";
import Notes from "./Notes";
import Files from "./Files";
import Settings from "./Settings";
import Profile from "./Profile";
import Calendar from "./Calendar";
import NewsFeed from "./NewsFeed";
import "./index.css";

const TABS = [
  { key: "messages", label: "Messages" },
  { key: "tasks", label: "Tasks/To-Do" },
  { key: "notes", label: "Notes" },
  { key: "files", label: "Files" },
  { key: "settings", label: "Settings" },
  { key: "profile", label: "Profile" },
  { key: "calendar", label: "Calendar" },
  { key: "news", label: "News/Feed" },
];

function App() {
  const [activeTab, setActiveTab] = useState("messages");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function renderTab() {
    switch (activeTab) {
      case "messages":
        return <Messages />;
      case "tasks":
        return <Tasks />;
      case "notes":
        return <Notes />;
      case "files":
        return <Files />;
      case "settings":
        return <Settings />;
      case "profile":
        return <Profile />;
      case "calendar":
        return <Calendar />;
      case "news":
        return <NewsFeed />;
      default:
        return <Messages />;
    }
  }

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    setSidebarOpen(false); // Close sidebar on mobile after selecting
  };

  return (
    <div className="app-flex">
      <button
        className="mobile-menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        ☰ MENU
      </button>
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h1 className="sidebar-title">Chyort-Boy</h1>
        <nav className="sidebar-nav">
          <ul>
            {TABS.map((tab) => (
              <li key={tab.key}>
                <button
                  className={`sidebar-btn${
                    activeTab === tab.key ? " active" : ""
                  }`}
                  onClick={() => handleTabClick(tab.key)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="main-content">{renderTab()}</main>
    </div>
  );
}

export default App;
