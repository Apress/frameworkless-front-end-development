import todosView from './view/todos.js'
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import appView from './view/app.js'
import applyDiff from './applyDiff.js'

import registry from './registry.js'

import modelFactory from './model/model.js'

registry.add('app', appView)
registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

const model = modelFactory()

const events = {
  addItem: text => {
    model.addItem(text)
    render(model.getState())
  },
  updateItem: (index, text) => {
    model.updateItem(index, text)
    render(model.getState())
  },
  deleteItem: (index) => {
    model.deleteItem(index)
    render(model.getState())
  },
  toggleItemCompleted: (index) => {
    model.toggleItemCompleted(index)
    render(model.getState())
  },
  completeAll: () => {
    model.completeAll()
    render(model.getState())
  },
  clearCompleted: () => {
    model.clearCompleted()
    render(model.getState())
  },
  changeFilter: filter => {
    model.changeFilter(filter)
    render(model.getState())
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

render(model.getState())
