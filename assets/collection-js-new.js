
/*
function sortOpenerFunc() {
  const custom__sort_wrapper = document.querySelector(".custom__sort");
  const sortOpener = document.querySelector("[sort-opener]");
  const sortBody = document.querySelector("[sort-body]");
  // const sortClose = document.querySelector("[sort-close]");

  function openSortBody() {
    sortBody.classList.add("open");
    sortOpener.classList.add("active"); // Add active class when opening
  }

  function closeSortBody() {
    sortBody.classList.remove("open");
    sortOpener.classList.remove("active"); // Remove active class when closing
  }

  sortOpener.addEventListener("click", function (event) {
    event.stopPropagation();
    if (sortBody.classList.contains("open")) {
      closeSortBody();
    } else {
      openSortBody();
    }
  });

  if (custom__sort_wrapper) {
    custom__sort_wrapper.addEventListener("click", function (event) {
      // let custom__sort_wrapper = event.target.closest('.custom__sort');

      let sortOpener_new = custom__sort_wrapper.querySelector("[sort-opener]");
      let sortBody_new = custom__sort_wrapper.querySelector("[sort-body]");

      sortOpener_new.classList.remove("active");
      sortBody_new.classList.remove("open");

      console.log("clicked", event.target);
      console.log("custom__sort_wrapper", custom__sort_wrapper);
    });
  }
}
 */


// function sortOpenerFunc() {
//   const sortOpener = document.querySelector("[sort-opener]");
//   const sortBody = document.querySelector("[sort-body]");
//   // const sortClose = document.querySelector("[sort-close]");

//   function openSortBody() {
//     sortBody.classList.add("open");
//     sortOpener.classList.add("active"); // Add active class when opening
//   }

//   function closeSortBody() {
//     sortBody.classList.remove("open");
//     sortOpener.classList.remove("active"); // Remove active class when closing
//   }

//   sortOpener.addEventListener("click", function (event) {
//     event.stopPropagation();
//     if (sortBody.classList.contains("open")) {
//       closeSortBody();
//     } else {
//       openSortBody();
//     }
//   });

//   // sortClose.addEventListener("click", function (event) {
//   //   event.stopPropagation();
//   //   closeSortBody();
//   // });

//   document.addEventListener("click", function (event) {
//     if (
//       !sortBody.contains(event.target) &&
//       sortBody.classList.contains("open")
//     ) {
//       closeSortBody();
//     }
//   });
// }


/*
function filterOpenFunc() {
  const filterOpener = document.querySelector("[filter-opener]");
  const filters = document.querySelector('#main-collection-filters, #main-search-filters');
  const hideFilters = document.querySelectorAll("[hide-filter]");

  const toggleBodyScroll = () => {
    if (filters.classList.contains("open")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };


  if (filterOpener) {
    filterOpener.addEventListener("click", function () {
      if (filters) {
        filters.classList.toggle("open");
        filterOpener.classList.toggle(
          "active",
          filters.classList.contains("open")
        );
        toggleBodyScroll();
      }
    });
  }

  hideFilters.forEach((hideBtn) => {
    hideBtn.addEventListener("click", function () {
      if (filters && filters.classList.contains("open")) {
        filters.classList.remove("open");
        filterOpener.classList.remove("active");
        toggleBodyScroll();
      }
    });
  });

  window.addEventListener("resize", toggleBodyScroll);
}
*/


function sortOpenerFunc() {
  const custom__sort_wrapper = document.querySelector(".custom__sort");
  const sortOpener = document.querySelector("[sort-opener]");
  const sortBody = document.querySelector("[sort-body]");
  const sortClose = document.querySelector("[sort-close]");

  const addOverlay = () => {
    if (!document.querySelector('.custom-overlay-filter')) {
      const overlay = document.createElement('div');
      overlay.className = 'custom-overlay-filter';
      document.body.appendChild(overlay);

      overlay.addEventListener("click", () => {
        closeSortBody();
      });
    }
  };

  const removeOverlay = () => {
    const overlay = document.querySelector('.custom-overlay-filter');
    if (overlay) overlay.remove();
  };

  function openSortBody() {
    sortBody.classList.add("open");
    sortOpener.classList.add("active");
    document.body.style.overflow = "hidden";
    addOverlay();
  }

  function closeSortBody() {
    sortBody.classList.remove("open");
    sortOpener.classList.remove("active");
    document.body.style.overflow = "";
    removeOverlay();
  }

  if (sortOpener) {
    sortOpener.addEventListener("click", function (event) {
      event.stopPropagation();
      if (sortBody.classList.contains("open")) {
        closeSortBody();
      } else {
        openSortBody();
      }
    });
  }

  if (sortClose) {
    sortClose.addEventListener("click", function () {
      closeSortBody();
    });
  }

  if (sortBody) {
    sortBody.addEventListener("click", function () {
      closeSortBody();
    });
  }
}



