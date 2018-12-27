let template

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById('todo-item')
  }

  return template.content.firstElementChild.cloneNode(true)
}

const getTodoElement = (todo, index, deleteItem) => {
  const {
    text,
    completed
  } = todo

  const element = createNewTodoNode()

  element.querySelector('input.edit').value = text
  element.querySelector('label').textContent = text

  if (completed) {
    element.classList.add('completed')
    element.querySelector('input.toggle').checked = true
  }

  // Events
  element
    .querySelector('button.destroy')
    .addEventListener('click', e => deleteItem(index, e))

  return element
}

const filterTodos = (todos, currentFilter) => {
  if(!currentFilter || currentFilter === 'All') {
    return todos
  }

  if(currentFilter === 'Active') {
    return todos.filter(t => !t.completed)
  }else{
    return todos.filter(t => t.completed)
  }
}

export default (targetElement, state, events) => {
  const { todos, currentFilter } = state

  const newTodoList = targetElement.cloneNode(true)
  newTodoList.innerHTML = ''

  const todosToRender = filterTodos(todos, currentFilter)

  todosToRender
    .map((t, i) => getTodoElement(t, i, events.deleteItem))
    .forEach(element => {
      newTodoList.appendChild(element)
    })

  return newTodoList
}
