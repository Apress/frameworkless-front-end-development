import actionCreators from '../model/actionCreators.js'

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

const addEvents = (targetElement, dispatch) => {
  targetElement
    .querySelector('.new-todo')
    .addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        dispatch(actionCreators.addItem(e.target.value))
        e.target.value = ''
      }
    })

  targetElement
    .querySelector('input.toggle-all')
    .addEventListener('click', () => {
      dispatch(actionCreators.completeAll())
    })

  targetElement
    .querySelector('.clear-completed')
    .addEventListener('click', () => {
      dispatch(actionCreators.clearCompleted())
    })
}

export default (targetElement, state, dispatch) => {
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

  addEvents(newApp, dispatch)

  return newApp
}
