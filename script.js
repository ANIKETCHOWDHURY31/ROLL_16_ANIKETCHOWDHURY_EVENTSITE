const EVENTS = [
  {
    id: "ev1",
    name: "HackIEM 2026: Neural Frontiers",
    date: "2026-10-26T09:00:00",
    venue: "AIML Lab, Gurukul Campus",
    category: "technical",
    desc: "A 24-hour hackathon focusing on cutting-edge applied deep learning models and spatial computational problems."
  },
  {
    id: "ev2",
    name: "Divine PyTorch Workshop Series",
    date: "2026-11-28T10:00:00",
    venue: "Lab 4, Ashram Building",
    category: "workshops",
    desc: "Hands-on building of custom CNN networks, tensor processing operations, and audio classifier setups."
  },
  {
    id: "ev3",
    name: "Sharod Sandhya & Lotus Night",
    date: "2026-12-05T17:00:00",
    venue: "Main Auditorium",
    category: "cultural",
    desc: "An elegant evening celebrating traditional musical arrangements mixed with contemporary student design arrays."
  },
  {
    id: "ev4",
    name: "Autonomous Drone Navigation Showcase",
    date: "2026-12-12T11:00:00",
    venue: "Gurukul central quadrangle",
    category: "technical",
    desc: "A custom racing competition showcasing micro-drones guided entirely by onboard computer vision scripts."
  },
  {
    id: "ev5",
    name: "Generative AI Masterclass",
    date: "2026-12-20T14:30:00",
    venue: "Seminar Hall, 2nd Floor",
    category: "workshops",
    desc: "Guest session by global data engineers on scaling local large language frameworks for resource-light applications."
  }
];

// Target target event for our live cosmic countdown card
const TARGET_EVENT = EVENTS[0]; 

document.addEventListener("DOMContentLoaded", () => {
  initRosePetalsCanvas();
  renderEventCards();
  populateEventDropdown();
  setupFilterChips();
  
  // Launch both clocks and countdown tracking
  setInterval(updateClocksAndCountdown, 1000);
  updateClocksAndCountdown(); // Run immediately to avoid UI delay
  
  // Connect Validation Systems
  document.getElementById("registrationForm")?.addEventListener("submit", handleRegistrationSubmit);
  document.getElementById("feedbackForm")?.addEventListener("submit", handleFeedbackSubmit);
});

// ==========================================================================
// 🌸 DIVINE ROSE PETAL FALLING ANIMATION ENGINE (TRAVELLING SYSTEMS EFFECT)
// ==========================================================================
function initRosePetalsCanvas() {
  const canvas = document.getElementById("petals-canvas");
  const ctx = canvas.getContext("2d");
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  const petalCount = 25;
  const petalsArray = [];
  
  class Petal {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // Distribute initially across screen
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = -20;
      this.size = Math.random() * 8 + 6;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 1 - 0.5;
      this.opacity = Math.random() * 0.4 + 0.3;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 2 - 1;
    }
    
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;
      
      if (this.y > height + 20 || this.x > width + 20 || this.x < -20) {
        this.reset();
      }
    }
    
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.beginPath();
      
      // Beautiful parametric rose petal geometry string curve
      ctx.ellipse(0, 0, this.size, this.size * 0.65, 0, 0, 2 * Math.PI);
      
      // Fill colors match the sunset pink color token cleanly
      ctx.fillStyle = `rgba(217, 82, 142, ${this.opacity})`;
      ctx.fill();
      ctx.restore();
    }
  }
  
  for (let i = 0; i < petalCount; i++) {
    petalsArray.push(new Petal());
  }
  
  function animatePetals() {
    ctx.clearRect(0, 0, width, height);
    petalsArray.forEach(petal => {
      petal.update();
      petal.draw();
    });
    requestAnimationFrame(animatePetals);
  }
  
  animatePetals();
}

// ==========================================================================
// 🕰️ DIVINE ANALOG CLOCK, DIGITAL TIME & COUNTDOWN TRACKERS
// ==========================================================================
function updateClocksAndCountdown() {
  const now = new Date();

  // Always show Kolkata time, regardless of the visitor's computer timezone.
  const kolkataParts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(now);
  const part = (type) => Number(kolkataParts.find(p => p.type === type)?.value || 0);
  const seconds = part("second");
  const minutes = part("minute");
  const hours = part("hour");

  const timeText = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: true
  }).format(now);
  const digitalClockEl = document.getElementById("digitalClock");
  if (digitalClockEl) digitalClockEl.textContent = timeText;
  // Some versions of the page also show a small live-time line in the footer.
  const footerClockEl = document.getElementById("digitalClockDisplay");
  if (footerClockEl) footerClockEl.textContent = `Right now in Kolkata: ${timeText}`;

  const secHand = document.getElementById("secHand");
  const minHand = document.getElementById("minHand");
  const hourHand = document.getElementById("hourHand");
  if (secHand) secHand.style.transform = `rotate(${seconds * 6}deg)`;
  if (minHand) minHand.style.transform = `rotate(${minutes * 6 + seconds * 0.1}deg)`;
  if (hourHand) hourHand.style.transform = `rotate(${(hours % 12) * 30 + minutes * 0.5}deg)`;

  // The event's date/time is in Kolkata local time (IST, UTC+05:30).
  const eventTime = new Date("2026-10-26T09:00:00+05:30");
  const diffTime = eventTime.getTime() - now.getTime();
  const dEl = document.getElementById("days");
  const hEl = document.getElementById("hours");
  const mEl = document.getElementById("minutes");
  const sEl = document.getElementById("seconds");

  if (diffTime > 0) {
    const d = Math.floor(diffTime / 86400000);
    const h = Math.floor((diffTime % 86400000) / 3600000);
    const m = Math.floor((diffTime % 3600000) / 60000);
    const s = Math.floor((diffTime % 60000) / 1000);
    if (dEl) dEl.textContent = String(d).padStart(2, "0");
    if (hEl) hEl.textContent = String(h).padStart(2, "0");
    if (mEl) mEl.textContent = String(m).padStart(2, "0");
    if (sEl) sEl.textContent = String(s).padStart(2, "0");
  } else {
    if (dEl) dEl.textContent = "00";
    if (hEl) hEl.textContent = "00";
    if (mEl) mEl.textContent = "00";
    if (sEl) sEl.textContent = "00";
  }
}

