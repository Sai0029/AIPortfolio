/* ═══════════════════════════════════════════════════════════════════════════════
   NEXUS ENGINE (RESTORED & HARDENED)
   Reliable Click Handlers • Working Selection • Clean Orbital Revolution
   ═══════════════════════════════════════════════════════════════════════════════ */

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

// State Hydration
let state = { explored: [], missions: [], learned: [], solved: 0 };
try {
  state = JSON.parse(
    localStorage.engineeringState || '{"explored":[],"missions":[],"learned":[],"solved":0}'
  );
} catch (e) {
  console.warn("Resetting state fallback", e);
}

// Runtime CSS Overrides (hero fixes)
(function () {
  try {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "hero-fix.css";
    document.head.appendChild(l);
  } catch (e) {
    console.warn("hero-fix load failed", e);
  }
})();

// Domain Registry (Ensuring all domains including Kubernetes are present)
window.DATA = window.DATA || {};
window.DATA.domains = window.DATA.domains || {};
if (!window.DATA.domains.kubernetes) {
  window.DATA.domains.kubernetes = {
    name: "Kubernetes & Cloud Native",
    tag: "CONTAINER ORCHESTRATION",
    count: 8,
    icon: "☸",
    color: "#326ce5",
    accent: "#68a1ff",
    description:
      "Production Kubernetes platforms: cluster ingress routing, service mesh topologies, zero-trust pod security policies, autoscaling node pools, and immutable GitOps delivery.",
    tech: ["AKS", "K8s Core", "Helm", "Istio", "Calico", "KEDA", "Containerd", "Cert-Manager"]
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLEAN CSS: CLICKABLE BUTTONS, IDENTICAL BALL SIZING & REAL HOVER GLOW
// ═══════════════════════════════════════════════════════════════════════════════
(function injectOrbitStyles() {
  const css = document.createElement("style");
  css.id = "nx-restored-orbit-styles";
  css.textContent = `
    /* Prevent SVGs or overlays from blocking pointer events */
    #galaxy svg, #galaxy .galaxy-svg-bg, #galaxy .nx3d-orbit-svg {
      pointer-events: none !important;
    }

    /* Galaxy Stage Viewport */
    #galaxy {
      position: relative !important;
      width: 100% !important;
      max-width: 900px !important;
      min-height: 480px !important;
      margin: 1.5rem auto !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    /* Revolving Orbital Ring */
    .galaxy-spiral-track {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none; /* Children explicitly enable pointer-events */
      animation: nxOrbitRevolution 40s linear infinite;
    }
    #galaxy:hover .galaxy-spiral-track {
      animation-play-state: paused;
    }
    @keyframes nxOrbitRevolution {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    /* Center Identity Circle (Sai Krishna) */
    .node.core, .node[data-domain="core"] {
      position: absolute !important;
      left: 50% !important;
      top: 50% !important;
      transform: translate(-50%, -50%) !important;
      width: 100px !important;
      height: 100px !important;
      border-radius: 50% !important;
      z-index: 20 !important;
      cursor: pointer !important;
      pointer-events: auto !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease !important;
    }
    .node.core:hover, .node[data-domain="core"]:hover {
      transform: translate(-50%, -50%) scale(1.1) !important;
      box-shadow: 0 0 45px #6eeaff, 0 0 75px rgba(110,234,255,0.5) !important;
      border-color: #ffffff !important;
    }

    /* Outer Planetary Nodes: STRICT SAME SIZE & 100% CLICKABLE */
    .node[data-domain]:not(.core) {
      position: absolute !important;
      width: 66px !important;
      height: 66px !important;
      border-radius: 50% !important;
      box-sizing: border-box !important;
      padding: 0 !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      pointer-events: auto !important; /* Critical for clicks */
      user-select: none !important;
      z-index: 25 !important;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.08) !important;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease !important;
    }

    /* Counter-spin so ball labels stay upright */
    .galaxy-spiral-track .node[data-domain]:not(.core) {
      animation: nxCounterSpin 40s linear infinite;
    }
    #galaxy:hover .galaxy-spiral-track .node[data-domain]:not(.core) {
      animation-play-state: paused;
    }
    @keyframes nxCounterSpin {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(-360deg); }
    }

    /* Glowing Hover & Selected States */
    .node[data-domain]:not(.core):hover,
    .node[data-domain]:not(.core).active {
      transform: translate(-50%, -50%) scale(1.22) !important;
      border-color: #ffffff !important;
      box-shadow: 0 0 35px #6eeaff, 0 0 60px rgba(110, 234, 255, 0.6), inset 0 0 14px #6eeaff !important;
      z-index: 50 !important;
    }

    /* Target Stack HUD Container in #domain-view */
    .stack-target-hud {
      margin-bottom: 1.2rem;
    }
    .stack-target-eyebrow {
      font: 600 10px ui-monospace, monospace;
      letter-spacing: 0.28em;
      color: #6eeaff;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .stack-target-title {
      font-size: clamp(26px, 4vw, 42px);
      font-weight: 850;
      line-height: 1.1;
      letter-spacing: -0.03em;
      margin: 0 0 8px;
    }
    .stack-target-desc {
      font-size: 13.5px;
      line-height: 1.6;
      opacity: 0.88;
      max-width: 620px;
      margin: 0 0 8px;
    }
    .stack-target-prompt {
      font: 600 10px ui-monospace, monospace;
      letter-spacing: 0.24em;
      color: #6eeaff;
      text-transform: uppercase;
    }
  `;
  document.head.appendChild(css);
})();

// ═══════════════════════════════════════════════════════════════════════════════
// PART 1: CINEMATIC 3D HYPERSPACE INTRO SEQUENCE (EXACT & INTACT)
// ═══════════════════════════════════════════════════════════════════════════════
(function NexusCinematic() {
  "use strict";

  const REDUCED = !!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (REDUCED || sessionStorage.getItem("introPlayed") === "true") {
    return;
  }

  const DURATION = 5900;

  const css = document.createElement("style");
  css.id = "nx-engine-styles";
  css.textContent = `
    #nx7-overlay {
      position: fixed; inset: 0; z-index: 999999; overflow: hidden;
      background: #01040a; color: #e8fcff;
      font-family: Inter, ui-monospace, SFMono-Regular, monospace;
      perspective: 1100px;
      transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #nx7-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
    .nx7-hud {
      position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(circle at 50% 50%, transparent 25%, rgba(1,4,10,0.55) 70%, #01040a 100%);
    }
    .nx7-grid {
      position: absolute; inset: 0; opacity: .12;
      transform: perspective(650px) rotateX(68deg) translateY(38%) scale(2);
      transform-origin: center bottom;
      background-image: linear-gradient(#66eaff20 1px, transparent 1px), linear-gradient(90deg, #66eaff20 1px, transparent 1px);
      background-size: 50px 50px; mask-image: linear-gradient(to top, #000, transparent 80%);
    }
    .nx7-top-bar {
      position: absolute; top: 22px; left: 26px; right: 26px;
      display: flex; justify-content: space-between; align-items: center;
      font: 600 10px ui-monospace, monospace; letter-spacing: 0.22em; opacity: 0.8;
    }
    .nx7-skip {
      pointer-events: auto; cursor: pointer; background: rgba(109,234,255,0.08);
      border: 1px solid rgba(109,234,255,0.3); color: #6eeaff;
      padding: 5px 12px; border-radius: 4px; font: 600 9px ui-monospace, monospace;
      letter-spacing: 0.15em; transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .nx7-skip:hover {
      background: rgba(109,234,255,0.25); border-color: #6eeaff; transform: translateY(-1px);
    }
    .nx7-laser {
      position: absolute; top: 50%; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, #6eeaff, #6bffca, transparent);
      box-shadow: 0 0 24px #6eeaff, 0 0 48px #6bffca;
      transform: scaleX(0); opacity: 0;
      transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
    }
    .nx7-laser.active { transform: scaleX(1); opacity: 0.95; }
    
    .nx7-center-stage {
      position: absolute; left: 50%; top: 49%; width: 100%; max-width: 1200px;
      transform: translate(-50%, -50%); text-align: center; pointer-events: none;
      transform-style: preserve-3d;
    }
    .nx7-kicker {
      font: 600 10px ui-monospace, monospace; letter-spacing: 0.45em; color: #6eeaff; margin-bottom: 12px;
      opacity: 0; transform: translateZ(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .nx7-title {
      font-size: clamp(48px, 9.6vw, 134px); font-weight: 900; line-height: 0.88;
      letter-spacing: -0.05em; margin: 0 auto; perspective: 900px;
      display: flex; justify-content: center; flex-wrap: wrap; gap: 0.3em;
    }
    .nx7-word { display: inline-flex; transform-style: preserve-3d; }
    .nx7-char {
      display: inline-block; transform-style: preserve-3d;
      background: linear-gradient(135deg, #ffffff 15%, #7debff 55%, #6bffca 95%);
      -webkit-background-clip: text; background-clip: text; color: transparent;
      opacity: 0;
      transform: translate3d(0, 50px, -240px) rotateX(75deg) rotateY(25deg) scale(0.5);
      filter: blur(14px);
      transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                  opacity 0.75s ease,
                  filter 0.75s ease;
      will-change: transform, opacity, filter;
    }
    .nx7-char.revealed {
      opacity: 1; filter: blur(0px);
      transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale(1);
    }
    .nx7-sub {
      font: 600 10.5px ui-monospace, monospace; letter-spacing: 0.3em; color: #9fe9ff; margin-top: 16px;
      opacity: 0; transform: translateZ(25px);
      transition: opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s;
    }
    .nx7-fabric {
      position: absolute; z-index: 12; left: 50%; bottom: 62px; transform: translateX(-50%);
      display: flex; align-items: center; gap: 9px; padding: 6px 15px; border: 1px solid rgba(109, 234, 255, 0.22);
      border-radius: 999px; background: rgba(3, 16, 24, 0.7); backdrop-filter: blur(8px);
      font: 600 8.5px ui-monospace, monospace; letter-spacing: 0.18em; opacity: 0;
      transition: opacity 0.5s ease 0.3s;
    }
    .nx7-fabric i { width: 5px; height: 5px; border-radius: 50%; background: #bd7eff; box-shadow: 0 0 10px #bd7eff; }
    .nx7-bottom {
      position: absolute; bottom: 24px; left: 26px; right: 26px;
      display: flex; justify-content: space-between; align-items: flex-end;
      font: 9px/1.8 ui-monospace, monospace; letter-spacing: 0.12em; opacity: 0.75;
    }
    .nx7-progress-bar {
      position: absolute; bottom: 12px; left: 26px; right: 26px; height: 2px;
      background: rgba(110,234,255,0.12); overflow: hidden;
    }
    .nx7-progress-fill {
      width: 0%; height: 100%; background: #6eeaff; box-shadow: 0 0 12px #6eeaff;
    }
    .nx7-corner { position: absolute; width: 34px; height: 34px; z-index: 12; opacity: .35; }
    .nx7-c1 { left: 22px; top: 58px; border-left: 1px solid #65eaff; border-top: 1px solid #65eaff; }
    .nx7-c2 { right: 22px; top: 58px; border-right: 1px solid #65eaff; border-top: 1px solid #65eaff; }
    .nx7-c3 { left: 22px; bottom: 46px; border-left: 1px solid #65eaff; border-bottom: 1px solid #65eaff; }
    .nx7-c4 { right: 22px; bottom: 46px; border-right: 1px solid #65eaff; border-bottom: 1px solid #65eaff; }
    @media (max-width: 768px) {
      .nx7-top-bar { left: 14px; right: 14px; }
      .nx7-bottom { display: none; }
      .nx7-fabric { bottom: 35px; }
    }
  `;
  document.head.appendChild(css);

  const overlay = document.createElement("div");
  overlay.id = "nx7-overlay";
  overlay.innerHTML = `
    <canvas id="nx7-canvas"></canvas>
    <div class="nx7-hud">
      <div class="nx7-grid"></div>
      <div class="nx7-top-bar">
        <span>NEXUS // PLATFORM ENGINE</span>
        <button class="nx7-skip" id="nx7-skip-btn">ESC ✕ SKIP</button>
      </div>
      <div class="nx7-corner nx7-c1"></div><div class="nx7-corner nx7-c2"></div>
      <div class="nx7-corner nx7-c3"></div><div class="nx7-corner nx7-c4"></div>
      <div class="nx7-laser" id="nx7-laser"></div>
      <div class="nx7-center-stage">
        <div class="nx7-kicker" id="nx7-kicker">AZURE · DEVOPS · KUBERNETES · FABRIC DATA · AI</div>
        <div class="nx7-title">
          <span class="nx7-word" id="nx7-word-1">SAI</span>
          <span class="nx7-word" id="nx7-word-2">KRISHNA</span>
        </div>
        <div class="nx7-sub" id="nx7-sub">CLOUD ENGINEER · PRODUCTION SYSTEMS · AUTOMATION</div>
      </div>
      <div class="nx7-fabric" id="nx7-fabric"><i></i>MICROSOFT FABRIC DATA PLANE <b style="color:#bd7eff;margin-left:5px;">SYNCHRONIZED</b></div>
      <div class="nx7-bottom">
        <div>CONTROL PLANE: <b id="nx7-core-txt" style="color:#6eeaff;">000%</b></div>
        <div>DATA LINK: <b style="color:#6bffca;">SYNCHRONIZED</b></div>
      </div>
      <div class="nx7-progress-bar">
        <div class="nx7-progress-fill" id="nx7-fill"></div>
      </div>
    </div>
  `;
  document.body.prepend(overlay);

  ["nx7-word-1", "nx7-word-2"].forEach((id) => {
    const wordEl = overlay.querySelector(`#${id}`);
    if (wordEl) {
      const letters = wordEl.textContent.trim().split("");
      wordEl.innerHTML = letters.map((c) => `<span class="nx7-char">${c}</span>`).join("");
    }
  });

  const canvas = overlay.querySelector("#nx7-canvas");
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    if (overlay.parentNode) {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
  });

  const NUM_STARS = 950;
  const stars = [];
  const cx = () => width / 2;
  const cy = () => height / 2;

  for (let i = 0; i < NUM_STARS; i++) {
    stars.push({
      x: (Math.random() - 0.5) * 2400,
      y: (Math.random() - 0.5) * 2400,
      z: Math.random() * 1000 + 1,
      pz: 1000,
      color: i % 3 === 0 ? "#6eeaff" : i % 3 === 1 ? "#6dffd1" : "#d8f8ff",
      speedMult: 0.6 + Math.random() * 0.9
    });
  }

  let startTime = performance.now();
  let finished = false;
  let raf = 0;

  const exitToHome = () => {
    if (finished) return;
    finished = true;
    sessionStorage.setItem("introPlayed", "true");
    cancelAnimationFrame(raf);

    overlay.style.opacity = "0";
    overlay.style.transform = "scale(1.05)";

    setTimeout(() => {
      overlay.remove();
      css.remove();
    }, 700);
  };

  overlay.querySelector("#nx7-skip-btn").onclick = exitToHome;
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") exitToHome();
  });

  setTimeout(() => {
    const kicker = overlay.querySelector("#nx7-kicker");
    const laser = overlay.querySelector("#nx7-laser");
    if (kicker) {
      kicker.style.opacity = "0.9";
      kicker.style.transform = "translateZ(0)";
    }
    if (laser) laser.classList.add("active");
  }, 200);

  const chars = overlay.querySelectorAll(".nx7-char");
  chars.forEach((char, idx) => {
    setTimeout(() => {
      char.classList.add("revealed");
    }, 400 + idx * 40);
  });

  setTimeout(() => {
    const sub = overlay.querySelector("#nx7-sub");
    const fabric = overlay.querySelector("#nx7-fabric");
    if (sub) {
      sub.style.opacity = "0.85";
      sub.style.transform = "translateZ(0)";
    }
    if (fabric) fabric.style.opacity = "1";
  }, 1050);

  setTimeout(exitToHome, DURATION);

  function render(now) {
    if (finished) return;
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / (DURATION - 600));
    const speed = 7 + Math.pow(progress, 3.2) * 58;

    ctx.fillStyle = "rgba(1, 4, 10, 0.32)";
    ctx.fillRect(0, 0, width, height);

    const fov = 340;
    const centerX = cx();
    const centerY = cy();

    for (let i = 0; i < NUM_STARS; i++) {
      const s = stars[i];
      s.pz = s.z;
      s.z -= speed * s.speedMult;

      if (s.z <= 1) {
        s.z = 1000;
        s.pz = 1000;
        s.x = (Math.random() - 0.5) * 2400;
        s.y = (Math.random() - 0.5) * 2400;
      }

      const k = fov / s.z;
      const px = s.x * k + centerX;
      const py = s.y * k + centerY;

      const pk = fov / s.pz;
      const prevX = s.x * pk + centerX;
      const prevY = s.y * pk + centerY;

      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(px, py);
      ctx.strokeStyle = s.color;
      ctx.lineWidth = Math.min(3.6, (1 - s.z / 1000) * 3);
      ctx.stroke();
    }

    const fillEl = overlay.querySelector("#nx7-fill");
    const coreTxt = overlay.querySelector("#nx7-core-txt");
    if (fillEl) fillEl.style.width = `${Math.round(progress * 100)}%`;
    if (coreTxt) coreTxt.textContent = `${String(Math.round(progress * 100)).padStart(3, "0")}%`;

    raf = requestAnimationFrame(render);
  }

  raf = requestAnimationFrame(render);
})();

