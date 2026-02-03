/*

window.initializeQuickViewButtons = () => {
    document.querySelectorAll(".--quick-add-trigger").forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();     
        console.log('clicked')
        // Get the product URL from the button's data attribute
        // const productUrl = button.getAttribute("data-product-url");
        
       
       
        // const productUrl = button.closest('.--product-card-v3')?.querySelector('a.--product-card-url')?.getAttribute('href') || '';   
        const productUrl = button.dataset.url;  
       if(productUrl){
          console.log("Url Found")
        } else {

          console.log("Url not Found");
          return;
        }

        const xproductUrl = `${productUrl}`;
        // const xproductUrl = `${productUrl}&section_id=template--17226260938818__info`;
      







        console.log("Fetch Url", xproductUrl);
        

        // Check if quick view is already open
        if (document.body.classList.contains("adding-to-cart")) {
          return;
        }
         
        if (productUrl) {
          document.body.classList.add("adding-to-cart");

          fetch(xproductUrl)
            .then((res) => res.text())
            .then((res) => {

  
              const wholehtml = new DOMParser().parseFromString(res, "text/html");
            //   const html = wholehtml.querySelector('#--custom-product-section');
            // const html = wholehtml.querySelector('#MainContent').firstElementChild;
            const html = wholehtml.querySelector('#MainContent').querySelector('section.--product-section');

              console.log("wholehtml: ",wholehtml)
              if(!html){
                console.log("html missing")
                return;
              }
              // Remove unnecessary elements
              if (html.querySelector(".pinfo-bundle-wrapper")) {
                html.querySelector(".pinfo-bundle-wrapper").remove();
              }
              if (html.querySelector(".product-faq-wrapper")) {
                html.querySelector(".product-faq-wrapper").remove();
              }
            //  Remove only for mobile
              if (window.innerWidth < 600) {
                if (html.querySelector(".pdp-media-lg")) {
                  html.querySelector(".pdp-media-lg").remove();
                }
                 if (html.querySelector(".pinfo-breadcrumb")) {
                // html.querySelector(".pinfo-breadcrumb").remove();
              }
              if (html.querySelector(".pd-shipping__info")) {
                html.querySelector(".pd-shipping__info").remove();
              }
              if (html.querySelector(".product__description.mb")) {
                html.querySelector(".product__description.mb").remove();
              }
              if (html.querySelector(".pinfo-size-guide.openPopup")) {
                html.querySelector(".pinfo-size-guide.openPopup").remove();
              }
              }
              
              if (html.querySelector("product-information")) {
                html.querySelector("product-information").setAttribute("data-update-url", "false");
              }

              // Open the product quick view and render content
              if (!productQuickView.container.classList.contains("open")) {
                productQuickView.container.open();
              }

              productQuickView.container.renderContent(
                html.querySelector("#product-information-container").innerHTML
              );
              console.log("Printed values", html);

              if (typeof window.initFaqAccordions === "function") {
                window.initFaqAccordions();
              }
              if (typeof window.sizeGuide === "function") {
                window.sizeGuide();
              }
              
              // window.viewerCountPastDay();
              // window.getDeliveryWindow();
            })
            .catch((err) => console.log(err))
            .finally(() => {
              // document.body.classList.remove("adding-to-cart");
            });
        }
      });
    });
  };

  document.addEventListener("DOMContentLoaded", initializeQuickViewButtons);


*/

/*
window.initializeQuickViewButtons = () => {
  document.querySelectorAll(".--quick-add-trigger").forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();

      const url = button.dataset.url;
      if (!url) return;

      window.location.href = url;
    });
  });
};

document.addEventListener("DOMContentLoaded", initializeQuickViewButtons);
*/


window.setEqualHeightv2 = function(sectionSelector, selector) {
  let section = document.querySelector(sectionSelector);
  if(!section){
    return;
  }
  let divs = section.querySelectorAll(selector);
  let max = 0;

  // First pass: Calculate the maximum height
  divs.forEach((div) => {
    // let height = div.clientHeight;
    let temp = window.getComputedStyle(div);
    let height = parseFloat(temp.getPropertyValue("height"));
    
    if (height > max) {
      console.log("Height: ", height, " Max: ", max)
      max = height;
    } else {
      console.log("Lesser Height: ", height, " Max: ", max)
    }
  });

  // Second pass: Set all divs to the max height
  divs.forEach((div) => {
    console.log( "Set  Max: ", max)
    div.style.height = `${max}px`;
  });
}

