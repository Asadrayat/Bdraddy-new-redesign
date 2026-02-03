window.cardProductFunc = function() {


  const initVideoControls = (card) => {
    const videoWrapper = card.querySelector('.product-card__video-wrapper');
    if (!videoWrapper) return;

    const video = videoWrapper.querySelector('.product-card__primary-video');
    const toggleButton = videoWrapper.querySelector('.product-card__video-toggle');
    const parentLink = videoWrapper.closest('.product-card__image-link');
    
    if (!video || !toggleButton) return;

    const updateButtonState = () => {
      if (video.paused) {
        toggleButton.classList.add('paused');
      } else {
        toggleButton.classList.remove('paused');
      }
    };

    const togglePlayPause = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (video.paused) {
        video.play().catch(err => {
          console.error('Error playing video:', err);
        });
      } else {
        video.pause();
      }
    };

    toggleButton.addEventListener('click', togglePlayPause);

    video.addEventListener('pause', updateButtonState);
    video.addEventListener('play', updateButtonState);
    video.addEventListener('playing', updateButtonState);

    if (parentLink) {
      parentLink.addEventListener('click', (e) => {
        if (e.target === toggleButton || toggleButton.contains(e.target)) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    }

    setTimeout(updateButtonState, 100);
  };

  const processProductCards = () => {
    document.querySelectorAll('.--product-card-v3').forEach(card => {
      try {
        initVideoControls(card);
      } catch (error) {
        console.error('Error processing product card:', error);
      }
    });
  };

  if (document.readyState !== 'loading') {
    processProductCards();
  } else {
    document.addEventListener('DOMContentLoaded', processProductCards);
  }
};

window.cardProductFunc();