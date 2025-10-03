document.addEventListener("mousemove", (e) => {
  document.body.style.background = `
    radial-gradient(
      circle 500px at ${e.clientX}px ${e.clientY}px,
      #051d44ff  0%,   /* slightly lighter than #02072B */
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