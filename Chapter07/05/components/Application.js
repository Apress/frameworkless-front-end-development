import { EVENTS } from './List.js'

import observableFactory from '../model/observable.js'
import actionsFactory from '../model/actions.js'

const INITIAL_STATE = {
  todos: [],
  currentFilter: 'All'
}

export default class App extends HTMLElement {
  constructor () {
    super()

    this.observableState = observableFactory(INITIAL_STATE)
    this.actions = actionsFactory(this.observableState)

    this.template = document
      .getElementById('todo-app')
  }

  deleteItem (index) {
    this
      .actions
      .deleteItem(index)
  }

  addItem (text) {
    this
      .actions
      .addItem(text)
  }

  syncAttributes (state) {
    const { todos, currentFilter } = state
    this.list.todos = todos
    this.footer.todos = todos
    this.footer.filter = currentFilter
  }

  connectedCallback () {
    window.requestAnimationFrame(() => {
      const content = this.template
        .content
        .firstElementChild
        .cloneNode(true)

      this.appendChild(content)

      this
        .querySelector('.new-todo')
        .addEventListener('keypress', e => {
          if (e.key === 'Enter') {
            this.addItem(e.target.value)
            e.target.value = ''
          }
        })

      this.footer = this
        .querySelector('todomvc-footer')

      this.list = this.querySelector('todomvc-list')
      this.list.addEventListener(
        EVENTS.ITEM_DELETED,
        e => {
          this.deleteItem(e.detail.index)
        }
      )

      this
        .observableState
        .addChangeListener(state => {
          this.syncAttributes(state)
        })
    })
  }
}
