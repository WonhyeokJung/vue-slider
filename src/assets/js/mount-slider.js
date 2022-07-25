import { autoplay } from './autoplay';
import { addEvent, eventsEmitter } from './event';

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
  if (state.direction === 'vertical') state.tags.sliderWrapper.classList.add('vertical');
  else state.tags.sliderWrapper.classList.add('horizontal');

  function prevSlide(state) {
    if (!state.loop && state.translate + 100 > 0) return
    state.translate += 100
    state.curIdx -= 1
    state.tags.sliderWrapper.style.transitionDuration = `${state.transitionSpeed}ms`;
    state.tags.sliderWrapper.style.transform = `translate3d(${state.translate}%, 0, 0)`;
  }
  function nextSlide(state) {
    if (!state.loop && state.translate < -100 * (state.tags.sliderWrapper.children.length - 2)) return;
    state.translate -= 100;
    state.curIdx += 1;

    state.tags.sliderWrapper.style.transitionDuration = `${state.transitionSpeed}ms`;
    state.tags.sliderWrapper.style.transform = `translate3d(${state.translate}%, 0, 0)`;
  }

  function arrow(state) {
    const {
      on,
      // off,
      // trigger
    } = eventsEmitter;

    function onPrevClick() {
      console.log(state.moveEventsData.transitionEnd)
      if (!state.moveEventsData.transitionEnd) return;
      state.moveEventsData.transitionEnd = false;
      return prevSlide(state);
    }
    function onNextClick() {
      if (!state.moveEventsData.transitionEnd) return;
      state.moveEventsData.transitionEnd = false;
      return nextSlide(state);
    }

    on('init', () => {
      addEvent(state.tags.prevArrow, 'click', onPrevClick(state));
      addEvent(state.tags.prevArrow, 'click', onNextClick(state));
    })
  }

  autoplay(state);
  arrow(state);
  // module화 대비
  // autoplay.apply(state);
  eventsEmitter.trigger('init');
}
