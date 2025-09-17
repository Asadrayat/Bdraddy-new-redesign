function applyTransitionDelay() {
  const megaMenuItems = document.querySelectorAll(".mega__menu-item.swipe-mega__menu-item");
  const megaMenuItemsImage = document.querySelectorAll(".image-mega__menu-item.mega__menu-item");
  const megaChildItems = document.querySelectorAll(".mega__child > li");

  megaChildItems.forEach((item, index) => {
    const delay = (index / megaChildItems.length) * 0.5;
    item.style.transitionDelay = `${delay}s`;
  });

  megaMenuItems.forEach((item, index) => {
    const delay = 0.5 + (index / megaMenuItems.length) * 0.5;
    item.style.transitionDelay = `${delay}s`;
  });

  megaMenuItemsImage.forEach((item, index) => {
    const delay = 0.2 + (index / megaMenuItemsImage.length) * 0.2;
    item.style.transitionDelay = `${delay}s`;
  });
}

function removeTransitionDelay() {
  const megaMenuItems = document.querySelectorAll(".mega__menu-item.swipe-mega__menu-item");
  const megaMenuItemsImage = document.querySelectorAll(".image-mega__menu-item.mega__menu-item");
  const megaChildItems = document.querySelectorAll(".mega__child > li");

  megaMenuItems.forEach((item) => (item.style.transitionDelay = ""));
  megaMenuItemsImage.forEach((item) => (item.style.transitionDelay = ""));
  megaChildItems.forEach((item) => (item.style.transitionDelay = ""));
}

/*
function setupMegaMenu() {
  const megaMenuItems = Array.from(document.querySelectorAll(".site__nav-wrapper > li.mega__menu-li"));
  const sectionHeader = document.querySelector(".section-header");
  let currentlyOpenItem = null;
  let lastClickTime = 0;
  const clickDelay = 300;

  const closeCurrentMenu = () => {
    if (!currentlyOpenItem) return;
    const megaMenu = currentlyOpenItem.querySelector(".mega__menu");
    if (megaMenu) {
      megaMenu.classList.remove("open");
      removeTransitionDelay();
    }
    currentlyOpenItem.classList.remove("active");
    currentlyOpenItem = null;
    updateHeaderActiveState();
  };

  const updateHeaderActiveState = () => {
    sectionHeader.classList.toggle("active", currentlyOpenItem !== null);
  };

  const handleMenuItemClick = (e, item) => {
    const now = Date.now();
    if (now - lastClickTime < clickDelay) return;
    lastClickTime = now;

    const link = e.target.closest("a");
    // if (link && !link.classList.contains("item__mega-link")) return;
    if ((link && !link.classList.contains("item__mega-link")) || e.target.classList.contains("swiper-pagination-bullet")) return;

    e.preventDefault();
    e.stopPropagation();

    if (currentlyOpenItem === item) {
      closeCurrentMenu();
      return;
    }

    closeCurrentMenu();

    const megaMenu = item.querySelector(".mega__menu");
    if (megaMenu) {
      megaMenu.classList.add("open");
      applyTransitionDelay();
      item.classList.add("active");
      currentlyOpenItem = item;
      updateHeaderActiveState();
    }
  };

  megaMenuItems.forEach(item => {
    item.addEventListener("click", (e) => handleMenuItemClick(e, item), { passive: false });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".mega__menu-li")) closeCurrentMenu();
  }, { passive: true });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCurrentMenu();
  }, { passive: true });
}
*/

