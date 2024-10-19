var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  centeredSlides: true,
  slidesPerGroupSkip: 1,
  loop: true,
  speed: 600,
  autoplay: true,
  grabCursor: true,
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    769: {
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  navigation: {
    nextEl: ".slider-next",
    prevEl: ".slider-prev",
  }
});

var swiper = new Swiper(".productSwiper", {
  loop: true,
  loopAddBlankSlides: true,
  spaceBetween: 30,
  slidesPerView: 1,
  slidesPerGroup: 1,
  speed: 700,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});