import todos from './todos.js'

const printResult = (action, result) => {
  const time = (new Date()).toTimeString()
  const node = document.createElement('p')
  node.textContent = `${action.toUpperCase()}: ${JSON.stringify(result)} (${time})`

  document
    .querySelector('div')
    .appendChild(node)
}

document
  .querySelector('button[data-list]')
  .addEventListener('click', () => {
    todos
      .list()
      .then(result => {
        printResult('list todos', result)
      })
  })

document
  .querySelector('button[data-add]')
  .addEventListener('click', () => {
    todos
      .create('A simple todo Element')
      .then(result => {
        printResult('add todo', result)
      })
  })

document
  .querySelector('button[data-update]')
  .addEventListener('click', () => {
    todos
      .list()
      .then(list => {
        const { id } = list[0]
        const newTodo = {
          id,
          completed: true
        }

        return todos
          .update(newTodo)
          .then(result => {
            printResult('update todo', result)
          })
      })
  })

document
  .querySelector('button[data-delete]')
  .addEventListener('click', () => {
    todos
      .list()
      .then(list => {
        const { id } = list[0]
        return todos
          .delete(id)
          .then(result => {
            printResult('delete todo', result)
          })
      })
  })
