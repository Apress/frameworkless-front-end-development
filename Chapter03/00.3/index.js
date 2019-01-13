const button = document.querySelector('button')
const div = document.querySelector('div')

div.addEventListener('click', e => {
  console.log('Div Clicked')
}, true)

button.addEventListener('click', e => {
  console.log('Button Clicked')
}, true)