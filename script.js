document.addEventListener('DOMContentLoaded', () => {
  const sliderContainer = document.getElementById('slider-container');
  const slides = Array.from(sliderContainer.querySelectorAll('.slide'));
  const numSlides = slides.length;
  let currentActiveIndex = 0;

  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');

  function updateSlideStates() {
    if (numSlides === 0) return;

    for (let i = 0; i < numSlides; i++) {
      const slide = slides[i];
      let status = 'hidden';

      let diff = i - currentActiveIndex;
      if (diff > numSlides / 2) {
        diff -= numSlides;
      } else if (diff < -numSlides / 2) {
        diff += numSlides;
      }

      if (diff === 0) {
        status = 'active';
      } else if (numSlides > 1 && diff === 1) {
        status = 'next';
      } else if (numSlides > 2 && diff === -1) {
        status = 'prev';
      } else if (numSlides > 3 && diff === 2) {
        status = 'background-next';
      } else if (numSlides > 4 && diff === -2) {
        status = 'background-prev';
      }

      if (numSlides === 2 && diff === -1) {
        status = 'next';
      }
      if (numSlides === 3 && diff === -2) { // For N=3, diff=-2 is same as diff=1 ('next')
        // This case is diff=2, which normalizes to diff=-1 for N=3, so 'prev'
        // The diff calc already handles this.
      }
      if (numSlides === 4 && diff === -2) { // For N=4, diff=-2 is same as diff=2 ('background-next')
        status = 'background-next';
      }


      slide.dataset.status = status;

      slide.classList.remove('shadow-xl', 'shadow-lg', 'shadow-md');
      if (status === 'active') slide.classList.add('shadow-xl');
      else if (status === 'next' || status === 'prev') slide.classList.add('shadow-lg');
      else if (status === 'background-next' || status === 'background-prev') slide.classList.add('shadow-md');
    }
  }

  if (numSlides > 0) {
    updateSlideStates();
  } else {
    if (sliderContainer) sliderContainer.innerHTML = '<p class="text-stone-500 text-center p-10 absolute inset-0 flex items-center justify-center">No testimonials available.</p>';
  }

  if (numSlides <= 1) {
    if (prevButton) prevButton.style.display = 'none';
    if (nextButton) nextButton.style.display = 'none';
  } else {
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        currentActiveIndex = (currentActiveIndex - 1 + numSlides) % numSlides;
        updateSlideStates();
      });
    }
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        currentActiveIndex = (currentActiveIndex + 1) % numSlides;
        updateSlideStates();
      });
    }
  }
});