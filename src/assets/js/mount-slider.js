import { autoplay } from './autoplay';

export function mountSlider(props) {
  const state = Object.assign({ ...props }, {
    translate: -100,
    curIdx: 1,
    transitionSpeed: 300,
    moveEventsData: {
      transitionStart: false,
      transitionEnd: true,
    },
    tags: {
      $el: document.querySelector('.slider'),
      sliderWrapper: document.querySelector('.slider-wrapper'),
      slides: document.querySelector('.slider-wrapper').children,
      prevArrow: document.querySelector('.slider-arrow__prev'),
      nextArrow: document.querySelector('.slider-arrow__next'),
      pagination: document.querySelector('.slider-pagination'),
      pageNumber: document.querySelector('.slider-page-number')
    },
  })

  console.log(state)
  document.querySelector('.slider-arrow__next').addEventListener('click', () => nextSlide(props))
  document.querySelector('.slider-arrow__prev').addEventListener('click', () => prevSlide(props))
  function prevSlide(props) {
    if (!props.loop && state.translate + 100 > 0) return
    state.translate += 100
    state.curIdx -= 1
    state.tags.sliderWrapper.style.transitionDuration = `${state.transitionSpeed}ms`
    state.tags.sliderWrapper.style.transform = `translate3d(${state.translate}%, 0, 0)`
  }
  function nextSlide(props) {
    if (!props.loop && state.translate < -100 * (state.tags.sliderWrapper.children.length - 2)) return
    state.translate -= 100
    state.curIdx += 1

    state.tags.sliderWrapper.style.transitionDuration = `${state.transitionSpeed}ms`
    state.tags.sliderWrapper.style.transform = `translate3d(${state.translate}%, 0, 0)`
  }

  nextSlide(state)
  prevSlide(state)
  autoplay(state)
}

// function autoplay(props) {
//   function start() {
//     if (autoplay.running) return;
//     on('runAutoplay', () => {
//       run();
//     })
//     trigger('runAutoplay');
//   }

//   // remove eventListener
//   function stop() {
//     clearInterval(autoSlideControl);
//     off('runAutoplay');
//   }

//   function onTouchStart() {
//     if (params.autoplay.disableOnInteraction) {
//       return stop();
//     }
//     pause();
//   }

//   function onTouchEnd() {
//     run();
//   }

// function onPointerEnter(e) {
//   if (e.pointerType !== 'mouse') return;
//   moveEventsData.transitionEnd = false;
//   if (params.autoplay.disableOnInteraction) {
//     return stop();
//   }
//   pause();
// }

// function onPointerLeave(e) {
//   if (e.pointerType !== 'mouse') return;
//   // $el.removeEventListener('pointerenter', onPointerEnter);
//   moveEventsData.transitionEnd = true;
//   run();
// }

//   function onTransitionStart() {
//     // delay가 빠른 경우 여기서 방지가 필요함.
//     moveEventsData.transitionEnd = false;
//   }

//   function onTransitionEnd() {
//     tags.sliderWrapper.style.transitionDuration = '0ms';
//     if (translate === 0){
//       translate = -100 * (tags.slides.length - 2);
//       curIdx = slideLength;
//       if (params.direction === 'vertical') {
//         tags.sliderWrapper.style.transform = `translate3d(0, ${translate}%, 0)`;
//       } else {
//         tags.sliderWrapper.style.transform = `translate3d(${translate}%, 0, 0)`;
//       }
//     } else if (translate === -100 * (tags.slides.length -1)) {
//       translate = -100;
//       curidx = 1;
//       if (params.direction === 'vertical') {
//         tags.sliderWrapper.style.transform = `translate3d(0, ${translate}%, 0)`;
//       } else {
//         tags.sliderWrapper.style.transform = `translate3d(${translate}%, 0, 0)`;
//       }
//     }

//     moveEventsData.transitionEnd = true;
//   }

//   // active 화면 체크
//   function onVisibilityChange() {
//     if (document.hidden && autoplay.running) {
//       pause();
//     } else {
//       run();
//     }
//   }

//   function attachTouchEvent() {
//     addEvent($el, 'touchstart', onTouchStart);
//     addEvent($el, 'touchend', onTouchEnd);
//   }

//   function attachMouseEvent() {
//       addEvent($el, 'pointerenter', onPointerEnter);
//       addEvent($el, 'pointerleave', onPointerLeave);
//   }

//   function attachTransitionEvent() {
//     addEvent($el, 'transitionstart', onTransitionStart);
//     addEvent($el, 'transitionend', onTransitionEnd);
//   }

//   function detachTransitionEvent() {
//     removeEvent($el, 'transitionstart', onTransitionStart);
//     removeEvent($el, 'transitionend', onTransitionEnd);
//   }

//   on('init', () => {
//     if (params.autoplay.enabled) {
//       addEvent(document, 'visibilitychange', onVisibilityChange);

//       if (params.autoplay.pauseOnInteraction) {
//         attachTouchEvent();
//         attachMouseEvent();
//         // attachTransitionEvent();
//       }

//       start();
//     }
//   })
// }
