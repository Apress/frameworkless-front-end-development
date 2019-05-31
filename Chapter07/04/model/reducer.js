const addItem = (state, event) => {
  const text = event.payload
  if (!text) {
    return state
  }

  return {
    ...state,
    todos: [...state.todos, {
      text,
      completed: false
    }]
  }
}

const updateItem = (state, event) => {
  const { text, index } = event.payload
  if (!text) {
    return state
  }

  if (index < 0) {
    return state
  }

  if (!state.todos[index]) {
    return state
  }

  return {
    ...state,
    todos: state.todos.map((todo, i) => {
      if (i === index) {
        todo.text = text
      }
      return todo
    })
  }
}

const deleteItem = (state, event) => {
  const index = event.payload
  if (index < 0) {
    return state
  }

  if (!state.todos[index]) {
    return state
  }

  return {
    ...state,
    todos: state.todos.filter((todo, i) => i !== index)
  }
}

const toggleItemCompleted = (state, event) => {
  const index = event.payload

  if (index < 0) {
    return state
  }

  if (!state.todos[index]) {
    return state
  }

  return {
    ...state,
    todos: state.todos.map((todo, i) => {
      if (i === index) {
        todo.completed = !todo.completed
      }
      return todo
    })
  }
}

const completeAll = (state, event) => {
  return {
    ...state,
    todos: state.todos.map((todo, i) => {
      todo.completed = true
      return todo
    })
  }
}

const clearCompleted = (state, event) => {
  return {
    ...state,
    todos: state.todos.filter(t => !t.completed)
  }
}

const changeFilter = (state, event) => {
  return {
    ...state,
    currentFilter: event.payload
  }
}

const methods = {
  ITEM_ADDED: addItem,
  ITEM_UPDATED: updateItem,
  ITEM_DELETED: deleteItem,
  ITEMS_COMPLETED_TOGGLED: toggleItemCompleted,
  ITEMS_MARKED_AS_COMPLETED: completeAll,
  COMPLETED_ITEM_DELETED: clearCompleted,
  FILTER_CHANGED: changeFilter
}

export default (prevState, event) => {
  const currentModifier = methods[event.type]

  if (!currentModifier) {
    return prevState
  }

  return currentModifier(prevState, event)
}
