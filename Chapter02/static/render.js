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

export default (parent, todos) => {
  const todosHtml = todos.map(getTodoElement).join('')
  parent.innerHTML = todosHtml
}