// ==========================================================================
// 💻 DYNAMIC CORE DOM RENDERING INTERACTION SECTIONS
// ==========================================================================
function renderEventCards() {
  const container = document.getElementById("eventsContainer");
  if (!container) return;
  container.innerHTML = EVENTS.map(ev => {
    const formattedDate = new Date(ev.date).toLocaleDateString('en-US', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    return `
      <article class="event-card" data-cat="${ev.category}">
        <span class="event-category-badge">${ev.category}</span>
        <div class="event-date-pill">🗓️ ${formattedDate}</div>
        <h3>${ev.name}</h3>
        <p class="event-venue">📍 Venue: ${ev.venue}</p>
        <p class="event-desc">${ev.desc}</p>
      </article>
    `;
  }).join('');
}

function populateEventDropdown() {
  const dropdown = document.getElementById("eventSelect");
  if (!dropdown) return;
  let options = '<option value="">-- Select Event Focus Arena --</option>';
  EVENTS.forEach(ev => {
    options += `<option value="${ev.name}">${ev.name}</option>`;
  });
  dropdown.innerHTML = options;
}

function setupFilterChips() {
  const chips = document.querySelectorAll(".filter-chip");
  const cards = document.querySelectorAll(".event-card");
  
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      
      const category = chip.getAttribute("data-category");
      
      document.querySelectorAll(".event-card").forEach(card => {
        if (category === "all" || card.getAttribute("data-cat") === category) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });
}

// ==========================================================================
// 🛡️ ADVANCED JAVASCRIPT REGEX WEB FORM VALIDATION SYSTEMS
// ==========================================================================
function handleRegistrationSubmit(e) {
  e.preventDefault();
  let isValid = true;
  const name = document.getElementById("studentName")?.value.trim() || "";
  const roll = document.getElementById("rollNo")?.value.trim() || "";
  const dept = document.getElementById("deptSelect")?.value || "";
  const email = document.getElementById("emailAddr")?.value.trim() || "";
  const phone = document.getElementById("phoneNo")?.value.trim() || "";
  const event = document.getElementById("eventSelect")?.value || "";
  const genderSelected = [...document.getElementsByName("gender")].some(opt => opt.checked);

  const checks = [
    ["nameError", /^[A-Za-z][A-Za-z .'-]{2,50}$/.test(name), "Enter a valid name (at least 3 characters)."],
    ["rollError", /^\d{2,12}$/.test(roll), "Enter a valid numeric roll number."],
    ["deptError", Boolean(dept), "Please choose your department."],
    ["emailError", /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email), "Enter a valid email address."],
    ["phoneError", /^[6-9]\d{9}$/.test(phone), "Enter a valid 10-digit Indian mobile number."],
    ["eventError", Boolean(event), "Please select an event."],
    ["genderError", genderSelected, "Please select a gender option."]
  ];

  checks.forEach(([id, valid, message]) => {
    if (!valid) { showInputError(id, message); isValid = false; }
    else clearInputError(id);
  });

  const statusBox = document.getElementById("formStatus");
  if (!statusBox) return;
  statusBox.style.display = "block";
  if (isValid) {
    statusBox.className = "form-status-box status-success";
    statusBox.textContent = "Registration details validated successfully! (Demo only — no data has been sent.)";
  } else {
    statusBox.className = "form-status-box status-error";
    statusBox.textContent = "Please correct the highlighted fields and submit again.";
  }
}

function handleFeedbackSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("fbName")?.value.trim() || "";
  const email = document.getElementById("fbEmail")?.value.trim() || "";
  const message = document.getElementById("fbMessage")?.value.trim() || "";
  let valid = true;
  const checks = [
    ["fbNameError", name.length >= 2, "Please enter your name."],
    ["fbEmailError", /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email), "Please enter a valid email."],
    ["fbMessageError", message.length >= 5, "Please enter a message (at least 5 characters)."]
  ];
  checks.forEach(([id, ok, msg]) => {
    if (!ok) { showInputError(id, msg); valid = false; }
    else clearInputError(id);
  });
  const status = document.getElementById("fbStatus");
  if (status) {
    status.className = valid ? "form-status status-success" : "form-status status-error";
    status.style.display = "block";
    status.textContent = valid
      ? "Feedback validated successfully! (Demo only — no message has been sent.)"
      : "Please correct the highlighted fields.";
  }
}
function showInputError(id, msg) {
const el = document.getElementById(id);
if (el) el.textContent = msg;
}
function clearInputError(id) {
const el = document.getElementById(id);
if (el) el.textContent = "";
}
