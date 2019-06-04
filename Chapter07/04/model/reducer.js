const addItem = (state, action) => {
  const text = action.payload
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

const updateItem = (state, action) => {
  const { text, index } = action.payload
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

const deleteItem = (state, action) => {
  const index = action.payload
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

const toggleItemCompleted = (state, action) => {
  const index = action.payload

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

const completeAll = (state, action) => {
  return {
    ...state,
    todos: state.todos.map((todo, i) => {
      todo.completed = true
      return todo
    })
  }
}

const clearCompleted = (state, action) => {
  return {
    ...state,
    todos: state.todos.filter(t => !t.completed)
  }
}

const changeFilter = (state, action) => {
  return {
    ...state,
    currentFilter: action.payload
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

export default (prevState, action) => {
  const currentModifier = methods[action.type]

  if (!currentModifier) {
    return prevState
  }

  return currentModifier(prevState, action)
}
