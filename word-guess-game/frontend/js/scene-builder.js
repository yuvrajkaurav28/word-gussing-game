/* ============================================================
   SCENE BUILDER — generates animated elements for each scene
   ============================================================ */

// ── Utility ──────────────────────────────────────────────────
function rand(min, max) { return Math.random() * (max - min) + min; }
function randInt(min, max) { return Math.floor(rand(min, max)); }

// ── LOGIN SCENE: Mountain Sunset ─────────────────────────────
function buildLoginScene() {
  buildStars("loginStars", 80);
  buildBirds("loginBirds", 12);
  buildGrass("loginGrass", 120);
}

function buildStars(containerId, count) {
  const c = document.getElementById(containerId);
  if (!c) return;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "star";
    const size = rand(1, 3);
    s.style.cssText = `
      width:${size}px; height:${size}px;
      top:${rand(0,60)}%;
      left:${rand(0,100)}%;
      animation-duration:${rand(2,5)}s;
      animation-delay:${rand(0,4)}s;
    `;
    c.appendChild(s);
  }
}

function buildBirds(containerId, count) {
  const c = document.getElementById(containerId);
  if (!c) return;
  // Make container relative so absolute children position correctly
  c.style.position = "absolute";
  c.style.top = "0";
  c.style.left = "0";
  c.style.width = "100%";
  c.style.height = "50%";
  for (let i = 0; i < count; i++) {
    const b    = document.createElement("div");
    b.className = "bird";
    const size = rand(10, 20);
    b.style.cssText = `
      position:absolute;
      top:${rand(5, 80)}%;
      left:0;
      animation-duration:${rand(8,18)}s;
      animation-delay:${rand(-15,0)}s;
    `;
    b.innerHTML = `
      <svg width="${size}" height="${size * 0.5}" viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,5 Q5,0 10,5 Q15,0 20,5" stroke="rgba(255,255,255,0.75)" stroke-width="1.5" fill="none"/>
      </svg>`;
    c.appendChild(b);
  }
}

function buildGrass(containerId, count) {
  const c = document.getElementById(containerId);
  if (!c) return;
  for (let i = 0; i < count; i++) {
    const g = document.createElement("div");
    g.className = "grass-blade";
    const h = rand(20, 55);
    g.style.cssText = `
      left:${rand(0,100)}%;
      height:${h}px;
      animation-duration:${rand(1.5,3.5)}s;
      animation-delay:${rand(0,2)}s;
      opacity:${rand(0.5,1)};
    `;
    c.appendChild(g);
  }
}

// ── HOME SCENE: Lake Cabin ────────────────────────────────────
function buildHomeScene() {
  buildStars("homeStars", 120);
  buildFireflies("homeFireflies", 20);
  buildHomeBirds("homeBirds");
  buildHomeAnimals("homeAnimals");
  buildDayClouds();
}

function buildDayClouds() {
  const scene = document.getElementById("homeScene");
  if (!scene) return;
  const cloudData = [
    { top: 8,  width: 160, height: 45, dur: 30, delay: 0 },
    { top: 14, width: 220, height: 55, dur: 40, delay: -12 },
    { top: 6,  width: 130, height: 38, dur: 25, delay: -20 },
    { top: 18, width: 180, height: 48, dur: 35, delay: -8 },
    { top: 10, width: 100, height: 32, dur: 22, delay: -16 },
  ];
  cloudData.forEach(d => {
    const cl = document.createElement("div");
    cl.className = "day-cloud";
    cl.style.cssText = `
      top:${d.top}%; width:${d.width}px; height:${d.height}px;
      animation-duration:${d.dur}s; animation-delay:${d.delay}s;
      display:none; z-index:2;
    `;
    cl.id = "dayCloud_" + Math.random().toString(36).slice(2);
    scene.appendChild(cl);
  });
}

