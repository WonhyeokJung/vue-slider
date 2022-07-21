export function mountSlider (props) {
  const state = {
    translate: -100,
    curIdx: 1,
    transitionSpeed: 300,
    tags: {
      sliderWrapper: document.querySelector('.slider-wrapper')
    }
  }
  document.querySelector('.slider-arrow__next').addEventListener('click', () => nextSlide(props))
  document.querySelector('.slider-arrow__prev').addEventListener('click', () => prevSlide(props))
  function prevSlide (props) {
    if (!props.loop && state.translate + 100 > 0) return
    state.translate += 100
    state.curIdx -= 1
    state.tags.sliderWrapper.style.transitionDuration = `${state.transitionSpeed}ms`
    state.tags.sliderWrapper.style.transform = `translate3d(${state.translate}%, 0, 0)`
  }
  function nextSlide (props) {
    if (state.translate - 100 < -600) return
    state.translate -= 100
    state.curIdx += 1

    state.tags.sliderWrapper.style.transitionDuration = `${state.transitionSpeed}ms`
    state.tags.sliderWrapper.style.transform = `translate3d(${state.translate}%, 0, 0)`
  }
  nextSlide(props)
  prevSlide(props)
}
