// Smooth scroll to section when nav links are clicked
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Open project page when project card is clicked
function openProject(page) {
  window.location.href = page;
}

// Handle contact form submission
function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Display confirmation message
  const note = document.getElementById("formNote");
  note.textContent = `Thank you, ${data.name}! I'll get in touch with you soon.`;

  // Save messages in localStorage
  const messages = JSON.parse(localStorage.getItem("messages") || "[]");
  messages.push({
    name: data.name,
    email: data.email,
    message: data.message,
    submittedAt: new Date().toISOString()
  });
  localStorage.setItem("messages", JSON.stringify(messages));

  form.reset();
  return false;
}

// Intersection Observer to animate sections as they appear
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});
