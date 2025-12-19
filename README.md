# 🎵 Music Player

🔗 **Live demo:**  
https://react-tiny-music-player.vercel.app/

A small music player built with **React + TypeScript**, using the native HTML `<audio>` element.

The main goal of this project was to focus on clean separation of concerns, custom hooks, and building a testable frontend architecture.

---

## ✨ Features

- Display a list of tracks
- Select a track
- Play / pause
- Selecting a new track:
  - does **not** auto-play when paused
  - **does** restart playback when already playing
- Highlight the selected track
- Previous / next track navigation
- Repeat toggle
- Progress bar with seeking
- Volume control

---

## 🧱 Tech Stack

- React
- TypeScript
- Tailwind CSS
- DaisyUI
- Jest + React Testing Library

---

## 🧩 Component Structure

The UI follows an **Atomic Design–inspired structure**:

- **Atoms** – basic UI elements (buttons, icons)
- **Molecules** – small composed components (Track, ProgressBar, VolumeControl)
- **Organisms** – larger sections (Player, TransportControls, PlayerApp)

---

## 🧪 Testing

- Every component and custom hook has unit tests
- Tests cover:
  - user interactions
  - state changes
  - edge cases
- Browser audio behaviour is **mocked**, not tested directly
- Tests focus on **how the app reacts**, not browser internals

---

## ▶️ Run locally

Clone the repository:
```
git clone <YOUR_REPO_URL>
cd <YOUR_FOLDER_NAME>
```

Install dependencies:
```
npm install
```

Start the development server:
```
npm run dev
```

Open in your browser:

Usually available at: http://localhost:5173

---

## 🧪 Run tests

Run all unit tests:
```
npm test
```

Run tests in watch mode:
```
npm test -- --watch
```

Run tests with coverage:
```
npm test -- --coverage
```

---

## 🏗️ Build

Create a production build:
```
npm run build
```

Preview the production build locally:
```
npm run preview
```

---

## Accessibility

- Semantic HTML elements are used
- Icon buttons include aria-label
- Toggle buttons use aria-pressed
- Accessibility text is stored in a central file for consistency

---
