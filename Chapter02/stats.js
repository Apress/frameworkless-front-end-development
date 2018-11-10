let panel

const create = () => {
  const div = document.createElement('div')

  div.style.position = 'fixed'
  div.style.left = '0px'
  div.style.top = '0px'
  div.style.width = '50px'
  div.style.height = '50px'
  div.style.backgroundColor = 'black'
  div.style.color = 'white'

  return div
}

let start = window.performance.now()
let frames = 0

const tick = () => {
  frames++
  const now = window.performance.now()
  if (now >= start + 1000) {
    panel.innerText = frames
    frames = 0
    start = now
  }
  window.requestAnimationFrame(tick)
}

const init = (parent = document.body) => {
  panel = create()

  window.requestAnimationFrame(() => {
    parent.appendChild(panel)
    tick()
  })
}

export default {
  init
}
