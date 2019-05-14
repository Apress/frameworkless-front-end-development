import todosView from './view/todos.js'
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import appView from './view/app.js'
import applyDiff from './applyDiff.js'

import registry from './registry.js'

registry.add('app', appView)
registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

const state = {
  todos: [],
  currentFilter: 'All'
}

const events = {
  addItem: text => {
    state.todos.push({
      text,
      completed: false
    })
    render()
  },
  updateItem: (index, text) => {
    state.todos[index].text = text
    render()
  },
  deleteItem: (index) => {
    state.todos.splice(index, 1)
    render()
  },
  toggleItemCompleted: (index) => {
    const {
      completed
    } = state.todos[index]
    state.todos[index].completed = !completed
    render()
  },
  completeAll: () => {
    state.todos.forEach(t => {
      t.completed = true
    })
    render()
  },
  clearCompleted: () => {
    state.todos = state.todos.filter(
      t => !t.completed
    )
    render()
  },
  changeFilter: filter => {
    state.currentFilter = filter
    render()
  }
}

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root')

    const newMain = registry.renderRoot(
      main,
      state,
      events)

    applyDiff(document.body, main, newMain)
  })
}

render()
