<<<<<<< HEAD
function createLoop (slides) {
  if (slides === undefined) return
  console.log(slides[0].children)
  const newSlides = {
    children: slides[0].children
  }
  console.log(newSlides)
=======
import { h } from 'vue'

function createLoop (vnode) {
  if (vnode.length === 0 || vnode === null || vnode === undefined) return
  const slides = vnode.map((child, index) => {
    if (!child.props) child.props = {}
    child.props['data-index'] = index
    return child
  })
  const prechild = h(slides[slides.length - 1].type, { ...slides[slides.length - 1].props }, slides[slides.length - 1].children)
  const nextchild = h(slides[0].type, { ...slides[0].props }, slides[0].children)
  return [prechild, ...slides, nextchild]
>>>>>>> c5847a2cfa606ae032086310eb5b09b8f85d3c16
}

export { createLoop }
