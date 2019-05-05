const getTodoCount = todos => {
  const notCompleted = todos
    .filter(todo => !todo.completed)

  const { length } = notCompleted
  if (length === 1) {
    return '1 Item left'
  }

  return `${length} Items left`
}

export default class Footer extends HTMLElement {
  static get observedAttributes () {
    return [
      'filter',
      'todos'
    ]
  }

  get todos () {
    if (!this.hasAttribute('todos')) {
      return []
    }

    return JSON.parse(this.getAttribute('todos'))
  }

  set todos (value) {
    this.setAttribute('todos', JSON.stringify(value))
  }

  get filter () {
    return this.getAttribute('filter')
  }

  set filter (value) {
    this.setAttribute('filter', value)
  }

  updateContent () {
    const {
      filter,
      todos
    } = this

    this
      .querySelectorAll('li a')
      .forEach(a => {
        if (a.textContent === filter) {
          a.classList.add('selected')
        } else {
          a.classList.remove('selected')
        }
      })

    const label = getTodoCount(todos)

    this
      .querySelector('span.todo-count')
      .textContent = label
  }

  connectedCallback () {
    const template = document.getElementById('footer')
    const content = template
      .content
      .firstElementChild
      .cloneNode(true)

    this.appendChild(content)

    window
      .applicationContext
      .observableState
      .addChangeListener(state => {
        this.todos = state.todos
        this.filter = state.currentFilter
      })
  }

  attributeChangedCallback () {
    this.updateContent()
  }
}