function filterOpenFunc() {
  const filterOpener = document.querySelector("[filter-opener]");
  const filters = document.querySelector('#main-collection-filters, #main-search-filters');
  const hideFilters = document.querySelectorAll("[hide-filter]");

  const toggleBodyScroll = () => {
    if (filters.classList.contains("open")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  const addOverlay = () => {
    if (!document.querySelector('.custom-overlay-filter')) {
      const overlay = document.createElement('div');
      overlay.className = 'custom-overlay-filter';
      document.body.appendChild(overlay);

      overlay.addEventListener("click", () => {
        if (filters.classList.contains("open")) {
          filters.classList.remove("open");
          filterOpener.classList.remove("active");
          toggleBodyScroll();
          removeOverlay();
        }
      });
    }
  };

  const removeOverlay = () => {
    const overlay = document.querySelector('.custom-overlay-filter');
    if (overlay) overlay.remove();
  };

  if (filterOpener) {
    filterOpener.addEventListener("click", function () {
      if (filters) {
        filters.classList.toggle("open");
        filterOpener.classList.toggle("active", filters.classList.contains("open"));

        if (filters.classList.contains("open")) {
          addOverlay();
        } else {
          removeOverlay();
        }

        toggleBodyScroll();
      }
    });
  }

  hideFilters.forEach((hideBtn) => {
    hideBtn.addEventListener("click", function () {
      if (filters && filters.classList.contains("open")) {
        filters.classList.remove("open");
        filterOpener.classList.remove("active");
        toggleBodyScroll();
        removeOverlay();
      }
    });
  });

  window.addEventListener("resize", toggleBodyScroll);
}


window.layoutSwitcherFunc = function () {
  const productGrid = document.querySelector(".product-grid");
  const layoutButtons = document.querySelectorAll(
    ".column__switch-lg-wrapper button"
  );

  if (!productGrid || !layoutButtons.length) return;

  // Constants
  const DESKTOP_CLASSES = ["grid--3-col-desktop", "grid--4-col-desktop"];
  const MOBILE_CLASSES = ["grid--1-col-tablet-down", "grid--2-col-tablet-down"];
  const ALL_CLASSES = [...DESKTOP_CLASSES, ...MOBILE_CLASSES];
  const STORAGE_KEY = "columnLayoutPreference";
  const EXPIRY_DAYS = 3;

  // Clear all layout classes
  function cleanUpGridClasses() {
    productGrid.classList.remove(...ALL_CLASSES);
  }

  // Set grid class and update button state
  function setGridClass(columnCount) {
    cleanUpGridClasses();

    const isDesktop = window.innerWidth >= 990;
    const classToAdd = isDesktop
      ? `grid--${columnCount}-col-desktop`
      : `grid--${columnCount}-col-tablet-down`;

    productGrid.classList.add(classToAdd);
    updateActiveButton(columnCount);
  }

  // Update active button based on column count
  function updateActiveButton(columnCount) {
    layoutButtons.forEach((button) => {
      const buttonColumn = parseInt(button.getAttribute("data-column"), 10);
      button.classList.toggle("active__column", buttonColumn === columnCount);
    });
  }

  // Save preference to localStorage
  function saveColumnPreference(columnCount) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + EXPIRY_DAYS);

    const preference = {
      columnCount: columnCount,
      expiry: expiryDate.getTime(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(preference));
  }

  // Get current active column count based on screen size
  function getCurrentColumnCount() {
    const isDesktop = window.innerWidth >= 990;
    const activeClasses = isDesktop ? DESKTOP_CLASSES : MOBILE_CLASSES;

    // Find which class is currently active
    const activeClass = activeClasses.find((cls) =>
      productGrid.classList.contains(cls)
    );

    if (activeClass) {
      return parseInt(activeClass.match(/\d+/)[0], 10);
    }
    return null;
  }

  // Load preference or sync with current classes
  function loadColumnPreference() {
    const savedPreference = localStorage.getItem(STORAGE_KEY);

    if (savedPreference) {
      const preference = JSON.parse(savedPreference);

      // Check if preference is expired
      if (new Date().getTime() > preference.expiry) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        // Apply saved preference
        setGridClass(preference.columnCount);
        return;
      }
    }

    // No valid preference - use current classes
    const currentColumnCount = getCurrentColumnCount();
    if (currentColumnCount !== null) {
      updateActiveButton(currentColumnCount);
    }
  }

  // Handle button click
  function handleButtonClick(button, columnCount) {
    setGridClass(columnCount);
    saveColumnPreference(columnCount);
  }

  // Initialize
  function init() {
    // Set up button click handlers
    layoutButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const columnCount = parseInt(button.getAttribute("data-column"), 10);
        handleButtonClick(button, columnCount);
      });
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        loadColumnPreference();
      }, 100);
    });

    // Initial load
    loadColumnPreference();
  }

  init();
};