function buildHomeBirds(containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;
  // 15 birds flying across the sky at various heights (top 40% of screen)
  for (let i = 0; i < 15; i++) {
    const b = document.createElement("div");
    b.className = "bird";
    const size = rand(12, 22);
    // top: 2% to 38% so they stay in the sky
    b.style.cssText = `
      top:${rand(2, 38)}%;
      left:0;
      animation-duration:${rand(9, 20)}s;
      animation-delay:${rand(-18, 0)}s;
      z-index:3;
    `;
    b.innerHTML = `
      <svg width="${size}" height="${size * 0.5}" viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,5 Q5,0 10,5 Q15,0 20,5" stroke="rgba(30,30,30,0.85)" stroke-width="1.8" fill="none"/>
      </svg>`;
    c.appendChild(b);
  }
}

function buildHomeAnimals(containerId) {
  const c = document.getElementById(containerId);
  if (!c) return;

  // Deer
  const deer = document.createElement("div");
  deer.style.cssText = `position:absolute; left:${rand(10,30)}%; bottom:0; animation:deerWalk 12s linear infinite;`;
  deer.innerHTML = `
    <svg viewBox="0 0 80 70" width="80" height="70" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <ellipse cx="40" cy="45" rx="22" ry="12" fill="#8B5E3C"/>
      <!-- Neck -->
      <rect x="52" y="28" width="10" height="20" rx="5" fill="#8B5E3C"/>
      <!-- Head -->
      <ellipse cx="60" cy="24" rx="10" ry="8" fill="#8B5E3C"/>
      <!-- Snout -->
      <ellipse cx="68" cy="27" rx="5" ry="4" fill="#a0714f"/>
      <!-- Eye -->
      <circle cx="63" cy="21" r="2" fill="#1a0a00"/>
      <!-- Antlers -->
      <line x1="58" y1="16" x2="54" y2="6" stroke="#5a3010" stroke-width="2"/>
      <line x1="54" y1="6" x2="50" y2="2" stroke="#5a3010" stroke-width="1.5"/>
      <line x1="54" y1="6" x2="57" y2="1" stroke="#5a3010" stroke-width="1.5"/>
      <line x1="62" y1="15" x2="66" y2="5" stroke="#5a3010" stroke-width="2"/>
      <line x1="66" y1="5" x2="63" y2="1" stroke="#5a3010" stroke-width="1.5"/>
      <line x1="66" y1="5" x2="70" y2="2" stroke="#5a3010" stroke-width="1.5"/>
      <!-- Legs -->
      <rect x="24" y="55" width="6" height="14" rx="3" fill="#7a4f2a"/>
      <rect x="34" y="55" width="6" height="14" rx="3" fill="#7a4f2a"/>
      <rect x="44" y="55" width="6" height="14" rx="3" fill="#7a4f2a"/>
      <rect x="54" y="55" width="6" height="14" rx="3" fill="#7a4f2a"/>
      <!-- Tail -->
      <ellipse cx="19" cy="44" rx="5" ry="4" fill="#fff" opacity="0.8"/>
    </svg>`;
  c.appendChild(deer);

  // Fox
  const fox = document.createElement("div");
  fox.style.cssText = `position:absolute; left:${rand(55,75)}%; bottom:0; animation:foxTrot 9s linear infinite; animation-delay:-4s;`;
  fox.innerHTML = `
    <svg viewBox="0 0 60 50" width="60" height="50" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <ellipse cx="28" cy="32" rx="18" ry="10" fill="#c0522a"/>
      <!-- Tail -->
      <path d="M10,32 Q0,20 8,14 Q14,22 18,28" fill="#c0522a"/>
      <ellipse cx="8" cy="14" rx="5" ry="4" fill="#fff" opacity="0.9"/>
      <!-- Neck -->
      <rect x="38" y="20" width="8" height="14" rx="4" fill="#c0522a"/>
      <!-- Head -->
      <ellipse cx="48" cy="17" rx="10" ry="8" fill="#c0522a"/>
      <!-- Snout -->
      <path d="M54,18 L60,22 L54,24 Z" fill="#e8a080"/>
      <!-- Nose -->
      <ellipse cx="59" cy="20" rx="2" ry="1.5" fill="#1a0a00"/>
      <!-- Eye -->
      <circle cx="51" cy="14" r="2" fill="#1a0a00"/>
      <!-- Ears -->
      <polygon points="42,10 44,2 48,10" fill="#c0522a"/>
      <polygon points="43,10 44,4 47,10" fill="#e8a080"/>
      <polygon points="52,8 55,1 58,9" fill="#c0522a"/>
      <polygon points="53,8 55,3 57,9" fill="#e8a080"/>
      <!-- Legs -->
      <rect x="18" y="40" width="5" height="10" rx="2" fill="#a03a18"/>
      <rect x="26" y="40" width="5" height="10" rx="2" fill="#a03a18"/>
      <rect x="34" y="40" width="5" height="10" rx="2" fill="#a03a18"/>
      <rect x="42" y="40" width="5" height="10" rx="2" fill="#a03a18"/>
    </svg>`;
  c.appendChild(fox);

  // Rabbit
  const rabbit = document.createElement("div");
  rabbit.style.cssText = `position:absolute; left:${rand(40,55)}%; bottom:0; animation:rabbitHop 5s ease-in-out infinite; animation-delay:-2s;`;
  rabbit.innerHTML = `
    <svg viewBox="0 0 40 50" width="40" height="50" xmlns="http://www.w3.org/2000/svg">
      <!-- Body -->
      <ellipse cx="20" cy="36" rx="13" ry="12" fill="#d4c5b0"/>
      <!-- Head -->
      <ellipse cx="20" cy="20" rx="10" ry="9" fill="#d4c5b0"/>
      <!-- Ears -->
      <ellipse cx="14" cy="7" rx="4" ry="10" fill="#d4c5b0"/>
      <ellipse cx="14" cy="7" rx="2" ry="7" fill="#e8a0a0" opacity="0.7"/>
      <ellipse cx="26" cy="7" rx="4" ry="10" fill="#d4c5b0"/>
      <ellipse cx="26" cy="7" rx="2" ry="7" fill="#e8a0a0" opacity="0.7"/>
      <!-- Eyes -->
      <circle cx="16" cy="18" r="2" fill="#e8a0a0"/>
      <circle cx="24" cy="18" r="2" fill="#e8a0a0"/>
      <!-- Nose -->
      <ellipse cx="20" cy="23" rx="2" ry="1.5" fill="#e8a0a0"/>
      <!-- Tail -->
      <circle cx="32" cy="38" r="5" fill="#fff" opacity="0.9"/>
      <!-- Legs -->
      <ellipse cx="14" cy="46" rx="6" ry="4" fill="#c4b5a0"/>
      <ellipse cx="26" cy="46" rx="6" ry="4" fill="#c4b5a0"/>
    </svg>`;
  c.appendChild(rabbit);
}

