// comment
// comment
// comment
// comment
// comment
// comment

class ProductInformation extends HTMLElement {
  constructor() {
    super();
    this.sectionId = this.dataset.sectionId;
    this.handleEvents();
    this.mediaTagListeners = new Map();
    this.handleActionPopup();
  }

  connectedCallback() {
    if (this.querySelector(".pinfo-gallery-swiper")) this.initSwiperSlider();

    this.querySelector("pinfo-variant-picker").addEventListener(
      "input",
      this.handleVariantEvent.bind(this)
    );

    
    // this.initZoomSlider();
    this.accordionInit();
    this.initMobileSwiper();
    this.verticalImageChange();
    this.customCursor();
    this.mediaPopup();
    this.colorLabelHover();
    this.optionLabelHover();
    this.initQuantitySelector();
  }


  handleVariantEvent(e) {
    const { variantUrl } = e.target.dataset;

    const cursor = document.querySelector('.custom-cursor');
    if (cursor) cursor.remove();
    this.cleanupCustomCursor();

    this.handleOptions(variantUrl);
    // const variantId = new URLSearchParams(variantUrl.split("?")[1]).get("variant");
    const variantId = Number(
      new URLSearchParams(variantUrl.split("?")[1]).get("variant")
    );


    // console.log(variantId);
    // let selectedVariant = productVariants.find((v) => v.id === variantId);
    // console.log(productVariants);
    // console.log(selectedVariant);
    // if (document.querySelector("stock-notify")) {
    //   notifyPopup(selectedVariant);
    // }
  }