window.hideActiveFilter = function () {
  const removeAll = document.querySelector(
    ".active-facets facet-remove:only-child"
  );
  const activeFilters = document.querySelectorAll(".active__filter");
  const mainFilters = document.querySelector('#main-collection-filters, #main-search-filters');

  if (removeAll) {
    const activeFilter = removeAll.closest(".active__filter");
    if (activeFilter) activeFilter.style.display = "none";
    if (mainFilters) mainFilters.classList.remove("manipulate");
  } else {
    activeFilters.forEach((filter) => (filter.style.display = "block"));
    if (mainFilters) mainFilters.classList.add("manipulate");
  }
};

window.filterAccordion = function () {
  const faqAccordions = document.querySelectorAll(".accordion-item");

  const openFaqAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion-body");
    accordion.classList.add("active");
    content.style.maxHeight = content.scrollHeight + "px";
  };

  const closeFaqAccordion = (accordion) => {
    const content = accordion.querySelector(".accordion-body");
    accordion.classList.remove("active");
    content.style.maxHeight = null;
  };

  // Check if URL contains "filter" or "sort"
  const url = window.location.href.toLowerCase();
  const shouldOpenAccordion = !url.includes("filter") && !url.includes("sort");

  if (faqAccordions.length > 0) {
    faqAccordions.forEach((accordion) => {
      const header = accordion.querySelector(".accordion-header");
      const content = accordion.querySelector(".accordion-body");

      // Only open accordion if URL doesn't contain "filter" or "sort"
      // if (shouldOpenAccordion) {
      //   openFaqAccordion(accordion);
      // }
      // else{
      //   closeFaqAccordion(accordion);
      // }
      closeFaqAccordion(accordion);

      
      header.addEventListener("click", (e) => {
        e.stopPropagation();
        if (content.style.maxHeight) {
          closeFaqAccordion(accordion);
        } else {
          openFaqAccordion(accordion);
        }
      });
    });
  }
};

/*
window.clearFilter = function () {
  const clearAllBtn = document.querySelector("[clear-all-filter]");
  const removeAllEl = document.querySelector(".remove__all-filter");
  const filtersPanel = document.querySelector('#main-collection-filters, #main-search-filters');

  if (clearAllBtn && removeAllEl && filtersPanel) {
    clearAllBtn.addEventListener("click", function () {
      removeAllEl.click();

      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "";
      }

      if (filtersPanel.classList.contains("open")) {
        setTimeout(() => {
          filtersPanel.classList.remove("open");
        }, 0);
      }
    });
  }
};
*/

window.clearFilter = function () {
  const clearAllBtn = document.querySelector("[clear-all-filter]");
  const removeAllEl = document.querySelector(".remove__all-filter");
  const filtersPanel = document.querySelector('#main-collection-filters, #main-search-filters');

  if (clearAllBtn && removeAllEl && filtersPanel) {
    clearAllBtn.addEventListener("click", function () {
      removeAllEl.click();

      if (document.body.style.overflow === "hidden") {
        document.body.style.overflow = "";
      }

      const overlay = document.querySelector('.custom-overlay-filter');
      if (overlay) overlay.remove();

      if (filtersPanel.classList.contains("open")) {
        setTimeout(() => {
          filtersPanel.classList.remove("open");
        }, 0);
      }
    });
  }
};