function buildFireflies(containerId, count) {
  const c = document.getElementById(containerId);
  if (!c) return;
  for (let i = 0; i < count; i++) {
    const f = document.createElement("div");
    f.className = "firefly";
    f.style.cssText = `
      left:${rand(5,85)}%;
      top:${rand(30,75)}%;
      animation-duration:${rand(3,7)}s;
      animation-delay:${rand(0,6)}s;
      box-shadow: 0 0 6px 3px rgba(170,255,136,0.5);
    `;
    c.appendChild(f);
  }
}

// ── GAME SCENE: Level-based ───────────────────────────────────
const SCENE_CONFIG = {
  forest:  { levels: [1,10],  id: "sceneForest",  badge: "🌲 Enchanted Forest",  msg: "The forest grows darker..." },
  desert:  { levels: [11,30], id: "sceneDesert",  badge: "🏜️ Scorching Desert",  msg: "The heat is rising!" },
  ocean:   { levels: [31,60], id: "sceneOcean",   badge: "🌊 Raging Ocean",      msg: "Brace for the storm!" },
  space:   { levels: [61,80], id: "sceneSpace",   badge: "🚀 Deep Space",        msg: "You've reached the cosmos!" },
  volcano: { levels: [81,100],id: "sceneVolcano", badge: "🌋 Volcanic Inferno",  msg: "Only the strongest survive!" },
};

