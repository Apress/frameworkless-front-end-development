import eventCreators from '../model/eventCreators.js'

let template

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
        const event = eventCreators
          .addItem(e.target.value)
        dispatch(event)
        e.target.value = ''
      }
    })
}

export default (targetElement, state, dispatch) => {
  const newApp = targetElement.cloneNode(true)

  newApp.innerHTML = ''
  newApp.appendChild(getTemplate())

  addEvents(newApp, dispatch)

  return newApp
}