  handleActionPopup() {
    const openButtons = this.querySelectorAll("[open-action-popup]");
    const closeButtons = this.querySelectorAll("[close-action-popup]");
    const popup = this.querySelector(".action__popup");
    const body = document.body;
    let isProcessing = false;

    const waitForTransition = (element, property) => {
      return new Promise((resolve) => {
        const handler = (e) => {
          if (
            e.target === element &&
            (!property || e.propertyName === property)
          ) {
            element.removeEventListener("transitionend", handler);
            resolve();
          }
        };
        element.addEventListener("transitionend", handler);
        setTimeout(resolve, 1000);
      });
    };

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const openPopup = async () => {
      if (isProcessing || popup.classList.contains("active")) return;
      isProcessing = true;

      const existingOverlay = document.querySelector(".custom-overlay-see-action");
      if (existingOverlay) existingOverlay.remove();
      const overlay = document.createElement("div");
      overlay.className = "custom-overlay-see-action";
      document.body.appendChild(overlay);

      overlay.classList.add("active");
      await waitForTransition(overlay, "opacity");

      popup.classList.add("active");
      await waitForTransition(popup, "max-height");

      closeButtons.forEach((btn) => btn.classList.add("visible"));
      await waitForTransition(closeButtons[0], "opacity");

      await delay(150);
      body.classList.add("overflow-hidden");

      await delay(150);
      const video = popup.querySelector(".action-video");
      if (video) {
        video.currentTime = 0;
        video.play().catch((error) => console.log("Video play failed:", error));
      }

      isProcessing = false;
    };

    const closePopup = async () => {
      if (isProcessing || !popup.classList.contains("active")) return;
      isProcessing = true;

      const video = popup.querySelector(".action-video");
      if (video) video.pause();

      popup.classList.remove("active");
      await waitForTransition(popup, "max-height");

      closeButtons.forEach((btn) => btn.classList.remove("visible"));
      await waitForTransition(closeButtons[0], "opacity");

      await delay(150);
      body.classList.remove("overflow-hidden");

      const overlay = document.querySelector(".custom-overlay-see-action");
      if (overlay) {
        overlay.classList.remove("active");
        await waitForTransition(overlay, "opacity");
        overlay.remove();
      }

      isProcessing = false;
    };

    openButtons.forEach((button) => {
      button.addEventListener("click", openPopup);
    });

    closeButtons.forEach((button) => {
      button.addEventListener("click", closePopup);
    });

    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("custom-overlay-see-action")) {
        closePopup();
      }
    });
  }


  initQuantitySelector() {
    const qtyWrapper = this.querySelector('[data-quantity-selector]');
    if (!qtyWrapper) return;
    const input = qtyWrapper.querySelector('.qty-input');
    const decreaseBtn = qtyWrapper.querySelector('.decrease');
    const increaseBtn = qtyWrapper.querySelector('.increase');
    decreaseBtn.addEventListener('click', () => {
      let currentVal = parseInt(input.value) || 1;
      if (currentVal > parseInt(input.min || 1)) {
        input.value = currentVal - 1;
        this.dispatchQuantityChange(input.value);
      }
    });
    increaseBtn.addEventListener('click', () => {
      let currentVal = parseInt(input.value) || 1;
      input.value = currentVal + 1;
      this.dispatchQuantityChange(input.value);
    });
    input.addEventListener('input', () => {
      if (input.value < 1) input.value = 1;
      this.dispatchQuantityChange(input.value);
    });
  }

  dispatchQuantityChange(value) {
    this.dispatchEvent(new CustomEvent('quantity-change', {
      detail: { quantity: Number(value) },
      bubbles: true
    }));
  }


  colorLabelHover() {
    const selectedColor = this.querySelector('.pinfo-selected-color');
    if (!selectedColor) return;
    const originalText = selectedColor.textContent;
    this.querySelectorAll('.pinfo-color-label').forEach((label) => {
      label.addEventListener('mouseenter', () => {
        const title = label.getAttribute('title');
        if (title) selectedColor.textContent = title;
      });
      label.addEventListener('mouseleave', () => {
        selectedColor.textContent = originalText;
      });
    });
  }
  optionLabelHover() {
    const selectedOption = this.querySelector('[data-dynamic-size-label]');
    // if (!selectedOption) return;
    const originalText = selectedOption.textContent;
    this.querySelectorAll('.pinfo-options-values-wrapper.others-options .pinfo-option-value').forEach((label) => {
      let selectedOption2 =  label.closest('.pinfo-variants-options')?.querySelector('span.pinfo-selected-value');
      if (!selectedOption2) return;
      let originalText2 = selectedOption2.textContent; 
      label.addEventListener('mouseenter', () => {

        const title = label.querySelector('label').getAttribute('title');
        // if (title) selectedOption.textContent = title;
        if (title) selectedOption2.textContent = title;
      });
      label.addEventListener('mouseleave', () => {
        // selectedOption.textContent = originalText;
        selectedOption2.textContent = originalText2;
      });
    });
  }

  verticalImageChange() {
    this.verticalImages = this.querySelectorAll(".vertical__media");
    this.galleryImages = this.querySelectorAll(".info-media-stack-wrapper .pdp-media");

    if (this.verticalImages.length > 0) {
      this.verticalImages[0].classList.add("active");
    }

    this.verticalImages.forEach((verticalImage) => {
      verticalImage.addEventListener("click", () => {
        this.verticalImages.forEach((img) => img.classList.remove("active"));
        verticalImage.classList.add("active");

        const mediaContainer = verticalImage.closest(".pdp-media-v");
        if (!mediaContainer) return;
        const mediaId = mediaContainer.dataset.media;

        const matchedGalleryImage = Array.from(this.galleryImages).find(
          (galleryImage) => galleryImage.dataset.media === mediaId
        );

        if (matchedGalleryImage) {
          const parent = matchedGalleryImage.parentNode;
          parent.prepend(matchedGalleryImage);
        }
      });
    });
  }

 cleanupCustomCursor() {
    this.mediaTagListeners.forEach((listeners, element) => {
      element.removeEventListener('mouseenter', listeners.mouseenter);
      element.removeEventListener('mousemove', listeners.mousemove);
      element.removeEventListener('mouseleave', listeners.mouseleave);
    });
    this.mediaTagListeners.clear();
  }

  checkQuickViewAncestor() {
    return !!this.closest('.pqv-container');
  }

  customCursor() {
    if (window.matchMedia("(max-width: 989px)").matches) return;
    if (this.checkQuickViewAncestor()) return; 
    let cursor = null;
    const createCustomCursor = (e) => {
      cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      cursor.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <g clip-path="url(#clip0_17224_10739)">
            <path d="M14.8078 12.61L15.0308 13.4545L15.8753 13.6775L17.0955 14L15.8753 14.3225L15.0308 14.5455L14.8078 15.39L14.4846 16.6109L14.1628 15.39L13.9398 14.5455L13.0952 14.3225L11.8737 14L13.0952 13.6775L13.9398 13.4545L14.1628 12.61L14.4846 11.3891L14.8078 12.61Z" stroke="white" stroke-width="3"/>
            <path d="M8.16699 1.16666H2.33366C1.68933 1.16666 1.16699 1.68899 1.16699 2.33332V8.16666" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M19.834 26.8333H25.6673C26.3117 26.8333 26.834 26.3109 26.834 25.6666V19.8333" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M26.834 8.1666V2.33326C26.834 1.68893 26.3116 1.1666 25.6673 1.1666H19.834" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M1.16699 19.8333V25.6666C1.16699 26.3109 1.68933 26.8333 2.33366 26.8333H8.16699" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </g>
          <defs>
            <clipPath id="clip0_17224_10739">
              <rect width="28" height="28" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <span class="cursor-text hidden">Zoom In</span>
      `;
      document.body.appendChild(cursor);
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    const updateCursorPosition = (e) => {
      if (cursor) {
        requestAnimationFrame(() => {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
        });
      }
    };
    const destroyCustomCursor = () => {
      if (cursor) {
        cursor.remove();
        cursor = null;
      }
    };
    this.querySelectorAll('.pdp__media-tag').forEach((element) => {
      element.classList.add('no-cursor');
      const listeners = {
        mouseenter: createCustomCursor,
        mousemove: updateCursorPosition,
        mouseleave: destroyCustomCursor
      };
      element.addEventListener('mouseenter', listeners.mouseenter);
      element.addEventListener('mousemove', listeners.mousemove);
      element.addEventListener('mouseleave', listeners.mouseleave);
      this.mediaTagListeners.set(element, listeners);
    });
  }


mediaPopup() {
  if (this.checkQuickViewAncestor()) return;
  this.querySelectorAll('.pdp__media-tag').forEach((media) => {
    media.addEventListener('click', () => {
      const popup = document.createElement('div');
      popup.className = 'popup-overlay';

      const content = document.createElement('div');
      content.className = 'popup-content';

      const mediaWrapper = document.createElement('div');
      mediaWrapper.className = 'media-wrapper';

      const clone = media.cloneNode(true);
      clone.className = 'popup-media';
      if (media.tagName === 'VIDEO') {
        return;
        clone.controls = true;
        clone.autoplay = true;
      } else if (media.tagName === 'IMG') {
        const highResSrc = media.dataset.highResSrc || media.src.replace(/width=\d+/, 'width=2048');
        mediaWrapper.style.backgroundImage = `url(${highResSrc})`;
      }

      mediaWrapper.appendChild(clone);
      content.appendChild(mediaWrapper);

      const closeBtn = document.createElement('button');
      closeBtn.className = 'popup-close';
      closeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-minus" width="16" height="16" viewBox="0 0 8 8" fill="none">
          <path d="M7.23248 1.57393L4.80812 3.99829L7.23248 6.42266L6.42436 7.23078L3.99999 4.80641L1.57563 7.23078L0.767506 6.42266L3.19187 3.99829L0.767506 1.57392L1.57563 0.765803L3.99999 3.19017L6.42436 0.765803L7.23248 1.57393Z" fill="#6C7884"></path>
        </svg>
      `;
      content.appendChild(closeBtn);

      popup.appendChild(content);
      document.body.appendChild(popup);

      let popupCursor = null;
      let initialPinchDistance = null;
      let initialBackgroundSize = 160;
      let currentBackgroundSize = initialBackgroundSize;
      let lastX = 50;
      let lastY = 50;
      let prevTouchX = null;
      let prevTouchY = null;

      const createPopupCursor = (e) => {
        popupCursor = document.createElement('div');
        popupCursor.className = 'popup-cursor';
        popupCursor.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
            <g clip-path="url(#clip0_17653_77081)">
              <path d="M15.6963 13.2451L15.2568 14L15.6963 14.7549L16.3311 15.8457L15.2402 15.2109L14.4854 14.7715L13.7305 15.2109L12.6387 15.8457L13.2744 14.7549L13.7139 14L13.2744 13.2451L12.6387 12.1533L13.7305 12.7891L14.4854 13.2285L15.2402 12.7891L16.3311 12.1533L15.6963 13.2451Z" stroke="white" stroke-width="3"/>
              <path d="M8.16699 1.16666H2.33366C1.68933 1.16666 1.16699 1.68899 1.16699 2.33332V8.16666" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M19.834 26.8333H25.6673C26.3117 26.8333 26.834 26.3109 26.834 25.6666V19.8333" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M26.834 8.1666V2.33326C26.834 1.68893 26.3116 1.1666 25.6673 1.1666H19.834" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M1.16699 19.8333V25.6666C1.16699 26.3109 1.68933 26.8333 2.33366 26.8333H8.16699" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </g>
            <defs>
              <clipPath id="clip0_17653_77081">
                <rect width="28" height="28" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <span class="popup-cursor-text hidden">Zoom Out</span>
        `;
        document.body.appendChild(popupCursor);
        popupCursor.style.left = `${e.clientX}px`;
        popupCursor.style.top = `${e.clientY}px`;
      };

      const updatePopupCursor = (e) => {
        if (!popupCursor) return;
        requestAnimationFrame(() => {
          if (popupCursor) {
            popupCursor.style.left = `${e.clientX}px`;
            popupCursor.style.top = `${e.clientY}px`;
          }
        });
      };

      const destroyPopupCursor = () => {
        if (popupCursor) {
          popupCursor.remove();
          popupCursor = null;
        }
      };

      const closePopup = () => {
        popup.remove();
        destroyPopupCursor();
        mediaWrapper.removeEventListener('mousemove', updatePopupCursor);
        mediaWrapper.removeEventListener('touchmove', handleTouchMove);
        mediaWrapper.removeEventListener('touchstart', handleTouchStart);
        mediaWrapper.removeEventListener('touchend', handleTouchEnd);
        if (media.tagName === 'IMG') {
          mediaWrapper.removeEventListener('mousemove', zoomImage);
          mediaWrapper.removeEventListener('mouseenter', zoomEnter);
          mediaWrapper.removeEventListener('mouseleave', zoomLeave);
        }
      };

      const zoomEnter = () => {
        if (media.tagName === 'IMG' && !window.matchMedia("(max-width: 989px)").matches) {
          clone.style.opacity = '0';
          createPopupCursor();
        }
      };

      const zoomLeave = () => {
        if (media.tagName === 'IMG') {
          clone.style.opacity = '1';
          destroyPopupCursor();
        }
      };

      const zoomImage = (e) => {
        const offsetX = e.offsetX || (e.touches && e.touches[0].pageX) || e.clientX - mediaWrapper.getBoundingClientRect().left;
        const offsetY = e.offsetY || (e.touches && e.touches[0].pageY) || e.clientY - mediaWrapper.getBoundingClientRect().top;
        let x, y;
        if (e.touches) {
          if (prevTouchX !== null && prevTouchY !== null) {
            const deltaX = (prevTouchX - offsetX) / mediaWrapper.offsetWidth * 100;
            const deltaY = (prevTouchY - offsetY) / mediaWrapper.offsetHeight * 100;
            x = Math.min(Math.max(lastX + deltaX, 0), 100);
            y = Math.min(Math.max(lastY + deltaY, 0), 100);
          } else {
            x = 100 - (offsetX / mediaWrapper.offsetWidth) * 100;
            y = 100 - (offsetY / mediaWrapper.offsetHeight) * 100;
          }
          prevTouchX = offsetX;
          prevTouchY = offsetY;
        } else {
          x = (offsetX / mediaWrapper.offsetWidth) * 100;
          y = (offsetY / mediaWrapper.offsetHeight) * 100;
        }
        mediaWrapper.style.backgroundPosition = `${x}% ${y}%`;
        lastX = x;
        lastY = y;
      };

      const handleTouchStart = (e) => {
        if (media.tagName !== 'IMG' || !window.matchMedia("(max-width: 989px)").matches) return;
        if (e.touches.length === 2) {
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          initialPinchDistance = Math.hypot(
            touch1.pageX - touch2.pageX,
            touch1.pageY - touch2.pageY
          );
          prevTouchX = null;
          prevTouchY = null;
        } else if (e.touches.length === 1) {
          prevTouchX = e.touches[0].pageX - mediaWrapper.getBoundingClientRect().left;
          prevTouchY = e.touches[0].pageY - mediaWrapper.getBoundingClientRect().top;
        }
        clone.style.opacity = '0';
      };

      const handleTouchMove = (e) => {
        if (media.tagName !== 'IMG' || !window.matchMedia("(max-width: 989px)").matches) return;
        e.preventDefault();
        if (e.touches.length === 1) {
          zoomImage(e);
        } else if (e.touches.length === 2) {
          const touch1 = e.touches[0];
          const touch2 = e.touches[1];
          const currentDistance = Math.hypot(
            touch1.pageX - touch2.pageX,
            touch1.pageY - touch2.pageY
          );
          if (initialPinchDistance) {
            const scale = currentDistance / initialPinchDistance;
            currentBackgroundSize = Math.min(Math.max(initialBackgroundSize * scale, 100), 400);
            mediaWrapper.style.backgroundSize = `${currentBackgroundSize}%`;
            if (currentBackgroundSize < 160) {
              closePopup();
            }
          }
        }
      };

      const handleTouchEnd = () => {
        if (media.tagName !== 'IMG' || !window.matchMedia("(max-width: 989px)").matches) return;
        initialPinchDistance = null;
        initialBackgroundSize = currentBackgroundSize;
        prevTouchX = null;
        prevTouchY = null;
      };

      if (media.tagName === 'IMG') {
        content.style.overflow = 'hidden';
        content.style.position = 'relative';
        mediaWrapper.style.position = 'relative';
        mediaWrapper.style.backgroundSize = '160%';

        mediaWrapper.addEventListener('mouseenter', zoomEnter);
        mediaWrapper.addEventListener('mousemove', updatePopupCursor);
        mediaWrapper.addEventListener('mousemove', zoomImage);
        mediaWrapper.addEventListener('mouseleave', zoomLeave);
        mediaWrapper.addEventListener('touchstart', handleTouchStart, { passive: false });
        mediaWrapper.addEventListener('touchmove', handleTouchMove, { passive: false });
        mediaWrapper.addEventListener('touchend', handleTouchEnd);
      }

      closeBtn.addEventListener('click', closePopup);
      popup.addEventListener('click', closePopup);
    });
  });
}

initMobileSwiper() {
  const container = this.querySelector(".pdp-media-sm");
  if (!container) return;

  const mainSwiperEl = container.querySelector(".main-swiper");
  const thumbSwiperEl = container.querySelector(".thumb-swiper");
  if (!mainSwiperEl || !thumbSwiperEl) return;

  const slides = mainSwiperEl.querySelectorAll(".swiper-slide");
  const sliderLength = slides.length;

  this.thumbSwiper = new Swiper(thumbSwiperEl, {
    slidesPerView: 5,
    spaceBetween: 10,
    watchSlidesProgress: true,
    freeMode: true,
    breakpoints: {
      320: { slidesPerView: 5.5, spaceBetween: 8 },
      640: { slidesPerView: 7, spaceBetween: 10 },
      1024: { slidesPerView: 8, spaceBetween: 12 },
    },
  });

  this.mobileSwiper = new Swiper(mainSwiperEl, {
    navigation: {
      nextEl: container.querySelector(".swiper-button-prev"),
      prevEl: container.querySelector(".swiper-button-next"),
    },
    pagination: {
      el: container.querySelector(".swiper-pagination"),
      clickable: true,
    },
    thumbs: {
      swiper: this.thumbSwiper,
    },
    on: {
      init: function () {
        const totalEl = container.querySelector(".total");
        const currentEl = container.querySelector(".current");
        if (totalEl) totalEl.textContent = this.slides.length;
        if (currentEl) currentEl.textContent = this.realIndex + 1;

        if (sliderLength < 7) {
          const paginationEl = container.querySelector(".swiper-pagination");
          if (paginationEl) {
            paginationEl.classList.add("justify-center");
          }
        }
      },
      slideChange: function () {
        const currentEl = container.querySelector(".current");
        if (currentEl) currentEl.textContent = this.realIndex + 1;
      },
    },
  });
}

  /*
  initZoomSlider(){
    this.LBcursorEl = this.querySelector(".custom-zoom-cursor");
    this.addEventListener("click", this.handleClickeEvents.bind(this));

    if (this.querySelector(".media__lightbox-swiper")) {
      this.querySelector(".media__lightbox-swiper").addEventListener(
        "mouseenter",
        (e) => {
          if (this.querySelector(".media__lightbox-swiper .zoomed")) {
            this.querySelector(".custom-zoom-cursor").style.display = "none";
            document.body.style.cursor = "";
          } else {
            this.querySelector(".custom-zoom-cursor").style.display = "flex";
            this.querySelector(".custom-zoom-cursor").style.color = "red";
            document.body.style.cursor = "none";
          }
        }
      );
      this.querySelector(".media__lightbox-swiper").addEventListener(
        "mouseleave",
        (e) => {
          this.querySelector(".custom-zoom-cursor").style.display = "none";
          document.body.style.cursor = "";
        }
      );

      this.querySelector(".media__lightbox-swiper").addEventListener(
        "click",
        (e) => {
          let targetItem = e.target.classList.contains("swiper-slide")
            ? e.target
            : e.target.closest(".swiper-slide");
          if (targetItem) {
            const mediaId = targetItem.getAttribute("data-media");
            let targetMediaSlide = this.querySelector(
              `.media__lightbox-swiper .swiper-slide[data-media='${mediaId}']`
            );
            if (targetMediaSlide) {
              this.handleLBZoom(targetMediaSlide);
            }
          }
        }
      );
    }

    document.addEventListener(
      "mousemove",
      this.handleMouseMoveEvents.bind(this)
    );
  }
  */  

  handleEvents() {
    this.querySelector("form").addEventListener(
      "submit",
      this.handleAddToCart.bind(this)
    );
  }

  handleClickeEvents(e) {
    let targetItem = e.target.classList.contains("pdp-media")
      ? e.target
      : e.target.closest(".pdp-media");
    if (targetItem) {
      const mediaId = targetItem.getAttribute("data-media");
      this.initLightBoxSlider(mediaId);
      this.querySelector(".media__lightbox").classList.add("active");
    }

    let LBcloseBtn = e.target.classList.contains("close-lightbox")
      ? e.target
      : e.target.closest(".close-lightbox");
    if (LBcloseBtn) {
      this.querySelector(".media__lightbox").classList.remove("active");
    }
  }

  handleMouseMoveEvents(e) {
    this.LBcursorEl.style.left = e.clientX - 12 + "px";
    this.LBcursorEl.style.top = e.clientY - 12 + "px";
  }

  initLightBoxSlider(mediaId) {
    this.LBgalleryThumbs = new Swiper(".media__lightbox-thumb", {
      slidesPerView: 6,
      spaceBetween: 10,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      breakpoints: {
        990: {
          direction: "vertical",
        },
      },
    });

    let initIndex = 0;
    let targetMediaSlide = this.querySelector(
      `.media__lightbox-swiper .swiper-slide[data-media='${mediaId}']`
    );
    if (targetMediaSlide) {
      initIndex = parseInt(targetMediaSlide.dataset.index) || 0;
      initIndex--;
    }
    this.LBgalleryTop = new Swiper(".media__lightbox-swiper", {
      spaceBetween: 10,
      initialSlide: initIndex,
      thumbs: {
        swiper: this.LBgalleryThumbs,
      },
    });
  }

  handleLBZoom(activeSlide) {
    activeSlide.classList.toggle("zoomed");

    if (activeSlide.classList.contains("zoomed")) {
      this.querySelector(".custom-zoom-cursor").style.display = "none";
      this.querySelector(".custom-zoom-cursor").style.color = "red";
      document.body.style.cursor = "none";
    } else {
      this.querySelector(".custom-zoom-cursor").style.display = "flex";
      document.body.style.cursor = "";
    }

    this.handleLBImageMagnify(activeSlide);
  }

  handleLBImageMagnify(slide) {
    slide.addEventListener("mousemove", (e) => {
      let img = slide.querySelector("img");
      const rect = slide.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      img.style.transformOrigin = `${x}% ${y}%`;
    });
  }

  accordionInit() {
    if (this.querySelector(".accordion-wrapper-pinfo"))
      new Accordion(".accordion-wrapper-pinfo", {
        closeAll: true,
        initOpenIndex: 1,
        duration: 700,
        activeClass: "active",
      });
  }



  handleOptions(url) {
    this.fetchData(url);
    this.updateURL(url);
  }

  async fetchData(url) {
    if (this.querySelector("pinfo-variant-picker")) {
      this.querySelector("pinfo-variant-picker").style.pointerEvents = "none";
      this.querySelector("pinfo-variant-picker").classList.add("loading");
    }
    let sectionUrl = `${url}&section_id=${this.sectionId}`;
    const response = await fetch(sectionUrl);
    const data = await response.text();
    const html = new DOMParser().parseFromString(data, "text/html");
    this.renderEl(html);

    
  }

  renderEl(html) {
    if (this.querySelector(".pinfo-top") && html.querySelector(".pinfo-top")) {
      this.querySelector(".pinfo-top").innerHTML =
        html.querySelector(".pinfo-top").innerHTML;
    }
    // if (
    //   this.querySelector("pinfo-variant-picker") &&
    //   html.querySelector("pinfo-variant-picker")
    // ) {
    //   this.querySelector("pinfo-variant-picker").innerHTML = html.querySelector(
    //     "pinfo-variant-picker"
    //   ).innerHTML;
    // }
    const variantPickers = this.querySelectorAll("pinfo-variant-picker");
        const htmlVariantPickers = html.querySelectorAll("pinfo-variant-picker");

        variantPickers.forEach((picker, index) => {
          if (htmlVariantPickers[index]) {
            picker.innerHTML = htmlVariantPickers[index].innerHTML;
          }
        });
    const prices = this.querySelectorAll(".pinfo-price-wrapper");
        const htmlprices = html.querySelectorAll(".pinfo-price-wrapper");

        prices.forEach((price, index) => {
          if (htmlprices[index]) {
            price.innerHTML = htmlprices[index].innerHTML;
          }
        });
    if (
      this.querySelector(".--inventory-status-wrapper") &&
      html.querySelector(".--inventory-status-wrapper")
    ) {
      this.querySelector(".--inventory-status-wrapper").innerHTML = html.querySelector(
        ".--inventory-status-wrapper"
      ).innerHTML;
    }
    if (
      this.querySelector(".--embroidery-message-container") &&
      html.querySelector(".--embroidery-message-container")
    ) {
      this.querySelector(".--embroidery-message-container").innerHTML = html.querySelector(
        ".--embroidery-message-container"
      ).innerHTML;
    }
    if (
      this.querySelector(".pd-shipping__info") &&
      html.querySelector(".pd-shipping__info")
    ) {
      this.querySelector(".pd-shipping__info").innerHTML = html.querySelector(
        ".pd-shipping__info"
      ).innerHTML;
    }
    if (
      this.querySelector(".pd-gurantee__info") &&
      html.querySelector(".pd-gurantee__info")
    ) {
      this.querySelector(".pd-gurantee__info").innerHTML = html.querySelector(
        ".pd-gurantee__info"
      ).innerHTML;
    }
    if (
      document.querySelector(".product-details-new") &&
      html.querySelector(".product-details-new")
    ) {
      document.querySelector(".product-details-new").innerHTML =
        html.querySelector(".product-details-new").innerHTML;
    }
        if (
      this.querySelector(".--discount-code-container") &&
      html.querySelector(".--discount-code-container")
    ) {
      this.querySelector(".--discount-code-container").innerHTML =
        html.querySelector(".--discount-code-container").innerHTML;
    }

    // if (
    //   this.querySelector(".pinfo-form-wrapper") &&
    //   html.querySelector(".pinfo-form-wrapper")
    // ) {
    //   this.querySelector(".pinfo-form-wrapper").innerHTML = html.querySelector(
    //     ".pinfo-form-wrapper"
    //   ).innerHTML;
    // }


if (this.querySelector(".pinfo-form-wrapper") && html.querySelector(".pinfo-form-wrapper")) {
  const newFormWrapper = html.querySelector(".pinfo-form-wrapper");
  const addToCartBtn = newFormWrapper.querySelector(".pinfo-add-to-cart");

  this.querySelector(".pinfo-form-wrapper").innerHTML = newFormWrapper.innerHTML;

  const liveContainer = document.querySelector(".pinfo-form-container");

  if (liveContainer) {
    const liveQty = liveContainer.querySelector(".quantity-selector-wrapper");

    if (addToCartBtn && addToCartBtn.classList.contains("hidden")) {
      liveContainer.classList.add("pinfo-form-one-way");
      if (liveQty) liveQty.classList.add("hidden");
    } else {
      liveContainer.classList.remove("pinfo-form-one-way");
      if (liveQty) liveQty.classList.remove("hidden");
    }
  }
}

    if (
      this.querySelector("product-info-media") &&
      html.querySelector("product-info-media")
    ) {
      this.querySelector("product-info-media").innerHTML =
        html.querySelector("product-info-media").innerHTML;
    }

    if (
      this.querySelector(".media__lightbox") &&
      html.querySelector(".media__lightbox")
    ) {
      this.querySelector(".media__lightbox").innerHTML =
        html.querySelector(".media__lightbox").innerHTML;
    }
    // this.initZoomSlider();
    if (document.querySelector("pqa-new")) {
      document.querySelector("pqa-new").innerHTML =
        html.querySelector("pqa-new").innerHTML;
    }

    this.handleEvents();

    if (this.querySelector("pinfo-variant-picker")) {
      this.querySelector("pinfo-variant-picker").style.pointerEvents = "unset";
      this.querySelector("pinfo-variant-picker").classList.remove("loading");
    }

    // window.zoomFunc();
    if (document.querySelector("stock-notify")) {
      // notifyPopup();
      if (typeof notifyPopup === "function") {
        notifyPopup();
      }
    }
    this.initMobileSwiper();
    // window.iconTextFunc();
    // window.iconTextFuncInDrawer();


    if (typeof initializeProductDrawers === "function") {
      initializeProductDrawers();
    }
    if (typeof productDrawerTab === "function") {
      productDrawerTab();
    }
    if (typeof initRelatedVariant === "function") {
      initRelatedVariant();
    }

    // initializeProductDrawers();
    // productDrawerTab();
    // initRelatedVariant();

    this.verticalImageChange();
    this.customCursor();
    this.mediaPopup();
    this.colorLabelHover();
    this.optionLabelHover();
    this.handleActionPopup();
    // this.initQuantitySelector();

    if (typeof window.setupSectionNavigatorScroll === "function") {
      window.setupSectionNavigatorScroll();
    }
    if (typeof window.enableStickyATC === "function") {
      window.enableStickyATC();
    }
    if (typeof window.sizeGuide === "function") {
      window.sizeGuide();
    }
    if (typeof window.notifyButtons === "function") {
      window.notifyButtons();
    }

    window.globalAtcRemoveFunc();
    
    yotpoWidgetsContainer.initWidgets();
    
    // Dispatch variant:change event
    const variantId = this.querySelector('input[name="id"]')?.value;
    if (variantId) {
      // console.log('Dispatching variant:change event with variant ID:', variantId);
      document.dispatchEvent(new CustomEvent('variant:change', { detail: { variantId } }));
    }
  }

  updateURL(url) {
    if (typeof url !== "string" || !url.startsWith("/")) {
      console.error("Invalid URL format");
      return;
    }

    if (this.dataset?.updateUrl === "true")
      window.history.pushState({}, "", url);
  }

  handleAddToCart(e) {
    e.preventDefault();

    let btn = this.querySelector('button[type="submit"]');
    if (btn) {
      btn.textContent = "Adding To Cart ...";
      btn.style.pointerEvents = "none";
      btn.style.opacity = ".7";
    }

    this.cart =
      document.querySelector("cart-notification") ||
      document.querySelector("cart-drawer");

    let addToCartForm = this.querySelector('form[action$="/cart/add"]');
    let formData = new FormData(addToCartForm);

    const qtyInput = this.querySelector('.quantity-selector .qty-input');
    if (qtyInput) {
      formData.set('quantity', qtyInput.value);
    }
    if (this.cart) {
      formData.append(
        "sections",
        this.cart.getSectionsToRender().map((section) => section.id)
      );
    }

    fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (this.cart) this.cart.renderContents(response);
      })
      .finally(() => {
        if (btn) {
          btn.textContent = "Add To Cart";
          btn.style.pointerEvents = "unset";
          btn.style.opacity = "1";
        }

        if (this.cart && this.cart.classList.contains("is-empty")) {
          this.cart.classList.remove("is-empty");
        }

        const pqvCloseBtn = this.closest(".pqv-wrapper")?.querySelector('.pqv-close-btn');
        if (pqvCloseBtn) pqvCloseBtn.click();
      });
  }


  initSwiperSlider() {
    if (this.gallerySwiper) this.gallerySwiper.destroy(true, true);
    this.gallerySwiper = new Swiper(".pinfo-gallery-swiper", {
      slidesPerView: 2,
      spaceBetween: 0,
      watchSlidesProgress: true,
    });

    if (this.thumbSwiper) this.thumbSwiper.destroy(true, true);
    this.thumbSwiper = new Swiper(".pinfo-thumb-swiper", {
      slidesPerView: 1,
      thumbs: {
        swiper: this.gallerySwiper,
      },
    });
  }
}
class ProductQuickAdd extends HTMLElement {
  constructor() {
    super();

    this.addEventListener("input", this.handleVariantInput.bind(this));
    this.addEventListener("change", this.handleVariantInput.bind(this));
    
    this.addEventListener("click", this.handleSubmitEvemt.bind(this));
  }

  handleVariantInput(e) {
    // const variantUrl = e.target.value;
    let variantUrl = '';
    // Check if the target is a <select> element
      if (e.target.tagName.toLowerCase() === 'select') {
        const selectedOption = e.target.selectedOptions[0]; // Get selected <option>
        console.log('Selected',selectedOption.dataset.variantUrl)
        variantUrl = selectedOption ? selectedOption.dataset.variantUrl : null;
      }


    if (variantUrl && document.querySelector("product-information")) {
      const productInfo = document.querySelector("product-information");
      productInfo.fetchData(variantUrl);
      productInfo.updateURL(variantUrl);
    }
  }

  handleSubmitEvemt(e) {
    if (e.target.closest("form")) {
      e.preventDefault();
    }

    if (e.target.tagName === "BUTTON") {
      this.handleAddToCart(e.target.closest("form"), e.target);
      // console.log(e.target.dataset.availabilty)
      // if(e.target.dataset.availabilty == 'true'){
      //   console.log('Product available');
      //   const productInfoAddtoCart = document.querySelector("product-information .pinfo-add-to-cart");
      //   productInfoAddtoCart.click();
      // } else {
      //     console.log('Product not available')    
      //     const productInfoformWrapper = document.querySelector("product-information .pinfo-variants-options.color-variant");
          
      //     productInfoformWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // }
    //   const productInfoformWrapper = document.querySelector("product-information .pinfo-variants-options.color-variant");
          
    //       productInfoformWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }
    const productInfoformWrapper = document.querySelector("product-information");
          
          productInfoformWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }



  }

  handleAddToCart(form, btn) {
    if (!form) return;

    if (btn) {
      btn.textContent = "Adding To Cart ...";
      btn.style.pointerEvents = "none";
      btn.style.opacity = ".7";
    }

    this.cart =
      document.querySelector("cart-notification") ||
      document.querySelector("cart-drawer");

    let formData = new FormData(form);

    const qtyInput = document.querySelector('.quantity-selector .qty-input');
    if (qtyInput) {
      formData.set('quantity', qtyInput.value);
    }

    if (this.cart) {
      formData.append(
        "sections",
        this.cart.getSectionsToRender().map((section) => section.id)
      );
    }

    fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((response) => {
        if (this.cart) this.cart.renderContents(response);
      })
      .finally(() => {
        if (btn) {
          btn.textContent = "Add To Cart";
          btn.style.pointerEvents = "unset";
          btn.style.opacity = "1";
        }

        const headerCartIcon = document.querySelector(".new-header-cart-icon");
        if (headerCartIcon) headerCartIcon.click();

        if (this.cart && this.cart.classList.contains("is-empty")) {
          this.cart.classList.remove("is-empty");
        }

        initswiperincart();
      });
  }

}
// class ProductQuickAdd extends HTMLElement {
//   constructor() {
//     super();

//     this.addEventListener("input", this.handleVariantInput.bind(this));
//     this.addEventListener("click", this.handleSubmitEvemt.bind(this));
//   }

//   handleVariantInput(e) {
//     const { value } = e.target;
//     if (document.querySelector("product-information"))
//       document.querySelector("product-information").handleOptions(value);
//   }

//   handleSubmitEvemt(e) {
//     if (e.target.closest("form")) {
//       e.preventDefault();
//     }

//     if (e.target.tagName === "BUTTON") {
//       this.handleAddToCart(e.target.closest("form"), e.target);
//     }
//   }

//   handleAddToCart(form, btn) {
//     if (!form) return;

//     if (btn) {
//       // btn.classList.add("loading");
//       btn.textContent = "Adding To Cart ...";
//       btn.style.pointerEvents = "none";
//       btn.style.opacity = ".7";
//     }

//     this.cart =
//       document.querySelector("cart-notification") ||
//       document.querySelector("cart-drawer");

//     let formData = new FormData(form);

//     if (this.cart) {
//       formData.append(
//         "sections",
//         this.cart.getSectionsToRender().map((section) => section.id)
//       );
//     }

//     fetch(window.Shopify.routes.root + "cart/add.js", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((response) => {
//         this.cart.renderContents(response);
//       })
//       .finally(() => {
//         if (btn) {
//           // btn.classList.remove("loading");
//           btn.textContent = "Add To Cart";
//           btn.style.pointerEvents = "unset";
//           btn.style.opacity = "1";
//         }
//         if (document.querySelector(".new-header-cart-icon"))
//           document.querySelector(".new-header-cart-icon").click();

//         if (this.cart && this.cart.classList.contains("is-empty"))
//           this.cart.classList.remove("is-empty");
//         initswiperincart();
//       });
//   }
// }

document.addEventListener("DOMContentLoaded", (e) => {
  customElements.define("product-information", ProductInformation);
  customElements.define("pqa-new", ProductQuickAdd);
});

function initDrawer({ toggleSelector, drawerSelector, closeBtnSelector }) {
  const toggleBtn = document.querySelector(toggleSelector);
  const drawer = document.querySelector(drawerSelector);
  const closeBtn = document.querySelector(closeBtnSelector);

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener("click", () => {
    drawer.classList.add("open");
    document.body.classList.add("active");
    console.log("Drawer opened:", drawerSelector, document.body.classList);
  });

  closeBtn?.addEventListener("click", () => {
    drawer.classList.remove("open");
    document.body.classList.remove("active");
    console.log("Drawer closed:", drawerSelector, document.body.classList);
  });
}

// Initialize drawers with config
function initializeProductDrawers() {
  initDrawer({
    toggleSelector: "[data-main-pda]",
    drawerSelector: ".product__attribute_drawer",
    closeBtnSelector: ".pa-icon__close",
  });

  initDrawer({
    toggleSelector: "[data-shiping-btn]",
    drawerSelector: ".product__shipping_drawer",
    closeBtnSelector: ".ps-icon__close",
  });

  initDrawer({
    toggleSelector: "[data-gurantee-btn]",
    drawerSelector: ".product__gurantee_drawer",
    closeBtnSelector: ".pg-icon__close",
  });
}

function productDrawerTab() {
  const tabButtons = document.querySelectorAll(".pa_tab__title .pa__title");
  const tabContents = document.querySelectorAll(".pa__tab_content");

  if (!tabButtons.length || !tabContents.length) return;

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const order = button.dataset.order;

      // Update tab active state
      document
        .querySelector(".pa_tab__title .pa__title.active")
        ?.classList.remove("active");
      button.classList.add("active");

      // Update tab content active state
      document
        .querySelector(".pa__tab_content.active")
        ?.classList.remove("active");
      document
        .querySelector(`.pa__tab_content[data-order="${order}"]`)
        ?.classList.add("active");
    });
  });
}

function initRelatedVariant() {
  const relatedVariantButtons = document.querySelectorAll(
    "[data-related-variant-btn]"
  );
  const cartDrawerNew =
    document.querySelector("mini-cart") ||
    document.querySelector("cart-drawer");

  relatedVariantButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const variantId = btn.getAttribute("data-re-variant-id");
      if (!variantId) return;

      btn.classList.add("loading");
      btn.textContent = "Adding...";
      btn.style.pointerEvents = "none";
      btn.style.color = "#1f2937";

      const formData = new FormData();

      if (cartDrawerNew) {
        formData.append(
          "sections",
          cartDrawerNew.getSectionsToRender().map((section) => section.id)
        );
      }

      formData.append("id", variantId);
      formData.append("quantity", 1);

      fetch(window.Shopify.routes.root + "cart/add.js", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          cartDrawerNew.renderContents(response);
        })
        .finally(() => {
          if (btn) {
            btn.classList.remove("loading");
            btn.textContent = "Add To Cart";
            btn.style.pointerEvents = "unset";
            btn.style.opacity = "1";
          }
          if (document.querySelector(".new-header-cart-icon"))
            document.querySelector(".new-header-cart-icon").click();

          if (cartDrawerNew && cartDrawerNew.classList.contains("is-empty"))
            cartDrawerNew.classList.remove("is-empty");
        });
    });
  });
}



window.initFaqAccordions = function () {
  const faqAccordions = document.querySelectorAll(".pr-faq-item");

  const openFaqAccordion = (accordion) => {
    if (!accordion) return;
    const content = accordion.querySelector(".pr-faq-content");
    if (!content) return;
    accordion.classList.add("active");
    content.style.maxHeight = content.scrollHeight + "px";
  };

  const closeFaqAccordion = (accordion) => {
    if (!accordion) return;
    const content = accordion.querySelector(".pr-faq-content");
    if (!content) return;
    accordion.classList.remove("active");
    content.style.maxHeight = null;
  };

  if (faqAccordions.length > 0) {
    openFaqAccordion(faqAccordions[0]);
    if (faqAccordions[1]) openFaqAccordion(faqAccordions[1]);

    faqAccordions.forEach((accordion) => {
      const header = accordion.querySelector(".pr-faq-header");
      const content = accordion.querySelector(".pr-faq-content");
      if (!header || !content) return;

      accordion.onclick = () => {
        if (content.style.maxHeight) {
          closeFaqAccordion(accordion);
        } else {
          if (window.innerWidth > 768) {
            faqAccordions.forEach((a) => closeFaqAccordion(a));
          }
          openFaqAccordion(accordion);
        }
      };
    });
  }
};


// Define the global function
window.globalAtcRemoveFunc = function () {
  document.querySelectorAll('.custom__atc-global-btn').forEach(btn => {
    btn.classList.remove('custom__atc-global-btn');
  });
};

// Run it once when the page fully loads
document.addEventListener('DOMContentLoaded', function () {
  window.globalAtcRemoveFunc();
});


// window.iconTextFunc();
// window.iconTextFuncInDrawer();
initializeProductDrawers();
productDrawerTab();
initRelatedVariant();
window.initFaqAccordions();




document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const scrollThreshold = 300;
  let isScrolled = false;

  window.addEventListener("scroll", function () {
    const shouldBeScrolled = window.scrollY > scrollThreshold;

    if (shouldBeScrolled !== isScrolled) {
      isScrolled = shouldBeScrolled;
      if (isScrolled) {
        body.classList.add("pad__bottom");
      } else {
        body.classList.remove("pad__bottom");
      }
    }
  });
});


/*

    window.addEventListener("click", function(e){
      if(e.target.classList.contains("pdp-media") || e.target.closest(".pdp-media")){
          window.zoomFunc();
         let targetItem = e.target.classList.contains("pdp-media")?e.target:e.target.closest(".pdp-media");
         console.log(targetItem);
         const mediaId = targetItem.getAttribute('data-media');
         openLightbox(mediaId);
      }
    })

  window.zoomFunc = function(){
    const galleryThumbs = new Swiper('.media__lightbox-thumb', {
      slidesPerView: 6,
      spaceBetween: 10,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      breakpoints: {
        990: {
          direction: 'vertical',
        },
      },
    });
  
    const galleryTop = new Swiper('.media__lightbox-swiper', {
      spaceBetween: 10,
      thumbs: {
        swiper: galleryThumbs
      },
      on: {
        slideChange: function() {
          document.querySelectorAll('.media__lightbox-swiper .swiper-slide').forEach(slide => {
            slide.classList.remove('zoomed');
            slide.style.cursor = '';
          });
        }
      }
    });
  
    const lightbox = document.querySelector('.media__lightbox');
    
    const closeBtn = document.querySelector('[close-lightbox]');
    const pdpMediaItems = document.querySelectorAll('.pdp-media');

    // window.addEventListener("click", function(e){
    //   if(e.target.classList.contains("pdp-media") || e.target.closest(".pdp-media")){
    //      let targetItem = e.target.classList.contains("pdp-media")?e.target:e.target.closest(".pdp-media");
    //      console.log(targetItem);
    //      const mediaId = targetItem.getAttribute('data-media');
    //      openLightbox(mediaId);
    //   }
    // })
    // pdpMediaItems.forEach(item => {
    //   item.addEventListener('click', function() {
    //     const mediaId = this.getAttribute('data-media');
    //     openLightbox(mediaId);
    //   });
    // });
  
    closeBtn.addEventListener('click', closeLightbox);
  
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  
    const customCursor = document.createElement('div');
    customCursor.className = 'custom-zoom-cursor';
    customCursor.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 5V19M5 12H19" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    document.body.appendChild(customCursor);
  
    customCursor.style.display = 'none';
  
    document.addEventListener('mousemove', function(e) {
      customCursor.style.left = (e.clientX - 12) + 'px';
      customCursor.style.top = (e.clientY - 12) + 'px';
    });
  
    const lightboxSlides = document.querySelectorAll('.media__lightbox-swiper .swiper-slide');
  
    lightboxSlides.forEach(slide => {
      const img = slide.querySelector('img');
  
      slide.addEventListener('mouseenter', function() {
        if (!this.classList.contains('zoomed')) {
          customCursor.style.display = 'flex';
          document.body.style.cursor = 'none';
        }
      });
  
      slide.addEventListener('mouseleave', function() {
        customCursor.style.display = 'none';
        document.body.style.cursor = '';
      });
  
      slide.addEventListener('click', function(e) {
        
        if (this.classList.contains('zoomed')) {
          this.classList.remove('zoomed');
          customCursor.style.display = 'flex';
          document.body.style.cursor = 'none';
        } else {
          console.log(this);
          this.classList.add('zoomed');
          customCursor.style.display = 'none';
          document.body.style.cursor = '';
          const rect = this.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width * 100;
          const y = (e.clientY - rect.top) / rect.height * 100;
          img.style.transformOrigin = `${x}% ${y}%`;
        }
      });
  
      slide.addEventListener('mousemove', function(e) {
        if (this.classList.contains('zoomed')) {
          const rect = this.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width * 100;
          const y = (e.clientY - rect.top) / rect.height * 100;
          img.style.transformOrigin = `${x}% ${y}%`;
        }
      });
    });
  
    function openLightbox(mediaId) {
      console.log("----",mediaId);
      const lightbox = document.querySelector('.media__lightbox');
      const slides = document.querySelectorAll('.media__lightbox-swiper .swiper-slide');
      console.log("----",slides);
      let slideIndex = 0;
      slides.forEach((slide, index) => {
        if (slide.getAttribute('data-media') === mediaId) {
          slideIndex = index;
        }
      });
      console.log("Light", lightbox);
      lightbox.classList.add('active');
      galleryTop.slideTo(slideIndex);
      galleryThumbs.slideTo(slideIndex);
      document.body.style.overflow = 'hidden';
      
    }
  
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      customCursor.style.display = 'none';
      document.body.style.cursor = '';
      document.querySelectorAll('.media__lightbox-swiper .swiper-slide').forEach(slide => {
        slide.classList.remove('zoomed');
      });
    }
  }
document.addEventListener('DOMContentLoaded', function() {
  // window.zoomFunc();
});
*/