function getSceneForLevel(level) {
  for (const [key, cfg] of Object.entries(SCENE_CONFIG)) {
    if (level >= cfg.levels[0] && level <= cfg.levels[1]) return key;
  }
  return "forest";
}

function initGameScene() {
  // Build all particle systems upfront
  buildForestScene();
  buildDesertScene();
  buildOceanScene();
  buildSpaceScene();
  buildVolcanoScene();

  // Apply correct scene for current level
  const progress = JSON.parse(localStorage.getItem("wq_progress") || '{"level":1}');
  applyGameScene(progress.level);
}

function applyGameScene(level) {
  const sceneName = getSceneForLevel(level);
  const cfg = SCENE_CONFIG[sceneName];

  // Hide all scenes
  Object.values(SCENE_CONFIG).forEach(c => {
    const el = document.getElementById(c.id);
    if (el) el.style.display = "none";
  });

  // Show active scene
  const active = document.getElementById(cfg.id);
  if (active) active.style.display = "block";

  // Update badge
  const badge = document.getElementById("sceneBadge");
  if (badge) {
    badge.textContent = cfg.badge;
    badge.className = "scene-badge scene-badge-" + sceneName;
  }

  return cfg.msg;
}

// ── Forest ────────────────────────────────────────────────────
function buildForestScene() {
  // Light rays
  const raysEl = document.getElementById("forestRays");
  if (raysEl) {
    for (let i = 0; i < 12; i++) {
      const r = document.createElement("div");
      r.className = "forest-ray";
      r.style.cssText = `
        left:${rand(5,95)}%;
        height:${rand(200,500)}px;
        width:${rand(2,5)}px;
        animation-duration:${rand(2,5)}s;
        animation-delay:${rand(0,3)}s;
        opacity:${rand(0.1,0.4)};
      `;
      raysEl.appendChild(r);
    }
  }

  // Fireflies
  const ffEl = document.getElementById("forestFireflies");
  if (ffEl) {
    for (let i = 0; i < 25; i++) {
      const f = document.createElement("div");
      f.className = "forest-firefly";
      f.style.cssText = `
        left:${rand(5,95)}%;
        top:${rand(20,80)}%;
        animation-duration:${rand(3,8)}s;
        animation-delay:${rand(0,7)}s;
      `;
      ffEl.appendChild(f);
    }
  }

  // Falling leaves
  const lvEl = document.getElementById("forestLeaves");
  if (lvEl) {
    for (let i = 0; i < 20; i++) {
      const l = document.createElement("div");
      l.className = "forest-leaf";
      l.style.cssText = `
        left:${rand(0,100)}%;
        top:${rand(-10,0)}%;
        animation-duration:${rand(6,14)}s;
        animation-delay:${rand(0,10)}s;
        width:${rand(6,12)}px;
        height:${rand(6,12)}px;
        background:hsl(${randInt(90,140)},60%,${randInt(25,45)}%);
      `;
      lvEl.appendChild(l);
    }
  }
}

// ── Desert ────────────────────────────────────────────────────
function buildDesertScene() {
  const heatEl = document.getElementById("desertHeat");
  if (heatEl) {
    for (let i = 0; i < 8; i++) {
      const h = document.createElement("div");
      h.className = "heat-wave";
      h.style.cssText = `
        bottom:${rand(10,50)}%;
        animation-duration:${rand(2,5)}s;
        animation-delay:${rand(0,4)}s;
      `;
      heatEl.appendChild(h);
    }
  }

  const sandEl = document.getElementById("desertSand");
  if (sandEl) {
    for (let i = 0; i < 60; i++) {
      const s = document.createElement("div");
      s.className = "sand-particle";
      s.style.cssText = `
        left:${rand(0,80)}%;
        top:${rand(40,90)}%;
        animation-duration:${rand(1.5,4)}s;
        animation-delay:${rand(0,3)}s;
        opacity:${rand(0.3,0.8)};
      `;
      sandEl.appendChild(s);
    }
  }
}

