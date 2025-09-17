// backed Up 16th June 2025..........................


// comment
// comment
// comment
// comment
// comment
// comment

class ProductInformation extends HTMLElement {
  constructor() {
    super();
    this.handleEvents();
  }

  connectedCallback() {
    if (this.querySelector(".pinfo-gallery-swiper")) this.initSwiperSlider();

    this.querySelector("pinfo-variant-picker").addEventListener(
      "input",
      this.handleVariantEvent.bind(this)
    );

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

    this.accordionInit();
    this.initMobileSwiper();
  }
  initMobileSwiper() {
    this.mobielSwiper = new Swiper(".pdp-media-sm .swiper", {
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
      },
      on: {
        init: function () {
          document.querySelector(".total").textContent = this.slides.length;
          document.querySelector(".current").textContent = this.realIndex + 1;
        },
        slideChange: function () {
          document.querySelector(".current").textContent = this.realIndex + 1;
        },
      },
    });
  }
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

  handleVariantEvent(e) {
    const { variantUrl } = e.target.dataset;

    this.handleOptions(variantUrl);
    console.log(variantUrl);
    // const variantId = new URLSearchParams(variantUrl.split("?")[1]).get("variant");
    const variantId = Number(
      new URLSearchParams(variantUrl.split("?")[1]).get("variant")
    );

    console.log(variantId);
    let selectedVariant = productVariants.find((v) => v.id === variantId);
    console.log(productVariants);
    console.log(selectedVariant);
    if (document.querySelector("stock-notify")) {
      notifyPopup(selectedVariant);
    }
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
    const response = await fetch(url);
    const data = await response.text();
    const html = new DOMParser().parseFromString(data, "text/html");
    this.renderEl(html);
    window.sizeGuide();
  }

  renderEl(html) {
    if (this.querySelector(".pinfo-top") && html.querySelector(".pinfo-top")) {
      this.querySelector(".pinfo-top").innerHTML =
        html.querySelector(".pinfo-top").innerHTML;
    }
    if (
      this.querySelector("pinfo-variant-picker") &&
      html.querySelector("pinfo-variant-picker")
    ) {
      this.querySelector("pinfo-variant-picker").innerHTML = html.querySelector(
        "pinfo-variant-picker"
      ).innerHTML;
    }

    if (
      this.querySelector(".pinfo-form-wrapper") &&
      html.querySelector(".pinfo-form-wrapper")
    ) {
      this.querySelector(".pinfo-form-wrapper").innerHTML = html.querySelector(
        ".pinfo-form-wrapper"
      ).innerHTML;
    }

    if (
      this.querySelector("product-info-media") &&
      html.querySelector("product-info-media")
    ) {
      this.querySelector("product-info-media").innerHTML =
        html.querySelector("product-info-media").innerHTML;
    }

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
      notifyPopup();
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
      btn.classList.add("loading");
      btn.textContent = "Adding To Cart ...";
      btn.style.pointerEvents = "none";
      btn.style.opacity = ".7";
    }
    this.cart =
      document.querySelector("cart-notification") ||
      document.querySelector("cart-drawer");

    let addToCartForm = this.querySelector('form[action$="/cart/add"]');
    let formData = new FormData(addToCartForm);

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
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.cart.renderContents(response);
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

        if (this.cart && this.cart.classList.contains("is-empty"))
          this.cart.classList.remove("is-empty");
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
    this.addEventListener("click", this.handleSubmitEvemt.bind(this));
  }

  handleVariantInput(e) {
    const { value } = e.target;
    if (document.querySelector("product-information"))
      document.querySelector("product-information").handleOptions(value);
  }

  handleSubmitEvemt(e) {
    if (e.target.closest("form")) {
      e.preventDefault();
    }

    if (e.target.tagName === "BUTTON") {
      this.handleAddToCart(e.target.closest("form"), e.target);
    }
  }

  handleAddToCart(form, btn) {
    if (!form) return;

    if (btn) {
      btn.classList.add("loading");
      btn.textContent = "Adding To Cart ...";
      btn.style.pointerEvents = "none";
      btn.style.opacity = ".7";
    }

    this.cart =
      document.querySelector("cart-notification") ||
      document.querySelector("cart-drawer");

    let formData = new FormData(form);

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
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.cart.renderContents(response);
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

        if (this.cart && this.cart.classList.contains("is-empty"))
          this.cart.classList.remove("is-empty");
      });
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  customElements.define("product-information", ProductInformation);
  customElements.define("pqa-new", ProductQuickAdd);
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
