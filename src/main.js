document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // DOM ELEMENTS
  // ============================================
  const header = document.querySelector("header");
  const toggleslideBtn = document.querySelector(".th-menu-toggle-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const headerUl = document.querySelector("header nav ul");
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
	
const headers = document.querySelectorAll(".tab-header");
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            header.classList.toggle("active");
            content.classList.toggle("active");
        });
    });

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
  if (toggleslideBtn && cancelBtn && headerUl && header) {

  function toggleButtons() {
    const isVisible = headerUl.classList.toggle("show-ul");

    if (isVisible) {
      const newBackDrop = document.createElement("div");
      newBackDrop.className = "back-drop";
      header.appendChild(newBackDrop);
      disableScroll();

      newBackDrop.addEventListener("click", function () {
        headerUl.classList.remove("show-ul");

        if (newBackDrop && newBackDrop.parentNode) {
          newBackDrop.parentNode.removeChild(newBackDrop);
        }

        enableScroll();
      });

    } else {
      const backDrop = document.querySelector(".back-drop");

      if (backDrop && backDrop.parentNode) {
        backDrop.parentNode.removeChild(backDrop);
      }

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
  const instagramSwiper = new Swiper(".instagram-slider", {
    loop: true,
    grabCursor: true,
    draggable: true,
    spaceBetween: 20,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".instagram-slider-pagination",
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 1, spaceBetween: 25 },
      992: { slidesPerView: 3, spaceBetween: 25 },
      1200: { slidesPerView: 4, spaceBetween: 25 },
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
            btn.classList.add("bg-gray-200", "text-gray-700", "hover:bg-gray-100");
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
  // STATS COUNTER COMPONENT
  // ============================================
  function counter(element, start, end, duration, suffix = '') {
    if (!element) return;
    
    let current = start;
    let range = end - start;
    let increment = end > start ? 1 : -1;
    let step = Math.abs(Math.floor(duration / range));
    
    let timer = setInterval(function () {
      current += increment;
      element.textContent = current + suffix;
      if (current == end) {
        clearInterval(timer);
      }
    }, step);
  }

  function initStatsCounter() {
    const statsContainer = document.querySelector('.stats-counter-container');
    if (!statsContainer) return;

    const statElements = statsContainer.querySelectorAll('.counter-value');
    if (statElements.length === 0) return;

    // Extract target values and suffixes from each stat
    const stats = Array.from(statElements).map((el) => {
      const text = el.textContent.trim();
      const match = text.match(/(\d+)(.*)/);
      if (match) {
        return {
          element: el,
          target: parseInt(match[1], 10),
          suffix: match[2] || ''
        };
      }
      return null;
    }).filter(Boolean);

    // Intersection Observer to trigger counters when stats come into view
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stats.forEach((stat) => {
            counter(stat.element, 0, stat.target, 2000, stat.suffix);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observer.observe(statsContainer);
  }

  // Initialize stats counter
  initStatsCounter();

  // ============================================
  // CONSULTATION CARD SELECTION
  // ============================================
  
  const BOOKING_URL = '/book-consultations/';
  document.querySelectorAll('.consultation-cta').forEach(function (consultationWrap) {

    const service_type = consultationWrap.dataset.service;
    const consultationCards = consultationWrap.querySelectorAll('.consultation-card');
    const bookNowBtn = consultationWrap.querySelector('.bookNowBtn');

    function updateCardStyles(card, isSelected) {
      if (isSelected) {
        card.classList.remove('border-[#0000004D]');
        card.classList.add('border-primary', 'bg-[#FFF2F2]');
      } else {
        card.classList.remove('border-primary', 'bg-[#FFF2F2]');
        card.classList.add('border-[#0000004D]');
      }
    }

    function deselectAllCards(exceptCard) {
      consultationCards.forEach(card => {
        if (card !== exceptCard) {
          const checkbox = card.querySelector('input[type="checkbox"]');
          if (checkbox) {
            checkbox.checked = false;
            updateCardStyles(card, false);
          }
        }
      });
    }

    consultationCards.forEach(card => {
      const checkbox = card.querySelector('input[type="checkbox"]');

      card.addEventListener('click', function (e) {
        if (e.target === checkbox || e.target.closest('input[type="checkbox"]')) return;
        if (checkbox.checked) return;

        deselectAllCards(card);
        checkbox.checked = true;
        updateCardStyles(card, true);
      });

      checkbox.addEventListener('click', function (e) {
        e.stopPropagation();

        if (!checkbox.checked) {
          updateCardStyles(card, false);
          return;
        }

        deselectAllCards(card);
        updateCardStyles(card, true);
      });

      updateCardStyles(card, checkbox.checked);
    });

    function getSelectedConsultationType() {
      let selected = null;

      consultationCards.forEach(card => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
          selected = card.dataset.type; // audio | video
        }
      });

      return selected;
    }

    function redirectToBooking() {
      const type = getSelectedConsultationType();

      if (!type) {
        alert('Please select Audio or Video consultation');
        return;
      }

      const url =
        BOOKING_URL +
        '?service=' + encodeURIComponent(service_type) +
        '&type=' + encodeURIComponent(type);

      window.location.href = url;
    }

    if (bookNowBtn) {
      bookNowBtn.addEventListener('click', function (e) {
        e.preventDefault();
        redirectToBooking();
      });
    }

  });
		
// Book consultation page: two flows, same amount logic
  // Flow 1: User comes from services page with ?service=...&type=... → prefill and set amount
  // Flow 2: User comes directly → selects service & type → amount updates on change
  // Shared: amount is always derived from service + consultation type

  var CONSULTATION_PAYMENT_MAP = {
    'palmistry-consultation': { 'audio': 999, 'video': 1999 },
    'numerology-analysis': { 'audio': 999, 'video': 1999 },
    'palmistry-numerology-consultancy': { 'audio': 999, 'video': 1999 },
    'numerology-match-making': { 'audio': 999, 'video': 1999 }
  };

  const serviceField = document.querySelector('[name="bwe_service"]');
  const typeField = document.querySelector('[name="bwe_consultation_type"]');
  const amountDisplay = document.getElementById('bwe-amount-display');
  const amountInput = document.querySelector('[name="bwe_amount"]');
  const amountWrap = document.querySelector('.bwe-amount-wrap');

  function updateConsultationAmount() {
    if (!amountDisplay || !amountInput) return;
    var service = serviceField ? serviceField.value : '';
    var type = typeField ? typeField.value : '';
    var amount = null;
    if (service && type && CONSULTATION_PAYMENT_MAP[service] && CONSULTATION_PAYMENT_MAP[service][type] !== undefined) {
      amount = CONSULTATION_PAYMENT_MAP[service][type];
    }
    if (amount !== null) {
      amountDisplay.textContent = '₹' + amount;
      amountInput.value = String(amount);
      if (amountWrap) amountWrap.classList.remove('hidden');
    } else {
      amountDisplay.textContent = '₹—';
      amountInput.value = '';
      if (amountWrap) amountWrap.classList.add('hidden');
    }
  }

  // Flow 2: when user selects service/type directly, update amount
  if (serviceField) serviceField.addEventListener('change', updateConsultationAmount);
  if (typeField) typeField.addEventListener('change', updateConsultationAmount);

  // Flow 1: from services page — prefill service & type from URL, then update amount
  var params = new URLSearchParams(window.location.search);
  var serviceFromUrl = params.get('service');
  var typeFromUrl = params.get('type');

  if (serviceFromUrl && serviceField) {
    var serviceOptionExists = Array.from(serviceField.options).some(function (opt) { return opt.value === serviceFromUrl; });
    if (serviceOptionExists) {
      serviceField.value = serviceFromUrl;
      serviceField.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
  if (typeFromUrl && typeField) {
    var typeOptionExists = Array.from(typeField.options).some(function (opt) { return opt.value === typeFromUrl; });
    if (typeOptionExists) {
      typeField.value = typeFromUrl;
      typeField.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  updateConsultationAmount();

});
