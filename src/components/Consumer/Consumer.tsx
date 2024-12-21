import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Consumer.css"; // Import the CSS file

const Consumer: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    // Connect to WebSocket server (the server-side will emit messages)
    const socket = io("http://localhost:5000"); // WebSocket server URL
    socket.on("message", (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("connect", () => {
      setStatus("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      setStatus("Disconnected from WebSocket server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="consumer-container">
      <h1 className="consumer-title">Consumer (RabbitMQ Messages)</h1>
      <p
        className={`consumer-status ${
          status.includes("Connected") ? "connected" : "disconnected"
        }`}
      >
        Status: {status}
      </p>
      <div className="consumer-messages">
        <h3 className="consumer-messages-title">Messages:</h3>
        <ul className="consumer-messages-list">
          {messages.map((message, index) => (
            <li key={index} className="consumer-message-item">
              {message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Consumer;
