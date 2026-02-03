// document.addEventListener("DOMContentLoaded", () => {
//   const frontSwatches = document.querySelectorAll('.front-swatch');
//   const backGroups = document.querySelectorAll('.back-swatches-group');
//   const leftSleeveGroups = document.querySelectorAll('.left-sleeve-button-group-wrapper');
//   const rightSleeveGroups = document.querySelectorAll('.right-sleeve-button-group-wrapper');
//   const leftSleeveDesigns = document.querySelector('.left-sleeve-designs');
//   const rightSleeveDesigns = document.querySelector('.right-sleeve-designs');
//   const frontDesignInput = document.querySelector('#front-design-input');
//   const backDesignInput = document.querySelector('#back-design-input');
//   const leftSleeveDesignInput = document.querySelector('#left-sleeve-design-input');
//   const rightSleeveDesignInput = document.querySelector('#right-sleeve-design-input');
//   const frontPlacementInput = document.querySelector('#front-placement-input');
//   const backPlacementInput = document.querySelector('#back-placement-input');

//   // Debug input existence
//   console.log('Input Elements Found:', {
//     frontDesignInput: !!frontDesignInput,
//     backDesignInput: !!backDesignInput,
//     leftSleeveDesignInput: !!leftSleeveDesignInput,
//     rightSleeveDesignInput: !!rightSleeveDesignInput,
//     frontPlacementInput: !!frontPlacementInput,
//     backPlacementInput: !!backPlacementInput
//   });

//   function updateMainImages(isBackSwatchClicked = false) {
//     const activeFront = document.querySelector('.front-swatch.active');
//     const activeBackGroup = document.querySelector('.back-swatches-group.active');
//     const activeBack = activeBackGroup ? activeBackGroup.querySelector('.back-swatch.active') : null;
//     const activeLeftSleeve = leftSleeveDesigns ? leftSleeveDesigns.querySelector('.button-group--left-sleeve--custom.active') : null;
//     const activeRightSleeve = rightSleeveDesigns ? rightSleeveDesigns.querySelector('.button-group--right-sleeve--custom.active') : null;
//     // Select desktop image containers
//     const desktopImageContainers = document.querySelectorAll('.info-media-stack-wrapper .pdp-media');
//     const desktopImages = document.querySelectorAll('.info-media-stack-wrapper .pdp__media-tag');
//     // Select mobile image containers
//     const mobileImageContainers = document.querySelectorAll('.pdp-media-sm .main-swiper .swiper-slide .pdp-media-image');
//     // Select thumbnail image containers
//     const thumbImageContainers = document.querySelectorAll('.vertical__medias .pdp-media-v');

//     // Debug swatch selection and data
//     console.log('Swatch Selection:', {
//       activeFront: activeFront ? {
//         groupIndex: activeFront.dataset.groupIndex,
//         frontImage: activeFront.dataset.frontImage,
//         frontLogoPlacement: activeFront.dataset.frontLogoPlacement
//       } : 'None',
//       activeBackGroup: activeBackGroup ? activeBackGroup.dataset.groupIndex : 'None',
//       activeBack: activeBack ? activeBack.dataset.backImage : 'None',
//       activeLeftSleeve: activeLeftSleeve ? activeLeftSleeve.dataset.imageName : 'None',
//       activeRightSleeve: activeRightSleeve ? activeRightSleeve.dataset.imageName : 'None',
//       isBackSwatchClicked
//     });
//     console.log('Image Counts:', {
//       desktopImageContainers: desktopImageContainers.length,
//       desktopImages: desktopImages.length,
//       mobileImageContainers: mobileImageContainers.length,
//       thumbImageContainers: thumbImageContainers.length
//     });
//     console.log('Left Sleeve Section:', leftSleeveDesigns ? leftSleeveDesigns.classList.contains('active') : 'Not present');
//     console.log('Right Sleeve Section:', rightSleeveDesigns ? rightSleeveDesigns.classList.contains('active') : 'Not present');

//     // Function to update desktop image (replace img element)
//     function updateDesktopImage(img, src) {
//       if (!img || !src) return;
//       const cacheBuster = `cb=${Date.now()}`;
//       const newSrc = src.includes('?') ? `${src}&${cacheBuster}` : `${src}?${cacheBuster}`;
//       const newImg = new Image();
//       newImg.src = newSrc;
//       newImg.className = img.className;
//       newImg.loading = img.loading || 'lazy';
//       img.parentNode.replaceChild(newImg, img);
//       console.log('Desktop image updated to:', newSrc);
//     }