function scrollCollectionListsFunc() {
  const collectionsLists = document.querySelectorAll(".collections__list");

  if (collectionsLists.length > 0) {
    collectionsLists.forEach((container) => {
      const activeLink = container.querySelector("a.active");

      if (activeLink) {
        const scrollPosition =
          activeLink.offsetLeft -
          container.offsetWidth / 2 +
          activeLink.offsetWidth / 2;

        container.scrollTo({ left: scrollPosition, behavior: "smooth" });
      }
    });
  }
}

window.initWrapperHeightSync = function () {
  const image = document.querySelector(".product-card__gallery  img");
  const wrappers = document.querySelectorAll(
    ".--collection-promotion-card-wrapper"
  );
  const switchButtons = document.querySelectorAll(
    ".column__switch-lg-wrapper button"
  );

  if (!image) return;

  window.setAllWrapperHeights = function () {
    const imgHeight = image.offsetHeight;
    wrappers.forEach((wrapper) => {
      wrapper.style.height = `${imgHeight}px`;
    });
  };

  if (image.complete) {
    window.setAllWrapperHeights();
  } else {
    image.addEventListener("load", window.setAllWrapperHeights);
  }

  window.addEventListener("resize", window.setAllWrapperHeights);

  switchButtons.forEach((button) => {
    button.addEventListener("click", window.setAllWrapperHeights);
  });
};


window.loadMore = () => {
  const loadMoreButton = document.getElementById("load-more-button");
  const productGrid = document.getElementById("product-grid");
  const showingCount = document.getElementById("showing-count");

  if (!loadMoreButton || !productGrid) return;

  let isLoading = false;
  let currentPage = parseInt(loadMoreButton.dataset.currentPage);
  const totalPages = parseInt(loadMoreButton.dataset.totalPages);
  const totalItems = parseInt(loadMoreButton.dataset.totalItems);
  const itemsPerPage = parseInt(loadMoreButton.dataset.itemsPerPage);
  const collectionHandle =
    window.location.pathname.split("/collections/")[1]?.split("/")[0] || "";

  loadMoreButton.addEventListener("click", function () {
    if (isLoading || currentPage >= totalPages) return;

    isLoading = true;
    loadMoreButton.textContent = "Loading...";

    currentPage++;
    const url = buildUrl();

    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const parser = new DOMParser();
        const html = parser.parseFromString(text, "text/html");
        const newItems = html.getElementById("product-grid")?.innerHTML || "";

        if (newItems) {
          productGrid.insertAdjacentHTML("beforeend", newItems);

          const newShowingCount = Math.min(
            currentPage * itemsPerPage,
            totalItems
          );
          showingCount.textContent = newShowingCount;

          if (currentPage >= totalPages) {
            loadMoreButton.style.display = "none";
          } else {
            loadMoreButton.textContent = "Load More";
          }
        }
      })
      .catch((error) => {
        console.error("Error loading more products:", error);
        loadMoreButton.textContent = "Error - Try Again";
      })
      .finally(() => {
        isLoading = false;
        // window.initWrapperHeightSync();
        // window.cardProductFunc();
      });
  });

  function buildUrl() {
    const baseUrl = `/collections/${collectionHandle}`;
    const params = new URLSearchParams(window.location.search);
    params.set("page", currentPage);
    params.set("view", "ajax");
    return `${baseUrl}?${params.toString()}`;
  }
};



