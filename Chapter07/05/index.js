import todosView from './view/todos.js'
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import appView from './view/app.js'
import applyDiff from './applyDiff.js'

import registry from './registry.js'

import todosReducer from './model/todos.js'
import filterReducer from './model/filter.js'

registry.add('app', appView)
registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

const INITIAL_STATE = {
  todos: [],
  currentFilter: 'All'
}

const {
  createStore,
  combineReducers
} = Redux

const reducer = combineReducers({
  todos: todosReducer,
  currentFilter: filterReducer
})

const store = createStore(reducer, INITIAL_STATE)

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root')

    const newMain = registry.renderRoot(
      main,
      store.getState(),
      store.dispatch)

    applyDiff(document.body, main, newMain)
  })
}

store.subscribe(render)

render()