//     // Function to update mobile image (update img src and source srcset)
//     function updateMobileImage(container, src) {
//       if (!container || !src) return;
//       const img = container.querySelector('.pdp__media-tag');
//       if (!img) {
//         console.warn('Mobile image tag not found');
//         return;
//       }
//       const cacheBuster = `cb=${Date.now()}`;
//       const newSrc = src.includes('?') ? `${src}&${cacheBuster}` : `${src}?${cacheBuster}`;
//       img.src = newSrc;
//       console.log('Mobile image src updated to:', newSrc);
//       const source = container.querySelector('picture source[media="(max-width: 600px)"]');
//       if (source) {
//         source.srcset = newSrc;
//         console.log('Mobile source srcset updated to:', newSrc);
//       } else {
//         console.warn('Mobile source tag not found');
//       }
//     }

//     // Function to update thumbnail image (update img src and source srcset)
//     function updateThumbImage(container, src) {
//       if (!container || !src) return;
//       const img = container.querySelector('.vertical__media');
//       if (!img) {
//         console.warn('Thumbnail image tag not found');
//         return;
//       }
//       const cacheBuster = `cb=${Date.now()}`;
//       const newSrc = src.includes('?') ? `${src}&${cacheBuster}` : `${src}?${cacheBuster}`;
//       img.src = newSrc;
//       console.log('Thumbnail image src updated to:', newSrc);
//       const sources = container.querySelectorAll('picture.pinfo-stack-picture-v source');
//       sources.forEach(source => {
//         const width = source.getAttribute('srcset').match(/width=(\d+)/)?.[1];
//         if (width) {
//           const newSrcset = `${src.includes('?') ? src.split('?')[0] : src}?width=${width}&${cacheBuster}`;
//           source.srcset = newSrcset;
//           console.log(`Thumbnail source srcset updated (width=${width}):`, newSrcset);
//         }
//       });
//     }

//     // Reorder desktop images if back swatch clicked
//     if (isBackSwatchClicked && desktopImageContainers.length >= 2) {
//       const stackWrapper = document.querySelector('.info-media-stack-wrapper');
//       if (stackWrapper) {
//         const frontContainer = desktopImageContainers[0];
//         const backContainer = desktopImageContainers[1];
//         stackWrapper.insertBefore(backContainer, frontContainer);
//         console.log('Desktop images reordered: back image moved to first position');
//       } else {
//         console.warn('Desktop stack wrapper not found');
//       }
//     } else if (!isBackSwatchClicked && desktopImageContainers.length >= 2) {
//       const stackWrapper = document.querySelector('.info-media-stack-wrapper');
//       if (stackWrapper && desktopImageContainers[0] !== stackWrapper.firstElementChild) {
//         const frontContainer = desktopImageContainers[0];
//         stackWrapper.insertBefore(frontContainer, stackWrapper.firstElementChild);
//         console.log('Desktop images reordered: front image moved to first position');
//       }
//     }

//     // Reorder thumbnail images if back swatch clicked
//     {% comment %} if (isBackSwatchClicked && thumbImageContainers.length >= 2) {
//       const thumbWrapper = document.querySelector('.vertical__medias .vertical__medias-wrapper');
//       if (thumbWrapper) {
//         const frontThumb = thumbImageContainers[0];
//         const backThumb = thumbImageContainers[1];
//         thumbWrapper.insertBefore(backThumb, frontThumb);
//         console.log('Thumbnail images reordered: back thumbnail moved to first position');
//       } else {
//         console.warn('Thumbnail wrapper not found');
//       }
//     } else if (!isBackSwatchClicked && thumbImageContainers.length >= 2) {
//       const thumbWrapper = document.querySelector('.vertical__medias .vertical__medias-wrapper');
//       if (thumbWrapper && thumbImageContainers[0] !== thumbWrapper.firstElementChild) {
//         const frontThumb = thumbImageContainers[0];
//         thumbWrapper.insertBefore(frontThumb, thumbWrapper.firstElementChild);
//         console.log('Thumbnail images reordered: front thumbnail moved to first position');
//       }
//     } {% endcomment %}

