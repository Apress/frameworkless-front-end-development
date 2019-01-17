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

const getTodoElement = todo => {
  const {
    text,
    completed
  } = todo

  const element = createNewTodoNode()

  element.querySelector('input.edit').value = text
  element.querySelector('label').textContent = text

  if (completed) {
    element
      .classList
      .add('completed')

    element
      .querySelector('input.toggle')
      .checked = true
  }

  return element
}

export default (targetElement, { todos }) => {
  const newTodoList = targetElement.cloneNode(true)

  newTodoList.innerHTML = ''

  todos
    .map(getTodoElement)
    .forEach(element => {
      newTodoList.appendChild(element)
    })

  return newTodoList
}
