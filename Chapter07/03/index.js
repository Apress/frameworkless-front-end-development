import todosView from './view/todos.js'
import counterView from './view/counter.js'
import filtersView from './view/filters.js'
import appView from './view/app.js'
import applyDiff from './applyDiff.js'

import registry from './registry.js'

import eventBusFactory from './model/eventBus.js'
import modelFactory from './model/model.js'

registry.add('app', appView)
registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

const model = modelFactory()
const eventBus = eventBusFactory(model)

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector('#root')

    const newMain = registry.renderRoot(
      main,
      state,
      eventBus.dispatch)

    applyDiff(document.body, main, newMain)
  })
}

eventBus.subscribe(render)

render(eventBus.getState())