// ═══════════════════════════════════════════════════════════════════════════════
// PART 2: COMPLETE HOME PAGE APPLICATION & INTERACTION LOGIC
// ═══════════════════════════════════════════════════════════════════════════════
const save = () => {
  localStorage.engineeringState = JSON.stringify(state);
  renderLevel();
};

function renderLevel() {
  const el = $("#level");
  if (!el) return;
  const n =
    (state.explored?.length || 0) +
    (state.missions?.length || 0) +
    (state.learned?.length || 0) +
    (state.solved || 0);
  el.innerHTML = `ENGINEERING LEVEL <b>${String(Math.min(12, 1 + Math.floor(n / 2))).padStart(2, "0")}</b><br>CLOUD ENGINEER · ${n} SYSTEMS EXPLORED`;
}

function openDrawer(title, body) {
  const panel = $("#panel");
  const overlay = $("#overlay");
  if (!panel || !overlay) return;
  panel.innerHTML = `<button class="close" aria-label="close">×</button><p class="eyebrow">SYSTEM INTELLIGENCE</p><h2>${title}</h2>${body}`;
  overlay.classList.add("show");
  panel.classList.add("show");
  const closeBtn = panel.querySelector(".close");
  if (closeBtn) closeBtn.onclick = closeDrawer;
}

