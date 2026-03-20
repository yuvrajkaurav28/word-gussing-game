const API = "/api";

// Auth guard
const user = localStorage.getItem("wq_user");
if (!user) window.location.href = "/";

// State
let progress    = JSON.parse(localStorage.getItem("wq_progress") || '{"level":1,"score":0,"streak":0}');
let missingChars = [];
let answered    = false;

function updateNavStats() {
  document.getElementById("navLevel").textContent  = progress.level;
  document.getElementById("navScore").textContent  = progress.score.toLocaleString();
  document.getElementById("navStreak").textContent = progress.streak;
  const pct = (progress.level / 100) * 100;
  document.getElementById("gameLevelFill").style.width = pct + "%";
  document.getElementById("gameLevelText").textContent = progress.level;
}

async function fetchWord() {
  answered = false;
  document.getElementById("nextBtn").classList.add("hidden");
  document.getElementById("feedbackMsg").textContent = "";
  document.getElementById("feedbackMsg").className   = "feedback-msg";
  document.getElementById("gameHint").textContent    = "Pick the missing letter(s) below";

  try {
    const res  = await fetch(`${API}/word?user=${encodeURIComponent(user)}&level=${progress.level}`, { credentials: "include" });
    if (!res.ok) throw new Error("Server error");
    const data = await res.json();
    missingChars = data.missing;
    renderWord(data.masked, data.missing);
    renderOptions(data.options);
  } catch (err) {
    document.getElementById("gameHint").textContent = "Could not load word. Is the backend running?";
    console.error("fetchWord error:", err);
  }
}

function renderWord(masked, missing) {
  const display = document.getElementById("wordDisplay");
  display.innerHTML = "";
  // Trigger reflow for re-animation
  void display.offsetWidth;

  const missingIndices = missing.map(m => m.index);
  for (let i = 0; i < masked.length; i++) {
    const box       = document.createElement("div");
    const isBlank   = missingIndices.includes(i);
    box.className   = "letter-box " + (isBlank ? "blank" : "known");
    box.textContent = isBlank ? "?" : masked[i];
    box.id          = `letter-${i}`;
    display.appendChild(box);
  }
}

function renderOptions(options) {
  const grid = document.getElementById("optionsGrid");
  grid.innerHTML = "";
  options.forEach(char => {
    const btn     = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = char;
    btn.addEventListener("click", () => handleAnswer(char, btn));
    grid.appendChild(btn);
  });
}

async function handleAnswer(char, btn) {
  if (answered) return;
  answered = true;

  const correctChars = missingChars.map(m => m.char);
  const isCorrect    = correctChars.includes(char);

  // Disable all option buttons
  document.querySelectorAll(".option-btn").forEach(b => { b.disabled = true; });

  if (isCorrect) {
    btn.classList.add("correct-pick");
    missingChars.forEach(m => {
      const box = document.getElementById(`letter-${m.index}`);
      if (box) { box.textContent = m.char; box.className = "letter-box correct"; }
    });
  } else {
    btn.classList.add("wrong-pick");
    missingChars.forEach(m => {
      const box = document.getElementById(`letter-${m.index}`);
      if (box) { box.textContent = m.char; box.className = "letter-box wrong"; }
    });
    // Show which button was correct
    document.querySelectorAll(".option-btn").forEach(b => {
      if (correctChars.includes(b.textContent)) b.classList.add("correct-pick");
    });
  }

  showFeedback(isCorrect);

  // Sync progress with server
  try {
    const res        = await fetch(`${API}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ user, correct: isCorrect, level: progress.level })
    });
    if (!res.ok) throw new Error("Progress update failed");
    const newProgress = await res.json();
    const leveledUp   = newProgress.level > progress.level;
    progress = newProgress;
    localStorage.setItem("wq_progress", JSON.stringify(progress));
    updateNavStats();
    if (leveledUp) {
      const sceneMsg = applyGameScene(progress.level);
      setTimeout(() => showLevelUp(progress.level, sceneMsg), 1200);
    }
  } catch (err) {
    console.error("Progress sync error:", err);
  }

  setTimeout(() => { document.getElementById("nextBtn").classList.remove("hidden"); }, 700);
}

function showFeedback(correct) {
  const el = document.getElementById("feedbackMsg");
  if (correct) {
    const msgs = ["Correct! 🎉", "Nailed it! ✨", "Perfect! 🔥", "Awesome! ⭐", "Great job! 💪"];
    el.textContent = msgs[Math.floor(Math.random() * msgs.length)];
    el.className   = "feedback-msg correct";
  } else {
    const msgs = ["Not quite! 😅", "Wrong answer 😬", "Try again next time! 💡", "Oops! 🙈"];
    el.textContent = msgs[Math.floor(Math.random() * msgs.length)];
    el.className   = "feedback-msg wrong";
  }
}

function nextWord()    { fetchWord(); }

function showLevelUp(newLevel, msg) {
  document.getElementById("newLevelText").textContent = `Level ${newLevel}`;
  const msgEl = document.getElementById("newSceneMsg");
  if (msgEl) msgEl.textContent = msg || "";
  document.getElementById("levelUpModal").classList.remove("hidden");
}

function closeLevelUp() {
  document.getElementById("levelUpModal").classList.add("hidden");
}

function logout() {
  fetch(`${API}/logout`, { method: "POST", credentials: "include" }).catch(() => {});
  localStorage.removeItem("wq_user");
  localStorage.removeItem("wq_progress");
  window.location.href = "/";
}

// Init
updateNavStats();
fetchWord();
