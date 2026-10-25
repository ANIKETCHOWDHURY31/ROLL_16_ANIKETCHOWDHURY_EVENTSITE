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
  }
];

// Ensure this uses index [0] so the date string maps correctly!
const TARGET_EVENT = EVENTS[0]; 

document.addEventListener("DOMContentLoaded", () => {
  initRosePetalsCanvas();
  renderEventCards();
  populateEventDropdown();
  setupFilterChips();
  
  // Launch both clocks and countdown tracking
  setInterval(updateClocksAndCountdown, 1000);
  updateClocksAndCountdown(); 
});
