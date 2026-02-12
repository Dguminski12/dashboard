"use client";

import { useEffect, useState } from "react";

export default function RobotSocket() {
  const [socket, setSocket] = useState(null);
  const [status, setStatus] = useState("Disconnected");
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080"); // ← replace with YOUR Pi IP

    ws.onopen = () => {
      console.log("Connected to Pi");
      setStatus("Connected");
      ws.send("Dashboard connected");
    };

    ws.onmessage = (event) => {
      console.log("From Pi:", event.data);
      setLogs(prev => [...prev, event.data]);
    };

    ws.onclose = () => {
      console.log("Disconnected");
      setStatus("Disconnected");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    setSocket(ws);

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Robot Connection</h2>
      <p>Status: {status}</p>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type command..."
      />
      <button onClick={sendMessage}>Send</button>

      <div style={{ marginTop: "20px" }}>
        <h3>Logs:</h3>
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
}
