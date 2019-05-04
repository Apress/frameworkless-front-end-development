import todosView from './view/todos.js'
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import appView from './view/app.js'
import applyDiff from './applyDiff.js'

import registry from './registry.js'

import observableFactory from './model/observable.js'
import actionsFactory from './model/actions.js'

const INITIAL_STATE = {
  todos: [],
  currentFilter: 'All'
}

registry.add('app', appView)
registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

const observableState = observableFactory(INITIAL_STATE)
const actions = actionsFactory(observableState)

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root')

    const newMain = registry.renderRoot(
      main,
      state,
      actions)

    applyDiff(document.body, main, newMain)
  })
}

observableState.addChangeListener(render)
