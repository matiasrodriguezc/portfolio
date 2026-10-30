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

  // iOS never hands a swipe from a scrolling slide body over to the page: once
  // the body is at its end it just bounces. A swipe that starts at that edge
  // and keeps going the same way changes chapter instead, one per gesture.
  const SWIPE_THRESHOLD = 50;
  let swipe = null;

  document.addEventListener(
    "touchstart",
    (event) => {
      swipe = null;
      if (event.touches.length !== 1 || isAnimating) return;
      const target = event.target instanceof Element ? event.target : null;
      const body = target && target.closest(".slide__body");
      if (!body || target.closest(".deck")) return;
      if (body.scrollHeight <= body.clientHeight + 1) return; // the page scrolls natively
      const touch = event.touches[0];
      swipe = {
        x: touch.clientX,
        y: touch.clientY,
        atTop: body.scrollTop <= 0,
        atBottom: body.scrollTop + body.clientHeight >= body.scrollHeight - 1,
        mode: null,
        done: false,
      };
    },
    { passive: true },
  );

  document.addEventListener(
    "touchmove",
    (event) => {
      if (!swipe) return;
      const touch = event.touches[0];
      const dx = touch.clientX - swipe.x;
      const dy = touch.clientY - swipe.y;

      // Decide on the first movement, before iOS commits to a scroll
      if (!swipe.mode) {
        if (dx === 0 && dy === 0) return;
        const vertical = Math.abs(dy) >= Math.abs(dx);
        const pastEdge = (dy < 0 && swipe.atBottom) || (dy > 0 && swipe.atTop);
        swipe.mode = vertical && pastEdge ? "chapter" : "native";
      }
      if (swipe.mode !== "chapter") return;

      event.preventDefault();
      if (!swipe.done && Math.abs(dy) > SWIPE_THRESHOLD) {
        swipe.done = true;
        scrollToChapter(currentChapterIndex() + (dy < 0 ? 1 : -1));
      }
    },
    { passive: false },
  );

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

    // While a smooth scroll is under way, taps count from where it is heading,
    // not from wherever the track happens to be mid-flight
    let headingTo = null;
    let headingTimer = null;
    const forgetHeading = () => {
      clearTimeout(headingTimer);
      headingTimer = setTimeout(() => {
        headingTo = null;
      }, 160);
    };
    const getTarget = () => (headingTo === null ? getIndex() : headingTo);

    function goTo(index, behavior = scrollBehavior) {
      const target = Math.max(0, Math.min(items.length - 1, index));
      headingTo = target;
      forgetHeading();
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
        if (headingTo !== null) forgetHeading();
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      },
      { passive: true },
    );

    prevButton.addEventListener("click", () => goTo(getTarget() - 1));
    nextButton.addEventListener("click", () => goTo(getTarget() + 1));

    // Table-of-contents buttons on intro slides
    chapter.querySelectorAll("[data-goto]").forEach((button) => {
      button.addEventListener("click", () => goTo(Number(button.dataset.goto)));
    });

    enableDragScroll(track, getIndex, goTo);

    carousels.push({ chapter, track, getIndex, getTarget, goTo });
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
      if (event.target.closest("a, button, input, textarea, .deck")) return;
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

  // ========== CERTIFICATE DECKS ==========
  // Drag the top card off the pile to see the next certificate; once the
  // pile is empty it deals itself again.
  const THROW_DISTANCE = 80;
  const THROW_DURATION = 500;
  const SETTLE_DURATION = 450;
  const DEAL_STAGGER = 70;
  const LIFT = "scale(1.06)";

  // Every custom property in our own stylesheet, so a card lifted out of its
  // slide can take the slide's theme along
  const themeProperties = new Set();
  const collectProperties = (rules) => {
    [...rules].forEach((rule) => {
      if (rule.cssRules) collectProperties(rule.cssRules);
      if (!rule.style) return;
      [...rule.style].forEach((name) => {
        if (name.startsWith("--")) themeProperties.add(name);
      });
    });
  };
  [...document.styleSheets].forEach((sheet) => {
    try {
      collectProperties(sheet.cssRules);
    } catch (error) {
      // Cross-origin sheets (fonts, icons) can't be read and hold no tokens
    }
  });
  const inheritedProperties = ["color", "font-family", "font-style", "font-weight", "line-height", "letter-spacing"];

  document.querySelectorAll(".deck").forEach((deck) => {
    const cards = [...deck.querySelectorAll(".credential")];
    const count = deck.parentElement.querySelector(".deck__count");
    const themed = deck.closest("[data-theme]");
    let pile = [...cards];
    let drag = null;
    let settleTimer = null;

    // Held and thrown cards ride in a layer on <body>: iOS clips even fixed
    // elements to the scrolling slide body around them
    const layer = document.createElement("div");
    layer.className = "deck-layer";
    layer.setAttribute("aria-hidden", "true");
    if (themed) layer.dataset.theme = themed.dataset.theme;

    function dressLayer() {
      const styles = getComputedStyle(deck);
      themeProperties.forEach((name) => layer.style.setProperty(name, styles.getPropertyValue(name)));
      inheritedProperties.forEach((name) => layer.style.setProperty(name, styles.getPropertyValue(name)));
      if (!layer.isConnected) document.body.appendChild(layer);
    }

    function hold() {
      clearTimeout(settleTimer);
    }

    function settle(delay, card) {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        if (!drag || drag.card !== card) reattach(card);
      }, delay);
    }

    // Pin the card to the viewport at the exact spot it occupies, then lift it
    // into the layer so nothing on the slide can clip it while it travels
    function detach(card) {
      if (card.classList.contains("is-detached")) return;
      const transform = card.style.transform;
      card.style.transition = "none";
      card.style.transform = "none";
      const rect = card.getBoundingClientRect();
      card.style.left = `${rect.left}px`;
      card.style.top = `${rect.top}px`;
      card.style.width = `${rect.width}px`;
      card.classList.add("is-detached");
      dressLayer();
      layer.appendChild(card);
      card.style.transform = transform;
      void card.offsetWidth;
      card.style.transition = "";
    }

    // Back into the pile, in its original place in the markup
    function reattach(card) {
      if (!card.classList.contains("is-detached")) return;
      const next = cards.slice(cards.indexOf(card) + 1).find((other) => other.parentElement === deck);
      deck.insertBefore(card, next || null);
      card.classList.remove("is-detached");
      card.style.left = "";
      card.style.top = "";
      card.style.width = "";
    }

    // data-pos drives the stacked look: 0 is the top card, 3+ sit hidden behind
    function layout() {
      pile.forEach((card, index) => {
        card.dataset.pos = String(Math.min(index, 3));
        card.style.zIndex = String(pile.length - index);
      });
      if (count) {
        const current = Math.min(cards.length - pile.length + 1, cards.length);
        count.textContent = `${current} / ${cards.length}`;
      }
    }

    function refill() {
      pile = [...cards];
      // Bottom cards land first, the top one last
      pile.forEach((card, index) => {
        card.style.transitionDelay = `${(pile.length - 1 - index) * DEAL_STAGGER}ms`;
      });
      layout();
      setTimeout(() => {
        cards.forEach((card) => {
          card.style.transitionDelay = "";
        });
      }, pile.length * DEAL_STAGGER + 500);
    }

    function throwTop(dx, dy) {
      const card = pile.shift();
      if (!card) return;

      // Fly well past the board, in the direction it was thrown
      const length = Math.hypot(dx, dy) || 1;
      const reach = Math.max(window.innerWidth, window.innerHeight) * 0.7;
      const x = (dx / length) * reach;
      const y = (dy / length) * reach;
      hold();
      detach(card);
      card.dataset.pos = "thrown";
      card.style.zIndex = String(cards.length + 1);
      card.style.transform = `translate(${x}px, ${y}px) rotate(${x / 12}deg) ${LIFT}`;
      layout();

      setTimeout(() => {
        card.dataset.pos = "gone";
        card.style.transform = "";
        reattach(card);
        if (!pile.length) refill();
      }, THROW_DURATION);
    }

    deck.addEventListener("pointerdown", (event) => {
      const card = pile[0];
      if (!card || event.button > 0) return;
      // The card is about to leave the deck, so the track's drag-to-scroll
      // could no longer tell this press started on a deck
      event.stopPropagation();
      drag = { card, id: event.pointerId, x: event.clientX, y: event.clientY, dx: 0, dy: 0 };
      hold();
      detach(card);
      card.classList.add("is-dragging");
      // Lift it off the pile as soon as it is pressed
      card.style.transform = `rotate(var(--tilt)) ${LIFT}`;
      try {
        deck.setPointerCapture(event.pointerId);
      } catch (error) {
        // Pointer already released; the drag still ends on pointerup
      }
    });

    deck.addEventListener("pointermove", (event) => {
      if (!drag || event.pointerId !== drag.id) return;
      drag.dx = event.clientX - drag.x;
      drag.dy = event.clientY - drag.y;
      drag.card.style.transform =
        `translate(${drag.dx}px, ${drag.dy}px) rotate(calc(var(--tilt) + ${drag.dx / 14}deg)) ${LIFT}`;
    });

    function release(event) {
      if (!drag || event.pointerId !== drag.id) return;
      const { card, dx, dy } = drag;
      drag = null;
      card.classList.remove("is-dragging");
      if (Math.hypot(dx, dy) > THROW_DISTANCE) {
        throwTop(dx, dy);
      } else {
        // Not far enough: spring back onto the pile
        card.style.transform = "";
        settle(SETTLE_DURATION, card);
      }
    }

    deck.addEventListener("pointerup", release);
    deck.addEventListener("pointercancel", release);

    // Press-and-hold must stay a drag: no iOS long-press menu, selection or
    // native drag, any of which would cancel the pointer mid-gesture. The layer
    // needs it too: the card already sits there when touchstart arrives.
    [deck, layer].forEach((surface) => {
      surface.addEventListener("touchstart", (event) => event.preventDefault(), { passive: false });
      surface.addEventListener("contextmenu", (event) => event.preventDefault());
      surface.addEventListener("dragstart", (event) => event.preventDefault());
    });

    // Enter / Space deal the next card for keyboard users
    deck.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopPropagation();
      throwTop(1, -0.25);
    });

    layout();
  });

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
    carousel.goTo(carousel.getTarget() + (event.key === "ArrowRight" ? 1 : -1));
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

    document.querySelectorAll("[data-i18n-href]").forEach((el) => {
      const value = dict[el.dataset.i18nHref];
      if (value !== undefined) el.setAttribute("href", value);
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

  // Writes the streamed answer a few characters per frame so it reads as typing,
  // even when the model sends whole sentences at once.
  function createTypewriter(element) {
    let shown = "";
    let target = "";
    let frame = null;
    let onFinish = null;

    function step() {
      const pending = target.length - shown.length;
      if (pending <= 0) {
        frame = null;
        if (onFinish) onFinish();
        return;
      }
      // Speeds up when it falls behind, so the text never lags far behind the stream
      const count = prefersReducedMotion ? pending : Math.max(1, Math.ceil(pending / 30));
      shown = target.slice(0, shown.length + count);
      element.textContent = shown;
      chatMessages.scrollTop = chatMessages.scrollHeight;
      frame = requestAnimationFrame(step);
    }

    return {
      push(text) {
        target += text;
        if (!frame) frame = requestAnimationFrame(step);
      },
      finished() {
        return new Promise((resolve) => {
          onFinish = resolve;
          if (!frame) step();
        });
      },
      stop() {
        if (frame) cancelAnimationFrame(frame);
        frame = null;
      },
      hasText() {
        return target.length > 0;
      },
    };
  }

  async function handleSendMessage() {
    const messageText = chatInput.value.trim();
    if (!messageText) return;

    addChatMessage("user", messageText);
    chatInput.value = "";

    const botMessageElement = addChatMessage("bot", "");
    botMessageElement.classList.add("loading");
    const typewriter = createTypewriter(botMessageElement);

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

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        if (!text) continue;

        if (!typewriter.hasText()) {
          botMessageElement.classList.remove("loading");
          botMessageElement.classList.add("streaming");
        }
        typewriter.push(text);
      }
      typewriter.push(decoder.decode());

      if (!typewriter.hasText()) {
        throw new Error("Empty response.");
      }
      await typewriter.finished();
    } catch (error) {
      console.error("Error contacting the chatbot:", error);
      botMessageElement.classList.remove("loading");
      // Keep a partial answer if the connection dropped halfway through
      if (!typewriter.hasText()) {
        typewriter.stop();
        botMessageElement.textContent = translations[currentLanguage]["chat.error"];
      }
    } finally {
      botMessageElement.classList.remove("streaming");
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
