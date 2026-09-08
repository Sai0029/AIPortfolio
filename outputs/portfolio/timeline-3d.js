/* ═══════════════════════════════════════════════════════════════════════════════
   PRODUCTION TRAJECTORY — HOVER-ACTIVATED CYBER GLOW & DRONE INTERCEPTOR
   Zero Ambient Clutter • Extreme Specular Neon Aura On Card Hover • Target Lock
   ═══════════════════════════════════════════════════════════════════════════════ */

(function initTargetedHoverTrajectory3D() {
  "use strict";

  const timelineSec = document.getElementById("experience");
  const timelineStage = document.querySelector(".chrono-timeline");
  if (!timelineSec || !timelineStage) return;

  // 1. Inject Dynamic Hover-Only Aura & 3D Spatial Styles
  const style = document.createElement("style");
  style.id = "chrono-hover-glow-styles";
  style.textContent = `
    .chrono-timeline {
      position: relative !important;
      perspective: 1400px !important;
      transform-style: preserve-3d !important;
    }

    #chrono-gl-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .chrono-nodes {
      position: relative;
      z-index: 2;
      transform-style: preserve-3d;
    }

    .chrono-line {
      display: none !important; /* Procedural conduit handles this */
    }

    .chrono-card-wrap {
      perspective: 1000px;
      transform-style: preserve-3d;
    }

    /* Baseline Card: Clean & Dark without excessive ambient light */
    .chrono-card {
      position: relative;
      background: rgba(3, 16, 26, 0.88);
      border: 1px solid rgba(110, 234, 255, 0.15);
      border-radius: 14px;
      padding: 1.85rem;
      backdrop-filter: blur(14px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.7);
      transform-style: preserve-3d;
      transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
      overflow: hidden;
      will-change: transform, box-shadow;
    }

    /* Interactive Holographic Specular Beam: ACTIVE ONLY ON HOVER */
    .chrono-card::before {
      content: '';
      position: absolute;
      inset: -60%;
      background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                  rgba(110, 234, 255, 0.35) 0%, 
                  rgba(101, 255, 208, 0.18) 25%, 
                  rgba(110, 234, 255, 0.05) 45%,
                  transparent 70%);
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      transform: translateZ(1px);
    }

    /* SUPER GLOW ACTIVATION ONLY WHEN HOVERED */
    .chrono-card-wrap:hover .chrono-card {
      border-color: #6eeaff !important;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9),
                  0 0 45px rgba(110, 234, 255, 0.85),
                  0 0 85px rgba(101, 255, 208, 0.65),
                  inset 0 0 25px rgba(110, 234, 255, 0.25) !important;
    }

    .chrono-card-wrap:hover .chrono-card::before {
      opacity: 1;
    }

    .chrono-card > * {
      transform-style: preserve-3d;
      transform: translateZ(18px);
    }

    /* Milestone Anchor Dot */
    .chrono-dot {
      background: #031018;
      border: 2px solid rgba(110, 234, 255, 0.4);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease !important;
    }

    /* Dot Glows Intensively Only When its Card is Hovered */
    .chrono-item:hover .chrono-dot {
      transform: scale(1.35) translateZ(30px) !important;
      border-color: #65ffd0 !important;
      box-shadow: 0 0 35px #65ffd0, 0 0 65px #6eeaff !important;
    }
  `;
  document.head.appendChild(style);

  // 2. Setup WebGL/Canvas Pipeline
  let canvas = document.getElementById("chrono-gl-canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "chrono-gl-canvas";
    timelineStage.insertBefore(canvas, timelineStage.firstChild);
  }
  const ctx = canvas.getContext("2d");

  let width = 0;
  let height = 0;
  const nodes = [];
  const cardBounds = [];

  // Flying Robotic Interceptor Drones
  const DRONE_COUNT = 4;
  const drones = [];

  // Active Hovered Card State
  let activeHoverCard = null;

  function syncLayout() {
    const stageRect = timelineStage.getBoundingClientRect();
    width = canvas.width = stageRect.width;
    height = canvas.height = stageRect.height;

    nodes.length = 0;
    const dotElements = timelineStage.querySelectorAll(".chrono-dot");
    dotElements.forEach((el) => {
      const elRect = el.getBoundingClientRect();
      nodes.push({
        x: elRect.left - stageRect.left + elRect.width / 2,
        y: elRect.top - stageRect.top + elRect.height / 2
      });
    });

    cardBounds.length = 0;
    const wrapElements = timelineStage.querySelectorAll(".chrono-card-wrap");
    wrapElements.forEach((wrap, idx) => {
      const r = wrap.getBoundingClientRect();
      cardBounds.push({
        idx,
        x: r.left - stageRect.left,
        y: r.top - stageRect.top,
        w: r.width,
        h: r.height,
        cx: r.left - stageRect.left + r.width / 2,
        cy: r.top - stageRect.top + r.height / 2
      });
    });
  }

  // Initialize Autonomous Drones
  for (let i = 0; i < DRONE_COUNT; i++) {
    drones.push({
      x: 100 + Math.random() * 300,
      y: 150 + Math.random() * 500,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: 7 + Math.random() * 2,
      angle: 0,
      trail: [],
      idlePhase: Math.random() * Math.PI * 2,
      assignedCorner: i % 4
    });
  }

  // 3. Render Engine
  let lastTime = performance.now();

  function render(now) {
    const dt = Math.min(33, now - lastTime) / 1000;
    lastTime = now;

    ctx.clearRect(0, 0, width, height);

    if (nodes.length >= 2) {
      const startNode = nodes[0];
      const endNode = nodes[nodes.length - 1];

      // ─── A. Ambient Connecting Line (Clean, unbloated) ───
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(startNode.x, startNode.y);
      for (let i = 1; i < nodes.length; i++) {
        const prev = nodes[i - 1];
        const curr = nodes[i];
        const midY = (prev.y + curr.y) / 2;
        ctx.bezierCurveTo(prev.x, midY, curr.x, midY, curr.x, curr.y);
      }
      ctx.strokeStyle = "rgba(110, 234, 255, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // ─── B. Drones Behavior & Card Laser Targeting ───
      drones.forEach((d) => {
        let targetX = 0;
        let targetY = 0;

        // If card is hovered: Drones lock on and swarm around the hovered card's perimeter
        if (activeHoverCard !== null && cardBounds[activeHoverCard]) {
          const target = cardBounds[activeHoverCard];
          const corners = [
            { x: target.x - 20, y: target.y - 20 },
            { x: target.x + target.w + 20, y: target.y - 20 },
            { x: target.x + target.w + 20, y: target.y + target.h + 20 },
            { x: target.x - 20, y: target.y + target.h + 20 }
          ];
          const corner = corners[d.assignedCorner];
          targetX = corner.x + Math.sin(now * 0.003 + d.assignedCorner) * 12;
          targetY = corner.y + Math.cos(now * 0.003 + d.assignedCorner) * 12;

          // Strong tracking acceleration
          d.vx += (targetX - d.x) * 0.04;
          d.vy += (targetY - d.y) * 0.04;
        } else {
          // Idle state: Smooth, low-key vertical drift near central conduit
          d.idlePhase += dt * 0.8;
          targetX = width / 2 + Math.cos(d.idlePhase + d.assignedCorner) * 140;
          targetY = (height / 2) + Math.sin(d.idlePhase) * 220;

          d.vx += (targetX - d.x) * 0.008;
          d.vy += (targetY - d.y) * 0.008;
        }

        d.vx *= 0.92;
        d.vy *= 0.92;
        d.x += d.vx;
        d.y += d.vy;
        d.angle = Math.atan2(d.vy, d.vx);

        // Record Motion Trail
        d.trail.push({ x: d.x, y: d.y });
        if (d.trail.length > 10) d.trail.shift();

        // Draw Motion Trail
        ctx.save();
        for (let j = 0; j < d.trail.length - 1; j++) {
          const tp1 = d.trail[j];
          const tp2 = d.trail[j + 1];
          ctx.beginPath();
          ctx.moveTo(tp1.x, tp1.y);
          ctx.lineTo(tp2.x, tp2.y);
          ctx.strokeStyle = activeHoverCard !== null ? "#6eeaff" : "rgba(110, 234, 255, 0.4)";
          ctx.lineWidth = (j / d.trail.length) * 1.8;
          ctx.globalAlpha = (j / d.trail.length) * (activeHoverCard !== null ? 0.6 : 0.2);
          ctx.stroke();
        }
        ctx.restore();

        // Draw Drone Cyber Craft
        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.angle);

        ctx.fillStyle = activeHoverCard !== null ? "#ffffff" : "#b8f6ff";
        if (activeHoverCard !== null) {
          ctx.shadowBlur = 18;
          ctx.shadowColor = "#6eeaff";
        }

        ctx.beginPath();
        ctx.moveTo(d.size * 1.4, 0);
        ctx.lineTo(-d.size, -d.size * 0.75);
        ctx.lineTo(-d.size * 0.4, 0);
        ctx.lineTo(-d.size, d.size * 0.75);
        ctx.closePath();
        ctx.fill();

        // Thruster
        ctx.beginPath();
        ctx.arc(-d.size * 0.7, 0, d.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = "#65ffd0";
        ctx.fill();
        ctx.restore();

        // Target Lock Laser: Draws directly to the hovered card
        if (activeHoverCard !== null && cardBounds[activeHoverCard]) {
          const card = cardBounds[activeHoverCard];
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(card.cx, card.cy);
          ctx.strokeStyle = "rgba(101, 255, 208, 0.35)";
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#65ffd0";
          ctx.stroke();
          ctx.restore();
        }
      });
    }

    requestAnimationFrame(render);
  }

  // 4. Hover State Listeners & Specular Calculation
  const cardWraps = timelineStage.querySelectorAll(".chrono-card-wrap");
  cardWraps.forEach((wrap, index) => {
    const card = wrap.querySelector(".chrono-card");
    if (!card) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currRotX = 0;
    let currRotY = 0;
    let isHovered = false;

    wrap.addEventListener("mouseenter", () => {
      activeHoverCard = index;
      isHovered = true;
    });

    wrap.addEventListener("mousemove", (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Project precise beam highlight coordinates to CSS
      card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);

      // 3D Parallax Tilt Vector
      const normX = (x - rect.width / 2) / (rect.width / 2);
      const normY = (y - rect.height / 2) / (rect.height / 2);
      targetRotX = -normY * 12;
      targetRotY = normX * 12;
    });

    wrap.addEventListener("mouseleave", () => {
      if (activeHoverCard === index) {
        activeHoverCard = null;
      }
      isHovered = false;
      targetRotX = 0;
      targetRotY = 0;
    });

    function lerpCard() {
      currRotX += (targetRotX - currRotX) * 0.08;
      currRotY += (targetRotY - currRotY) * 0.08;

      if (isHovered || Math.abs(currRotX) > 0.04 || Math.abs(currRotY) > 0.04) {
        card.style.transform = `rotateX(${currRotX.toFixed(2)}deg) rotateY(${currRotY.toFixed(2)}deg) translateZ(24px)`;
      } else {
        card.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
      }
      requestAnimationFrame(lerpCard);
    }
    lerpCard();
  });

  window.addEventListener("resize", syncLayout, { passive: true });

  setTimeout(() => {
    syncLayout();
    requestAnimationFrame(render);
  }, 100);
})();