// Shared interactions for navigation, theme selection, and the contact form.
const themeButton = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const isDark = theme === "dark";
  if (themeButton && themeIcon) {
    themeButton.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    themeIcon.textContent = isDark ? "☀" : "☾";
  }
}

const savedTheme = localStorage.getItem("portfolio-theme");
setTheme(savedTheme === "dark" ? "dark" : "light");

themeButton?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});

menuButton?.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  navLinks?.classList.toggle("is-open", !isExpanded);
});

navLinks?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement && menuButton) {
    menuButton.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  }
});

document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = String(new Date().getFullYear());
});

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!(contactForm instanceof HTMLFormElement) || !formStatus) return;

  if (!contactForm.reportValidity()) {
    formStatus.textContent = "Please check the highlighted fields and try again.";
    return;
  }

  const name = new FormData(contactForm).get("name")?.toString().trim() || "there";
  formStatus.textContent = `Thanks, ${name}! This demo form is validated, but does not send messages. Please email me directly instead.`;
  contactForm.reset();
});
