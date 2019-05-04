import eventTypes from '../model/eventTypes.js'

let template

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById('todo-item')
  }

  return template
    .content
    .firstElementChild
    .cloneNode(true)
}

const attachEventsToTodoElement = (element, index, dispatch) => {
  const deleteHandler = e => dispatch(eventTypes.DELETE_ITEM, index)
  const toggleHandler = e => dispatch(eventTypes.TOGGLE_COMPLETED, index)
  const updateHandler = e => {
    if (e.key === 'Enter') {
      element.classList.remove('editing')

      const payload = {
        index,
        text: e.target.value
      }

      dispatch(eventTypes.UPDATE_ITEM, payload)
    }
  }

  element
    .querySelector('button.destroy')
    .addEventListener('click', deleteHandler)

  element
    .querySelector('input.toggle')
    .addEventListener('click', toggleHandler)

  element
    .addEventListener('dblclick', () => {
      element.classList.add('editing')
      element
        .querySelector('input.edit').focus()
    })

  element
    .querySelector('input.edit')
    .addEventListener('keypress', updateHandler)
}

const getTodoElement = (todo, index, dispatch) => {
  const {
    text,
    completed
  } = todo

  const element = createNewTodoNode()

  element.querySelector('input.edit').value = text
  element.querySelector('label').textContent = text

  if (completed) {
    element.classList.add('completed')
    element
      .querySelector('input.toggle')
      .checked = true
  }

  attachEventsToTodoElement(element, index, dispatch)

  return element
}

const filterTodos = (todos, filter) => {
  const isCompleted = todo => todo.completed
  if (filter === 'Active') {
    return todos.filter(t => !isCompleted(t))
  }

  if (filter === 'Completed') {
    return todos.filter(isCompleted)
  }

  return [...todos]
}

export default (targetElement, state, dispatch) => {
  const { todos, currentFilter } = state
  const newTodoList = targetElement.cloneNode(true)

  newTodoList.innerHTML = ''

  const filteredTodos = filterTodos(todos, currentFilter)

  filteredTodos
    .map((todo, index) => getTodoElement(todo, index, dispatch))
    .forEach(element => {
      newTodoList.appendChild(element)
    })

  return newTodoList
}