/*

window.loadMore = () => {
  const loadMoreButton = document.getElementById('load-more-button');
  const productGrid = document.getElementById('product-grid');
  const showingCount = document.getElementById('showing-count');

  if (!loadMoreButton || !productGrid) return;

  let isLoading = false;
  let currentPage = parseInt(loadMoreButton.dataset.currentPage) || 1;
  const totalPages = parseInt(loadMoreButton.dataset.totalPages);
  const totalItems = parseInt(loadMoreButton.dataset.totalItems);
  const itemsPerPage = parseInt(loadMoreButton.dataset.itemsPerPage);
  const collectionHandle = window.location.pathname.split('/collections/')[1]?.split('/')[0] || '';

  const urlParams = new URLSearchParams(window.location.search);
  const initialPage = parseInt(urlParams.get('page')) || 1;
  if (initialPage > 1 && currentPage === 1) {
    currentPage = initialPage;
    loadInitialPage();
  }

  function updateURL(pageNumber) {
    const baseURL = window.location.origin + `/collections/${collectionHandle}`;
    const url = pageNumber > 1 ? `${baseURL}?page=${pageNumber}` : baseURL;
    window.history.pushState({ page: pageNumber }, '', url);

    if (showingCount) {
      const newShowingCount = Math.min(pageNumber * itemsPerPage, totalItems);
      showingCount.textContent = newShowingCount;
    }
  }

  window.addEventListener('popstate', (event) => {
    if (event.state && event.state.page) {
      const newPage = event.state.page;
      if (newPage !== currentPage) {
        currentPage = newPage;
        loadInitialPage();
      }
    }
  });

  function loadInitialPage() {
    const url = buildUrl();
    isLoading = true;
    if (loadMoreButton) {
      loadMoreButton.textContent = 'Loading...';
      loadMoreButton.disabled = true;
    }

    fetch(url)
      .then(response => response.text())
      .then(text => {
        const parser = new DOMParser();
        const html = parser.parseFromString(text, 'text/html');
        const newItems = html.getElementById('product-grid')?.innerHTML || '';

        if (newItems && productGrid) {
          productGrid.innerHTML = newItems;
          updateURL(currentPage);

          if (currentPage >= totalPages && loadMoreButton) {
            loadMoreButton.style.display = 'none';
          }
        }
      })
      .catch(error => {
        console.error('Error loading products:', error);
        if (loadMoreButton) {
          loadMoreButton.textContent = 'Error - Try Again';
        }
      })
      .finally(() => {
        isLoading = false;
        if (loadMoreButton) {
          loadMoreButton.textContent = 'Load More';
          loadMoreButton.disabled = false;
        }
        window.initWrapperHeightSync();
        window.cardProductFunc();
      });
  }

  loadMoreButton.addEventListener('click', function() {
    if (isLoading || currentPage >= totalPages) return;

    isLoading = true;
    loadMoreButton.textContent = 'Loading...';
    loadMoreButton.disabled = true;

    currentPage++;
    const url = buildUrl();

    fetch(url)
      .then(response => response.text())
      .then(text => {
        const parser = new DOMParser();
        const html = parser.parseFromString(text, 'text/html');
        const newItems = html.getElementById('product-grid')?.innerHTML || '';

        if (newItems && productGrid) {
          productGrid.insertAdjacentHTML('beforeend', newItems);
          updateURL(currentPage);

          if (currentPage >= totalPages) {
            loadMoreButton.style.display = 'none';
          } else {
            loadMoreButton.textContent = 'Load More';
          }
        }
      })
      .catch(error => {
        console.error('Error loading more products:', error);
        loadMoreButton.textContent = 'Error - Try Again';
        currentPage--;
      })
      .finally(() => {
        isLoading = false;
        loadMoreButton.disabled = false;
        window.initWrapperHeightSync();
        window.cardProductFunc();
      });
  });

  function buildUrl() {
    const baseUrl = `/collections/${collectionHandle}`;
    const params = new URLSearchParams(window.location.search);
    params.set('page', currentPage);
    params.set('view', 'ajax');
    return `${baseUrl}?${params.toString()}`;
  }
}

*/

/*
function makeUtilitiesFixed() {
  const collectionsList = document.querySelector(
    ".collection__utilities-wrapper"
  );
  const headerSection = document.querySelector(".header-section");

  if (!collectionsList || !headerSection) return;

  const headerHeight = headerSection.offsetHeight;
  const initialOffset = collectionsList.offsetTop - headerHeight;
  let isSticky = false;
  let lastScroll = window.scrollY;

  const spacer = document.createElement("div");
  spacer.style.height = `${collectionsList.offsetHeight}px`;
  spacer.style.display = "none";
  collectionsList.parentNode.insertBefore(spacer, collectionsList);

  window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY;
    const scrollDirection = currentScroll > lastScroll ? "down" : "up";
    lastScroll = currentScroll;

    if (
      scrollDirection === "down" &&
      currentScroll >= initialOffset &&
      !isSticky
    ) {
      spacer.style.display = "block";
      collectionsList.classList.add("sticky__nav");
      collectionsList.style.top = `${headerHeight}px`;
      isSticky = true;
    }
    else if (
      scrollDirection === "up" &&
      currentScroll <= initialOffset &&
      isSticky
    ) {
      collectionsList.classList.remove("sticky__nav");
      collectionsList.style.top = "";
      spacer.style.display = "none";
      isSticky = false;
    }
  });
}
*/

