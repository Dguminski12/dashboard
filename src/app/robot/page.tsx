
"use client";
import RobotSocket from "./components/RobotSocket"
import {useState, useEffect, useRef} from "react";

export default function RobotPage() {

  const [lastCommand, setLastCommand] = useState("");
  const pressed = useRef(new Set());

  useEffect(() => {

    const keydownHandler = (event: KeyboardEvent) => {

      if (event.repeat) return;

      const key = event.key.toLowerCase();
      pressed.current.add(key);

      if (pressed.current.has("w") && pressed.current.has("d")) {
        setLastCommand("forward_right");
      }

      else if (pressed.current.has("w") && pressed.current.has("a")) {
        setLastCommand("forward_left");
      }

      else if (pressed.current.has("s") && pressed.current.has("d")) {
        setLastCommand("backward_right");
      }

      else if (pressed.current.has("s") && pressed.current.has("a")) {
        setLastCommand("backward_left");
      }

      else if (pressed.current.has("w")) {
        setLastCommand("forward");
      }

      else if (pressed.current.has("s")) {
        setLastCommand("backward");
      }

      else if (pressed.current.has("a")) {
        setLastCommand("left");
      }

      else if (pressed.current.has("d")) {
        setLastCommand("right");
      }

    };


  const keyupHandler = (event: KeyboardEvent) => {

    const key = event.key.toLowerCase();
    pressed.current.delete(key);

    if (pressed.current.size === 0) {
      setLastCommand("stop");
    }

  };


  window.addEventListener("keydown", keydownHandler);
  window.addEventListener("keyup", keyupHandler);

  return () => {
    window.removeEventListener("keydown", keydownHandler);
    window.removeEventListener("keyup", keyupHandler);
  };

}, []);
    
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            🤖 Robot Control
          </h1>
          <p className="text-slate-400 text-lg">
            Use WASD keys or buttons to control the robot
          </p>
          <RobotSocket />
        </div>

        {/* Command Display */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8 shadow-xl">
          <div className="text-center">
            <p className="text-slate-400 text-sm uppercase tracking-wide mb-2">
              Current Command
            </p>
            <p className={`text-3xl font-bold transition-all duration-200 ${
              lastCommand === "stop" || !lastCommand
                ? "text-slate-500"
                : "text-emerald-400"
            }`}>
              {lastCommand || "idle"}
            </p>
          </div>
        </div>

        {/* Control Panel */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-xl">
          <div className="grid grid-cols-3 grid-rows-3 gap-4 max-w-sm mx-auto">
            {/* Top Row - Forward */}
            <div></div>
            <button 
              onClick={() => setLastCommand("forward")}
              className="w-full aspect-square bg-slate-700 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/50 active:scale-95 flex flex-col items-center justify-center gap-1"
            >
              <span className="text-2xl">↑</span>
              <span className="text-xs">W</span>
            </button>
            <div></div>

            {/* Middle Row - Left, Center, Right */}
            <button 
              onClick={() => setLastCommand("left")}
              className="w-full aspect-square bg-slate-700 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 flex flex-col items-center justify-center gap-1"
            >
              <span className="text-2xl">←</span>
              <span className="text-xs">A</span>
            </button>
            
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-slate-700/50 border-2 border-slate-600" />
            </div>

            <button 
              onClick={() => setLastCommand("right")}
              className="w-full aspect-square bg-slate-700 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 flex flex-col items-center justify-center gap-1"
            >
              <span className="text-2xl">→</span>
              <span className="text-xs">D</span>
            </button>

            {/* Bottom Row - Reverse */}
            <div></div>
            <button 
              onClick={() => setLastCommand("reverse")}
              className="w-full aspect-square bg-slate-700 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/50 active:scale-95 flex flex-col items-center justify-center gap-1"
            >
              <span className="text-2xl">↓</span>
              <span className="text-xs">S</span>
            </button>
            <div></div>
          </div>

          {/* Stop Button */}
          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => setLastCommand("stop")}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-500/50 active:scale-95"
            >
              ⏹ STOP (Space)
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-slate-500 text-sm">
          <p>Press and hold keyboard keys for continuous control</p>
        </div>
      </div>
    </div>
  );
}