// document.addEventListener("DOMContentLoaded", (event) => {
//   setEqualHeightv2(".sec-{{ id }}", ".--card-content-wrapper")
// });

// document.addEventListener("DOMContentLoaded", (event) => {
//   setEqualHeightv2(".product-grid-container", ".--product-info")
// });
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.key === "Esc") {
    if (productQuickView.container.classList.contains("open")) {
                productQuickView.container.close();
    }
    
  }
});

// document.addEventListener("click", function (event) {
//   // Get the product-quick-view element
//   const quickView = document.querySelector("product-quick-view.open");
//   const zoomView = quickView ? document.querySelector(".popup-overlay") : null;
//   const container = quickView ? quickView.querySelector(".pqv-container") : null;
//   console.log(zoomView)
//   // If quickView is open and the click happened outside pqv-container
//   if (quickView && container && !container.contains(event.target) ) {
//     const closeButton = quickView.querySelector(".pqv-close-btn");
//     if (closeButton) {
//       if(!zoomView){
//         closeButton.click(); // Trigger click on the close button
//       }
//       else if(zoomView && !zoomView.contains(event.target)){
//         closeButton.click();
//       }
      
//     }
//   }
// });
// document.addEventListener("click", function (event) {
//   const quickView = document.querySelector("product-quick-view.open");
//   if (!quickView) return;

//   const container = quickView.querySelector(".pqv-container");      // sibling 1
//   const zoomView = document.querySelector(".popup-overlay");       // sibling 2
//   const closeButton = quickView.querySelector(".pqv-close-btn");

//   if (!closeButton) return;

//   const clickedInsideContainer = container && container.contains(event.target);
//   const clickedInsideZoom = zoomView && zoomView.contains(event.target);
//   console.log('clickedInsideContainer',clickedInsideContainer)
//   console.log('clickedInsideZoom',clickedInsideZoom)
//   // If click is outside BOTH siblings → close
//   if (zoomView && zoomView.contains(event.target);) {
//     const clickedInsideZoom = true;
//   }
//   if (!clickedInsideContainer && !clickedInsideZoom) {
//     closeButton.click();
//   }
// });

document.addEventListener(
  "click",
  function (event) {
    const quickView = document.querySelector("product-quick-view.open");
    if (!quickView) return;

    const closeButton = quickView.querySelector(".pqv-close-btn");
    if (!closeButton) return;

    // Use composedPath to be robust even if nodes are removed by other handlers
    const path = typeof event.composedPath === "function" ? event.composedPath() : null;

    // Did we click inside the quick view container?
    const clickedInsideContainer =
      !!event.target.closest("product-quick-view.open .pqv-container");

    // Did we click inside the overlay (which is OUTSIDE quickView)?
    // Prefer composedPath so it still matches even if overlay gets removed immediately.
    const clickedInsideZoom = path
      ? path.some(
          (n) => n instanceof Element && n.classList?.contains("popup-overlay")
        )
      : (() => {
          const ov = document.querySelector(".popup-overlay");
          return ov ? ov.contains(event.target) : false;
        })();

    // Close ONLY if the click was outside BOTH the container and the overlay
    if (!clickedInsideContainer && !clickedInsideZoom) {
      closeButton.click();
    }
  },
  // Capture phase so we run before most bubbling handlers that might remove nodes
  { capture: true }
);





window.setupSectionNavigatorScroll = function() {
    // Select all anchor elements with the specified class
    const anchors = document.querySelectorAll('.--section-navigator');
    
    // Determine if the device is mobile based on window width
    const isMobile = window.innerWidth <= 768;
    const offset = isMobile ? 200 : 250;

    console.log("anchors",anchors)

   
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            const targetId = this.getAttribute('href').substring(1); // Get target ID without #
            const targetElement = document.getElementById(targetId);
             console.log("Target ",targetId, "offset",offset)
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
};

