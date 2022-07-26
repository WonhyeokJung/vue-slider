import { autoplay } from './modules/autoplay';
import { addEvent, eventsEmitter } from './utils/event';

export function updateSlider(props) {
  const state = Object.assign({ ...props }, {
    translate: props.loop ? -100 : 0,
    curIdx: props.loop ? 1 : 0,
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

  function onTransitionStart() {
    if (state.loop) {
      state.moveEventsData.transitionEnd = false;
    }
  }
  // loop 제어 및 다음 슬라이드 이동 방지
  function onTransitionEnd() {
    if (state.loop) {
      state.tags.sliderWrapper.style.transitionDuration = '0ms';
      if (state.translate === 0) {
        state.translate = -100 * (state.tags.slides.length - 2);
        state.curIdx = state.tags.slides.length - 2;
        state.tags.sliderWrapper.style.transform = (state.direction === 'vertical') ? `translate3d(0, ${state.translate}%, 0)` : `translate3d(${state.translate}%, 0, 0)`;
      } else if (state.translate === -100 * (state.tags.slides.length - 1)) {
        state.translate = -100;
        state.curIdx = 1;
        state.tags.sliderWrapper.style.transform = (state.direction === 'vertical') ? `translate3d(0, ${state.translate}%, 0)` : `translate3d(${state.translate}%, 0, 0)`;
      }
    }

    state.moveEventsData.transitionEnd = true;
  }

  function prevSlide(state) {
    // transition이 작동안하므로 true 처리
    if (!state.loop && state.translate + 100 > 0) return (state.moveEventsData.transitionEnd = true);
    state.translate += 100
    state.curIdx -= 1
    state.tags.sliderWrapper.style.transitionDuration = `${state.transitionSpeed}ms`;
    state.direction === 'vertical' ? state.tags.sliderWrapper.style.transform = `translate3d(0, ${state.translate}%, 0)` : state.tags.sliderWrapper.style.transform = `translate3d(${state.translate}%, 0, 0)`;
  }
  function nextSlide(state) {
    if (!state.loop && state.translate < -100 * (state.tags.sliderWrapper.children.length - 2)) return (state.moveEventsData.transitionEnd = true);
    state.translate -= 100;
    state.curIdx += 1;
    console.log('working', state.translate, state.curIdx)
    state.tags.sliderWrapper.style.transitionDuration = `${state.transitionSpeed}ms`;
    state.direction === 'vertical' ? state.tags.sliderWrapper.style.transform = `translate3d(0, ${state.translate}%, 0)` : state.tags.sliderWrapper.style.transform = `translate3d(${state.translate}%, 0, 0)`;
  }

  function arrow(state) {
    const {
      moveEventsData,
      tags
    } = state;
    const {
      on,
      // off,
      // trigger
    } = eventsEmitter;

    function onPrevClick() {
      if (!moveEventsData.transitionEnd) return;
      return prevSlide(state);
    }
    function onNextClick() {
      if (!moveEventsData.transitionEnd) return;
      return nextSlide(state);
    }

    on('init', () => {
      addEvent(tags.prevArrow, 'click', onPrevClick);
      addEvent(tags.nextArrow, 'click', onNextClick);
    })
  }

  eventsEmitter.on('init', () => {
    addEvent(state.tags.$el, 'transitionstart', onTransitionStart);
    addEvent(state.tags.$el, 'transitionend', onTransitionEnd);
  })
  autoplay(state);
  arrow(state);
  // module화 대비
  // autoplay.apply(state);
  eventsEmitter.trigger('init');
}
