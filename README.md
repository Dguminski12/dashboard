# Robot Control Dashboard

A browser-based command centre for controlling my ESP32 wheeled robot. The dashboard turns keyboard and on-screen input into WebSocket commands, displays connection state, and records messages returned by the robot gateway.

## Highlights

- WASD control with diagonal movement commands and stop-on-key-release behaviour
- On-screen controls for mobile or mouse input
- Live WebSocket connection status and activity log
- Extensible dashboard layout for future camera and system-monitoring modules
- Companion project: [Simple Wheel Robot V1](https://github.com/Dguminski12/simple-wheel-robot-v1)

## Tech stack

Next.js, React, TypeScript, Tailwind CSS, and WebSockets.

## Run locally

```bash
git clone https://github.com/Dguminski12/dashboard.git
cd dashboard
npm install
npm run dev
```

Open `http://localhost:3000`. The WebSocket endpoint currently lives in `src/app/robot/components/RobotSocket.js`; point it at a compatible robot gateway for end-to-end control.

## Roadmap

- Move the gateway URL into environment configuration
- Add command acknowledgement and reconnection handling
- Stream telemetry and camera data
- Add automated tests for keyboard command mapping

