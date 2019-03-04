import todos from './todos.js'

const printResult = (action, result) => {
  const time = (new Date()).toTimeString()
  const node = document.createElement('p')
  node.textContent = `${action.toUpperCase()}: ${JSON.stringify(result)} (${time})`

  document
    .querySelector('div')
    .appendChild(node)
}

const onListClick = async () => {
  const result = await todos.list()
  printResult('list todos', result)
}

const onAddClick = async () => {
  const result = await todos.create('A simple todo Element')
  printResult('add todo', result)
}

const onUpdateClick = async () => {
  const list = await todos.list()

  const { id } = list[0]
  const newTodo = {
    id,
    completed: true
  }

  const result = await todos.update(newTodo)
  printResult('update todo', result)
}

const onDeleteClick = async () => {
  const list = await todos.list()
  const { id } = list[0]

  const result = await todos.delete(id)
  printResult('delete todo', result)
}

document
  .querySelector('button[data-list]')
  .addEventListener('click', onListClick)

document
  .querySelector('button[data-add]')
  .addEventListener('click', onAddClick)

document
  .querySelector('button[data-update]')
  .addEventListener('click', onUpdateClick)

document
  .querySelector('button[data-delete]')
  .addEventListener('click', onDeleteClick)
