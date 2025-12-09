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
  const searchInput = document.getElementById("searchInput");
  const faqs = document.querySelectorAll(".th-faqs details");
  const faqContainer = document.querySelector(".th-faqs");

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

  // Search Input
  searchInput?.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();
    let found = false;

    faqs.forEach((faq) => {
      const text = faq.textContent.toLowerCase();
      const summary = faq.querySelector("summary");
      const content = faq.querySelector("div");

      if (text.includes(query)) {
        faq.style.display = "";
        found = true;

        const highlight = (element) => {
          element.innerHTML = element.textContent.replace(
            new RegExp(`(${query})`, "gi"),
            "<mark>$1</mark>"
          );
        };
        highlight(summary);
        highlight(content);
      } else {
        faq.style.display = "none";
      }
    });

    let noMatchMessage = document.getElementById("noMatchMessage");
    if (!found) {
      if (!noMatchMessage) {
        noMatchMessage = document.createElement("p");
        noMatchMessage.id = "noMatchMessage";
        noMatchMessage.textContent = "No matching data found";
        noMatchMessage.style.color = "red";
        noMatchMessage.style.textAlign = "center";
        faqContainer?.appendChild(noMatchMessage);
      }
    } else {
      noMatchMessage?.remove();
    }
  });

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

  // Quantity Increment/Decrement
  decrementButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (quantity > 0) {
      quantity--;
      quantityDisplay.textContent = quantity;
    }
  });

  incrementButton?.addEventListener("click", (e) => {
    e.stopPropagation();
    quantity++;
    quantityDisplay.textContent = quantity;
  });

  // Cart Panel
  if (cartPanel && cartBackdrop && cartSlide && openCartBtns.length && closeCartBtn) {
    function openCart() {
      disableScroll();
      cartPanel.classList.remove("hidden");
      requestAnimationFrame(() => {
        cartBackdrop.classList.replace("opacity-0", "opacity-100");
        cartSlide.classList.replace("translate-x-full", "translate-x-0");
      });
    }

    function closeCart() {
      cartBackdrop.classList.replace("opacity-100", "opacity-0");
      cartSlide.classList.replace("translate-x-0", "translate-x-full");
      cartSlide.addEventListener(
        "transitionend",
        () => cartPanel.classList.add("hidden"),
        { once: true }
      );
      enableScroll();
    }

    openCartBtns.forEach((btn) => btn.addEventListener("click", openCart));
    closeCartBtn.addEventListener("click", closeCart);
  }

  // Mobile Search Form
  searchIcon?.addEventListener("click", function () {
    searchIcon.innerHTML = isSvg1 ? svg2 : svg1;
    isSvg1 = !isSvg1;
    searchForm?.classList.toggle("search-bar-show");
  });

  // Mobile Navigation
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

  // Navigation Dropdowns
  navDropdowns.forEach((parentDropdown) => {
    parentDropdown.addEventListener("click", function () {
      this.classList.toggle("showMenu");
    });

    const subDropdowns = parentDropdown.querySelectorAll(".th-dropdown ul");
    subDropdowns.forEach((subDropdown) => {
      subDropdown.addEventListener("click", (event) =>
        event.stopPropagation()
      );
    });
  });

  document.addEventListener("click", (e) => {
    navDropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("showMenu");
      }
    });
  });

  // Scroll to Top
  mybutton &&
    window.addEventListener("scroll", function () {
      mybutton.classList.toggle(
        "active",
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
      );
    });

  mybutton?.addEventListener("click", function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  // Modal
  openModalBtn?.addEventListener("click", () =>
    modal?.classList.remove("hidden")
  );
  closeModalBtn?.addEventListener("click", () =>
    modal?.classList.add("hidden")
  );

  // Accordion
  summaryElements.forEach((summary, index) => {
    summary.addEventListener("click", () => {
      detailsElements.forEach((details, i) => {
        if (i !== index) details.open = false;
      });
    });
  });
});
