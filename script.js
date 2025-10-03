document.addEventListener("mousemove", (e) => {
  document.body.style.background = `
    radial-gradient(
      circle 500px at ${e.clientX}px ${e.clientY}px,
      #05204A  0%,   /* slightly lighter than #02072B */
      #02072B 100%
    )
  `;
});