//     // Update front image (index 0 for desktop and thumbnails, first slide for mobile)
//     if (activeFront && activeFront.dataset.frontImage) {
//       // Desktop front image
//       if (desktopImages[0]) {
//         updateDesktopImage(desktopImages[0], activeFront.dataset.frontImage);
//       } else {
//         console.warn('Desktop front image not found');
//       }
//       // Mobile front image
//       if (mobileImageContainers[0]) {
//         updateMobileImage(mobileImageContainers[0], activeFront.dataset.frontImage);
//       } else {
//         console.warn('Mobile front image container not found');
//       }
//       // Thumbnail front image
//       if (thumbImageContainers[0]) {
//         updateThumbImage(thumbImageContainers[0], activeFront.dataset.frontImage);
//       } else {
//         console.warn('Thumbnail front image container not found');
//       }
//       if (frontDesignInput) {
//         const filename = activeFront.dataset.frontImage.split('files/').pop()?.split('.').shift() || '';
//         frontDesignInput.value = filename;
//         console.log('Front Design Input Set:', filename);
//       }
//       if (frontPlacementInput) {
//         const placement = activeFront.dataset.frontLogoPlacement || '';
//         frontPlacementInput.value = placement;
//         console.log('Front Placement Input Set:', placement);
//       }
//     } else {
//       if (frontDesignInput) frontDesignInput.value = '';
//       if (frontPlacementInput) frontPlacementInput.value = '';
//       console.warn('Front swatch or frontImage data missing');
//     }

//     // Update back image (index 1 for desktop and thumbnails, second slide for mobile)
//     if (activeBack && activeBack.dataset.backImage) {
//       // Desktop back image
//       if (desktopImages[1]) {
//         updateDesktopImage(desktopImages[1], activeBack.dataset.backImage);
//       } else {
//         console.warn('Desktop back image not found');
//       }
//       // Mobile back image
//       if (mobileImageContainers[1]) {
//         updateMobileImage(mobileImageContainers[1], activeBack.dataset.backImage);
//       } else {
//         console.warn('Mobile back image container not found');
//       }
//       // Thumbnail back image
//       if (thumbImageContainers[1]) {
//         updateThumbImage(thumbImageContainers[1], activeBack.dataset.backImage);
//       } else {
//         console.warn('Thumbnail back image container not found');
//       }
//       if (backDesignInput) {
//         const filename = activeBack.dataset.backImage.split('files/').pop()?.split('.').shift() || '';
//         backDesignInput.value = filename;
//         console.log('Back Design Input Set:', filename);
//       }
//       if (backPlacementInput && frontPlacementInput && backDesignInput && backDesignInput.value) {
//         const frontPlacement = (frontPlacementInput.value || '').toLowerCase();
//         const backPlacement = frontPlacement === 'chest' ? 'center' : frontPlacement === 'center' ? 'top' : '';
//         backPlacementInput.value = backPlacement;
//         console.log('Back Placement Input Set:', backPlacement, { frontPlacement, hasBackDesign: !!backDesignInput.value });
//       } else {
//         if (backPlacementInput) backPlacementInput.value = '';
//         console.warn('Back placement not set: Missing inputs or back design', {
//           hasBackPlacementInput: !!backPlacementInput,
//           hasFrontPlacementInput: !!frontPlacementInput,
//           hasBackDesign: !!backDesignInput && !!backDesignInput.value
//         });
//       }
//     } else {
//       if (backDesignInput) backDesignInput.value = '';
//       if (backPlacementInput) backPlacementInput.value = '';
//       console.warn('Back swatch or backImage data missing');
//     }

//     // Update left sleeve design input
//     if (activeLeftSleeve && leftSleeveDesignInput && activeLeftSleeve.dataset.imageName) {
//       leftSleeveDesignInput.value = activeLeftSleeve.dataset.imageName;
//       console.log('Left Sleeve Design Input Set:', leftSleeveDesignInput.value);
//     } else {
//       if (leftSleeveDesignInput) leftSleeveDesignInput.value = '';
//       console.warn('No active left sleeve swatch or input missing');
//     }

//     // Update right sleeve design input
//     if (activeRightSleeve && rightSleeveDesignInput && activeRightSleeve.dataset.imageName) {
//       rightSleeveDesignInput.value = activeRightSleeve.dataset.imageName;
//       console.log('Right Sleeve Design Input Set:', rightSleeveDesignInput.value);
//     } else {
//       if (rightSleeveDesignInput) rightSleeveDesignInput.value = '';
//       console.warn('No active right sleeve swatch or input missing');
//     }