// function makeUtilitiesFixed() {
//   const collectionsList = document.querySelector(".collection__utilities-wrapper");
//   const headerSection = document.querySelector(".header-section");

//   if (!collectionsList || !headerSection) return;

//   const headerHeight = headerSection.offsetHeight;
//   const initialOffset = collectionsList.offsetTop;
//   let isSticky = false;
//   let lastScroll = window.scrollY;

//   const spacer = document.createElement("div");
//   spacer.style.height = `${collectionsList.offsetHeight}px`;
//   spacer.style.display = "none";
//   collectionsList.parentNode.insertBefore(spacer, collectionsList);

//   window.addEventListener("scroll", function () {
//     const currentScroll = window.scrollY;
//     const scrollDirection = currentScroll > lastScroll ? "down" : "up";
//     lastScroll = currentScroll;

//     if (scrollDirection === "down" && currentScroll >= 1 && !isSticky) {
//       spacer.style.display = "block";
//       collectionsList.classList.add("sticky__nav");
//       collectionsList.style.top = `${headerHeight}px`;
//       isSticky = true;
//     }
//     else if (scrollDirection === "up" && currentScroll <= 1 && isSticky) {
//       collectionsList.classList.remove("sticky__nav");
//       collectionsList.style.top = "";
//       spacer.style.display = "none";
//       isSticky = false;
//     }
//   });
// }

/*
function makeUtilitiesFixed() {
  const collectionsList = document.querySelector(
    ".collection__utilities-wrapper"
  );
  const headerSection = document.querySelector(".header-section");

  if (!collectionsList || !headerSection) return;

  const headerHeight = headerSection.offsetHeight;
  const initialOffset = collectionsList.offsetTop;
  let isSticky = false;
  let lastScroll = window.scrollY;

  const spacer = document.createElement("div");
  spacer.style.height = `${collectionsList.offsetHeight}px`;
  spacer.style.display = "none";
  collectionsList.parentNode.insertBefore(spacer, collectionsList);

  window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY;
    const scrollDirection = currentScroll > lastScroll ? "down" : "up";
    lastScroll = currentScroll;

    if (scrollDirection === "down" && currentScroll >= 180 && !isSticky) {
      spacer.style.display = "block";
      collectionsList.classList.add("sticky__nav");
      collectionsList.style.top = `${headerHeight}px`;
      isSticky = true;
    } else if (scrollDirection === "up" && currentScroll <= 180 && isSticky) {
      collectionsList.classList.remove("sticky__nav");
      collectionsList.style.top = "";
      spacer.style.display = "none";
      isSticky = false;
    }
  });
}
*/
/*
function makeUtilitiesFixed() {
  const collectionsList = document.querySelector(".collection__utilities-wrapper");
  const headerSection = document.querySelector(".header-section");

  if (!collectionsList || !headerSection) return;

  const headerHeight = headerSection.offsetHeight;
  const initialOffset = collectionsList.getBoundingClientRect().top + window.scrollY;
  console.log(initialOffset);

  let isSticky = false;
  let lastScroll = window.scrollY;

  const spacer = document.createElement("div");
  spacer.style.height = `${collectionsList.offsetHeight}px`;
  spacer.style.display = "none";
  collectionsList.parentNode.insertBefore(spacer, collectionsList);

  window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY;
    const scrollDirection = currentScroll > lastScroll ? "down" : "up";
    lastScroll = currentScroll;

    if (scrollDirection === "down" && currentScroll >= initialOffset && !isSticky) {
      spacer.style.display = "block";
      collectionsList.classList.add("sticky__nav");
      collectionsList.style.top = `${headerHeight}px`;
      isSticky = true;
    } else if (scrollDirection === "up" && currentScroll <= initialOffset && isSticky) {
      collectionsList.classList.remove("sticky__nav");
      collectionsList.style.top = "";
      spacer.style.display = "none";
      isSticky = false;
    }
  });
}
*/

