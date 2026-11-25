(() => {
  "use strict";

  const body = document.body;
  const root = document.documentElement;
  const chapter = body.dataset.chapter || "permission";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const chapterIndex = {
    permission: 0,
    station: 1,
    signal: 2,
    sovereign: 3,
  }[chapter] ?? 0;

  const clamp = (value, minimum, maximum) =>
    Math.max(minimum, Math.min(maximum, value));

  function buildReliquary() {
    const mount = document.querySelector("[data-reliquary]");
    if (!mount) return;

    const ribs = [];
    for (let index = 0; index < 11; index += 1) {
      const y = 118 + index * 51;
      const swell = Math.sin((index / 10) * Math.PI);
      const outer = 58 + swell * 23;
      const inner = 184 - swell * 16;
      const height = 18 + swell * 16;
      const depth = (0.46 + swell * 0.82).toFixed(2);
      const turn = index % 2 === 0 ? "1" : "-0.72";

      ribs.push(`
        <path
          class="rib left"
          style="--depth:${depth};--turn:${turn}"
          d="M 236 ${y - 12} L ${inner} ${y - height} L ${outer} ${y - 5}
             L ${inner - 7} ${y + height} L 236 ${y + 12} Z" />
        <path
          class="rib right"
          style="--depth:${depth};--turn:${turn}"
          d="M 244 ${y - 12} L ${480 - inner} ${y - height} L ${480 - outer} ${y - 5}
             L ${487 - inner} ${y + height} L 244 ${y + 12} Z" />
      `);
    }

    mount.innerHTML = `
      <svg viewBox="0 0 480 780" role="img" aria-labelledby="reliquary-title reliquary-desc">
        <title id="reliquary-title">A changing mechanical reliquary</title>
        <desc id="reliquary-desc">
          Symmetrical plates surround a central nervous column and a single illuminated aperture.
        </desc>
        <path class="datum-line" d="M 240 8 V 772 M 20 390 H 460" />
        <path class="outer-arc" d="M 240 26 C 89 26 35 148 35 390 C 35 632 89 754 240 754" />
        <path class="outer-arc" d="M 240 26 C 391 26 445 148 445 390 C 445 632 391 754 240 754" />
        <path class="inner-arc" d="M 240 62 C 131 62 92 176 92 390 C 92 604 131 718 240 718" />
        <path class="inner-arc" d="M 240 62 C 349 62 388 176 388 390 C 388 604 349 718 240 718" />
        <g class="network">
          <path class="network-line" d="M 86 166 C 162 202 155 305 240 390 C 325 475 318 578 394 614" />
          <path class="network-line" d="M 394 166 C 318 202 325 305 240 390 C 155 475 162 578 86 614" />
          <path class="network-line" d="M 55 390 C 145 341 176 280 240 106 C 304 280 335 341 425 390" />
          <path class="network-line" d="M 55 390 C 145 439 176 500 240 674 C 304 500 335 439 425 390" />
        </g>
        <g class="crown">
          <path class="crown-line" d="M 240 105 L 174 31 L 176 136 L 91 89 L 139 174 L 42 164" />
          <path class="crown-line" d="M 240 105 L 306 31 L 304 136 L 389 89 L 341 174 L 438 164" />
          <path class="crown-line" d="M 240 674 L 185 744 L 187 655 L 112 708 L 148 621 L 54 630" />
          <path class="crown-line" d="M 240 674 L 295 744 L 293 655 L 368 708 L 332 621 L 426 630" />
        </g>
        <g class="plates">${ribs.join("")}</g>
        <rect class="spine-line" x="238.7" y="87" width="2.6" height="606" />
        <g class="spine-nodes">
          <circle class="spine-node" cx="240" cy="105" r="7" />
          <circle class="spine-node" cx="240" cy="184" r="3.4" />
          <circle class="spine-node" cx="240" cy="390" r="5.5" />
          <circle class="spine-node" cx="240" cy="596" r="3.4" />
          <circle class="spine-node" cx="240" cy="675" r="7" />
        </g>
        <g class="aperture">
          <path class="eye-housing" d="M 166 272 Q 240 224 314 272 Q 240 320 166 272 Z" />
          <ellipse class="eye-core" cx="240" cy="272" rx="24" ry="11" />
          <rect class="eye-slit" x="238.5" y="258" width="3" height="28" />
        </g>
        <g class="secondary-apertures" aria-hidden="true">
          <circle class="secondary-eye" cx="183" cy="347" r="4.5" />
          <circle class="secondary-eye" cx="297" cy="347" r="4.5" />
          <circle class="secondary-eye" cx="152" cy="411" r="3.5" />
          <circle class="secondary-eye" cx="328" cy="411" r="3.5" />
          <circle class="secondary-eye" cx="193" cy="485" r="4" />
          <circle class="secondary-eye" cx="287" cy="485" r="4" />
        </g>
      </svg>
    `;
  }

  function trackPointer() {
    let queued = false;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    const baseOpen = [0.1, 0.28, 0.55, 0.78][chapterIndex];

    const apply = () => {
      const x = clamp(pointerX / window.innerWidth, 0, 1);
      const y = clamp(pointerY / window.innerHeight, 0, 1);
      const distance = Math.abs(x - 0.5) * 2;
      const open = clamp(baseOpen + (1 - distance) * 0.2, 0, 1);
      root.style.setProperty("--pointer-x", `${(x * 100).toFixed(2)}%`);
      root.style.setProperty("--pointer-y", `${(y * 100).toFixed(2)}%`);
      root.style.setProperty("--pointer-x-unit", x.toFixed(4));
      root.style.setProperty("--pointer-y-unit", y.toFixed(4));
      root.style.setProperty("--open", open.toFixed(4));
      queued = false;
    };

    window.addEventListener(
      "pointermove",
      (event) => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (!queued) {
          queued = true;
          window.requestAnimationFrame(apply);
        }
      },
      { passive: true },
    );

    apply();
  }

  function createField() {
    const canvas = document.createElement("canvas");
    canvas.className = "field";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let animation = 0;
    let pointer = { x: 0.5, y: 0.5 };
    let seed = 9137 + chapterIndex * 1709;

    const random = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    const count = window.innerWidth < 700 ? 22 : 38;
    const sourceCount = chapter === "sovereign" ? Math.ceil(count / 2) : count;
    const nodes = Array.from({ length: sourceCount }, () => ({
        x: 0.08 + random() * 0.84,
        y: 0.05 + random() * 0.9,
        vx: (random() - 0.5) * 0.00008,
        vy: (random() - 0.5) * 0.00008,
        weight: 0.4 + random() * 1.2,
      }));

    if (chapter === "sovereign") {
      const mirroredNodes = nodes.slice(0, count - sourceCount).map((original) => ({
          ...original,
          x: 1 - original.x,
          y: original.y,
          vx: -original.vx,
          vy: original.vy,
        }));
      nodes.push(...mirroredNodes);
    }

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const colors = () => {
      const style = getComputedStyle(root);
      return {
        line: style.getPropertyValue("--field-line").trim(),
        node: style.getPropertyValue("--field-node").trim(),
      };
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const color = colors();

      if (!reducedMotion.matches) {
        nodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0.03 || node.x > 0.97) node.vx *= -1;
          if (node.y < 0.03 || node.y > 0.97) node.vy *= -1;
        });
      }

      context.lineWidth = 1;
      context.strokeStyle = color.line;
      for (let first = 0; first < nodes.length; first += 1) {
        for (let second = first + 1; second < nodes.length; second += 1) {
          const a = nodes[first];
          const b = nodes[second];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx * (width / height), dy);
          if (distance > 0.19) continue;
          context.globalAlpha = clamp(1 - distance / 0.19, 0.05, 0.7);
          context.beginPath();
          context.moveTo(a.x * width, a.y * height);
          context.lineTo(b.x * width, b.y * height);
          context.stroke();
        }
      }

      context.globalAlpha = 1;
      context.fillStyle = color.node;
      nodes.forEach((node) => {
        const proximity = 1 - clamp(Math.hypot(node.x - pointer.x, node.y - pointer.y) / 0.4, 0, 1);
        context.beginPath();
        context.arc(
          node.x * width,
          node.y * height,
          node.weight + proximity * 2.2,
          0,
          Math.PI * 2,
        );
        context.fill();
      });

      frame += 1;
      if (!document.hidden && (!reducedMotion.matches || frame < 2)) {
        animation = window.requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener(
      "pointermove",
      (event) => {
        pointer = {
          x: event.clientX / Math.max(window.innerWidth, 1),
          y: event.clientY / Math.max(window.innerHeight, 1),
        };
      },
      { passive: true },
    );
    document.addEventListener("visibilitychange", () => {
      window.cancelAnimationFrame(animation);
      if (!document.hidden) draw();
    });
    reducedMotion.addEventListener("change", draw);

    resize();
    draw();
  }

  const audio = {
    context: null,
    master: null,
    filter: null,
    voices: [],
    active: false,
  };

  const audioFrequencies = {
    permission: [41.2, 61.8, 82.4],
    station: [36.7, 55, 73.4],
    signal: [43.65, 69.3, 103.8],
    sovereign: [32.7, 49, 98],
  };

  async function startSound() {
    if (audio.active) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    audio.context = new AudioContext();
    audio.master = audio.context.createGain();
    audio.filter = audio.context.createBiquadFilter();
    audio.filter.type = "lowpass";
    audio.filter.frequency.value = [190, 155, 320, 118][chapterIndex];
    audio.filter.Q.value = 7.5;
    audio.master.gain.value = 0.0001;
    audio.filter.connect(audio.master);
    audio.master.connect(audio.context.destination);

    audioFrequencies[chapter].forEach((frequency, index) => {
      const oscillator = audio.context.createOscillator();
      const gain = audio.context.createGain();
      oscillator.type = index === 1 ? "triangle" : "sine";
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index === 2 ? 5 : -3;
      gain.gain.value = [0.42, 0.22, 0.09][index];
      oscillator.connect(gain);
      gain.connect(audio.filter);
      oscillator.start();
      audio.voices.push({ oscillator, gain });
    });

    const lfo = audio.context.createOscillator();
    const lfoGain = audio.context.createGain();
    lfo.frequency.value = 0.073;
    lfoGain.gain.value = 54;
    lfo.connect(lfoGain);
    lfoGain.connect(audio.filter.frequency);
    lfo.start();
    audio.voices.push({ oscillator: lfo, gain: lfoGain });

    await audio.context.resume();
    audio.master.gain.exponentialRampToValueAtTime(0.035, audio.context.currentTime + 1.6);
    audio.active = true;
  }

  function stopSound() {
    if (!audio.active || !audio.context || !audio.master) return;
    const now = audio.context.currentTime;
    audio.master.gain.cancelScheduledValues(now);
    audio.master.gain.setValueAtTime(Math.max(audio.master.gain.value, 0.0001), now);
    audio.master.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    window.setTimeout(() => {
      audio.context?.close();
      audio.context = null;
      audio.master = null;
      audio.filter = null;
      audio.voices = [];
      audio.active = false;
    }, 260);
  }

  function soundPulse(frequency = 180) {
    if (!audio.active || !audio.context || !audio.master) return;
    const oscillator = audio.context.createOscillator();
    const gain = audio.context.createGain();
    const now = audio.context.currentTime;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.46, now + 0.55);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.09, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.58);
    oscillator.connect(gain);
    gain.connect(audio.master);
    oscillator.start(now);
    oscillator.stop(now + 0.62);
  }

  function setupSound() {
    const button = document.querySelector("[data-sound]");
    if (!button) return;
    const label = button.querySelector("[data-sound-label]");

    button.addEventListener("click", async () => {
      const willStart = button.getAttribute("aria-pressed") !== "true";
      if (willStart) {
        await startSound();
        button.setAttribute("aria-pressed", "true");
        if (label) label.textContent = "sound awake";
      } else {
        stopSound();
        button.setAttribute("aria-pressed", "false");
        if (label) label.textContent = "sound dormant";
      }
    });

    window.addEventListener("pagehide", stopSound, { once: true });
  }

  function setupSectors() {
    const instrument = document.querySelector("[data-sector-instrument]");
    if (!instrument) return;
    const reading = instrument.querySelector("[data-sector-reading]");
    const buttons = [...instrument.querySelectorAll("[data-sector]")];

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        buttons.forEach((candidate) => candidate.setAttribute("aria-pressed", "false"));
        button.setAttribute("aria-pressed", "true");
        if (reading) reading.textContent = button.dataset.reading || "";
        root.style.setProperty("--open", (0.4 + index * 0.15).toFixed(2));
        soundPulse(148 + index * 41);
      });
    });
  }

  function setupTuner() {
    const input = document.querySelector("[data-tuner]");
    const reading = document.querySelector("[data-tuner-reading]");
    const output = document.querySelector("[data-tuner-output]");
    if (!input || !reading || !output) return;

    const phrases = [
      [0, "A voice occupies one machine."],
      [18, "The machines begin repeating her."],
      [41, "Distance loses its authority."],
      [64, "Every private screen acquires the same interior."],
      [84, "Identity becomes a routing decision."],
      [97, "There is no outside from which to observe."],
    ];

    const update = () => {
      const value = Number(input.value);
      const normalized = value / 100;
      const phrase = [...phrases].reverse().find(([threshold]) => value >= threshold)?.[1] || phrases[0][1];
      root.style.setProperty("--tune", normalized.toFixed(3));
      output.value = String(value).padStart(3, "0");
      output.textContent = String(value).padStart(3, "0");
      reading.textContent = phrase;
      if (audio.filter && audio.context) {
        audio.filter.frequency.setTargetAtTime(120 + normalized * 620, audio.context.currentTime, 0.08);
      }
    };

    input.addEventListener("input", update);
    input.addEventListener("change", () => soundPulse(110 + Number(input.value) * 2.2));
    update();
  }

  function setupSeal() {
    const seal = document.querySelector("[data-seal]");
    if (!seal) return;
    let startedAt = 0;
    let holdFrame = 0;
    let holding = false;
    const duration = 1800;

    const finish = () => {
      holding = false;
      seal.classList.remove("is-holding");
      seal.style.setProperty("--hold", "100%");
      body.classList.add("witnessed");
      soundPulse(72);
      window.setTimeout(() => soundPulse(144), 240);
    };

    const tick = (time) => {
      if (!holding) return;
      const progress = clamp((time - startedAt) / duration, 0, 1);
      seal.style.setProperty("--hold", `${(progress * 100).toFixed(1)}%`);
      if (progress >= 1) {
        finish();
        return;
      }
      holdFrame = window.requestAnimationFrame(tick);
    };

    const begin = (event) => {
      if (body.classList.contains("witnessed") || holding) return;
      if (event.type === "keydown" && !["Enter", " "].includes(event.key)) return;
      if (event.type === "keydown") event.preventDefault();
      holding = true;
      startedAt = performance.now();
      seal.classList.add("is-holding");
      holdFrame = window.requestAnimationFrame(tick);
    };

    const cancel = (event) => {
      if (event?.type === "keyup" && !["Enter", " "].includes(event.key)) return;
      if (!holding) return;
      holding = false;
      window.cancelAnimationFrame(holdFrame);
      seal.classList.remove("is-holding");
      seal.style.setProperty("--hold", "0%");
    };

    seal.addEventListener("pointerdown", begin);
    seal.addEventListener("pointerup", cancel);
    seal.addEventListener("pointercancel", cancel);
    seal.addEventListener("pointerleave", cancel);
    seal.addEventListener("keydown", begin);
    seal.addEventListener("keyup", cancel);
    seal.addEventListener("click", (event) => event.preventDefault());
  }

  function setupTransitions() {
    document.querySelectorAll("a[data-transition]").forEach((link) => {
      link.addEventListener("click", (event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        const destination = link.getAttribute("href");
        if (!destination || destination.startsWith("#")) return;
        event.preventDefault();
        body.classList.add("is-leaving");
        window.setTimeout(() => {
          window.location.href = destination;
        }, reducedMotion.matches ? 0 : 410);
      });
    });
  }

  buildReliquary();
  trackPointer();
  createField();
  setupSound();
  setupSectors();
  setupTuner();
  setupSeal();
  setupTransitions();
})();
