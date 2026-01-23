"use client";

import {useState} from "react";

export default function RobotPage() {

  const [lastCommand, setLastCommand] = useState("");
    
  return (
    <div>
        <h1>Robot Page</h1>
        <p>Welcome to the Robot Dashboard!</p>
        <p>Last Command: {lastCommand}</p>
        <button onClick={() => setLastCommand("forward")}>Move Forward</button>
        <button onClick={() => setLastCommand("reverse")}>Move Backward</button>
        <button onClick={() => setLastCommand("left")}>Turn Left</button>
        <button onClick={() => setLastCommand("right")}>Turn Right</button>
    </div>
  );
}