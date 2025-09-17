document.addEventListener("DOMContentLoaded", () => {
  /** =========================
   * Utility Functions
   * ========================= */
  const loadImage = (src, onSuccess, onError) => {
    const img = new Image();
    img.src = src;
    img.onload = () => onSuccess?.(src);
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      onError?.();
    };
  };

  const setBackgroundImage = (element, src, placement, altClasses) => {
    if (!element || !src) return;
    loadImage(src, () => {
      element.style.backgroundImage = `url(${src})`;
      element.classList.remove(...altClasses);
      element.classList.add(placement);
      console.log(`Set background image: ${src}, placement: ${placement}`);
    });
  };

  const clearActiveAndSet = (buttons, activeButton) => {
    buttons.forEach(btn => btn.classList.remove("active"));
    if (activeButton) activeButton.classList.add("active");
  };

  /** =========================
   * Cached DOM Elements
   * ========================= */
  const mediaGallery = document.querySelector("media-gallery");
  const mediaItems = [...document.querySelectorAll(".product__media-item")];
  const frontThumbContainer = document.querySelector(".thumb-container--custom");
  const backThumbContainer = document.querySelector(".product__media-item:nth-child(2) .thumb-container--back--custom");
  const frontButtonGroups = [...document.querySelectorAll(".button-group--custom")];
  const backButtonContainer = document.querySelector(".patter-container--back--custom");
  const backTextContainer = document.querySelector(".text-container--back--custom");
  const frontImgBoxes = [...document.querySelectorAll(".img--box--custom")];
  const backImgBoxes = [...document.querySelectorAll(".img--box--back--custom")];
  const backButtonGroupWrappers = [...document.querySelectorAll(".back-button-group-wrapper")];
  const leftSleeveButtonContainer = document.querySelector(".patter-container--left-sleeve--custom");
  const leftSleeveTextContainer = document.querySelector(".text-container--left-sleeve--custom");
  const leftSleeveButtonGroupWrappers = [...document.querySelectorAll(".left-sleeve-button-group-wrapper")];
  const rightSleeveButtonContainer = document.querySelector(".patter-container--right-sleeve--custom");
  const rightSleeveTextContainer = document.querySelector(".text-container--right-sleeve--custom");
  const rightSleeveButtonGroupWrappers = [...document.querySelectorAll(".right-sleeve-button-group-wrapper")];

  const frontInput = document.querySelector("#front-design-input");
  const backInput = document.querySelector("#back-design-input");
  const frontPlacementInput = document.querySelector("#front-placement-input");
  const backPlacementInput = document.querySelector("#back-placement-input");
  const frontDesignImageInput = document.querySelector("#front-design-image-input");
  const backDesignImageInput = document.querySelector("#back-design-image-input");
  const leftSleeveDesignInput = document.querySelector("#left-sleeve-design-input");
  const rightSleeveDesignInput = document.querySelector("#right-sleeve-design-input");

  if (!mediaGallery) {
    console.error("Media gallery element not found. Selector: media-gallery");
    return;
  }

  console.log(`Found ${mediaItems.length} media items`);

  /** =========================
   * Core Functions
   * ========================= */
  const setMainPreviewImage = (index) => {
    const item = mediaItems[index];
    if (!item) return console.error(`No media item at index ${index}`);
    const mediaId = item.dataset.mediaId;
    try {
      mediaGallery.setActiveMedia(mediaId, false);
      console.log(`Preview set to index ${index}, mediaId: ${mediaId}`);
    } catch (e) {
      console.error(`Error setting preview for mediaId ${mediaId}`, e);
    }
  };

  const updateBackButtons = (blockId, setInitial = false, placement = "chest") => {
    if (!backButtonContainer || !backTextContainer) return;

    // Hide all back button group wrappers
    backButtonGroupWrappers.forEach(wrapper => {
      wrapper.style.display = "none";
    });

    // Show the wrapper for the current blockId
    const activeWrapper = backButtonGroupWrappers.find(wrapper => wrapper.dataset.groupId === blockId);
    if (activeWrapper) {
      activeWrapper.style.display = "flex";
    } else {
      console.warn(`No back button group wrapper found for blockId: ${blockId}`);
    }

    // Hide or show back text container and button container based on wrapper availability
    const hasButtons = activeWrapper && activeWrapper.querySelector(".button-group--back--custom");
    backTextContainer.style.display = hasButtons ? "block" : "none";
    backButtonContainer.style.display = hasButtons ? "flex" : "none";

    backButtonContainer.dataset.blockId = blockId;

    const backButtons = activeWrapper ? [...activeWrapper.querySelectorAll(".button-group--back--custom")] : [];

    // Set initial active state
    if (setInitial && backButtons.length > 0) {
      const firstButton = backButtons[0];
      clearActiveAndSet(backButtons, firstButton);
      const backImg = backImgBoxes.find(
        box => box.dataset.blockId === blockId && box.dataset.backId === firstButton.dataset.backId
      );
      if (backImg && backImg.dataset.src) {
        setBackgroundImage(
          backThumbContainer,
          backImg.dataset.src,
          placement === "center" ? "top" : "center",
          ["top", "center"]
        );
        updateInputsFromUI();
      } else {
        if (backThumbContainer) {
          backThumbContainer.style.backgroundImage = "";
          backThumbContainer.classList.remove("top", "center");
        }
        updateInputsFromUI();
      }
    } else if (!backButtons.length) {
      if (backThumbContainer) {
        backThumbContainer.style.backgroundImage = "";
        backThumbContainer.classList.remove("top", "center");
      }
      updateInputsFromUI();
    }

    // Event binding for back buttons
    backButtons.forEach(button => {
      button.removeEventListener("click", button._clickHandler);
      button._clickHandler = () => {
        clearActiveAndSet(backButtons, button);
        const backImg = backImgBoxes.find(
          box => box.dataset.blockId === blockId && box.dataset.backId === button.dataset.backId
        );
        if (backImg && backImg.dataset.src) {
          setBackgroundImage(
            backThumbContainer,
            backImg.dataset.src,
            placement === "center" ? "top" : "center",
            ["top", "center"]
          );
        } else {
          if (backThumbContainer) {
            backThumbContainer.style.backgroundImage = "";
            backThumbContainer.classList.remove("top", "center");
          }
        }
        setMainPreviewImage(1);
        updateInputsFromUI();
      };
      button.addEventListener("click", button._clickHandler);
    });
  };

  const updateLeftSleeveButtons = (blockId, setInitial = false) => {
    if (!leftSleeveButtonContainer || !leftSleeveTextContainer) return;

    // Hide all left sleeve button group wrappers
    leftSleeveButtonGroupWrappers.forEach(wrapper => {
      wrapper.style.display = "none";
    });

    // Show the wrapper for the current blockId
    const activeWrapper = leftSleeveButtonGroupWrappers.find(wrapper => wrapper.dataset.groupId === blockId);
    if (activeWrapper) {
      activeWrapper.style.display = "flex";
    } else {
      console.warn(`No left sleeve button group wrapper found for blockId: ${blockId}`);
    }

    // Hide or show left sleeve text container and button container
    const hasButtons = activeWrapper && activeWrapper.querySelector(".button-group--left-sleeve--custom");
    leftSleeveTextContainer.style.display = hasButtons ? "block" : "none";
    leftSleeveButtonContainer.style.display = hasButtons ? "flex" : "none";

    leftSleeveButtonContainer.dataset.blockId = blockId;

    const leftSleeveButtons = activeWrapper ? [...activeWrapper.querySelectorAll(".button-group--left-sleeve--custom")] : [];

    // Set initial active state
    if (setInitial && leftSleeveButtons.length > 0) {
      const firstButton = leftSleeveButtons[0];
      clearActiveAndSet(leftSleeveButtons, firstButton);
      updateInputsFromUI();
    } else if (!leftSleeveButtons.length) {
      updateInputsFromUI();
    }

    // Event binding for left sleeve buttons
    leftSleeveButtons.forEach(button => {
      button.removeEventListener("click", button._clickHandler);
      button._clickHandler = () => {
        clearActiveAndSet(leftSleeveButtons, button);
        updateInputsFromUI();
      };
      button.addEventListener("click", button._clickHandler);
    });
  };

  const updateRightSleeveButtons = (blockId, setInitial = false) => {
    if (!rightSleeveButtonContainer || !rightSleeveTextContainer) return;

    // Hide all right sleeve button group wrappers
    rightSleeveButtonGroupWrappers.forEach(wrapper => {
      wrapper.style.display = "none";
    });

    // Show the wrapper for the current blockId
    const activeWrapper = rightSleeveButtonGroupWrappers.find(wrapper => wrapper.dataset.groupId === blockId);
    if (activeWrapper) {
      activeWrapper.style.display = "flex";
    } else {
      console.warn(`No right sleeve button group wrapper found for blockId: ${blockId}`);
    }

    // Hide or show right sleeve text container and button container
    const hasButtons = activeWrapper && activeWrapper.querySelector(".button-group--right-sleeve--custom");
    rightSleeveTextContainer.style.display = hasButtons ? "block" : "none";
    rightSleeveButtonContainer.style.display = hasButtons ? "flex" : "none";

    rightSleeveButtonContainer.dataset.blockId = blockId;

    const rightSleeveButtons = activeWrapper ? [...activeWrapper.querySelectorAll(".button-group--right-sleeve--custom")] : [];

    // Set initial active state
    if (setInitial && rightSleeveButtons.length > 0) {
      const firstButton = rightSleeveButtons[0];
      clearActiveAndSet(rightSleeveButtons, firstButton);
      updateInputsFromUI();
    } else if (!rightSleeveButtons.length) {
      updateInputsFromUI();
    }

    // Event binding for right sleeve buttons
    rightSleeveButtons.forEach(button => {
      button.removeEventListener("click", button._clickHandler);
      button._clickHandler = () => {
        clearActiveAndSet(rightSleeveButtons, button);
        updateInputsFromUI();
      };
      button.addEventListener("click", button._clickHandler);
    });
  };

  const updateBackLabel = (placement) => {
    if (!backTextContainer || backTextContainer.style.display === "none") return;
    const label = placement === "center" ? "SELECT BACK DESIGN" : "SELECT BACK DESIGN";
    backTextContainer.textContent = label;
    backTextContainer.dataset.placement = placement;
    console.log(`Updated back label: ${label}`);
  };

  const setFrontImage = (blockId, placementFallback = "chest") => {
    const frontImg = frontImgBoxes.find(
      box => box.dataset.blockId === blockId && box.dataset.target === "thumb-container--custom"
    );
    if (frontImg?.dataset.src) {
      setBackgroundImage(frontThumbContainer, frontImg.dataset.src, frontImg.dataset.placement, ["chest", "center"]);
      updateBackButtons(blockId, true, frontImg.dataset.placement);
      updateLeftSleeveButtons(blockId, true);
      updateRightSleeveButtons(blockId, true);
      updateBackLabel(frontImg.dataset.placement);
    } else {
      updateBackButtons(blockId, true, placementFallback);
      updateLeftSleeveButtons(blockId, true);
      updateRightSleeveButtons(blockId, true);
      updateBackLabel(placementFallback);
    }
  };

  const updateInputs = (frontName, backName, frontPlacement, leftSleeveName, rightSleeveName) => {
    if (frontInput) frontInput.value = frontName || "";
    if (backInput) backInput.value = backName || "";
    if (leftSleeveDesignInput) leftSleeveDesignInput.value = leftSleeveName || "";
    if (rightSleeveDesignInput) rightSleeveDesignInput.value = rightSleeveName || "";


    const backPlacement = backName ? (frontPlacement === "chest" ? "center" : "top") : "";
    // const backPlacement = frontPlacement === "chest" ? "center" : "top";
    if (frontPlacementInput) frontPlacementInput.value = frontPlacement;
    if (backPlacementInput) backPlacementInput.value = backPlacement;

    const activeFrontImgBox = document.querySelector(
      `.img--box--custom[data-block-id="${document.querySelector(".button-group--custom.active")?.dataset.blockId}"]`
    );
    if (activeFrontImgBox && activeFrontImgBox.dataset.src) {
      if (frontDesignImageInput) {
        frontDesignImageInput.value = activeFrontImgBox.dataset.src;
      }
    } else {
      if (frontDesignImageInput) {
        frontDesignImageInput.value = "";
      }
    }

    const activeBackButton = document.querySelector(".button-group--back--custom.active");
    const activeBackImgBox = activeBackButton
      ? document.querySelector(
          `.img--box--back--custom[data-block-id="${backButtonContainer?.dataset.blockId}"][data-back-id="${activeBackButton?.dataset.backId}"]`
        )
      : null;
    if (activeBackImgBox && activeBackImgBox.dataset.src) {
      if (backDesignImageInput) {
        backDesignImageInput.value = activeBackImgBox.dataset.src;
      }
    } else {
      if (backDesignImageInput) {
        backDesignImageInput.value = "";
      }
    }

    console.log("Updated inputs →", {
      front: frontName,
      back: backName,
      leftSleeve: leftSleeveName,
      rightSleeve: rightSleeveName,
      frontPlacement,
      backPlacement,
      frontDesignImage: activeFrontImgBox?.dataset.src || "",
      backDesignImage: activeBackImgBox?.dataset.src || ""
    });
  };

  const updateInputsFromUI = () => {
    const activeFront = document.querySelector(".button-group--custom.active");
    const activeBack = backButtonContainer?.querySelector(".button-group--back--custom.active");
    const activeLeftSleeve = leftSleeveButtonContainer?.querySelector(".button-group--left-sleeve--custom.active");
    const activeRightSleeve = rightSleeveButtonContainer?.querySelector(".button-group--right-sleeve--custom.active");
    const frontName = activeFront?.dataset.blockName || "";
    const frontPlacement = activeFront?.dataset.placement || "chest";
    let backName = "";
    let leftSleeveName = "";
    let rightSleeveName = "";

    if (activeBack) {
      const activeBackImgBox = document.querySelector(
        `.img--box--back--custom[data-block-id="${backButtonContainer?.dataset.blockId}"][data-back-id="${activeBack.dataset.backId}"]`
      );
      if (activeBackImgBox?.dataset.src) {
        const src = activeBackImgBox.dataset.src;
        backName = src.split('/').pop().split('?')[0].split('.')[0];
      }
    }

    if (activeLeftSleeve) {
      leftSleeveName = activeLeftSleeve.dataset.imageName || "";
    }

    if (activeRightSleeve) {
      rightSleeveName = activeRightSleeve.dataset.imageName || "";
    }

    updateInputs(frontName, backName, frontPlacement, leftSleeveName, rightSleeveName);
  };

  /** =========================
   * Initialization
   * ========================= */
  if (frontButtonGroups.length > 0) {
    const firstBtn = frontButtonGroups[0];
    firstBtn.classList.add("active");
    console.log(`Initial front block: ${firstBtn.dataset.blockId}`);

    setFrontImage(firstBtn.dataset.blockId);
    setMainPreviewImage(0);
    updateInputsFromUI();
  }

  /** =========================
   * Event Listeners
   * ========================= */
  frontButtonGroups.forEach(btn => {
    btn.addEventListener("click", () => {
      clearActiveAndSet(frontButtonGroups, btn);
      console.log(`Clicked front button blockId: ${btn.dataset.blockId}`);
      setFrontImage(btn.dataset.blockId);
      setMainPreviewImage(0);
      updateInputsFromUI();
    });
  });
});