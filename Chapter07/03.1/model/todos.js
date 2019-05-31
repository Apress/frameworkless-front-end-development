const addItem = (state, event) => {
  const text = event.payload
  if (!text) {
    return state
  }

  return [...state, {
    text,
    completed: false
  }]
}

const updateItem = (state, event) => {
  const { text, index } = event.payload
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

const deleteItem = (state, event) => {
  const index = event.payload
  if (index < 0) {
    return state
  }

  if (!state[index]) {
    return state
  }

  return state.filter((todo, i) => i !== index)
}

const toggleItemCompleted = (state, event) => {
  const index = event.payload

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

const completeAll = (state, event) => {
  return state.map((todo, i) => {
    todo.completed = true
    return todo
  })
}

const clearCompleted = (state, event) => {
  return state.filter(t => !t.completed)
}

const modifiers = {
  ITEM_ADDED: addItem,
  ITEM_UPDATED: updateItem,
  ITEM_DELETED: deleteItem,
  ITEMS_COMPLETED_TOGGLED: toggleItemCompleted,
  ITEMS_MARKED_AS_COMPLETED: completeAll,
  COMPLETED_ITEM_DELETED: clearCompleted
}

export default (prevState, event) => {
  if (!event) {
    return []
  }

  const currentModifier = modifiers[event.type]

  if (!currentModifier) {
    return prevState
  }

  return currentModifier(prevState, event)
}