/*
window.makeUtilitiesFixed = function() {
  const collectionsList = document.querySelector(".collection__utilities-wrapper");
  const headerSection = document.querySelector(".header-section");
  const newCollectionLayout = document.querySelector(".new-collection-layout");

  if (!collectionsList || !headerSection || !newCollectionLayout) return;

  const headerHeight = headerSection.offsetHeight;
  let isSticky = false;
  let lastScroll = window.scrollY;

  const handleSticky = () => {
    const currentScroll = window.scrollY;
    const scrollDirection = currentScroll > lastScroll ? "down" : "up";
    lastScroll = currentScroll;

    const headerBottom = headerSection.getBoundingClientRect().bottom;
    let layoutTop = newCollectionLayout.getBoundingClientRect().top;

    // Add 100px extra only when scrolling down
    if (scrollDirection === "down") {
      layoutTop += 100;
    }

    if (headerBottom >= layoutTop && !isSticky) {
      collectionsList.classList.add("sticky__nav");
      collectionsList.style.top = `${headerHeight}px`;
      isSticky = true;
    } else if (headerBottom < layoutTop && isSticky) {
      collectionsList.classList.remove("sticky__nav");
      collectionsList.style.top = "";
      isSticky = false;
    }
  };

  window.addEventListener("scroll", handleSticky);
  handleSticky(); // Run on page load
}
*/


function makeUtilitiesFixed() {
  const collectionsList = document.querySelector(".collection__utilities-wrapper");
  const headerSection = document.querySelector(".header-section");

  if (!collectionsList || !headerSection) return;

  let headerHeight = headerSection.offsetHeight;
  let isSticky = false;
  let lastScroll = window.scrollY;
  let debounceTimer = null;

  const style = document.createElement("style");
  style.textContent = `
    .collection__utilities-wrapper.sticky__nav {
      position: fixed;
      top: ${headerHeight}px;
      transition: top 0.1s ease-in-out;
      width: 100%;
      box-sizing: border-box;
    }
  `;
  document.head.appendChild(style);

  const debounce = (func, delay = 100) => {
    return (...args) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  const recalculateMetrics = () => {
    headerHeight = headerSection.offsetHeight;
    if (isSticky) {
      collectionsList.style.top = `${headerHeight}px`;
    }
  };

  const handleSticky = () => {
    const currentScroll = window.scrollY;
    const scrollDirection = currentScroll > lastScroll ? "down" : "up";
    lastScroll = currentScroll;

    const stickyThreshold = 600;
    const unstickyThreshold = 550;

    if (!isSticky && currentScroll > stickyThreshold && scrollDirection === "down") {
      collectionsList.classList.add("sticky__nav");
      collectionsList.style.top = `${headerHeight}px`;
      isSticky = true;
    } else if (isSticky && currentScroll <= unstickyThreshold) {
      collectionsList.classList.remove("sticky__nav");
      collectionsList.style.top = "";
      isSticky = false;
    }
  };

  let isScrolling = false;
  const throttledHandleSticky = () => {
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(() => {
        handleSticky();
        isScrolling = false;
      });
    }
  };

  const debouncedRecalculate = debounce(recalculateMetrics, 150);

  const headerObserver = new ResizeObserver(debouncedRecalculate);
  headerObserver.observe(headerSection);

  const collectionsObserver = new ResizeObserver(() => {
    recalculateMetrics();
    handleSticky(); 
  });
  collectionsObserver.observe(collectionsList);

  window.addEventListener("scroll", throttledHandleSticky, { passive: true });
  window.addEventListener("resize", debouncedRecalculate);

  recalculateMetrics();
  handleSticky();
}







window.togglePromotionContent = function(){
  const promotionCards = document.querySelectorAll('.--collection-promotion-card-wrapper');
  
  promotionCards.forEach(card => {
    const contentWrapper = card.querySelector('.--promotion-card-content-wrapper');
    const toggleButton = card.querySelector('.promotional__content-shower');
    
    toggleButton.addEventListener('click', () => {
      contentWrapper.classList.toggle('active');
      toggleButton.classList.toggle('active');
    });
  });
}


window.scrollToNewCollection = function() {
    const element = document.querySelector('.new-collection-layout');
    if (element) {
        const topPosition = element.getBoundingClientRect().top + window.pageYOffset - 150;
        window.scrollTo({
            top: topPosition,
            behavior: 'smooth'
        });
    } else {
        console.log('.new-collection-layout element not found');
    }
}


document.addEventListener("DOMContentLoaded", function () {
  sortOpenerFunc();
  filterOpenFunc();
  // window.layoutSwitcherFunc();
  window.hideActiveFilter();
  window.filterAccordion();
  window.clearFilter();
  // scrollCollectionListsFunc();
  // window.initWrapperHeightSync();
  window.loadMore();
  // window.makeUtilitiesFixed();
  makeUtilitiesFixed();
  window.togglePromotionContent();
});



