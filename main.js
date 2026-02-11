// ===== Helpers =====
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

// ===== Mobile menu =====
const burger = $("#burger");
const mobile = $("#mobile");

burger?.addEventListener("click", () => {
  mobile.style.display = (mobile.style.display === "block") ? "none" : "block";
});

// Close mobile menu when clicking a link
mobile?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => mobile.style.display = "none");
});

// ===== Scroll progress =====
const progress = $("#progress");
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const doc = document.documentElement;
  const height = doc.scrollHeight - doc.clientHeight;
  const pct = height ? (scrollTop / height) * 100 : 0;
  progress.style.width = pct + "%";
});

// ===== Reveal on scroll (IntersectionObserver) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

$$(".reveal").forEach(el => observer.observe(el));

// ===== Counter animation =====
function animateCounter(el, to, duration = 900) {
  const start = 0;
  const t0 = performance.now();
  function tick(t) {
    const p = Math.min((t - t0) / duration, 1);
    const val = Math.floor(start + (to - start) * (1 - Math.pow(1 - p, 3)));
    el.textContent = val;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterEl = document.querySelector("[data-counter]");
if (counterEl) {
  const to = parseInt(counterEl.getAttribute("data-counter"), 10) || 0;
  // يبدأ لما الكارت يدخل الشاشة
  const cObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCounter(counterEl, to);
        cObs.disconnect();
      }
    });
  }, { threshold: 0.25 });
  cObs.observe(counterEl);
}

// ===== Contact form (Demo) =====
const form = $("#form");
const status = $("#status");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  status.textContent = "تم الإرسال ✔ (Demo) — لو عايزه إرسال حقيقي أركّب EmailJS/Backend.";
  form.reset();
  setTimeout(() => (status.textContent = ""), 4500);
});

// ===== Year =====
$("#year").textContent = new Date().getFullYear();

// ===== (Optional) Theme toggle (simple) =====
const themeBtn = $("#themeBtn");
let dark = true;

themeBtn?.addEventListener("click", () => {
  dark = !dark;
  document.documentElement.style.setProperty("--bg", dark ? "#070A10" : "#f6f7fb");
  document.documentElement.style.setProperty("--text", dark ? "#EAF0FF" : "#081022");
  document.documentElement.style.setProperty("--muted", dark ? "#B7C2E1" : "#44506a");
  themeBtn.textContent = dark ? "🌙" : "☀️";
});