/*
 window.enableStickyATC = function (){
    const pqaNewElement = document.querySelector('pqa-new');
    const targetElement = document.querySelector('.pinfo-form-wrapper');
    const footer = document.querySelector('.footer__section');
    let lastScrollY = window.scrollY;

    if (!targetElement || !pqaNewElement) {
      console.error('Required elements not found');
      return;
    }

    function getScrollDirection() {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = currentScrollY;
      return direction;
    }

    const BOTTOM_THRESHOLD_PX = 12;
    function isAtBottom() {
      const doc = document.documentElement;
      const scrolledBottom = Math.ceil(window.scrollY + window.innerHeight);
      return scrolledBottom >= (doc.scrollHeight - BOTTOM_THRESHOLD_PX);
    }

    setTimeout(() => {
      if (isAtBottom()) {
        pqaNewElement.classList.remove('sticky-visible');
        return;
      }
      const targetRect = targetElement.getBoundingClientRect();
      const pqaRect = pqaNewElement.getBoundingClientRect();
      const scrollPosition = window.scrollY + window.innerHeight;
      if (scrollPosition >= targetRect.top + window.scrollY && targetRect.top > pqaRect.bottom) {
        pqaNewElement.classList.add('sticky-visible');
      }
    }, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        if (isAtBottom()) {
          pqaNewElement.classList.remove('sticky-visible');
          return;
        }
        const scrollDirection = getScrollDirection();
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            if (scrollDirection === 'down') {
              pqaNewElement.classList.add('sticky-visible');
            }
          } else {
            pqaNewElement.classList.remove('sticky-visible');
          }
        });
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(targetElement);

    window.addEventListener('scroll', () => {
      if (isAtBottom()) pqaNewElement.classList.remove('sticky-visible');
    }, { passive: true });
  }
*/


window.enableStickyATC = function () {
  const pqaNewElement = document.querySelector('pqa-new');
  const targetElement = document.querySelector('.pinfo-form-wrapper');
  let lastScrollY = window.scrollY;

  if (!targetElement || !pqaNewElement) return;

  function getScrollDirection() {
    const currentScrollY = window.scrollY;
    const direction = currentScrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = currentScrollY;
    return direction;
  }

  const BOTTOM_THRESHOLD_PX = 12;
  function isAtBottom() {
    const scrolledBottom = Math.ceil(window.scrollY + window.innerHeight);
    return scrolledBottom >= (document.documentElement.scrollHeight - BOTTOM_THRESHOLD_PX);
  }

  function isTargetAboveViewport() {
    return targetElement.getBoundingClientRect().bottom < 0;
  }

  setTimeout(() => {
    if (isAtBottom()) {
      pqaNewElement.classList.remove('sticky-visible');
      return;
    }
    if (isTargetAboveViewport()) {
      pqaNewElement.classList.add('sticky-visible');
    }
  }, 100);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (isAtBottom()) {
          pqaNewElement.classList.remove('sticky-visible');
          return;
        }
        const scrollDirection = getScrollDirection();
        if (!entry.isIntersecting && isTargetAboveViewport()) {
          pqaNewElement.classList.add('sticky-visible');
        } else if (entry.isIntersecting) {
          pqaNewElement.classList.remove('sticky-visible');
        } else if (scrollDirection === 'up' && isTargetAboveViewport()) {
          pqaNewElement.classList.add('sticky-visible');
        }
      });
    },
    { root: null, threshold: 0 }
  );

  observer.observe(targetElement);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (isAtBottom()) {
          pqaNewElement.classList.remove('sticky-visible');
        } else if (isTargetAboveViewport()) {
          pqaNewElement.classList.add('sticky-visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
};


// Call the function after defining it
document.addEventListener('DOMContentLoaded', function() {
    window.setupSectionNavigatorScroll();
});




window.copyDiscountCode = async function (btn) {
  if (!btn) return;

  const root = btn.closest('.pdp-discount');
  const code = root?.dataset?.discount || '';
  const status = root.querySelector('.pdp-discount__status');

  try {
    await navigator.clipboard.writeText(code);
    status.classList.remove('hidden');

    // optional store
    try { localStorage.setItem('last_discount_code', code); } catch {}
  } catch (err) {
    status.textContent = 'Copy blocked';
    console.error(err);
  }

  clearTimeout(btn._t);
  // btn._t = setTimeout(() => { status.textContent = ''; }, 1500);
};