/*
function setupMegaMenu() {
  const megaMenuItems = Array.from(document.querySelectorAll(".site__nav-wrapper > li.mega__menu-li"));
  const sectionHeader = document.querySelector(".section-header");
  let currentlyOpenItem = null;
  let lastClickTime = 0;
  const clickDelay = 300;
  let isMenuOpen = false;
  let overlay = open;
  const closeCurrentMenu = () => {
    if (!currentlyOpenItem) return;
    const megaMenu = currentlyOpenItem.querySelector(".mega__menu");
    if (megaMenu) {
      megaMenu.classList.remove("open");
      removeTransitionDelay();
      if (overlay) {
        overlay.remove();
        overlay = null;
      }
    }
    currentlyOpenItem.classList.remove("active");
    currentlyOpenItem = null;
    updateHeaderActiveState();
    isMenuOpen = false;
    document.removeEventListener('wheel', preventScroll);
    document.removeEventListener('touchmove', preventScroll);
  };

  const updateHeaderActiveState = () => {
    sectionHeader.classList.toggle("active", currentlyOpenItem !== null);
  };

  const handleMenuItemClick = (e, item) => {
    const now = Date.now();
    if (now - lastClickTime < clickDelay) return;
    lastClickTime = now;

    const link = e.target.closest("a");
    if ((link && !link.classList.contains("item__mega-link")) || e.target.classList.contains("swiper-pagination-bullet")) return;

    e.preventDefault();
    e.stopPropagation();

    if (currentlyOpenItem === item) {
      closeCurrentMenu();
      return;
    }

    closeCurrentMenu();

    const megaMenu = item.querySelector(".mega__menu");
    if (megaMenu) {
      megaMenu.classList.add("open");
      applyTransitionDelay();
      item.classList.add("active");
      overlay = document.createElement("div");
      overlay.classList.add("custom-overlay");
      document.body.appendChild(overlay);
      currentlyOpenItem = item;
      isMenuOpen = true;
      updateHeaderActiveState();
      document.addEventListener('wheel', preventScroll, { passive: false });
      document.addEventListener('touchmove', preventScroll, { passive: false });
    }
  };

  function preventScroll(e) {
    if (!isMenuOpen) return;

    const megaMenu = e.target.closest(".mega__menu");
    if (megaMenu) {
      const isScrollable = megaMenu.scrollHeight > megaMenu.clientHeight;
      if (isScrollable) {
        const scrollTop = megaMenu.scrollTop;
        const scrollHeight = megaMenu.scrollHeight;
        const clientHeight = megaMenu.clientHeight;
        const wheelDelta = e.deltaY || e.detail || e.wheelDelta;

        if (wheelDelta > 0 && scrollTop + clientHeight >= scrollHeight) {
          e.preventDefault();
          e.stopPropagation();
        } else if (wheelDelta < 0 && scrollTop <= 0) {
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }
    }

    e.preventDefault();
    e.stopPropagation();
  }

  megaMenuItems.forEach(item => {
    item.addEventListener("click", (e) => handleMenuItemClick(e, item), { passive: false });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".mega__menu-li")) closeCurrentMenu();
  }, { passive: true });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCurrentMenu();
  }, { passive: true });
}
*/


function setupMegaMenu() {
  let isMenuOpen = false;
  let overlay = null;
  document.querySelectorAll(".site__nav-wrapper > li").forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const megaMenu = this.querySelector(".mega__menu");
      if (megaMenu) {
        megaMenu.classList.add("open");
        this.classList.add("menu-open"); // Add class to li
        applyTransitionDelay();
        isMenuOpen = true;
        overlay = document.createElement("div");
        overlay.classList.add("custom-overlay");
        document.body.appendChild(overlay);
        document.addEventListener('wheel', preventScroll, { passive: false });
        document.addEventListener('touchmove', preventScroll, { passive: false });
      }
    });

    item.addEventListener("mouseleave", function () {
      const megaMenu = this.querySelector(".mega__menu");
      if (megaMenu) {
        megaMenu.classList.remove("open");
        this.classList.remove("menu-open"); // Remove class from li
        removeTransitionDelay();
        isMenuOpen = false;
        if (overlay) {
          overlay.remove();
          overlay = null;
        }
        document.removeEventListener('wheel', preventScroll);
        document.removeEventListener('touchmove', preventScroll);
      }
    });
  });

  function preventScroll(e) {
    if (!isMenuOpen) return;

    const megaMenu = e.target.closest(".mega__menu");
    if (megaMenu) {
      const isScrollable = megaMenu.scrollHeight > megaMenu.clientHeight;
      if (isScrollable) {
        const scrollTop = megaMenu.scrollTop;
        const scrollHeight = megaMenu.scrollHeight;
        const clientHeight = megaMenu.clientHeight;
        const wheelDelta = e.deltaY || e.detail || e.wheelDelta;

        if (wheelDelta > 0 && scrollTop + clientHeight >= scrollHeight) {
          e.preventDefault();
          e.stopPropagation();
        } else if (wheelDelta < 0 && scrollTop <= 0) {
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }
    }

    e.preventDefault();
    e.stopPropagation();
  }
}


