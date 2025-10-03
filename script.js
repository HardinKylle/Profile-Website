document.addEventListener("mousemove", (e) => {
  const x = e.clientX + window.scrollX;
  const y = e.clientY + window.scrollY;

  document.body.style.background = `
    radial-gradient(
      circle 500px at ${x}px ${y}px,
      #051d44ff 0%, 
      #02072B 100%
    )
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