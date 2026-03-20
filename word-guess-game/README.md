# WordQuest 🔤

A word-guessing game where players identify missing letters to complete words. Features 100 levels of increasing difficulty, animated scene backgrounds that change with your level, and a day/night toggle on the home screen.

---

## How to Run

### 1. Install dependencies

```bash
cd word-guess-game/backend
pip install -r requirements.txt
```

### 2. Start the server

```bash
python app.py
```

### 3. Open in browser

```
http://127.0.0.1:5000
```

That's it. Flask serves both the backend API and all frontend files.

---

## Project Structure

```
word-guess-game/
├── backend/
│   ├── app.py            # Flask server — auth, word API, progress tracking
│   ├── words.py          # 1000+ words organised by difficulty tier
│   └── requirements.txt
└── frontend/
    ├── index.html        # Login / Register page
    ├── home.html         # Dashboard with stats and day/night toggle
    ├── game.html         # Game page
    ├── css/
    │   ├── style.css     # Main styles, layout, components
    │   └── scenes.css    # Animated background scene styles
    └── js/
        ├── auth.js       # Login and register logic
        ├── home.js       # Home page — stats, day/night toggle
        ├── game.js       # Game logic — word fetch, answer handling, level up
        └── scene-builder.js  # Generates all animated scene elements
```

---

## Gameplay

- A word appears with one or more letters hidden as `?`
- Pick the correct letter from the 6 options shown
- 3 correct answers in a row = level up
- Score multiplies with your current level

## Level Tiers & Scenes

| Levels  | Difficulty | Background Scene     |
|---------|------------|----------------------|
| 1–10    | Beginner   | 🌲 Enchanted Forest  |
| 11–30   | Novice     | 🏜️ Scorching Desert  |
| 31–60   | Skilled    | 🌊 Raging Ocean      |
| 61–80   | Expert     | 🚀 Deep Space        |
| 81–100  | Master     | 🌋 Volcanic Inferno  |

## Features

- Login / Register with session persistence
- 1000+ words across 5 difficulty tiers
- Animated SVG scene backgrounds per level
- Day / Night toggle on home screen (shows birds, deer, fox, rabbit in daytime)
- Level-up modal with scene transition message
- Score and streak tracking
- Fully responsive layout

---

## Tech Stack

- **Backend:** Python, Flask, Flask-CORS
- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Animations:** Pure CSS keyframes + SVG

---

Developed by **Yuvraj Singh Kaurav**
