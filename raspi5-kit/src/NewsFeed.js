import React, { useState } from "react";

function NewsFeed() {
  const [feed] = useState([
    {
      id: 1,
      type: "system",
      title: "System Update",
      content:
        "Chyort-Boy interface v2.0 now available with enhanced security.",
      timestamp: new Date("2025-12-03T09:00:00"),
    },
    {
      id: 2,
      type: "academic",
      title: "New Course Available",
      content:
        "Quantum Computing fundamentals added to Computer Science directory.",
      timestamp: new Date("2025-12-02T14:30:00"),
    },
    {
      id: 3,
      type: "achievement",
      title: "Milestone Reached",
      content: "You've completed 50 tasks! Keep up the great work.",
      timestamp: new Date("2025-12-01T18:00:00"),
    },
    {
      id: 4,
      type: "resource",
      title: "New Resources",
      content: "Physics section updated with thermodynamics materials.",
      timestamp: new Date("2025-11-30T11:00:00"),
    },
  ]);

  const [filter, setFilter] = useState("all");

  const filteredFeed =
    filter === "all" ? feed : feed.filter((item) => item.type === filter);

  const getTypeIcon = (type) => {
    switch (type) {
      case "system":
        return "⚙️";
      case "academic":
        return "📚";
      case "achievement":
        return "🏆";
      case "resource":
        return "📦";
      default:
        return "📰";
    }
  };

  return (
    <div className="newsfeed-container">
      <h2>Activity Feed</h2>

      <div className="feed-filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          ALL
        </button>
        <button
          className={`filter-btn ${filter === "system" ? "active" : ""}`}
          onClick={() => setFilter("system")}
        >
          SYSTEM
        </button>
        <button
          className={`filter-btn ${filter === "academic" ? "active" : ""}`}
          onClick={() => setFilter("academic")}
        >
          ACADEMIC
        </button>
        <button
          className={`filter-btn ${filter === "achievement" ? "active" : ""}`}
          onClick={() => setFilter("achievement")}
        >
          ACHIEVEMENTS
        </button>
      </div>

      <div className="feed-list">
        {filteredFeed.map((item) => (
          <div key={item.id} className={`feed-item feed-type-${item.type}`}>
            <div className="feed-icon">{getTypeIcon(item.type)}</div>
            <div className="feed-content">
              <div className="feed-header">
                <h4>{item.title}</h4>
                <span className="feed-time">
                  {item.timestamp.toLocaleDateString()}{" "}
                  {item.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsFeed;
