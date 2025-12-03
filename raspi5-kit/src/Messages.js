import React, { useState } from "react";

function Messages() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "System",
      content: "Welcome to Chyort-Boy secure messaging.",
      timestamp: new Date("2025-12-03T10:00:00"),
      encrypted: true,
    },
    {
      id: 2,
      from: "Study Group",
      content: "Meeting at 3pm to discuss quantum mechanics.",
      timestamp: new Date("2025-12-03T11:30:00"),
      encrypted: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [recipient, setRecipient] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() && recipient.trim()) {
      const message = {
        id: Date.now(),
        from: "You",
        to: recipient,
        content: newMessage,
        timestamp: new Date(),
        encrypted: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
      setRecipient("");
    }
  };

  return (
    <div className="messages-container">
      <h2>Secure Messages</h2>
      <p className="encryption-status">🔒 END-TO-END ENCRYPTED</p>

      <div className="message-compose">
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient..."
          className="recipient-input"
        />
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
          rows="4"
        />
        <button onClick={sendMessage} className="send-btn">
          SEND MESSAGE
        </button>
      </div>

      <div className="message-list">
        <h3>Message Thread</h3>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-item ${
              msg.from === "You" ? "sent" : "received"
            }`}
          >
            <div className="message-header">
              <span className="message-from">{msg.from}</span>
              {msg.to && <span className="message-to"> → {msg.to}</span>}
              <span className="message-time">
                {msg.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <div className="message-content">{msg.content}</div>
            {msg.encrypted && (
              <span className="encrypted-badge">🔐 ENCRYPTED</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Messages;
