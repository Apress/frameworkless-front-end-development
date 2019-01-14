let template

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById('todo-app')
  }

  return template.content.firstElementChild.cloneNode(true)
}

export default (targetElement) => {
  const newApp = targetElement.cloneNode(true)
  newApp.innerHTML = ''
  newApp.appendChild(createNewTodoNode())
  return newApp
}
