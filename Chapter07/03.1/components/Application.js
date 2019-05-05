export default class App extends HTMLElement {
  constructor () {
    super()

    this.template = document
      .getElementById('todo-app')
  }

  deleteItem (index) {
    window
      .applicationContext
      .actions
      .deleteItem(index)
  }

  addItem (text) {
    window
      .applicationContext
      .actions
      .addItem(text)
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
    })
  }
}
