import todosView from './view/todos.js'
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import appView from './view/app.js'
import applyDiff from './applyDiff.js'

import registry from './registry.js'

import stateFactory from './model/state.js'

registry.add('app', appView)
registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

const state = stateFactory()

const events = {
  addItem: text => {
    state.addItem(text)
    render(state.get())
  },
  updateItem: (index, text) => {
    state.updateItem(index, text)
    render(state.get())
  },
  deleteItem: (index) => {
    state.deleteItem(index)
    render(state.get())
  },
  toggleItemCompleted: (index) => {
    state.toggleItemCompleted(index)
    render(state.get())
  },
  completeAll: () => {
    state.completeAll()
    render(state.get())
  },
  clearCompleted: () => {
    state.clearCompleted()
    render(state.get())
  },
  changeFilter: filter => {
    state.changeFilter(filter)
    render(state.get())
  }
}

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root')

    const newMain = registry.renderRoot(
      main,
      state,
      events)

    applyDiff(document.body, main, newMain)
  })
}

render(state.get())
