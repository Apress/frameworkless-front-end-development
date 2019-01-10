let button = document.querySelector('#property')
button.onclick = () => {
  console.log('Click managed using onclick property')
}

button = document.querySelector('#eventListener1')
button.addEventListener('click', () => {
  console.log('Click managed using addEventListener')
})

button = document.querySelector('#eventListener2')
button.addEventListener('click', () => {
  console.log('First handler')
})
button.addEventListener('click', () => {
  console.log('Second handler')
})

button = document.querySelector('#eventListener3')
const firstHandler = () => {
  console.log('First handler')
}

const secondHandler = () => {
  console.log('Second handler')
}

button.addEventListener('click', firstHandler)
button.addEventListener('click', secondHandler)

window.setTimeout(() => {
  const element = document.querySelector('#eventListener3')
  element.removeEventListener('click', firstHandler)
  element.removeEventListener('click', secondHandler)
  console.log('Removed Event Handlers')
}, 1000)

button = document.querySelector('#event')
button.addEventListener('click', e => {
  console.log('event', e)
})

