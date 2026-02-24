const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

/* 🔴 CHANGE TIME HERE ONLY */
const COUNTDOWN_DURATION =  24 * 60 * 60 * 1000; 
// Examples:
// 10 sec  → 10 * 1000
// 1 min   → 1 * 60 * 1000
// 1 hr    → 1 * 60 * 60 * 1000
// 24 hrs  → 24 * 60 * 60 * 1000

let countdownStartTime = null;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/start", (req, res) => {
    if (!countdownStartTime) {
        countdownStartTime = Date.now();
    }
    res.json({ started: true });
});

app.get("/time", (req, res) => {
    if (!countdownStartTime) {
        return res.json({ started: false });
    }

    const elapsed = Date.now() - countdownStartTime;
    const remaining = Math.max(0, COUNTDOWN_DURATION - elapsed);

    res.json({
        started: true,
        remaining
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
