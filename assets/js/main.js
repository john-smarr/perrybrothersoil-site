/* Perry Brothers Oil — nav toggle + sticky header */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  var closeBtn = document.querySelector(".mobile-nav-close");

  /* Sticky header compact class */
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Mobile nav open / close */
  if (toggle && mobileNav && closeBtn) {
    toggle.addEventListener("click", function () {
      mobileNav.classList.add("is-open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    });

    closeBtn.addEventListener("click", closeMobile);

    mobileNav.addEventListener("click", function (e) {
      if (e.target === mobileNav) closeMobile();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
        closeMobile();
      }
    });
  }

  function closeMobile() {
    mobileNav.classList.remove("is-open");
    document.body.style.overflow = "";
    toggle.focus();
  }
})();
