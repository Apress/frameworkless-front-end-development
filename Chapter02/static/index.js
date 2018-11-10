import getTodos from './getTodos.js'
import render from './render.js'

window.requestAnimationFrame(() => {
  const todos = getTodos()
  const list = document.querySelector('.todo-list')
  list.innerHTML = render(todos)
})
