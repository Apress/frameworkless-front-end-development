const getTodoElement = todo => {
  const { text } = todo
  return `<li>
              <div class="view">
                  <input class="toggle" type="checkbox">
                  <label>${text}</label>
                  <button class="destroy"></button>
              </div>
              <input class="edit" value="${text}">
          </li>`
}

const getTodoCount = todos => {
  const { length } = todos
  if (length === 1) {
    return '1 Item left'
  }

  return `${length} Items left`
}

export default (base, state) => {
  const {
    filter,
    todos
  } = state

  const element = base.cloneNode(true)

  const list = element.querySelector('.todo-list')
  const counter = element.querySelector('.todo-count')
  const filters = element.querySelector('.filters')

  list.innerHTML = todos.map(getTodoElement).join('')
  counter.innerText = getTodoCount(todos)

  Array
    .from(filters.querySelectorAll('li a'))
    .forEach(a => {
      if (a.innerText === filter) {
        a.classList.add('selected')
      } else {
        a.classList.remove('selected')
      }
    })

  return element
}
