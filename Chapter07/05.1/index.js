import Application from './components/Application.js'
import Footer from './components/Footer.js'
import List from './components/List.js'

import observableFactory from './model/observable.js'
import actionsFactory from './model/actions.js'

const INITIAL_STATE = {
  todos: [],
  currentFilter: 'All'
}

const observableState = observableFactory(INITIAL_STATE)
const actions = actionsFactory(observableState)

window.applicationContext = Object.freeze({
  observableState,
  actions
})

window.customElements.define('todomvc-app', Application)
window.customElements.define('todomvc-footer', Footer)
window.customElements.define('todomvc-list', List)
