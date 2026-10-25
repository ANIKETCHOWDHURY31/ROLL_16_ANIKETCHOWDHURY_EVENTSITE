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
  document.getElementById("registrationForm").addEventListener("submit", handleRegistrationSubmit);
  document.getElementById("feedbackForm").addEventListener("submit", handleFeedbackSubmit);
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
  
  // 1. Live Digital Clock String (IST format)
  const digitalClockEl = document.getElementById("digitalClock");
  if (digitalClockEl) {
    digitalClockEl.textContent = now.toLocaleTimeString('en-US', { hour12: true });
  }
  
  // 2. Divine Analog Clock Hand Rotation System
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  
  const secDegrees = (seconds / 60) * 360;
  const minDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;
  
  const secHand = document.getElementById("secHand");
  const minHand = document.getElementById("minHand");
  const hourHand = document.getElementById("hourHand");
  
  if (secHand) secHand.style.transform = `rotate(${secDegrees}deg)`;
  if (minHand) minHand.style.transform = `rotate(${minDegrees}deg)`;
  if (hourHand) hourHand.style.transform = `rotate(${hourDegrees}deg)`;
  
  // 3. Precision Countdown Math Engine
  const eventTime = new Date(TARGET_EVENT.date);
  const diffTime = eventTime - now;
  
  const dEl = document.getElementById("days");
  const hEl = document.getElementById("hours");
  const mEl = document.getElementById("minutes");
  const sEl = document.getElementById("seconds");
  
  if (diffTime > 0) {
    const d = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const h = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diffTime / 1000 / 60) % 60);
    const s = Math.floor((diffTime / 1000) % 60);
    
    if (dEl) dEl.textContent = String(d).padStart(2, '0');
    if (hEl) hEl.textContent = String(h).padStart(2, '0');
    if (mEl) mEl.textContent = String(m).padStart(2, '0');
    if (sEl) sEl.textContent = String(s).padStart(2, '0');
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
      
      cards.forEach(card => {
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
  const statusBox = document.getElementById("formStatus");
  if (statusBox) {
    statusBox.className = "form-status-box";
    statusBox.style.display = "none";
  }

  // Elements Extraction
  const nameInput = document.getElementById("studentName");
  const rollInput = document.getElementById("rollNo");
  const deptInput = document.getElementById("deptSelect");
  const emailInput = document.getElementById("emailAddr");
  const phoneInput = document.getElementById("phoneNo");
  const eventInput = document.getElementById("eventSelect");
  
  // Gender Radio Target Parsing
  const genderOptions = document.getElementsByName("gender");
  let genderSelected = false;
  for(let opt of genderOptions) {
    if(opt.checked) genderSelected = true;
  }

  // Regex Patterns System
  const namePattern = /^[A-Za-z][A-Za-z .'-]{2,50}$/;
  const rollPattern = /^\d{2,12}$/; // Dynamic checking allowing standard roll structures
  const phonePattern = /^[6-9]\d{9}$/; // Valid 10 digit Indian Mobile numbers
  const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  // 1. Name Check
  if (nameInput && !namePattern.test(nameInput.value.trim())) {
    showInputError("nameError", "Enter a valid alphabet string name (min 3 characters).");
    isValid = false;
  } else { clearInputError("nameError"); }

  // 2. Roll Check
if (rollInput && !rollPattern.test(rollInput.value.trim())) {
showInputError("rollError", "Please input a valid numeric system Roll Number.");
isValid = false;
} else { clearInputError("rollError"); }
}
function handleFeedbackSubmit(e) {
e.preventDefault();
}
function showInputError(id, msg) {
const el = document.getElementById(id);
if (el) el.textContent = msg;
}
function clearInputError(id) {
const el = document.getElementById(id);
if (el) el.textContent = "";
}