//     // Update Swiper for mobile
//     const mainSwiper = document.querySelector('.pdp-media-sm .main-swiper');
//     if (mainSwiper && typeof Swiper !== 'undefined' && mainSwiper.swiper) {
//       const swiperInstance = mainSwiper.swiper;
//       swiperInstance.updateSlides();
//       swiperInstance.update();
//       const slideIndex = isBackSwatchClicked ? 1 : 0; // Show back image (index 1) if back swatch clicked, else front (index 0)
//       swiperInstance.slideTo(slideIndex);
//       console.log('Mobile Swiper updated, slid to index:', slideIndex);
//     } else {
//       console.warn('Swiper instance not found or Swiper library not loaded');
//     }

//     // Update Swiper for thumbnails if applicable
//     const thumbSwiper = document.querySelector('.vertical__medias .vertical__swiper');
//     if (thumbSwiper && typeof Swiper !== 'undefined' && thumbSwiper.swiper) {
//       const swiperInstance = thumbSwiper.swiper;
//       swiperInstance.updateSlides();
//       swiperInstance.update();
//       const slideIndex = isBackSwatchClicked ? 1 : 0;
//       swiperInstance.slideTo(slideIndex);
//       console.log('Thumbnail Swiper updated, slid to index:', slideIndex);
//     }
//   }

//   // Front swatch click
//   frontSwatches.forEach((swatch) => {
//     swatch.addEventListener('click', function () {
//       console.log('Front Swatch Clicked:', swatch.dataset.groupIndex);
//       frontSwatches.forEach(f => f.classList.remove('active'));
//       swatch.classList.add('active');

//       const groupIndex = swatch.dataset.groupIndex;
//       const hasLeftSleeve = swatch.dataset.hasLeftSleeve === 'true';
//       const hasRightSleeve = swatch.dataset.hasRightSleeve === 'true';

//       // Toggle visibility of sleeve design sections
//       if (leftSleeveDesigns) {
//         leftSleeveDesigns.classList.toggle('active', hasLeftSleeve);
//       }
//       if (rightSleeveDesigns) {
//         rightSleeveDesigns.classList.toggle('active', hasRightSleeve);
//       }

//       // Show corresponding back swatches
//       backGroups.forEach(bg => {
//         if (bg.dataset.groupIndex === groupIndex) {
//           bg.classList.add('active');
//           const backButtons = bg.querySelectorAll('.back-swatch');
//           if (!bg.querySelector('.back-swatch.active') && backButtons.length > 0) {
//             backButtons[0].classList.add('active');
//             console.log('Activated first back swatch in group:', groupIndex);
//           }
//         } else {
//           bg.classList.remove('active');
//           bg.querySelectorAll('.back-swatch').forEach(b => b.classList.remove('active'));
//         }
//       });

//       // Show corresponding left sleeve swatches
//       leftSleeveGroups.forEach(lg => {
//         if (lg.dataset.groupId === groupIndex) {
//           lg.style.display = 'flex';
//           lg.classList.add('active');
//           const leftSleeveButtons = lg.querySelectorAll('.button-group--left-sleeve--custom');
//           if (!lg.querySelector('.button-group--left-sleeve--custom.active') && leftSleeveButtons.length > 0) {
//             leftSleeveButtons[0].classList.add('active');
//             console.log('Activated first left sleeve swatch in group:', groupIndex);
//           }
//         } else {
//           lg.style.display = 'none';
//           lg.classList.remove('active');
//           lg.querySelectorAll('.button-group--left-sleeve--custom').forEach(b => b.classList.remove('active'));
//         }
//       });

//       // Show corresponding right sleeve swatches
//       rightSleeveGroups.forEach(rg => {
//         if (rg.dataset.groupId === groupIndex) {
//           rg.style.display = 'flex';
//           rg.classList.add('active');
//           const rightSleeveButtons = rg.querySelectorAll('.button-group--right-sleeve--custom');
//           if (!rg.querySelector('.button-group--right-sleeve--custom.active') && rightSleeveButtons.length > 0) {
//             rightSleeveButtons[0].classList.add('active');
//             console.log('Activated first right sleeve swatch in group:', groupIndex);
//           }
//         } else {
//           rg.style.display = 'none';
//           rg.classList.remove('active');
//           rg.querySelectorAll('.button-group--right-sleeve--custom').forEach(b => b.classList.remove('active'));
//         }
//       });

//       updateMainImages();
//     });
//   });

