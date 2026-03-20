const API = "/api";

// Auth guard
const user = localStorage.getItem("wq_user");
if (!user) window.location.href = "/";

// Set username immediately (before anything else)
document.getElementById("heroName").textContent = user;
document.getElementById("navUser").textContent = user;

// Day/Night state
let isDaytime = false;

// Load progress
async function loadProgress() {
  let progress = { level: 1, score: 0, streak: 0 };
  try {
    const res = await fetch(`${API}/progress?user=${encodeURIComponent(user)}`, { credentials: "include" });
    if (res.ok) {
      progress = await res.json();
      localStorage.setItem("wq_progress", JSON.stringify(progress));
    }
  } catch {
    const cached = localStorage.getItem("wq_progress");
    if (cached) progress = JSON.parse(cached);
  }
  animateCount("statLevel", progress.level);
  animateCount("statScore", progress.score);
  animateCount("statStreak", progress.streak);
  const pct = (progress.level / 100) * 100;
  document.getElementById("levelBarFill").style.width = pct + "%";
  document.getElementById("levelBarLabel").textContent = `Level ${progress.level} / 100`;
}

function animateCount(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 30);
}

// ── Day / Night Toggle ────────────────────────────────────────
function toggleDayNight() {
  isDaytime = !isDaytime;
  const scene = document.getElementById("homeScene");
  const btn = document.getElementById("dayNightBtn");
  const starsEl = document.getElementById("homeStars");
  const auroraEl = document.querySelector(".aurora");
  const birdsEl = document.getElementById("homeBirds");
  const animalsEl = document.getElementById("homeAnimals");
  const dayClouds = document.querySelectorAll(".day-cloud");
  const fireflies = document.querySelectorAll(".firefly");

  if (isDaytime) {
    scene.classList.add("day-scene");
    btn.textContent = "🌙 Night Mode";
    if (starsEl) starsEl.style.opacity = "0";
    if (auroraEl) auroraEl.style.opacity = "0";
    if (birdsEl) birdsEl.style.display = "block";
    if (animalsEl) animalsEl.style.display = "block";
    dayClouds.forEach(c => c.style.display = "block");
    fireflies.forEach(f => f.style.opacity = "0");
  } else {
    scene.classList.remove("day-scene");
    btn.textContent = "☀️ Day Mode";
    if (starsEl) starsEl.style.opacity = "1";
    if (auroraEl) auroraEl.style.opacity = "1";
    if (birdsEl) birdsEl.style.display = "none";
    if (animalsEl) animalsEl.style.display = "none";
    dayClouds.forEach(c => c.style.display = "none");
    fireflies.forEach(f => f.style.opacity = "1");
  }
}

function logout() {
  fetch(`${API}/logout`, { method: "POST", credentials: "include" }).catch(() => {});
  localStorage.removeItem("wq_user");
  localStorage.removeItem("wq_progress");
  window.location.href = "/";
}

loadProgress();