function closeDrawer() {
  $("#overlay")?.classList.remove("show");
  $("#panel")?.classList.remove("show");
}

function techDetail(t, domain) {
  const d = DATA.domains[domain];
  openDrawer(
    t,
    `<section><b>TECHNOLOGY · ${d.name.toUpperCase()}</b><p><strong>What is it?</strong><br>${t} is part of the ${d.name} system and is used as a purposeful layer in a connected engineering platform.</p></section>
     <section><b>WHERE IT FITS</b><p>${d.description}</p></section>
     <section><b>PRODUCTION APPROACH</b><p>Start with health, configuration, access and dependency signals. Make the smallest reversible change, validate end-to-end behaviour, then document the learning.</p></section>
     <section><b>INTERVIEW EXPLANATION</b><p>I explain ${t} through the problem it solves, its position in the architecture and the operational signals I would use to validate it.</p></section>`
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// IN-PLACE TARGET DISPLAY (UNDER 01 / ENGINEERING GALAXY)
// ═══════════════════════════════════════════════════════════════════════════════
function showDomain(key, node) {
  if (key === "core") return;
  const d = DATA.domains[key];
  if (!d) return;

  // Sync active classes on all orbital balls
  $$(".node").forEach((x) => x.classList.toggle("active", x === node || x.dataset.domain === key));

  if (!state.explored.includes(key)) state.explored.push(key);
  save();

  // Populate data cleanly in #domain-view
  const dView = $("#domain-view");
  if (dView) {
    dView.innerHTML = `
      <div class="stack-target-hud">
        <div class="stack-target-eyebrow">01 / ENGINEERING GALAXY</div>
        <h2 class="stack-target-title">Explore the<br>connected stack.</h2>
        <p class="stack-target-desc">Infrastructure, delivery, data and AI form one engineering system. Select a planet or use the command center.</p>
        <div class="stack-target-prompt">⊹ Choose a system to enter its technical orbit.</div>
      </div>
      <div class="domain-head" style="margin-top:14px; display:flex; align-items:center; gap:14px;">
        <span class="domain-icon" style="font-size:28px; color:${d.accent};">${d.icon || "⚙"}</span>
        <div>
          <p style="font:600 9px ui-monospace,monospace; letter-spacing:.22em; color:${d.accent}; margin:0;">${d.tag} · ${d.count} TECHNOLOGIES</p>
          <h3 style="margin:2px 0 0; font-size:20px; font-weight:800;">${d.name}</h3>
        </div>
      </div>
      <div class="domain-body" style="margin-top:12px;">
        <p style="font-size:13.5px; line-height:1.6; margin:0 0 12px; opacity:.9;">${d.description}</p>
        <div class="tech-orbit" style="display:flex; flex-wrap:wrap; gap:8px;">
          ${d.tech.map((t) => `<button class="tech" data-tech="${t}" data-domain="${key}" style="cursor:pointer; pointer-events:auto;">${t}</button>`).join("")}
        </div>
      </div>
    `;

    $$(".tech").forEach((t) => (t.onclick = () => techDetail(t.dataset.tech, t.dataset.domain)));
  }

  $("#universe")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

// ═══════════════════════════════════════════════════════════════════════════════
// SETUP REVOLVING GALAXY WITH WORKING CLICKABLE BALLS & KUBERNETES
// ═══════════════════════════════════════════════════════════════════════════════
function setupGalaxyOrbit() {
  const galaxy = $("#galaxy");
  if (!galaxy) return;

  const RADIUS_X = 185;
  const RADIUS_Y = 185;

  const planets = [
    { key: "azure", label: "Azure", icon: "☁" },
    { key: "kubernetes", label: "K8s", icon: "☸" },
    { key: "devops", label: "DevOps", icon: "⚡" },
    { key: "data", label: "Fabric", icon: "◈" },
    { key: "ai", label: "AI", icon: "✧" }
  ];

  // Re-parent the outer nodes into a revolving layer without destroying DOM
  let track = galaxy.querySelector(".galaxy-spiral-track");
  if (!track) {
    track = document.createElement("div");
    track.className = "galaxy-spiral-track";
    galaxy.appendChild(track);
  } else {
    track.innerHTML = "";
  }

  const step = (2 * Math.PI) / planets.length;

  planets.forEach((p, idx) => {
    const angle = idx * step;
    const x = Math.cos(angle) * RADIUS_X;
    const y = Math.sin(angle) * RADIUS_Y;

    // Check if node already exists in DOM; if not, create it
    let ball = galaxy.querySelector(`.node[data-domain="${p.key}"]`);
    if (!ball) {
      ball = document.createElement("button");
      ball.className = `node ${p.key}`;
      ball.dataset.domain = p.key;
      ball.innerHTML = `<span>${p.icon}</span><small>${p.label}</small>`;
    }

    // Direct mathematical placement for revolving motion
    ball.style.position = "absolute";
    ball.style.left = `calc(50% + ${x}px)`;
    ball.style.top = `calc(50% + ${y}px)`;
    ball.style.pointerEvents = "auto"; // Guarantees clicking works

    // Direct click handler
    ball.onclick = (e) => {
      e.stopPropagation();
      showDomain(p.key, ball);
    };

    track.appendChild(ball);
  });

  // Ensure center circle is properly layered & clickable
  const coreNode = galaxy.querySelector('.node.core, .node[data-domain="core"]');
  if (coreNode) {
    coreNode.style.pointerEvents = "auto";
  }

  // Pre-select Kubernetes on initial load
  const k8sBall = galaxy.querySelector('.node[data-domain="kubernetes"]');
  showDomain("kubernetes", k8sBall);
}

// ═══════════════════════════════════════════════════════════════════════════════
// DOM READY HYDRATION & EVENT DELEGATION
// ═══════════════════════════════════════════════════════════════════════════════
document.addEventListener("DOMContentLoaded", () => {
  renderLevel();
  setupGalaxyOrbit();

  if ($("#overlay")) $("#overlay").onclick = closeDrawer;

  // 2. Production Missions Grid
  if (typeof DATA !== "undefined" && DATA.missions && $("#mission-grid")) {
    const grid = $("#mission-grid");
    DATA.missions.forEach((m, i) =>
      grid.insertAdjacentHTML(
        "beforeend",
        `<button class="mission" data-mission="${i}">
           <span class="mission-no">MISSION ${String(i + 1).padStart(2, "0")}</span>
           <p class="tag">${m[1]}</p>
           <h3>${m[0]}</h3>
           <div class="mini-flow">${m[2].split(" → ").map((x) => `<span>${x}</span>`).join("")}</div>
         </button>`
      )
    );

    $$(".mission").forEach((b) => (b.onclick = () => missionDetail(+b.dataset.mission)));

    function missionDetail(i) {
      const m = DATA.missions[i];
      if (!state.missions.includes(i)) state.missions.push(i);
      save();
      openDrawer(
        m[0],
        `<section><b>${m[1]}</b><p>${m[4]}</p></section>
         <section><b>END-TO-END FLOW</b><p class="answer-flow">${m[2]}</p></section>
         <section><b>TECHNOLOGY STACK</b><p>${m[3]}</p></section>
         <section><b>VALIDATION & TROUBLESHOOTING</b><p>Validate each boundary: access, network path, service health, configuration, observable telemetry and rollback path. Reference implementation.</p></section>`
      );
    }
  }

  // 3. Concepts Learn Navigation
  if (typeof DATA !== "undefined" && DATA.learn && $("#learn-nav") && $("#learn-view")) {
    const ln = $("#learn-nav");
    Object.keys(DATA.learn).forEach((n, i) =>
      ln.insertAdjacentHTML("beforeend", `<button data-learn="${n}" class="${i ? "" : "active"}">${n}</button>`)
    );

    $$("[data-learn]").forEach((b) => (b.onclick = () => showLearn(b.dataset.learn, b)));

    function showLearn(n, b) {
      const d = DATA.learn[n];
      if (!d) return;
      $$("[data-learn]").forEach((x) => x.classList.toggle("active", x === b));
      if (!state.learned.includes(n)) state.learned.push(n);
      save();

      $("#learn-view").innerHTML = `
        <div class="learn-card">
          <p class="label">${d.cat}</p>
          <h3>${n}</h3>
          <p class="copy">${d.concept}</p>
          <div class="diagram">${d.visual}</div>
          <div class="learn-actions">
            <button data-info="architecture">View architecture</button>
            <button data-info="failure">Trigger failure path</button>
            <button data-info="answer">Interview answer</button>
          </div>
          <p class="result" id="learn-result">Select an action to inspect this module.</p>
        </div>`;

      $$("[data-info]").forEach(
        (x) =>
          (x.onclick = () => {
            const resEl = $("#learn-result");
            if (!resEl) return;
            resEl.textContent =
              x.dataset.info === "failure"
                ? d.failure
                : x.dataset.info === "answer"
                ? d.answer
                : "The flow above represents the integration boundary. Check identity, network, configuration and telemetry at every hop.";
          })
      );
    }

    const firstKey = Object.keys(DATA.learn)[0];
    if (firstKey) showLearn(firstKey, $('[data-learn]'));
  }

  // 4. Incident Simulator
  if (typeof DATA !== "undefined" && DATA.incident && $("#incident")) {
    let choices = Object.keys(DATA.incident.steps).slice(0, 3);
    let result = "";

    function incident() {
      const s = DATA.incident;
      $("#incident").innerHTML = `
        <h3>INCIDENT DETECTED / HTTP 503</h3>
        <p>${result || s.context}</p>
        <div class="options">${choices.map((c) => `<button data-action="${c}">${c}</button>`).join("")}</div>`;

      $$("[data-action]").forEach((b) => {
        b.onclick = () => {
          const x = s.steps[b.dataset.action];
          result = x.good ? "✓ " + x.msg : "○ " + x.msg;
          choices = x.next;
          if (b.dataset.action === "Resolve incident") state.solved++;
          save();
          incident();
        };
      });
    }

    incident();

    if ($("#reset-sim")) {
      $("#reset-sim").onclick = () => {
        choices = Object.keys(DATA.incident.steps).slice(0, 3);
        result = "";
        incident();
      };
    }
  }

  // 5. Interview Flashcards
  if (typeof DATA !== "undefined" && DATA.interview && $("#interview-view")) {
    let qi = 0;
    function interview() {
      const q = DATA.interview[qi];
      if (!q) return;
      $("#interview-view").innerHTML = `
        <p class="label">${q[1]}</p>
        <h3>${q[0]}</h3>
        <p>${q[2]}</p>
        <div class="answer-flow">${q[3]}</div>`;
    }
    interview();

    if ($("#next-answer")) {
      $("#next-answer").onclick = () => {
        qi = (qi + 1) % DATA.interview.length;
        interview();
      };
    }
  }

  // 6. Journey Path Steps
  if ($("#journey") && $("#journey").children.length === 0) {
    [
      "Foundation",
      "Cloud",
      "DevOps",
      "Kubernetes",
      "Production Engineering",
      "Data",
      "Microsoft Fabric",
      "AI"
    ].forEach((x, i) =>
      $("#journey").insertAdjacentHTML(
        "beforeend",
        `<div><span>${String(i + 1).padStart(2, "0")}</span><h3>${x}</h3></div>`
      )
    );
  }

  // 7. Command Palette
  const commands = [
    [
      "Play Intro",
      () => {
        sessionStorage.removeItem("introPlayed");
        location.reload();
      }
    ],
    ["Explore Kubernetes", () => showDomain("kubernetes", $('.node.kubernetes'))],
    ["Explore Azure", () => showDomain("azure", $('.node.azure'))],
    ["Explore DevOps", () => showDomain("devops", $('.node.devops'))],
    ["Explore Data & Fabric", () => showDomain("data", $('.node.data'))],
    ["Explore AI", () => showDomain("ai", $('.node.ai'))],
    ["Open Projects", () => $("#missions")?.scrollIntoView({ behavior: "smooth" })],
    ["Learn Concepts", () => $("#learn")?.scrollIntoView({ behavior: "smooth" })],
    ["Interview Mode", () => $("#interview")?.scrollIntoView({ behavior: "smooth" })],
    ["Incident Simulator", () => $("#simulator")?.scrollIntoView({ behavior: "smooth" })],
    ["Contact", () => $("#contact")?.scrollIntoView({ behavior: "smooth" })]
  ];

  function showCommand() {
    const c = $("#command");
    if (!c) return;
    c.classList.add("open");
    renderCommands("");
    const input = $("#command-input");
    if (input) {
      input.value = "";
      input.focus();
    }
  }

  function renderCommands(q) {
    const list = $("#command-list");
    if (!list) return;
    const filtered = commands.filter((x) => x[0].toLowerCase().includes(q.toLowerCase()));
    list.innerHTML = filtered.map((x, i) => `<button data-c="${i}">${x[0]} <span>↗</span></button>`).join("");
    $$("[data-c]").forEach((b) => {
      b.onclick = () => {
        $("#command")?.classList.remove("open");
        filtered[+b.dataset.c][1]();
      };
    });
  }

  $$("[data-command]").forEach((x) => (x.onclick = showCommand));
  if ($("#command-input")) $("#command-input").oninput = (e) => renderCommands(e.target.value);

  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      showCommand();
    }
    if (e.key === "Escape") {
      $("#command")?.classList.remove("open");
      closeDrawer();
    }
  });

  // 8. Theme Switcher
  if ($("#theme")) {
    $("#theme").onclick = () => {
      document.body.classList.toggle("light");
      localStorage.engineeringTheme = document.body.classList.contains("light") ? "light" : "dark";
    };
    if (localStorage.engineeringTheme === "light") document.body.classList.add("light");
  }

  // 9. Hero Variant Selector Dropdown
  (function initHeroVariantSelector() {
    const container = document.querySelector(".nav-actions");
    if (!container || container.querySelector("select[aria-label='Hero variant']")) return;
    const select = document.createElement("select");
    select.setAttribute("aria-label", "Hero variant");
    select.style.padding = "6px";
    select.style.font = "9px var(--mono, monospace)";
    select.style.marginLeft = "6px";
    select.innerHTML =
      '<option value="default">Variant A</option><option value="b">Variant B</option><option value="c">Variant C</option>';
    container.appendChild(select);

    function applyVariant(v) {
      document.body.classList.remove("hero-variant-a", "hero-variant-b", "hero-variant-c");
      if (v === "b") document.body.classList.add("hero-variant-b");
      else if (v === "c") document.body.classList.add("hero-variant-c");
      else document.body.classList.add("hero-variant-a");
      localStorage.heroVariant = v || "a";
    }

    const stored = localStorage.heroVariant || "a";
    select.value = stored === "a" ? "default" : stored;
    applyVariant(stored);

    select.addEventListener("change", () => {
      const v = select.value === "default" ? "a" : select.value;
      applyVariant(v);
    });
  })();

  // 10. Ambient Home Background Stars Canvas (#stars)
  const starCanvas = $("#stars");
  if (starCanvas) {
    const sCtx = starCanvas.getContext("2d");
    let pts = [];

    function resizeHomeStars() {
      starCanvas.width = window.innerWidth;
      starCanvas.height = window.innerHeight;
      pts = Array.from({ length: window.innerWidth < 700 ? 35 : 80 }, () => ({
        x: Math.random() * starCanvas.width,
        y: Math.random() * starCanvas.height,
        r: Math.random() * 1.2 + 0.2,
        s: Math.random() * 0.18 + 0.03
      }));
    }

    function drawHomeStars() {
      sCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
      sCtx.fillStyle = "#9bdfff";
      pts.forEach((p) => {
        p.y += p.s;
        if (p.y > starCanvas.height) p.y = 0;
        sCtx.globalAlpha = 0.25 + p.r / 4;
        sCtx.beginPath();
        sCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        sCtx.fill();
      });
      requestAnimationFrame(drawHomeStars);
    }

    window.addEventListener("resize", resizeHomeStars, { passive: true });
    resizeHomeStars();
    drawHomeStars();
  }

  // 11. Inline SVG Craft (#route-vehicle)
  const rv = document.getElementById("route-vehicle");
  if (rv) {
    rv.innerHTML = `
      <svg viewBox="0 0 48 24" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <path class="trail" d="M4 16 C12 12 22 10 34 12" fill="none" stroke="rgba(110,234,255,0.4)" stroke-width="1.5" stroke-dasharray="2 2" />
        <g class="craft" fill="#6eeaff">
          <path d="M4 12 C8 8 20 6 30 8 L34 12 L30 16 C20 18 8 16 4 12 Z" opacity=".9" />
          <circle class="engine" cx="32" cy="12" r="1.6" fill="#6dffd1" />
        </g>
      </svg>
    `;
  }
});