function setupStickyHeader(
  allowedTemplates,
  templateName,
  suffixName,
  isTransparent,
  isSticky
) {
  const siteHeader = document.querySelector(".site__header");
  if (!siteHeader) return;
  let allowedTemplatesArray = [];
  if (allowedTemplates) {
    const cleanedTemplates = allowedTemplates.replace(/\s/g, "");
    allowedTemplatesArray = cleanedTemplates.split(",");
  }

  if (
    !allowedTemplatesArray.length ||
    (!allowedTemplatesArray.includes(templateName) &&
      !allowedTemplatesArray.includes(suffixName)) ||
    !isTransparent ||
    !isSticky
  ) {
    return;
  }

  const shopifySection = siteHeader.closest(".shopify-section");
  if (!shopifySection) return;

  function updateStickyClass() {
    if (window.innerWidth <= 1250) return;

    if (window.scrollY > 300) {
      shopifySection.classList.remove("no__sticky");
      shopifySection.classList.add("sticky__header");
    } else {
      shopifySection.classList.add("no__sticky");
      shopifySection.classList.remove("sticky__header");
    }
  }

  function updateMargin() {
    if (window.innerWidth <= 1250) return;

    const sectionHeight = shopifySection.offsetHeight;
    const mainContent = document.querySelector("main#MainContent");
    if (mainContent && mainContent.firstElementChild) {
      mainContent.firstElementChild.style.marginTop = `-${sectionHeight}px`;
    }
  }

  updateStickyClass();
  updateMargin();

  window.addEventListener("scroll", updateStickyClass);
  window.addEventListener("resize", () => {
    updateStickyClass();
    updateMargin();
  });
}

function setupFixedHeader(allowedTemplates, templateName, suffixName, isTransparent) {
  const mainHeader = document.querySelector(".site__header");
  if (!mainHeader) return;

  let allowedTemplatesArray = [];
  let not__transparent = false;
  if (allowedTemplates) {
    const cleanedTemplates = allowedTemplates.replace(/\s/g, "");
    allowedTemplatesArray = cleanedTemplates.split(",");
  }

  if (
    !allowedTemplatesArray.length ||
    (!allowedTemplatesArray.includes(templateName) &&
      !allowedTemplatesArray.includes(suffixName)) ||
    !isTransparent
  ) {
    not__transparent = true;
  }

  const headerSection = mainHeader.closest(".shopify-section");
  if (!headerSection) return;

  function adjustFixedPosition() {
    if (templateName === 'collection') {
      headerSection.classList.toggle("not__fixed", window.scrollY === 0);
      if (not__transparent) {
        headerSection.classList.toggle("not__transparent", window.scrollY === 0);
      }
      headerSection.classList.toggle("fixed__header", window.scrollY > 0);
    } else {
      if (window.scrollY > 300) {
        headerSection.classList.remove("not__fixed");
        if (not__transparent) {
          headerSection.classList.remove("not__transparent");
        }
        headerSection.classList.add("fixed__header");
      } else {
        headerSection.classList.add("not__fixed");
        if (not__transparent) {
          headerSection.classList.add("not__transparent");
        }
        headerSection.classList.remove("fixed__header");
      }
    }
  }

  adjustFixedPosition();
  window.addEventListener("scroll", adjustFixedPosition);
  window.addEventListener("resize", adjustFixedPosition);
}

