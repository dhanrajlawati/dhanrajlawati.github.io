// Dhan Raj Lawati — Academic Website
// Main JavaScript functionality

document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------------------------
     1. Automatically update the footer year
     -------------------------------------------------- */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* --------------------------------------------------
     2. Active navigation link while scrolling
     -------------------------------------------------- */

  const navLinks = Array.from(
    document.querySelectorAll(".nav-links a")
  );

  const sections = navLinks
    .map((link) => {
      const target = link.getAttribute("href");

      if (!target || !target.startsWith("#")) {
        return null;
      }

      return document.querySelector(target);
    })
    .filter(Boolean);


  const sectionObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {

          const linkTarget = link.getAttribute("href");

          link.classList.toggle(
            "active",
            linkTarget === `#${entry.target.id}`
          );

        });

      });

    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0
    }
  );


  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  /* --------------------------------------------------
     3. Smooth navigation
     -------------------------------------------------- */

  navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetID = link.getAttribute("href");

      if (!targetID || !targetID.startsWith("#")) {
        return;
      }

      const targetSection = document.querySelector(targetID);

      if (!targetSection) {
        return;
      }

      event.preventDefault();

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* --------------------------------------------------
     4. Keyboard accessibility
     -------------------------------------------------- */

  document.querySelectorAll("a").forEach((link) => {

    link.addEventListener("keydown", (event) => {

      if (event.key === "Enter") {
        link.click();
      }

    });

  });

});