//   // Back swatch click
//   backGroups.forEach(group => {
//     const buttons = group.querySelectorAll('.back-swatch');
//     buttons.forEach(btn => {
//       btn.addEventListener('click', function () {
//         console.log('Back Swatch Clicked:', btn.dataset.backImage);
//         buttons.forEach(b => b.classList.remove('active'));
//         btn.classList.add('active');
//         backGroups.forEach(bg => bg.classList.remove('active'));
//         group.classList.add('active');
//         updateMainImages(true); // Pass true to indicate back swatch click
//       });
//     });
//   });

//   // Left sleeve swatch click
//   leftSleeveGroups.forEach(group => {
//     const buttons = group.querySelectorAll('.button-group--left-sleeve--custom');
//     buttons.forEach(btn => {
//       btn.addEventListener('click', function () {
//         console.log('Left Sleeve Swatch Clicked:', btn.dataset.imageName);
//         buttons.forEach(b => b.classList.remove('active'));
//         btn.classList.add('active');
//         updateMainImages();
//       });
//     });
//   });

//   // Right sleeve swatch click
//   rightSleeveGroups.forEach(group => {
//     const buttons = group.querySelectorAll('.button-group--right-sleeve--custom');
//     buttons.forEach(btn => {
//       btn.addEventListener('click', function () {
//         console.log('Right Sleeve Swatch Clicked:', btn.dataset.imageName);
//         buttons.forEach(b => b.classList.remove('active'));
//         btn.classList.add('active');
//         updateMainImages();
//       });
//     });
//   });

//   // Initialize on load
//   if (frontSwatches.length > 0) {
//     if (!document.querySelector('.front-swatch.active')) {
//       frontSwatches[0].classList.add('active');
//       console.log('Initialized first front swatch:', frontSwatches[0].dataset.groupIndex);
//     }
//     const activeFront = document.querySelector('.front-swatch.active');
//     const firstGroupIndex = activeFront.dataset.groupIndex;
//     const hasLeftSleeve = activeFront.dataset.hasLeftSleeve === 'true';
//     const hasRightSleeve = activeFront.dataset.hasRightSleeve === 'true';

//     // Initialize sleeve design visibility
//     if (leftSleeveDesigns) {
//       leftSleeveDesigns.classList.toggle('active', hasLeftSleeve);
//       console.log('Left Sleeve Designs Active:', hasLeftSleeve);
//     }
//     if (rightSleeveDesigns) {
//       rightSleeveDesigns.classList.toggle('active', hasRightSleeve);
//       console.log('Right Sleeve Designs Active:', hasRightSleeve);
//     }

//     // Initialize back swatches
//     backGroups.forEach(bg => {
//       if (bg.dataset.groupIndex === firstGroupIndex) {
//         bg.classList.add('active');
//         const backButtons = bg.querySelectorAll('.back-swatch');
//         if (backButtons.length > 0 && !bg.querySelector('.back-swatch.active')) {
//           backButtons[0].classList.add('active');
//           console.log('Initialized first back swatch in group:', firstGroupIndex);
//         }
//       } else {
//         bg.classList.remove('active');
//       }
//     });

//     // Initialize left sleeve swatches
//     leftSleeveGroups.forEach(lg => {
//       if (lg.dataset.groupId === firstGroupIndex) {
//         lg.style.display = 'flex';
//         lg.classList.add('active');
//         const leftSleeveButtons = lg.querySelectorAll('.button-group--left-sleeve--custom');
//         if (leftSleeveButtons.length > 0 && !lg.querySelector('.button-group--left-sleeve--custom.active')) {
//           leftSleeveButtons[0].classList.add('active');
//           console.log('Initialized first left sleeve swatch in group:', firstGroupIndex);
//         }
//       } else {
//         lg.style.display = 'none';
//         lg.classList.remove('active');
//       }
//     });

//     // Initialize right sleeve swatches
//     rightSleeveGroups.forEach(rg => {
//       if (rg.dataset.groupId === firstGroupIndex) {
//         rg.style.display = 'flex';
//         rg.classList.add('active');
//         const rightSleeveButtons = rg.querySelectorAll('.button-group--right-sleeve--custom');
//         if (rightSleeveButtons.length > 0 && !rg.querySelector('.button-group--right-sleeve--custom.active')) {
//           rightSleeveButtons[0].classList.add('active');
//           console.log('Initialized first right sleeve swatch in group:', firstGroupIndex);
//         }
//       } else {
//         rg.style.display = 'none';
//         lg.classList.remove('active');
//       }
//     });

//     updateMainImages();
//   } else {
//     console.error('No front swatches found');
//   }
// });