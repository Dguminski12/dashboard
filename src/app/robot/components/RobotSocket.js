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
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-xl">
      {/* Header with Status */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Robot Connection</h2>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            status === "Connected" ? "bg-emerald-500 animate-pulse" : "bg-red-500"
          }`} />
          <span className={`text-sm font-semibold ${
            status === "Connected" ? "text-emerald-400" : "text-red-400"
          }`}>
            {status}
          </span>
        </div>
      </div>

      {/* Message Input */}
      <div className="mb-6">
        <label className="block text-slate-400 text-sm mb-2">Send Command</label>
        <div className="flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type command..."
            className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
          />
          <button 
            onClick={sendMessage}
            disabled={status !== "Connected"}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/50 active:scale-95"
          >
            Send
          </button>
        </div>
      </div>

      {/* Logs */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Activity Logs</h3>
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 h-64 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-slate-500 text-sm italic">No messages yet...</p>
          ) : (
            <div className="space-y-2">
              {logs.map((log, index) => (
                <div 
                  key={index}
                  className="text-sm text-slate-300 font-mono bg-slate-800/50 px-3 py-2 rounded border-l-2 border-emerald-500"
                >
                  <span className="text-slate-500 mr-2">[{new Date().toLocaleTimeString()}]</span>
                  {log}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
