document.addEventListener("mousemove", (e) => {
  const x = e.clientX + window.scrollX;
  const y = e.clientY + window.scrollY;
  document.body.style.background = `
    radial-gradient(
      circle 600px at ${x}px ${y}px,
      rgba(29, 78, 216, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle 400px at ${x}px ${y}px,
      rgba(20, 64, 134, 0.1) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle 800px at ${x}px ${y}px,
      rgba(15, 23, 42, 0.3) 0%,
      transparent 100%
    ),
    #020617
  `;
});
// Sidebar link active state (for the animated line)
const sidebarLinks = document.querySelectorAll(".sidebar a");

sidebarLinks.forEach(link => {
  link.addEventListener("click", function () {
    // Remove active class from all links
    sidebarLinks.forEach(l => l.classList.remove("active"));
    // Add active class to the clicked one
    this.classList.add("active");
  });
});