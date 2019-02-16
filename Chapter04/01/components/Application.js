import { EVENTS } from './List.js'

export default class App extends HTMLElement {
  constructor () {
    super()
    this.state = {
      todos: [],
      filter: 'All'
    }

    this.template = document
      .getElementById('todo-app')
  }

  deleteItem (index) {
    this.state.todos.splice(index, 1)
    this.syncAttributes()
  }

  addItem (text) {
    this.state.todos.push({
      text,
      completed: false
    })
    this.syncAttributes()
  }

  syncAttributes () {
    this.list.todos = this.state.todos
    this.footer.todos = this.state.todos
    this.footer.filter = this.state.filter
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
        EVENTS.DELETE_ITEM,
        e => {
          this.deleteItem(e.detail.index)
        }
      )

      this.syncAttributes()
    })
  }
}
