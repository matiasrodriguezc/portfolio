document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  // localStorage can throw in private mode or with blocked storage
  const storage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        // Preference just won't persist
      }
    },
  };

  let currentLanguage = storage.get("language") || "es";

  // ========== ACTIVE SLIDE → SITE-WIDE IDENTITY ==========
  // Every slide carries a [data-theme]; the most visible one becomes "active"
  // and its tokens are copied to --chrome-* so header, controls and page
  // background take on that identity.
  const slides = document.querySelectorAll(".slide");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const navLinks = document.querySelectorAll(".nav-link, .chapter-dots a");
  const chromeTokens = ["bg", "ink", "muted", "line", "accent", "on-accent"];
  const visibility = new Map();
  let activeSlide = null;

  function activateSlide(slide) {
    if (slide === activeSlide) return;
    if (activeSlide) activeSlide.classList.remove("is-active");
    activeSlide = slide;
    slide.classList.add("is-active", "is-seen");

    const styles = getComputedStyle(slide);
    chromeTokens.forEach((token) => {
      root.style.setProperty(`--chrome-${token}`, styles.getPropertyValue(`--${token}`).trim());
    });
    root.style.setProperty("--chrome-display", styles.getPropertyValue("--font-display").trim());
    themeMeta.setAttribute("content", styles.getPropertyValue("--bg").trim());

    const chapterId = slide.closest(".chapter").id;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.section === chapterId);
    });
  }

  const slideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => visibility.set(entry.target, entry.intersectionRatio));

      let bestSlide = null;
      let bestRatio = 0;
      visibility.forEach((ratio, slide) => {
        if (ratio > bestRatio) {
          bestSlide = slide;
          bestRatio = ratio;
        }
      });

      // During a chapter animation the target slide is already active
      if (isAnimating) return;
      if (bestSlide && bestRatio >= 0.5) activateSlide(bestSlide);
    },
    { threshold: [0, 0.25, 0.5, 0.75, 1] },
  );

  slides.forEach((slide) => slideObserver.observe(slide));

  // ========== VERTICAL: ONE CHAPTER AT A TIME ==========
  // Chapter changes are animated here instead of relying on CSS snapping:
  // native smooth scrolling differs per browser, fights mandatory snap and
  // lets fast flicks skip chapters.
  const chapters = [...document.querySelectorAll(".chapter")];
  const WHEEL_THRESHOLD = 12;
  const GESTURE_GAP = 140;
  const CHAPTER_DURATION = 620;
  const recentDeltas = [];
  let lastWheelTime = 0;
  let gestureDelta = 0;
  let gestureHandled = false;
  let isAnimating = false;
  let animationFrame = null;

  function currentChapterIndex() {
    let closest = 0;
    chapters.forEach((chapter, index) => {
      if (Math.abs(chapter.offsetTop - root.scrollTop) < Math.abs(chapters[closest].offsetTop - root.scrollTop)) {
        closest = index;
      }
    });
    return closest;
  }

  // The slide the user will land on (horizontal chapters keep their position)
  function visibleSlideOf(chapter) {
    const track = chapter.querySelector(".h-track");
    if (!track) return chapter.querySelector(".slide");
    const items = track.querySelectorAll(".slide");
    return items[Math.round(track.scrollLeft / track.clientWidth)] || items[0];
  }

  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  function scrollToChapter(index) {
    const target = chapters[Math.max(0, Math.min(chapters.length - 1, index))];
    const from = root.scrollTop;
    const distance = target.offsetTop - from;
    if (distance === 0) return;

    // Theme and reveal start together with the movement, not after it
    activateSlide(visibleSlideOf(target));

    cancelAnimationFrame(animationFrame);
    root.style.scrollSnapType = "none";
    root.style.scrollBehavior = "auto";
    isAnimating = true;

    const finish = () => {
      root.scrollTop = target.offsetTop;
      root.style.scrollSnapType = "";
      root.style.scrollBehavior = "";
      isAnimating = false;
    };

    if (prefersReducedMotion) {
      finish();
      return;
    }

    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - startTime) / CHAPTER_DURATION);
      root.scrollTop = from + distance * easeOutQuart(progress);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        finish();
      }
    };
    animationFrame = requestAnimationFrame(step);
  }

  window.addEventListener(
    "wheel",
    (event) => {
      if (event.ctrlKey || event.shiftKey) return; // pinch-zoom / horizontal intent
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return; // sideways swipe → tracks
      const target = event.target instanceof Element ? event.target : document.body;
      if (target.closest(".chat-widget, .mobile-nav")) return;

      // Let a slide that overflows (small screens) scroll before changing chapter
      const body = target.closest(".slide__body");
      if (body && body.scrollHeight > body.clientHeight + 1) {
        const atTop = body.scrollTop <= 0;
        const atBottom = body.scrollTop + body.clientHeight >= body.scrollHeight - 1;
        if ((event.deltaY > 0 && !atBottom) || (event.deltaY < 0 && !atTop)) return;
      }

      event.preventDefault();

      const now = performance.now();
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;
      const magnitude = Math.abs(delta);

      // A pause starts a new gesture…
      if (now - lastWheelTime > GESTURE_GAP) {
        recentDeltas.length = 0;
        gestureDelta = 0;
        gestureHandled = false;
      }
      lastWheelTime = now;

      // …and so does a fresh swipe on top of a decaying inertia tail
      const recentPeak = Math.max(0, ...recentDeltas.slice(-5));
      const isAccelerating = recentDeltas.length >= 5 && magnitude > 10 && magnitude > recentPeak * 1.5;
      recentDeltas.push(magnitude);
      if (recentDeltas.length > 12) recentDeltas.shift();
      if (gestureHandled && isAccelerating && !isAnimating) {
        gestureDelta = 0;
        gestureHandled = false;
      }

      if (gestureHandled || isAnimating) return;

      // Trackpads start with tiny deltas, so accumulate before deciding
      gestureDelta += delta;
      if (Math.abs(gestureDelta) < WHEEL_THRESHOLD) return;

      gestureHandled = true;
      scrollToChapter(currentChapterIndex() + Math.sign(gestureDelta));
    },
    { passive: false },
  );

  // In-page links to chapters use the same controlled scroll
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const index = chapters.findIndex((chapter) => `#${chapter.id}` === link.getAttribute("href"));
    if (index === -1) return;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      scrollToChapter(index);
    });
  });

  // ========== HORIZONTAL CHAPTERS ==========
  const carousels = [];

  document.querySelectorAll(".chapter--h").forEach((chapter) => {
    const track = chapter.querySelector(".h-track");
    const items = track.querySelectorAll(".slide");
    const counter = chapter.querySelector(".h-counter b");
    const total = chapter.querySelector(".h-counter span");
    const bar = chapter.querySelector(".h-bar i");
    const prevButton = chapter.querySelector('.h-btn[data-dir="-1"]');
    const nextButton = chapter.querySelector('.h-btn[data-dir="1"]');
    const pad = (n) => String(n).padStart(2, "0");

    const getIndex = () => Math.round(track.scrollLeft / track.clientWidth);

    function goTo(index, behavior = scrollBehavior) {
      const target = Math.max(0, Math.min(items.length - 1, index));
      track.scrollTo({ left: target * track.clientWidth, behavior });
    }

    function update() {
      const index = getIndex();
      counter.textContent = pad(index + 1);
      bar.style.setProperty("--p", (index + 1) / items.length);
      prevButton.disabled = index === 0;
      nextButton.disabled = index === items.length - 1;
    }

    total.textContent = pad(items.length);
    update();

    let ticking = false;
    track.addEventListener(
      "scroll",
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      },
      { passive: true },
    );

    prevButton.addEventListener("click", () => goTo(getIndex() - 1));
    nextButton.addEventListener("click", () => goTo(getIndex() + 1));

    // Table-of-contents buttons on intro slides
    chapter.querySelectorAll("[data-goto]").forEach((button) => {
      button.addEventListener("click", () => goTo(Number(button.dataset.goto)));
    });

    enableDragScroll(track, getIndex, goTo);

    carousels.push({ chapter, track, getIndex, goTo });
  });

  // Click-and-drag for mouse users (touch and trackpads scroll natively)
  function enableDragScroll(track, getIndex, goTo) {
    let startX = 0;
    let startScroll = 0;
    let startIndex = 0;
    let isDragging = false;
    let hasMoved = false;

    track.addEventListener("pointerdown", (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      if (event.target.closest("a, button, input, textarea")) return;
      isDragging = true;
      hasMoved = false;
      startX = event.clientX;
      startScroll = track.scrollLeft;
      startIndex = getIndex();
    });

    track.addEventListener("pointermove", (event) => {
      if (!isDragging) return;
      const deltaX = event.clientX - startX;
      if (!hasMoved && Math.abs(deltaX) > 5) {
        hasMoved = true;
        track.classList.add("is-dragging");
        try {
          track.setPointerCapture(event.pointerId);
        } catch (error) {
          // Pointer already released; dragging still works without capture
        }
      }
      if (hasMoved) track.scrollLeft = startScroll - deltaX;
    });

    function endDrag(event) {
      if (!isDragging) return;
      isDragging = false;
      if (!hasMoved) return;

      const deltaX = event.clientX - startX;
      let target = startIndex;
      if (deltaX < -60) target += 1;
      if (deltaX > 60) target -= 1;

      // Keep snapping off until the programmatic scroll settles
      const restoreSnap = () => track.classList.remove("is-dragging");
      if ("onscrollend" in window) {
        track.addEventListener("scrollend", restoreSnap, { once: true });
      }
      setTimeout(restoreSnap, 700);
      goTo(target, scrollBehavior);
    }

    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
  }

  // ← → move inside the active horizontal chapter
  document.addEventListener("keydown", (event) => {
    if (event.target.closest("input, textarea")) return;

    // ↑ ↓ / PageUp / PageDown / Space move between chapters
    const verticalKeys = { ArrowDown: 1, PageDown: 1, " ": 1, ArrowUp: -1, PageUp: -1 };
    if (event.key in verticalKeys && !event.altKey && !event.metaKey && !event.ctrlKey) {
      if (event.key === " " && event.target.closest("button, a")) return;
      event.preventDefault();
      if (isAnimating) return;
      const direction = event.key === " " && event.shiftKey ? -1 : verticalKeys[event.key];
      scrollToChapter(currentChapterIndex() + direction);
      return;
    }

    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const chapter = activeSlide && activeSlide.closest(".chapter--h");
    const carousel = carousels.find((item) => item.chapter === chapter);
    if (!carousel) return;
    event.preventDefault();
    carousel.goTo(carousel.getIndex() + (event.key === "ArrowRight" ? 1 : -1));
  });

  // Keep tracks aligned to a slide after resizing
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      carousels.forEach((carousel) => carousel.goTo(carousel.getIndex(), "auto"));
    }, 120);
  });

  // ========== HEADER & NAVIGATION ==========
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  function setMobileMenu(isOpen) {
    mobileNav.classList.toggle("open", isOpen);
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
    const icon = mobileMenuToggle.querySelector("i");
    icon.classList.toggle("fa-bars", !isOpen);
    icon.classList.toggle("fa-times", isOpen);
  }

  mobileMenuToggle.addEventListener("click", () => {
    setMobileMenu(!mobileNav.classList.contains("open"));
  });

  document.querySelectorAll(".mobile-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => setMobileMenu(false));
  });

  document.getElementById("language-toggle").addEventListener("click", () => {
    setLanguage(currentLanguage === "es" ? "en" : "es");
  });

  // ========== I18N ==========
  function setLanguage(lang) {
    const dict = translations[lang] || translations.es;
    currentLanguage = translations[lang] ? lang : "es";
    storage.set("language", currentLanguage);
    root.lang = currentLanguage;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = dict[el.dataset.i18n];
      if (value !== undefined) el.textContent = value;
    });

    // Markup only ever comes from our own translations file
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const value = dict[el.dataset.i18nHtml];
      if (value !== undefined) el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const value = dict[el.dataset.i18nAria];
      if (value !== undefined) el.setAttribute("aria-label", value);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const value = dict[el.dataset.i18nPlaceholder];
      if (value !== undefined) el.setAttribute("placeholder", value);
    });

    document.title = dict["meta.title"];
    document.querySelector('meta[name="description"]').setAttribute("content", dict["meta.description"]);

    document.querySelectorAll(".copyright").forEach((el) => {
      el.textContent = `© ${new Date().getFullYear()} Matías Rodríguez Cárdenas. ${dict["footer.rights"]}`;
    });

    document.querySelectorAll(".lang-toggle [data-lang]").forEach((el) => {
      el.classList.toggle("is-current", el.dataset.lang === currentLanguage);
    });

    const welcomeMessage = document.querySelector("#chat-messages .bot-welcome");
    if (welcomeMessage) welcomeMessage.textContent = dict["chat.intro"];
  }

  setLanguage(currentLanguage);

  // ========== CHATBOT LOGIC ==========
  const chatToggleButton = document.getElementById("chat-toggle");
  const chatWidgetContainer = document.querySelector(".chat-widget-container");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatSendButton = document.getElementById("chat-send");
  const openChatButton = document.getElementById("open-rag-chat");

  function addChatMessage(sender, text) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message", sender); // 'user' or 'bot'
    messageElement.textContent = text;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageElement;
  }

  function showBotWelcomeMessage() {
    const oldWelcome = chatMessages.querySelector(".bot-welcome");
    if (oldWelcome) oldWelcome.remove();
    const welcomeMessage = addChatMessage("bot", translations[currentLanguage]["chat.intro"]);
    welcomeMessage.classList.add("bot-welcome");
  }

  function openChat() {
    chatWidgetContainer.classList.add("open");
    if (chatMessages.children.length === 0) showBotWelcomeMessage();
    chatInput.focus({ preventScroll: true });
  }

  async function handleSendMessage() {
    const messageText = chatInput.value.trim();
    if (!messageText) return;

    addChatMessage("user", messageText);
    chatInput.value = "";

    const botMessageElement = addChatMessage("bot", "");
    botMessageElement.classList.add("loading");

    try {
      const API_URL = "https://ideal-noella-matiasrodriguezc-d1b4fcbc.koyeb.app/ask";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: messageText }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Invalid network response.");
      }

      // Stream the answer as it arrives
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = "";
      let isFirstChunk = true;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        if (isFirstChunk) {
          botMessageElement.classList.remove("loading");
          isFirstChunk = false;
        }

        fullResponse += decoder.decode(value, { stream: true });
        botMessageElement.textContent = fullResponse;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    } catch (error) {
      console.error("Error contacting the chatbot:", error);
      botMessageElement.classList.remove("loading");
      botMessageElement.textContent = translations[currentLanguage]["chat.error"];
    }
  }

  chatToggleButton.addEventListener("click", () => {
    if (chatWidgetContainer.classList.contains("open")) {
      chatWidgetContainer.classList.remove("open");
    } else {
      openChat();
    }
  });

  if (openChatButton) {
    openChatButton.addEventListener("click", (event) => {
      event.preventDefault();
      openChat();
    });
  }

  chatSendButton.addEventListener("click", handleSendMessage);
  chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  });
  // ========== END CHATBOT LOGIC ==========
});
