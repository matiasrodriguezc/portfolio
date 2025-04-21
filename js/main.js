document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  })

  // Current year for footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Variables
  let currentLanguage = localStorage.getItem("language") || "es"
  let isDarkTheme = localStorage.getItem("theme") === "dark"

  // Apply saved theme
  if (isDarkTheme) {
    document.body.classList.add("dark-theme")
  }

  // Apply saved language
  setLanguage(currentLanguage)

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle")
  themeToggle.addEventListener("click", () => {
    isDarkTheme = !isDarkTheme
    document.body.classList.toggle("dark-theme")
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light")
  })

  // Language toggle
  const languageToggle = document.getElementById("language-toggle")
  languageToggle.addEventListener("click", () => {
    const newLanguage = currentLanguage === "es" ? "en" : "es"
    setLanguage(newLanguage)
  })

  // Language buttons in mobile menu
  const langButtons = document.querySelectorAll(".lang-btn")
  langButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang")
      setLanguage(lang)

      // Update active state
      langButtons.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const mobileNav = document.querySelector(".mobile-nav")

  mobileMenuToggle.addEventListener("click", function () {
    mobileNav.classList.toggle("open")
    this.querySelector("i").classList.toggle("fa-bars")
    this.querySelector("i").classList.toggle("fa-times")
  })

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-nav .nav-link")
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open")
      mobileMenuToggle.querySelector("i").classList.add("fa-bars")
      mobileMenuToggle.querySelector("i").classList.remove("fa-times")
    })
  })

  // Tabs functionality
  const tabButtons = document.querySelectorAll(".tab-btn")
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")

      // Hide all tab panes
      document.querySelectorAll(".tab-pane").forEach((pane) => {
        pane.classList.remove("active")
      })

      // Deactivate all tab buttons
      tabButtons.forEach((btn) => {
        btn.classList.remove("active")
      })

      // Activate the clicked tab button
      this.classList.add("active")

      // Show the corresponding tab pane
      document.getElementById(tabId).classList.add("active")
    })
  })

  // Dropdown functionality
  const dropdowns = document.querySelectorAll(".dropdown")
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle")
    toggle.addEventListener("click", (e) => {
      e.preventDefault()
      dropdown.classList.toggle("active")
    })

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active")
      }
    })
  })

  // Scroll to top button
  const scrollTopBtn = document.getElementById("scroll-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("visible")
    } else {
      scrollTopBtn.classList.remove("visible")
    }
  })

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Active navigation link on scroll
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  function highlightNavLink() {
    const scrollPosition = window.scrollY;
    let currentSectionId = null;
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        scrollPosition >= sectionTop - 150 &&
        scrollPosition < sectionTop + sectionHeight - 150
      ) {
        currentSectionId = section.getAttribute("id");
      }
    });

    const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
    if (isBottom) {
      const lastSection = sections[sections.length - 1];
      currentSectionId = lastSection.getAttribute("id");
    }
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink)

  // Function to set language
  function setLanguage(lang) {
    currentLanguage = lang
    localStorage.setItem("language", lang)
    document.documentElement.lang = lang

    // Update page title and meta description
    if (lang === "es") {
      document.title = "Matías Rodríguez Cárdenas | Ingeniero en Sistemas"
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          "content",
          "Portfolio profesional de Matías Rodríguez Cárdenas, Ingeniero en Sistemas especializado en desarrollo de software y arquitectura de sistemas.",
        )
    } else {
      document.title = "Matías Rodríguez Cárdenas | Systems Engineer"
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          "content",
          "Professional portfolio of Matías Rodríguez Cárdenas, Systems Engineer specialized in software development and systems architecture.",
        )
    }

    // Update navigation links
    document.querySelectorAll('.nav-link[data-section="about"]').forEach((el) => {
      el.textContent = translations[lang]["nav.about"]
    })
    document.querySelectorAll('.nav-link[data-section="skills"]').forEach((el) => {
      el.textContent = translations[lang]["nav.skills"]
    })
    document.querySelectorAll('.nav-link[data-section="projects"]').forEach((el) => {
      el.textContent = translations[lang]["nav.projects"]
    })
    document.querySelectorAll('.nav-link[data-section="experience"]').forEach((el) => {
      el.textContent = translations[lang]["nav.experience"]
    })
    document.querySelectorAll('.nav-link[data-section="contact"]').forEach((el) => {
      el.textContent = translations[lang]["nav.contact"]
    })

    // Update hero section
    document.querySelector(".hero-text .greeting").textContent = translations[lang]["hero.greeting"]
    document.querySelector(".hero-text .title").textContent = translations[lang]["hero.title"]
    document.querySelector(".hero-text .description").textContent = translations[lang]["hero.description"]
    document.querySelector(".hero-buttons .btn-primary").textContent = translations[lang]["hero.contact"]
    document.querySelector(".hero-buttons .btn-outline").textContent = translations[lang]["hero.projects"]
    

    // Update section titles
    document.querySelectorAll(".section-title").forEach((el) => {
      const section = el.closest("section")?.id
      if (section) {
        el.textContent = translations[lang][`${section}.title`]
      } else if (el.closest(".education-header")) {
        el.textContent = translations[lang]["education.title"]
      } else if (el.closest(".certification-header")) {
        el.textContent = translations[lang]["certification.title"]
      }
    })

    // Update about section
    const aboutTexts = document.querySelectorAll(".about-text p")
    if (aboutTexts.length >= 3) {
      aboutTexts[0].textContent = translations[lang]["about.p1"]
      aboutTexts[1].textContent = translations[lang]["about.p2"]
      aboutTexts[2].textContent = translations[lang]["about.p3"]
    }

    // Update info labels
    document.querySelectorAll(".info-item h3").forEach((el, index) => {
      const keys = ["about.name", "about.email", "about.location", "about.availability"]
      if (index < keys.length) {
        el.textContent = translations[lang][keys[index]]
      }
    })

    // Update availability text
    const availabilityText = document.querySelector(".info-item:nth-child(4) p")
    if (availabilityText) {
      availabilityText.textContent = translations[lang]["about.fulltime"]
    }

    // Update CV download button
    const cvButton = document.querySelector(".dropdown-toggle span")
    if (cvButton) {
      cvButton.textContent = translations[lang]["about.downloadCV"]
    }

    // Update CV language options
    const cvOptions = document.querySelectorAll(".dropdown-item")
    if (cvOptions.length >= 2) {
      cvOptions[0].textContent = translations[lang]["about.spanish"]
      cvOptions[1].textContent = translations[lang]["about.english"]
    }

    // Update skills tabs
    document.querySelectorAll(".tab-btn").forEach((el, index) => {
      const keys = ["skills.development", "skills.infrastructure", "skills.tools"]
      if (index < keys.length) {
        el.textContent = translations[lang][keys[index]]
      }
    })

    // Update project cards
    document.querySelectorAll(".project-card").forEach((card, index) => {
      const titleKey = `project${index + 1}.title`
      const descKey = `project${index + 1}.description`

      if (translations[lang][titleKey]) {
        card.querySelector(".project-title").textContent = translations[lang][titleKey]
      }

      if (translations[lang][descKey]) {
        card.querySelector(".project-description").textContent = translations[lang][descKey]
      }

      // Update code button text
      const codeBtn = card.querySelector(".project-links .btn-outline")
      if (codeBtn) {
        const codeText = codeBtn.querySelector("i").nextSibling
        codeText.textContent = ` ${translations[lang]["projects.code"]}`
      }
    })

    const experienceTitle = document.querySelector("section#experience > .container > .section-header > .section-title")
    if (experienceTitle) {
      experienceTitle.textContent = translations[lang]["experience.title"]
    }

    const educationTitle = document.querySelector(".education-header .section-title")
    if (educationTitle) {
      educationTitle.textContent = translations[lang]["education.title"]
    }

    const certificationTitle = document.querySelector(".certification-header .section-title")
    if (certificationTitle) {
      certificationTitle.textContent = translations[lang]["certification.title"]
    }
    
    // Update Experience Sec.
    const expItem = document.querySelector("section#experience > .container > .timeline > .timeline-item")
    if (expItem) {
      const titleEl = expItem.querySelector(".timeline-title")
      const companyEl = expItem.querySelector(".timeline-company")
      const periodEl = expItem.querySelector(".timeline-period")
      const descEl = expItem.querySelector(".timeline-description")

      if (titleEl) titleEl.textContent = translations[lang]["exp1.role"]
      if (companyEl) companyEl.textContent = translations[lang]["exp1.company"]
      if (periodEl) periodEl.textContent = translations[lang]["exp1.period"]
      if (descEl) descEl.textContent = translations[lang]["exp1.description"]
    }

    // Update Education Section
    const eduItems = document.querySelectorAll(".education-header + .timeline .timeline-item")
    eduItems.forEach((item, index) => {
      const eduIndex = index + 1
      const titleEl = item.querySelector(".timeline-title")
      const instEl = item.querySelector(".timeline-company")
      const periodEl = item.querySelector(".timeline-period")
      const descEl = item.querySelector(".timeline-description")

      if (titleEl) titleEl.textContent = translations[lang][`edu${eduIndex}.degree`]
      if (instEl) instEl.textContent = translations[lang][`edu${eduIndex}.institution`]
      if (periodEl) periodEl.textContent = translations[lang][`edu${eduIndex}.period`]
      if (descEl) descEl.textContent = translations[lang][`edu${eduIndex}.description`]
    })

    // Update Certification Section
    const certItems = document.querySelectorAll(".certification-header + .timeline .timeline-item")
    certItems.forEach((item, index) => {
      const certIndex = index + 1
      const titleEl = item.querySelector(".timeline-title")
      const instEl = item.querySelector(".timeline-company")
      const periodEl = item.querySelector(".timeline-period")

      if (titleEl) titleEl.textContent = translations[lang][`cert${certIndex}.degree`]
      if (instEl) instEl.textContent = translations[lang][`cert${certIndex}.institution`]
      if (periodEl) periodEl.textContent = translations[lang][`cert${certIndex}.period`]
    })

    // Update contact section
    const contactDesc = document.querySelector(".contact-description p")
    if (contactDesc) {
      contactDesc.textContent = translations[lang]["contact.description"]
    }

    // Update contact method titles
    document.querySelectorAll(".contact-details h3").forEach((el, index) => {
      const keys = ["contact.email", "contact.linkedin", "contact.github"]
      if (index < keys.length) {
        el.textContent = translations[lang][keys[index]]
      }
    })

    // Update footer copyright
    const copyright = document.querySelector(".copyright")
    if (copyright) {
      copyright.textContent = `© ${new Date().getFullYear()} Matías Rodríguez Cárdenas. ${translations[lang]["footer.rights"]}`
    }

    // Update language buttons
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang)
    })
  }
})
