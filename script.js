/* =========================================================
   PREMIUM COMPANY WEBSITE JAVASCRIPT
   Features:
   - Dark / light mode
   - Mobile navigation
   - Scroll reveal
   - Animated counters
   - GSAP micro animations
   - Trusted logo active state
   - Product detail modal
   - Basic client-side contact validation
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const nav = document.getElementById("mainNav");
  const currentYear = document.getElementById("currentYear");

  /* ---------------------------------------------------------
     DARK MODE
     Saves the user's preference in localStorage.
     --------------------------------------------------------- */
  const savedTheme = localStorage.getItem("sonak-theme") || "light";
  root.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);
    localStorage.setItem("sonak-theme", next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.className = theme === "dark"
      ? "bi bi-moon-stars-fill"
      : "bi bi-sun-fill";
  }

  /* ---------------------------------------------------------
     NAVBAR SCROLL EFFECT
     --------------------------------------------------------- */
  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 30);
  });

  /* ---------------------------------------------------------
     MOBILE MENU
     Closes Bootstrap mobile menu after a nav link is clicked.
     --------------------------------------------------------- */
  document.querySelectorAll("#navMenu .nav-link, #navMenu .nav-action").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu?.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  /* ---------------------------------------------------------
     SCROLL REVEAL
     Uses IntersectionObserver for performance.
     --------------------------------------------------------- */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------------
     COUNTER ANIMATION
     --------------------------------------------------------- */
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.target);
      const duration = 1500;
      const start = performance.now();

      function animate(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(animate);
      observer.unobserve(counter);
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  /* ---------------------------------------------------------
     GSAP MICRO INTERACTION
     GSAP is used because this is a plain HTML/Bootstrap template.
     Framer Motion is primarily a React animation library; if this
     template is migrated to React, Framer Motion can be introduced.
     --------------------------------------------------------- */
  if (window.gsap) {
    gsap.from(".hero-content .eyebrow", {
      opacity: 0,
      y: 25,
      duration: 0.8,
      delay: 0.25
    });

    gsap.from(".hero-content h1, .hero-content h2", {
      opacity: 0,
      y: 35,
      duration: 1,
      delay: 0.4
    });

    gsap.from(".hero-content p", {
      opacity: 0,
      y: 25,
      duration: 0.8,
      delay: 0.65
    });
  }

  /* ---------------------------------------------------------
     TRUSTED BRAND LOGOS
     Default = grayscale/faded.
     Click = normal color.
     --------------------------------------------------------- */
  document.querySelectorAll(".trusted-logo").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".trusted-logo").forEach(item => {
        item.classList.remove("is-active");
      });

      button.classList.add("is-active");
    });
  });

  /* ---------------------------------------------------------
     PRODUCT MODAL DATA
     Replace image paths and descriptions with real products.
     --------------------------------------------------------- */
  const products = [
    {
      tag: "PRODUCT 01",
      title: "Smart Operations Platform",
      description: "A configurable platform for monitoring, reporting and managing important operational activities from one place.",
      images: [
        "assets/image/product-1.jpg",
        "assets/image/product-1-detail-1.jpeg",
        "assets/image/product-1-detail-2.jpg"
      ],
      features: [
        "Centralized monitoring",
        "Operational reporting",
        "Scalable architecture",
        "Role-based workflows"
      ]
    },
    {
      tag: "PRODUCT 02",
      title: "Digital Service Suite",
      description: "A practical digital toolkit for organizations that want to simplify service delivery and internal workflows.",
      images: [
        "assets/image/product-2.jpg",
        "assets/image/product-2-detail-1.jpg",
        "assets/image/product-2-detail-2.jpg"
      ],
      features: [
        "Digital workflows",
        "Customer service tools",
        "Data visibility",
        "Easy customization"
      ]
    },
    {
      tag: "PRODUCT 03",
      title: "Monitoring & Control",
      description: "A monitoring solution designed to provide visibility, alerts and useful information for better operational control.",
      images: [
        "assets/image/product-3.jpg",
        "assets/image/product-3-detail-1.jpg",
        "assets/image/product-3-detail-2.jpg"
      ],
      features: [
        "Real-time monitoring",
        "Alerts and notifications",
        "Performance visibility",
        "Actionable reports"
      ]
    }
  ];

  const productModalElement = document.getElementById("productModal");
  const productModal = productModalElement
    ? new bootstrap.Modal(productModalElement)
    : null;

  document.querySelectorAll(".product-more").forEach(button => {
    button.addEventListener("click", () => {
      const product = products[Number(button.dataset.product)];
      if (!product) return;

      document.getElementById("modalProductTag").textContent = product.tag;
      document.getElementById("modalProductTitle").textContent = product.title;
      document.getElementById("modalProductDescription").textContent = product.description;

      const featuresList = document.getElementById("modalProductFeatures");
      featuresList.innerHTML = product.features
        .map(feature => `<li>${escapeHtml(feature)}</li>`)
        .join("");

      const gallery = document.getElementById("productGalleryInner");
      gallery.innerHTML = product.images.map((image, index) => `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
          <img src="${image}" alt="${escapeHtml(product.title)} detail ${index + 1}">
        </div>
      `).join("");

      productModal?.show();
    });
  });

  /* Small helper to avoid inserting untrusted text as HTML. */
  function escapeHtml(value) {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  }

  /* ---------------------------------------------------------
     CONTACT FORM
     This is FRONT-END validation only.
     A real production form must send data to a secure backend
     using HTTPS, server-side validation, CSRF protection,
     rate limiting and secure email/database handling.
     --------------------------------------------------------- */
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm?.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add("was-validated");
      formStatus.textContent = "Please complete all required fields.";
      return;
    }

    formStatus.textContent = "Demo form submitted successfully. Connect this form to your secure backend.";
    formStatus.style.color = "#1a7f37";
    contactForm.reset();
    contactForm.classList.remove("was-validated");
  });

  /* ---------------------------------------------------------
     YEAR
     --------------------------------------------------------- */
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
