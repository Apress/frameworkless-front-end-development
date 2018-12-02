import getTodos from './getTodos.js'
import appView from './view/app.js'

const state = {
  todos: getTodos(),
  currentFilter: 'All'
}

const main = document.querySelector('.todoapp')

window.requestAnimationFrame(() => {
  const newMain = appView(main, state)
  main.replaceWith(newMain)
})
