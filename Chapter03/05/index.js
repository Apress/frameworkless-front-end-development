import getTodos from './getTodos.js'
import todosView from './view/todos.js'
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import applyDiff from './applyDiff.js'

import registry from './registry.js'

registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

const FILTERS = [
  'All',
  'Active',
  'Completed'
]

const state = {
  todos: getTodos(),
  currentFilter: 'All'
}

const events = {
  deleteItem: (index) => {
    state.todos.splice(index, 1)
    render()
  },
  changeFilter: (filter) => {
    state.currentFilter = filter
    render()
  }
}

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp')
    const newMain = registry.renderRoot(main, state, events)
    applyDiff(document.body, main, newMain)
  })
}

render()
