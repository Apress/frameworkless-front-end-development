const addItem = (state, action) => {
  const text = action.payload
  if (!text) {
    return state
  }

  return [...state, {
    text,
    completed: false
  }]
}

const updateItem = (state, action) => {
  const { text, index } = action.payload
  if (!text) {
    return state
  }

  if (index < 0) {
    return state
  }

  if (!state[index]) {
    return state
  }

  return state.map((todo, i) => {
    if (i === index) {
      todo.text = text
    }
    return todo
  })
}

const deleteItem = (state, action) => {
  const index = action.payload
  if (index < 0) {
    return state
  }

  if (!state[index]) {
    return state
  }

  return state.filter((todo, i) => i !== index)
}

const toggleItemCompleted = (state, action) => {
  const index = action.payload

  if (index < 0) {
    return state
  }

  if (!state[index]) {
    return state
  }

  return state.map((todo, i) => {
    if (i === index) {
      todo.completed = !todo.completed
    }
    return todo
  })
}

const completeAll = (state, action) => {
  return state.map((todo, i) => {
    todo.completed = true
    return todo
  })
}

const clearCompleted = (state, action) => {
  return state.filter(t => !t.completed)
}

const modifiers = {
  ADD_ITEM: addItem,
  UPDATE_ITEM: updateItem,
  DELETE_ITEM: deleteItem,
  TOGGLE_COMPLETED: toggleItemCompleted,
  COMPLETE_ALL: completeAll,
  CLEAR_COMPLETED: clearCompleted
}

export default (prevState, action) => {
  if (!prevState) {
    return []
  }

  const currentModifier = modifiers[action.type]

  if (!currentModifier) {
    return prevState
  }

  return currentModifier(prevState, action)
}
