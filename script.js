document.addEventListener("mousemove", (e) => {
  const x = e.clientX + window.scrollX;
  const y = e.clientY + window.scrollY;
  document.body.style.background = `
    radial-gradient(
      circle 900px at ${x}px ${y}px,
      rgba(48, 97, 231, 0.15) 0%,
      transparent 60%
    ),
    
    #080d24ff
  `;
});

// Track current page
let currentPage = null;

// Function to load content into main section
async function loadContent(page) {
  const mainSection = document.querySelector(".main");

  // Always scroll to top first, before any animations
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Don't reload if it's the same page (but we already scrolled)
  if (currentPage === page) {
    return;
  }

  // Add fade out effect
  mainSection.style.opacity = "0";

  try {
    // Fetch the content from the HTML file
    const response = await fetch(page);
    const content = await response.text();

    // Wait for fade out to complete
    setTimeout(() => {
      mainSection.innerHTML = content;
      // Fade in the new content
      mainSection.style.opacity = "1";
      // Update current page
      currentPage = page;
    }, 300);

  } catch (error) {
    console.error("Error loading content:", error);
    mainSection.innerHTML = "<p>Error loading content. Please try again.</p>";
    mainSection.style.opacity = "1";
  }
}

// Function to update active state in sidebar
function updateSidebarActive(page) {
  const sidebarLinks = document.querySelectorAll(".sidebar a");
  sidebarLinks.forEach(link => {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Sidebar link active state and content loading
const sidebarLinks = document.querySelectorAll(".sidebar a");
sidebarLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default anchor behavior

    // Remove active class from all links
    sidebarLinks.forEach(l => l.classList.remove("active"));
    // Add active class to the clicked one
    this.classList.add("active");

    // Get the page to load from href attribute
    const page = this.getAttribute("href");

    // Load the content
    loadContent(page);
  });
});

// Dropdown menu links content loading
const dropdownLinks = document.querySelectorAll(".dropdown-menu a");
dropdownLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Only handle if it's a .html file (not # anchor)
    if (href.endsWith(".html")) {
      e.preventDefault(); // Prevent default anchor behavior

      // Update sidebar active state
      updateSidebarActive(href);

      // Load the content
      loadContent(href);
    }
  });
});

// Load default content (about page) on page load
window.addEventListener("DOMContentLoaded", () => {
  loadContent("about.html");
});

// Handle contact link to scroll to footer
const contactLinks = document.querySelectorAll('a[href="#contact"], a[href="contact.html"]');
contactLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Scroll to footer smoothly
    const footer = document.querySelector('.footer');
    footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Typing animation for multilingual titles
const titles = [
  "Software Engineer",
  "ソフトウェアエンジニア", // Japanese
  "소프트웨어 엔지니어", // Korean
  "Ingeniero de Software", // Spanish
  "Ingénieur Logiciel", // French
  "Software-Ingenieur", // German
  "软件工程师", // Chinese
  "Инженер-программист", // Russian
  "Engenheiro de Software" // Portuguese
];

let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typedTextElement = document.getElementById('typed-text');

function type() {
  const currentTitle = titles[titleIndex];

  if (isDeleting) {
    // Remove characters
    typedTextElement.textContent = currentTitle.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Add characters
    typedTextElement.textContent = currentTitle.substring(0, charIndex + 1);
    charIndex++;
  }

  // Determine typing speed
  let typeSpeed = isDeleting ? 50 : 100;

  // Check if word is complete
  if (!isDeleting && charIndex === currentTitle.length) {
    // Pause at end of word
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Move to next word
    isDeleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

function loadHeaderAndFooter() {
  // Load header
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      const headerPlaceholder = document.getElementById('header-placeholder');
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
      }
    })
    .catch(error => console.error('Error loading header:', error));

  // Load footer
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      const footerPlaceholder = document.getElementById('footer-placeholder');
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = data;
      }
    })
    .catch(error => console.error('Error loading footer:', error));
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadHeaderAndFooter(); // Load header and footer
  setTimeout(type, 1000); // Start typing animation after 1 second delay
});