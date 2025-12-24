document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const header = document.querySelector("header");
  const toggleslideBtn = document.querySelector(".th-menu-toggle-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const headerUl = document.querySelector("header .th-menu ul");
  const searchIcon = document.querySelector(".mob-search-btn");
  const searchForm = document.querySelector(".th-menu-search-form");
  const mybutton = document.getElementById("scroll_to_top");
  const cartPanel = document.getElementById("cart-panel");
  const cartBackdrop = document.getElementById("cart-backdrop");
  const cartSlide = document.getElementById("cart-slide");
  const openCartBtns = document.querySelectorAll(".open-cart");
  const closeCartBtn = document.getElementById("close-cart");
  const navDropdowns = document.querySelectorAll(".th-dropdown");
  const modal = document.getElementById("modal");
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const detailsElements = document.querySelectorAll("details");
  const summaryElements = document.querySelectorAll("summary");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const decrementButton = document.getElementById("decrementButton");
  const incrementButton = document.getElementById("incrementButton");
  const quantityDisplay = document.getElementById("quantityDisplay");


  let svg1 =
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke-width="2" stroke="#000" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  let svg2 =
    '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';
  let isSvg1 = true;
  let quantity = 0;

  // Utility Functions
  function disableScroll() {
    document.body.classList.add("overflow-hidden");
  }

  function enableScroll() {
    document.body.classList.remove("overflow-hidden");
  }

  // Sticky Header
  header &&
    window.addEventListener("scroll", function () {
      header.classList.toggle("sticky-header", window.scrollY > 0);
    });

  // Dropdown Toggles
  dropdownToggles.forEach((toggle) => {
    const menuId = toggle.getAttribute("aria-labelledby") || toggle.id;
    const dropdownMenu = document.querySelector(
      `[aria-labelledby="${menuId}"]`
    );

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        if (menu !== dropdownMenu) {
          menu.classList.add("hidden");
        }
      });
      dropdownMenu?.classList.toggle("hidden");
    });
  });

  document.addEventListener("click", (event) => {
    if (
      !event.target.closest(".dropdown-menu") &&
      !event.target.closest(".dropdown-toggle") &&
      event.target !== decrementButton &&
      event.target !== incrementButton
    ) {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.classList.add("hidden");
      });
    }
  });



  // FAQ Accordion - Only for FAQ items
  const faqItems = document.querySelectorAll(".faq-item");
  const faqSummaries = document.querySelectorAll(".faq-item summary");
  
  faqSummaries.forEach((summary, index) => {
    summary.addEventListener("click", (e) => {
      // Allow the default behavior (open/close) to happen
      // Only close other FAQ items if needed (optional - remove if you want multiple open)
      // faqItems.forEach((item, i) => {
      //   if (i !== index && item !== summary.closest('.faq-item')) {
      //     item.open = false;
      //   }
      // });
    });
  });


  // course slider
  new Swiper(".courses-slider", {
    direction: "vertical",
    slidesPerView: 4,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,     
    },
  });


  //  Swiper (testimonials) 
  const testimonialsSwiper = new Swiper('.testimonials-slider', {
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      576: { slidesPerView: 1, spaceBetween: 30 },
      768: { slidesPerView: 2, spaceBetween: 30 },
      992: { slidesPerView: 4, spaceBetween: 30 },
    },
  });

  //  Swiper (testimonials) 
  const youtubeSwiper = new Swiper('.youtube-slider', {
    loop: true,
    grabCursor: true,
    draggable: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    }, 
    breakpoints: {  
      768: { slidesPerView: 1, spaceBetween: 30 },
      992: { slidesPerView: 2, spaceBetween: 30 },
    },
  });


  // Tab Component Functionality
  function initTabComponent(component) {
    const tabButtons = component.querySelectorAll('.tab-btn');
    const tabContents = component.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Update button states
        tabButtons.forEach(btn => {
          const isActive = btn.getAttribute('data-tab') === targetTab;
          btn.setAttribute('aria-selected', isActive);
          if (isActive) {
            btn.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');
            btn.classList.add('bg-primary', 'text-white');
          } else {
            btn.classList.remove('bg-primary', 'text-white');
            btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
          }
        });

        // Update content visibility
        tabContents.forEach(content => {
          const contentTab = content.getAttribute('data-content');
          if (contentTab === targetTab) {
            content.classList.remove('hidden');
            content.classList.add('active');
          } else {
            content.classList.add('hidden');
            content.classList.remove('active');
          }
        });
      });
    });
  }

  // Initialize all tab components on the page
  const tabComponents = document.querySelectorAll('[data-tab-component]');
  tabComponents.forEach(component => {
    initTabComponent(component);
  });

  
});