function setupStickyMenuScroll() {
  const menuContainers = document.querySelectorAll(".sticky__sm-nav-wrapper");
  if (menuContainers.length === 0) return;

  menuContainers.forEach((wrapper) => {
    const currentLink = wrapper.querySelector("a.active");
    if (currentLink) {
      const positionToScroll =
        currentLink.offsetLeft -
        wrapper.offsetWidth / 2 +
        currentLink.offsetWidth / 2;
      wrapper.scrollTo({
        left: positionToScroll,
        behavior: "smooth",
      });
    }
  });
}

function setupHeaderDrawer() {
  const headerDrawer = document.querySelector(".header__drawer");
  const toggleButton = document.querySelector("[header-drawer-opener]");
  const closeButton = document.querySelector("[header-drawer-close]");
  const html = document.documentElement;
  const body = document.body;
  if (!headerDrawer || !toggleButton || !closeButton) return;

  const toggleDrawer = (event) => {
    event.preventDefault();
    headerDrawer.classList.toggle("active");
    html.classList.toggle(
      "overflow-hidden",
      headerDrawer.classList.contains("active")
    );
    body.classList.toggle(
      "overflow-hidden",
      headerDrawer.classList.contains("active")
    );
  };

  const closeDrawer = () => {
    headerDrawer.classList.remove("active");
    html.classList.remove("overflow-hidden");
    body.classList.remove("overflow-hidden");
  };

  toggleButton.addEventListener("click", toggleDrawer);
  closeButton.addEventListener("click", closeDrawer);

  document.addEventListener("click", (e) => {
    if (
      headerDrawer.classList.contains("active") &&
      !headerDrawer.contains(e.target) &&
      !toggleButton.contains(e.target)
    ) {
      closeDrawer();
    }
  });
}

function setupDrawer() {
  const drawerLogo = document.querySelector(".drawer__logo");
  const drawerMenu = document.querySelector(".drawer-menu");
  const drawerUtensils = document.querySelector(".drawer__utensils");
  const siteHeader = document.querySelector(".site__header");

  if (drawerLogo && drawerMenu && drawerUtensils) {
    const logoHeight = drawerLogo.offsetHeight;
    const utensilsHeight = drawerUtensils.offsetHeight;
    drawerMenu.style.height = `calc(100% - ${logoHeight + utensilsHeight}px)`;
  }
}

function initHeaderSections() {
  document.querySelectorAll('.section-header').forEach(section => {
    section.classList.add('loaded');
  });
}

function initializeMegaMenuSwipers() {
  const swipers = document.querySelectorAll('.mega__items .swiper');
  
  swipers.forEach((swiper) => {
    new Swiper(swiper, {
      slidesPerView: 1,
      loop: false,
      pagination: {
        el: swiper.querySelector('.swiper-pagination'),
        clickable: true,
      }
    });
  });
}



document.addEventListener("DOMContentLoaded", function () {
  const siteHeader = document.querySelector(".site__header");
  if (siteHeader) {
    const templateName = siteHeader.dataset.template || "";
    const suffixName = siteHeader.dataset.suffix || "";
    const allowedTemplates = siteHeader.dataset.allowed || "";
    const isTransparent = siteHeader.dataset.transparent === "true";
    const isSticky = siteHeader.dataset.sticky === "true";

    setupMegaMenu();
    setupStickyHeader(
      allowedTemplates,
      templateName,
      suffixName,
      isTransparent,
      isSticky
    );
    setupFixedHeader(allowedTemplates, templateName, suffixName, isTransparent);
    setupStickyMenuScroll();
    setupHeaderDrawer();
    setupDrawer();
    initializeMegaMenuSwipers();
  }
  initHeaderSections();
});



// document.addEventListener('DOMContentLoaded', function() {
//     const searchLoader = document.querySelector('.predictive-search--header');
//     if (searchLoader) {
//         searchLoader.classList.remove('hidden');
//     }
// });
