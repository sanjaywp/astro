document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // DOM ELEMENTS
  // ============================================
  const header = document.querySelector("header");
  const toggleslideBtn = document.querySelector(".th-menu-toggle-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const headerUl = document.querySelector("header .th-menu ul");
  const faqItems = document.querySelectorAll(".faq-item");
  const faqSummaries = document.querySelectorAll(".faq-item summary");
  const tabComponents = document.querySelectorAll("[data-tab-component]");
  const navDropdowns = document.querySelectorAll(".th-dropdown");

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  function disableScroll() {
    document.body.classList.add("overflow-hidden");
  }

  function enableScroll() {
    document.body.classList.remove("overflow-hidden");
  }

  // ============================================
  // STICKY HEADER
  // ============================================
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("sticky-header", window.scrollY > 0);
    });
  }

  // ============================================
  // MOBILE NAVIGATION
  // ============================================
  if (toggleslideBtn && cancelBtn && headerUl) {
    function toggleButtons() {
      const backDrop = document.querySelector(".back-drop");
      const isVisible = headerUl.classList.toggle("show-ul");

      if (isVisible) {
        const newBackDrop = document.createElement("div");
        header.appendChild(newBackDrop);
        newBackDrop.classList.add("back-drop");
        disableScroll();

        newBackDrop.addEventListener("click", function () {
          headerUl.classList.remove("show-ul");
          newBackDrop.remove();
          enableScroll();
        });
      } else {
        backDrop?.remove();
        enableScroll();
      }
    }

    toggleslideBtn.addEventListener("click", toggleButtons);
    cancelBtn.addEventListener("click", toggleButtons);
  }

  // ============================================
  // DROPDOWN TOGGLES
  // ============================================
  // Navigation Dropdowns

  navDropdowns.forEach((parentDropdown) => {
    parentDropdown.addEventListener("click", function () {
      this.classList.toggle("showMenu");
    });

    const subDropdowns = parentDropdown.querySelectorAll(".th-dropdown ul");
    subDropdowns.forEach((subDropdown) => {
      subDropdown.addEventListener("click", (event) => event.stopPropagation());
    });
  });

  document.addEventListener("click", (e) => {
    navDropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("showMenu");
      }
    });
  });

  // ============================================
  // FAQ ACCORDION
  // ============================================
  function updateFaqIcon(detailsElement) {
    const icon = detailsElement.querySelector(".faq-icon");
    const path = icon?.querySelector("path");
    if (path) {
      if (detailsElement.open) {
        path.setAttribute("d", "M4 12h16");
      } else {
        path.setAttribute("d", "M12 4v16m8-8H4");
      }
    }
  }

  // Initialize icons for all FAQ items
  faqItems.forEach((item) => {
    updateFaqIcon(item);

    // Listen for toggle events
    item.addEventListener("toggle", () => {
      updateFaqIcon(item);
    });
  });

  // Close other FAQ items when one is opened
  faqSummaries.forEach((summary, index) => {
    summary.addEventListener("click", (e) => {
      faqItems.forEach((item, i) => {
        if (i !== index && item !== summary.closest(".faq-item")) {
          item.open = false;
        }
      });
    });
  });

  // ============================================
  // SWIPER SLIDERS
  // ============================================
  // Courses Slider
  new Swiper(".courses-slider .swiper", {
    direction: "vertical",
    slidesPerView: 4,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".courses-slider .swiper-pagination",
      clickable: true,
    },
  });

  // Testimonials Slider
  const testimonialsSwiper = new Swiper(".testimonials-slider", {
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".testimonials-slider .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      576: { slidesPerView: 1, spaceBetween: 30 },
      768: { slidesPerView: 2, spaceBetween: 30 },
      992: { slidesPerView: 4, spaceBetween: 30 },
    },
  });

  // YouTube Slider
  const youtubeSwiper = new Swiper(".youtube-slider", {
    loop: true,
    grabCursor: true,
    draggable: true,
    spaceBetween: 20,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".youtube-slider-pagination",
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 1, spaceBetween: 30 },
      992: { slidesPerView: 2, spaceBetween: 30 },
    },
  });

  // ============================================
  // TAB COMPONENT
  // ============================================
  function initTabComponent(component) {
    const tabButtons = component.querySelectorAll(".tab-btn");
    const tabContents = component.querySelectorAll(".tab-content");

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const targetTab = button.getAttribute("data-tab");

        // Update button states
        tabButtons.forEach((btn) => {
          const isActive = btn.getAttribute("data-tab") === targetTab;
          btn.setAttribute("aria-selected", isActive);
          if (isActive) {
            btn.classList.remove(
              "bg-white",
              "text-gray-700",
              "hover:bg-gray-100"
            );
            btn.classList.add("bg-primary", "text-white");
          } else {
            btn.classList.remove("bg-primary", "text-white");
            btn.classList.add("bg-white", "text-gray-700", "hover:bg-gray-100");
          }
        });

        // Update content visibility
        tabContents.forEach((content) => {
          const contentTab = content.getAttribute("data-content");
          if (contentTab === targetTab) {
            content.classList.remove("hidden");
            content.classList.add("active");
          } else {
            content.classList.add("hidden");
            content.classList.remove("active");
          }
        });
      });
    });
  }

  // Initialize all tab components on the page
  tabComponents.forEach((component) => {
    initTabComponent(component);
  });

  // ============================================
  // GALLERY LIGHTBOX (Using Lightbox2 CDN)
  // ============================================

  // Initialize Lightbox2 - wait for jQuery and Lightbox2 to be ready
  function initLightbox2() {
    if (typeof jQuery !== 'undefined' && typeof lightbox !== 'undefined' && lightbox && typeof lightbox.option === 'function') {
      lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'fadeDuration': 300,
        'imageFadeDuration': 300,
        'showImageNumberLabel': true,
        'alwaysShowNavOnTouchDevices': true,
        'fitImagesInViewport': true,
        'maxWidth': 1200,
        'maxHeight': 800
      });
    } else {
      // Retry if dependencies aren't ready yet
      setTimeout(initLightbox2, 50);
    }
  }

  // Initialize after DOM and scripts are ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(initLightbox2, 100);
    });
  } else {
    setTimeout(initLightbox2, 100);
  }
});
