"use client";

import {useState, useEffect} from "react";

export default function RobotPage() {

  const [lastCommand, setLastCommand] = useState("");
  
  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
        
        if (event.repeat) return;
      switch(event.key.toLowerCase()) {
        case "w":
            setLastCommand("forward");
            break;
        case "s":
            setLastCommand("reverse");
            break;
        case "a":
            setLastCommand("left");
            break;
        case "d":
            setLastCommand("right");
            break;
        case " ":
            setLastCommand("stop");
            break;
      };
    };

    window.addEventListener("keydown", keydownHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  useEffect(() => {
    const keyupHandler = (event: KeyboardEvent) => {
        switch(event.key.toLowerCase()) {
            case "w":
                setLastCommand("stop");
                break;
            case "s":
                setLastCommand("stop");
                break;
            case "a":
                setLastCommand("stop");
                break;
            case "d":
                setLastCommand("stop");
                break;
            case " ":
                setLastCommand("stop");
                break;
        };
    };

    window.addEventListener("keyup", keyupHandler);
    return () => {
      window.removeEventListener("keyup", keyupHandler);
    };
  }, []);
    
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