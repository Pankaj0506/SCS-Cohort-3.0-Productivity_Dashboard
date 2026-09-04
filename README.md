# ProDash — Productivity Dashboard
A single-page productivity workspace with a bento-style home view and dedicated tools for tasks, daily planning, goals, a Pomodoro timer, weather, and quotes.
Built with HTML, CSS, and vanilla JavaScript. No build step.
## Features
- **Home dashboard** — Bento cards that open each tool. Background wallpaper changes with the time of day.
- **Greeting & clock** — Time-based greeting (Good Morning / Afternoon / Evening / Night) plus a live date and time in the top bar.
- **Light / dark theme** — Toggle in the top bar; preference is saved in `localStorage`.
- **Todo list** — Add, complete, star, and delete tasks. Remaining count is shown on the Home card.
- **Daily planner** — Timed event blocks that cannot overlap. Occupied start/end times are disabled in the dropdowns. Delete an event to free that range. Blocks are ordered by start time and shown on Home and in the full planner view.
- **Daily goals** — Checklist with a progress bar on Home and in the goals view.
- **Pomodoro** — Work/break sessions with play, pause, reset, and duration adjusters (dashboard mini timer and full view).
- **Weather** — Current conditions from the browser location (WeatherAPI).
- **Motivation** — Random quotes (API Ninjas), refreshable from Home or the Motivation view.
- **Responsive layout** — Sidebar becomes a compact horizontal nav on smaller screens; cards and forms stack as needed.
Todos, planner events, and goals persist in `localStorage` (`todoList`, `plannerList`, `goalList`). Theme uses the `theme` key.
## Getting started
1. Clone or copy this folder.
2. Place time-of-day wallpaper files in `images/` (see below).
3. Open `index.html` in a browser, or serve the folder locally:
```bash
npx serve .
```
Geolocation must be allowed for weather. Quotes and weather need network access.
## Project structure
```
.
├── index.html    # Layout, views, and dashboard cards
├── style.css     # Theme, bento grid, planner, and responsive rules
├── script.js     # All app logic
├── images/       # Wallpaper assets (not always included in the repo)
└── README.md
```
### Wallpaper files
`script.js` loads backgrounds from `./images/` by hour:
| Hours (local) | File |
| --- | --- |
| 05:00–07:59 | `morning.jpg` |
| 08:00–10:59 | `late-morning.png` |
| 11:00–13:59 | `afternoon.png` |
| 14:00–16:59 | `late-afternoon.png` |
| 17:00–18:59 | `evening.png` |
| 19:00–19:59 | `late-evening.png` |
| 20:00–23:59 | `night.png` |
| 00:00–04:59 | `late-night.png` |
If those files are missing, the viewport simply has no background image.
## Daily planner rules
- An event occupies `[start, end)` (for example 09:00–11:00 blocks 09:00 through 10:30; 11:00 is free again).
- Overlapping ranges cannot be added; blocked options appear as disabled in the time selects.
- Events sort by start time. Height scales with duration.
- Delete from the full Daily Planner view (not the Home card). Confirming delete frees those times.
## APIs
| Feature | Source |
| --- | --- |
| Quotes | [API Ninjas Random Quotes](https://api-ninjas.com/api/quotes) |
| Weather | [WeatherAPI](https://www.weatherapi.com/) current conditions |
API keys are currently set in `script.js`. For anything you share or deploy, move keys out of source control and rotate any keys that were committed.
## Browser support
Modern Chromium, Firefox, and Safari. The UI uses CSS grid, flexbox, `backdrop-filter`, and `100dvh`. Allow location when prompted if you want live weather.
