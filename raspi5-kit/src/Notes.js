import React, { useState } from "react";

function Notes() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Quantum Mechanics Overview",
      content: "Wave-particle duality is a fundamental concept...",
      timestamp: new Date("2025-12-01"),
    },
    {
      id: 2,
      title: "Algorithm Complexity",
      content: "Big O notation helps us analyze algorithm efficiency...",
      timestamp: new Date("2025-12-02"),
    },
  ]);
  const [currentNote, setCurrentNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createNote = () => {
    if (title.trim() && content.trim()) {
      const newNote = {
        id: Date.now(),
        title,
        content,
        timestamp: new Date(),
      };
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
      setCurrentNote(null);
    }
  };

  const editNote = (note) => {
    setCurrentNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const updateNote = () => {
    if (currentNote && title.trim() && content.trim()) {
      setNotes(
        notes.map((note) =>
          note.id === currentNote.id
            ? { ...note, title, content, timestamp: new Date() }
            : note
        )
      );
      setTitle("");
      setContent("");
      setCurrentNote(null);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (currentNote && currentNote.id === id) {
      setCurrentNote(null);
      setTitle("");
      setContent("");
    }
  };

  const cancelEdit = () => {
    setCurrentNote(null);
    setTitle("");
    setContent("");
  };

  return (
    <div className="notes-container">
      <h2>Notes</h2>

      <div className="note-editor">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="note-title-input"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note content..."
          className="note-content-input"
          rows="8"
        />
        <div className="note-actions">
          {currentNote ? (
            <>
              <button onClick={updateNote} className="save-btn">
                UPDATE NOTE
              </button>
              <button onClick={cancelEdit} className="cancel-btn">
                CANCEL
              </button>
            </>
          ) : (
            <button onClick={createNote} className="save-btn">
              CREATE NOTE
            </button>
          )}
        </div>
      </div>

      <div className="notes-list">
        <h3>Saved Notes</h3>
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="note-header">
              <h4>{note.title}</h4>
              <span className="note-timestamp">
                {note.timestamp.toLocaleDateString()}
              </span>
            </div>
            <p className="note-preview">{note.content.substring(0, 100)}...</p>
            <div className="note-item-actions">
              <button onClick={() => editNote(note)} className="edit-btn">
                EDIT
              </button>
              <button
                onClick={() => deleteNote(note.id)}
                className="delete-btn"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>

      {notes.length === 0 && (
        <p className="empty-state">No notes yet. Create one above.</p>
      )}
    </div>
  );
}

export default Notes;
