function createLoop (slides) {
  if (slides === undefined) return
  console.log(slides[0].children)
  const newSlides = {
    children: slides[0].children
  }
  console.log(newSlides)
}

export { createLoop }
