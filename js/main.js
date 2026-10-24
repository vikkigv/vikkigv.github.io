// Vignesh G — portfolio interactions
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----- Footer year ----- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ----- Mobile nav toggle ----- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----- Typewriter ----- */
  var roles = [
    "Senior Backend Developer",
    "FastAPI & Django Specialist",
    "Event-Driven Systems Builder",
    "AI-Powered Products (LangChain · RAG)"
  ];

  var typedEl = document.getElementById("typed");

  if (typedEl) {
    if (prefersReduced) {
      typedEl.textContent = roles[0];
    } else {
      var roleIndex = 0;
      var charIndex = 0;
      var deleting = false;

      function tick() {
        var current = roles[roleIndex];
        var delay;

        if (!deleting) {
          charIndex += 1;
          delay = 55;
          if (charIndex === current.length) {
            deleting = true;
            delay = 2000;
          }
        } else {
          charIndex -= 1;
          delay = 28;
          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            delay = 350;
          }
        }

        typedEl.textContent = current.slice(0, charIndex);
        window.setTimeout(tick, delay);
      }

      tick();
    }
  }

  /* ----- Scroll reveal ----- */
  var revealEls = document.querySelectorAll(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ----- Stat count-up ----- */
  var statsEl = document.getElementById("stats");
  var numberFormat = new Intl.NumberFormat("en-US");

  function renderStat(el) {
    var value = parseInt(el.dataset.value || "0", 10);
    var suffix = el.dataset.suffix || "";
    el.textContent = numberFormat.format(value) + suffix;
  }

  function animateStat(el) {
    var target = parseInt(el.dataset.value || "0", 10);
    var suffix = el.dataset.suffix || "";
    var duration = 1300;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = numberFormat.format(Math.round(target * eased)) + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
    }

    window.requestAnimationFrame(step);
  }

  if (statsEl) {
    var statEls = statsEl.querySelectorAll(".metric-value");
    var fillEls = statsEl.querySelectorAll(".metric-fill");

    function animateFills() {
      fillEls.forEach(function (f) {
        f.style.width = (f.dataset.width || "0") + "%";
      });
    }

    if (prefersReduced || !("IntersectionObserver" in window)) {
      statEls.forEach(renderStat);
      animateFills();
    } else {
      var statsObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              statEls.forEach(animateStat);
              animateFills();
              statsObserver.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      statsObserver.observe(statsEl);
    }
  }

  /* ----- Scroll-to-top button ----- */
  var toTop = document.getElementById("toTop");

  if (toTop) {
    var toggleToTop = function () {
      toTop.classList.toggle("show", window.scrollY > 600);
    };

    window.addEventListener("scroll", toggleToTop, { passive: true });
    toggleToTop();

    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ----- Scrollspy (nav active link) ----- */
  var sections = document.querySelectorAll("main section[id]");
  var navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if ("IntersectionObserver" in window && sections.length && navAnchors.length) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navAnchors.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) { spyObserver.observe(s); });
  }
})();
