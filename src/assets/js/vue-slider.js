import { h, onMounted, ref } from 'vue'

const Slider = {
  name: 'Slider',
  props: {
    init: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    useArrow: {
      type: Object,
      default: {
        enabled: true,
        followDirection: true
      }
    },
    autoplay: {
      type: Object,
      default: {
        enabled: true,
        delay: 2000,
        toForward: true,
        pauseOnInteraction: true
      }
    },
    usePagination: {
      type: Object,
      default: {
        enabled: false,
        clickable: false
      }
    },
    usePageNumber: {
      type: Object,
      default: {
        enabled: false
      }
    },
    tag: {
      type: String,
      default: 'div'
    },
    width: {
      type: Number,
      default: 1000
    },
    height: {
      type: Number,
      default: 750
    },
    transitionSpeed: {
      type: Number,
      default: 700
    }
  },
  setup (props, _ref) {
    const {
      slots
    } = _ref
    const sliderClass = ref('slider')
    const sliderWrapperClass = ref('slider-wrapper')
    onMounted(() => {
      // const sliderWrapper = document.querySelector('.' + sliderWrapperClass.value)
      // const slides = document.querySelectorAll('.slider-slide')
      // sliderWrapper.insertBefore(slides[slides.length - 1].cloneNode(true), slides[0])
      // sliderWrapper.appendChild(slides[0].cloneNode(true))
    })

    function getSlides (slots) {
      if (slots === undefined) return
      const slides = []
      function pushSlides (vnodes) {
        // iterable check
        if (!Array.isArray(vnodes)) return

        vnodes.forEach((vnode) => {
          // children이 있으며 & symbol type 인지 체크
          if (typeof vnode.type === 'symbol' && vnode.children) {
            pushSlides(vnode.children)
          } else if (vnode.type && vnode.type.name === 'SliderSlide') {
            slides.push(vnode)
          }
        })
      }

      Object.keys(slots).forEach(slotName => {
        if (typeof slots[slotName] !== 'function' || slotName !== 'default') return
        pushSlides(slots[slotName]())
      })

      return { slides }
    }
    return () => {
      const { slides } = getSlides(slots)
      console.log(slides)
      return h(props.tag, {
        ref: sliderClass.value,
        class: [sliderClass.value === 'slider' ? sliderClass.value : (sliderClass.value, 'slider')],
        style: [`width: ${props.width}px`, `height: ${props.height}px`]
      }, [
        slots['container-start'] && slots['container-start'](),
        h('div', { ref: sliderWrapperClass.value, class: [sliderWrapperClass.value] }, [
          // 슬롯 순서대로 정의됨. slots.default가 있는지 확인하고 그 다음에 default에 작성한 내용을 Rendering(slotProps 전달)
          slots.default && slots.default(),
          props.useArrow.enabled ? [h('div', { class: ['slider-arrow__prev slider-arrow-horizontal__prev'] }), h('div', { class: ['slider-arrow__next slider-arrow-horizontal__next'] })] : '',
          props.usePagination.enabled ? [h('div', { class: ['slider-pagination'] })] : ''
        ]),
        slots['container-end'] && slots['container-end']()
      ])
    }
  }
}

const SliderSlide = {
  name: 'SliderSlide',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup (props, context) {
    const {
      slots
    } = context
    const slideClass = ref('slider-slide')
    return () => {
      // return h('div', {}, h('img'))
      return h(props.tag, {
        class: [slideClass.value]
        // 외부 컴포넌트 렌더링
      }, [(slots.default && slots.default()[0]) || h('div', {
        style: 'width: 100%; height: 100%',
        textContent: 'Slide'
      })] // array of Children
      )
    }
  }
}

export { SliderSlide, Slider }
