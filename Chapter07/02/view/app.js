let template

const allTodosCompleted = todos => {
  if (todos.length === 0) {
    return false
  }
  return !todos.find(t => !t.completed)
}

const noCompletedItemIsPresent = todos => !todos.find(t => t.completed)

const getTemplate = () => {
  if (!template) {
    template = document.getElementById('todo-app')
  }

  return template
    .content
    .firstElementChild
    .cloneNode(true)
}

const addEvents = (targetElement, events) => {
  const { clearCompleted, completeAll, addItem } = events

  targetElement
    .querySelector('.new-todo')
    .addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        addItem(e.target.value)
        e.target.value = ''
      }
    })

  targetElement
    .querySelector('input.toggle-all')
    .addEventListener('click', completeAll)

  targetElement
    .querySelector('.clear-completed')
    .addEventListener('click', clearCompleted)
}

export default (targetElement, state, events) => {
  const newApp = targetElement.cloneNode(true)

  newApp.innerHTML = ''
  newApp.appendChild(getTemplate())

  if (noCompletedItemIsPresent(state.todos)) {
    newApp
      .querySelector('.clear-completed')
      .classList
      .add('hidden')
  } else {
    newApp
      .querySelector('.clear-completed')
      .classList
      .remove('hidden')
  }

  newApp
    .querySelector('input.toggle-all')
    .checked = allTodosCompleted(state.todos)

  addEvents(newApp, events)

  return newApp
}
