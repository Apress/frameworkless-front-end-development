const getTodoElement = todo => {
  const {
    text,
    completed
  } = todo

  return `
      <li ${completed ? 'class="completed"' : ''}>
        <div class="view">
          <input 
            ${completed ? 'checked' : ''}
            class="toggle" 
            type="checkbox">
          <label>${text}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${text}">
      </li>`
}

export default (targetElement, { todos }) => {
  const newTodoList = targetElement.cloneNode(true)
  const todosElements = todos
    .map(getTodoElement)
    .join('')
  newTodoList.innerHTML = todosElements
  return newTodoList
}
