import React, { useState } from "react";

function Calendar() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Physics Lab",
      date: "2025-12-05",
      time: "14:00",
      description: "Quantum mechanics experiment",
    },
    {
      id: 2,
      title: "Study Session",
      date: "2025-12-06",
      time: "16:00",
      description: "Algorithm review with study group",
    },
  ]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const addEvent = () => {
    if (title.trim() && date && time) {
      setEvents([
        ...events,
        {
          id: Date.now(),
          title,
          date,
          time,
          description,
        },
      ]);
      setTitle("");
      setDate("");
      setTime("");
      setDescription("");
    }
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time)
  );

  return (
    <div className="calendar-container">
      <h2>Event Calendar</h2>

      <div className="event-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title..."
          className="event-input"
        />
        <div className="datetime-group">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="date-input"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="time-input"
          />
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)..."
          className="event-description"
          rows="3"
        />
        <button onClick={addEvent} className="add-event-btn">
          SCHEDULE EVENT
        </button>
      </div>

      <div className="events-list">
        <h3>Upcoming Events</h3>
        {sortedEvents.map((event) => (
          <div key={event.id} className="event-item">
            <div className="event-header">
              <h4>{event.title}</h4>
              <button
                onClick={() => deleteEvent(event.id)}
                className="delete-btn"
              >
                DELETE
              </button>
            </div>
            <div className="event-datetime">
              📅 {new Date(event.date).toLocaleDateString()} @ {event.time}
            </div>
            {event.description && (
              <p className="event-desc">{event.description}</p>
            )}
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <p className="empty-state">No events scheduled.</p>
      )}
    </div>
  );
}

export default Calendar;