// ── Ocean ─────────────────────────────────────────────────────
function buildOceanScene() {
  const lightEl = document.getElementById("oceanLightning");
  if (lightEl) {
    for (let i = 0; i < 5; i++) {
      const l = document.createElement("div");
      l.className = "lightning";
      l.style.cssText = `
        left:${rand(10,90)}%;
        height:${rand(150,350)}px;
        animation-duration:${rand(4,10)}s;
        animation-delay:${rand(0,8)}s;
        transform-origin:top center;
      `;
      lightEl.appendChild(l);
    }
  }

  const rainEl = document.getElementById("oceanRain");
  if (rainEl) {
    for (let i = 0; i < 120; i++) {
      const r = document.createElement("div");
      r.className = "rain-drop";
      r.style.cssText = `
        left:${rand(0,100)}%;
        animation-duration:${rand(0.6,1.2)}s;
        animation-delay:${rand(0,1)}s;
        height:${rand(10,20)}px;
        opacity:${rand(0.3,0.7)};
      `;
      rainEl.appendChild(r);
    }
  }
}

// ── Space ─────────────────────────────────────────────────────
function buildSpaceScene() {
  const starsEl = document.getElementById("spaceStars");
  if (starsEl) {
    for (let i = 0; i < 200; i++) {
      const s = document.createElement("div");
      s.className = "star";
      const size = rand(0.5, 2.5);
      s.style.cssText = `
        width:${size}px; height:${size}px;
        top:${rand(0,100)}%;
        left:${rand(0,100)}%;
        animation-duration:${rand(2,6)}s;
        animation-delay:${rand(0,5)}s;
        background:#fff;
      `;
      starsEl.appendChild(s);
    }
  }

  const ssEl = document.getElementById("shootingStars");
  if (ssEl) {
    for (let i = 0; i < 8; i++) {
      const ss = document.createElement("div");
      ss.className = "shooting-star";
      ss.style.cssText = `
        top:${rand(5,50)}%;
        left:${rand(0,60)}%;
        width:${rand(60,180)}px;
        animation-duration:${rand(4,10)}s;
        animation-delay:${rand(0,9)}s;
        transform:rotate(${rand(20,40)}deg);
      `;
      ssEl.appendChild(ss);
    }
  }
}

// ── Volcano ───────────────────────────────────────────────────
function buildVolcanoScene() {
  const embersEl = document.getElementById("volcanoEmbers");
  if (embersEl) {
    for (let i = 0; i < 40; i++) {
      const e = document.createElement("div");
      e.className = "ember";
      const size = rand(3, 10);
      const drift = (rand(-60, 60)) + "px";
      e.style.cssText = `
        width:${size}px; height:${size}px;
        left:${rand(35,65)}%;
        bottom:${rand(20,45)}%;
        animation-duration:${rand(1.5,4)}s;
        animation-delay:${rand(0,3)}s;
        --drift:${drift};
      `;
      embersEl.appendChild(e);
    }
  }

  const ashEl = document.getElementById("volcanoAsh");
  if (ashEl) {
    for (let i = 0; i < 50; i++) {
      const a = document.createElement("div");
      a.className = "ash-particle";
      const drift = (rand(-80, 80)) + "px";
      a.style.cssText = `
        left:${rand(20,80)}%;
        top:${rand(-5,10)}%;
        animation-duration:${rand(4,9)}s;
        animation-delay:${rand(0,8)}s;
        --drift:${drift};
        width:${rand(2,5)}px;
        height:${rand(2,5)}px;
      `;
      ashEl.appendChild(a);
    }
  }

  const cracksEl = document.getElementById("lavaCracks");
  if (cracksEl) {
    for (let i = 0; i < 8; i++) {
      const c = document.createElement("div");
      c.className = "lava-crack";
      c.style.cssText = `
        left:${rand(10,90)}%;
        height:${rand(40,120)}px;
        animation-duration:${rand(1,2.5)}s;
        animation-delay:${rand(0,2)}s;
      `;
      cracksEl.appendChild(c);
    }
  }
}
