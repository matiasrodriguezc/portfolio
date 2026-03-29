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

  const openChatButton = document.getElementById("open-rag-chat")
  const chatWidgetContainerElement = document.querySelector(".chat-widget-container")
  // Asegúrate de que esta variable chatMessages esté disponible globalmente o pásala como parámetro.
  const chatMessagesElement = document.getElementById("chat-messages"); // Asegura que se defina aquí

  if (openChatButton && chatWidgetContainerElement) {
    openChatButton.addEventListener("click", (event) => {
      event.preventDefault()

      // 1. Abre el chat
      chatWidgetContainerElement.classList.add("open")

      // 2. Muestra el mensaje de bienvenida SOLO si el chat está vacío
      if (chatMessagesElement && chatMessagesElement.children.length === 0) {
        showBotWelcomeMessage();
      }

      // 3. Desplaza la vista al chat
      chatWidgetContainerElement.scrollIntoView({ behavior: "smooth", block: "end" })
    })
  }

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
      document.title = "Matías Rodríguez | Ing. en Sistemas"
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          "content",
          "Portfolio profesional de Matías Rodríguez Cárdenas, Ingeniero en Sistemas especializado en desarrollo de software y arquitectura de sistemas.",
        )
    } else {
      document.title = "Matías Rodríguez | Systems Engineer"
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

      // Update project links text
      const projectLinks = card.querySelectorAll(".project-links .btn")
      projectLinks.forEach((link) => {
        if (link.querySelector(".fa-github")) {
          const textNode = link.querySelector("i").nextSibling
          if (textNode) textNode.textContent = ` ${translations[lang]["projects.code"]}`
        } else if (link.querySelector(".fa-info-circle")) {
          const textNode = link.querySelector("i").nextSibling
          if (textNode) textNode.textContent = ` ${translations[lang]["projects.info"]}`
        } else if (link.textContent.trim().toLowerCase().includes("demo")) {
          // For demo buttons, they might have an img or just text
          const img = link.querySelector("img")
          if (img) {
            link.innerHTML = ""
            link.appendChild(img)
            link.appendChild(document.createTextNode(` ${translations[lang]["projects.demo"]}`))
          } else {
            const icon = link.querySelector("i")
            if (icon) {
              link.innerHTML = ""
              link.appendChild(icon)
              link.appendChild(document.createTextNode(` ${translations[lang]["projects.demo"]}`))
            } else {
              link.textContent = translations[lang]["projects.demo"]
            }
          }
        }
      })
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
    const expItems = document.querySelectorAll("section#experience .timeline-item")
    expItems.forEach((item, index) => {
      const titleEl = item.querySelector(".timeline-title")
      const companyEl = item.querySelector(".timeline-company")
      const periodEl = item.querySelector(".timeline-period")
      const descEl = item.querySelector(".timeline-description")
      if (titleEl) titleEl.textContent = translations[lang][`exp${index + 1}.role`]
      if (companyEl) companyEl.textContent = translations[lang][`exp${index + 1}.company`]
      if (periodEl) periodEl.textContent = translations[lang][`exp${index + 1}.period`]
      if (descEl) descEl.textContent = translations[lang][`exp${index + 1}.description`]
    })

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
  // ========== CHATBOT LOGIC ==========
  const chatToggleButton = document.getElementById("chat-toggle");
  const chatWidgetContainer = document.querySelector(".chat-widget-container");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatSendButton = document.getElementById("chat-send");
  const chatTitle = document.getElementById("chat-title");

  // Función para añadir un mensaje a la UI
  function addChatMessage(sender, text) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", sender); // 'user' o 'bot'
    messageElement.textContent = text;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll al final
    return messageElement;
  }

  // Función para el mensaje de bienvenida del bot
  function showBotWelcomeMessage() {
    // Limpia solo el mensaje de bienvenida anterior para evitar duplicados
    const oldWelcome = chatMessages.querySelector(".bot-welcome");
    if (oldWelcome) {
      chatMessages.removeChild(oldWelcome);
    }
    // Añade el nuevo mensaje traducido
    const welcomeMsg = addChatMessage("bot", translations[currentLanguage]["chat.intro"]);
    welcomeMsg.classList.add("bot-welcome");
  }

  // Función para manejar el envío de mensajes
  // Reemplaza tu función handleSendMessage con esta
  async function handleSendMessage() {
    const messageText = chatInput.value.trim();
    if (!messageText) return;

    // 1. Muestra el mensaje del usuario
    addChatMessage("user", messageText);
    chatInput.value = ""; // Limpia el input

    // 2. Crea un elemento vacío para el bot y AÑADE LA CLASE 'loading'
    // El CSS que acabamos de añadir se encargará de mostrar los "..." animados
    const botMessageElement = addChatMessage("bot", "");
    botMessageElement.classList.add("loading");
    chatMessages.scrollTop = chatMessages.scrollHeight; // Baja el scroll

    try {
      const API_URL = "https://ideal-noella-matiasrodriguezc-d1b4fcbc.koyeb.app/ask";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: messageText }),
      });

      if (!response.ok || !response.body) {
        throw new Error("La respuesta de la red no fue válida.");
      }

      // 4. Lee el Stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";
      let isFirstChunk = true; // Para saber cuándo quitar la animación

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        // ¡Aquí está la magia!
        if (isFirstChunk) {
          // 3. QUITA la clase 'loading' en cuanto llega el primer trozo
          botMessageElement.classList.remove("loading");
          isFirstChunk = false;
        }

        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;
        botMessageElement.textContent = fullResponse; // Actualiza el texto en tiempo real
        chatMessages.scrollTop = chatMessages.scrollHeight; // Sigue bajando
      }

    } catch (error) {
      console.error("Error al contactar al chatbot:", error);
      botMessageElement.classList.remove("loading"); // Quita el "loading" si hay un error
      botMessageElement.textContent = translations[currentLanguage]["chat.error"];
    }
  }

  // --- Event Listeners del Chat ---
  chatToggleButton.addEventListener("click", () => {
    chatWidgetContainer.classList.toggle("open");
    // Si se acaba de abrir, muestra el mensaje de bienvenida si no hay mensajes
    if (chatWidgetContainer.classList.contains("open") && chatMessages.children.length === 0) {
      showBotWelcomeMessage();
    }
  });

  chatSendButton.addEventListener("click", handleSendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // --- Integración con la función de idioma existente ---
  // Guardamos la función setLanguage original que cargaste de main.js
  const originalSetLanguage = window.setLanguage;

  // Re-definimos setLanguage para que haga lo de antes Y ADEMÁS actualice el chat
  window.setLanguage = (lang) => {
    originalSetLanguage(lang); // Llama a la lógica original de tu portafolio

    // Ahora, actualiza el texto del chat
    chatTitle.textContent = translations[lang]["chat.title"];
    chatInput.placeholder = translations[lang]["chat.placeholder"];

    // Actualiza el mensaje de bienvenida si existe
    const welcomeMsg = chatMessages.querySelector(".bot-welcome");
    if (welcomeMsg) {
      welcomeMsg.textContent = translations[lang]["chat.intro"];
    }
  };

  // Llama a la lógica de idioma una vez al cargar para establecer el texto inicial del chat
  window.setLanguage(currentLanguage);

  // ========== END CHATBOT LOGIC ==========
})
