const cloneDeep = x => {
  return JSON.parse(JSON.stringify(x))
}

const INITIAL_STATE = {
  todos: [],
  currentFilter: 'All'
}

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

const modifiers = {
  ADD_ITEM: addItem,
  UPDATE_ITEM: updateItem,
  DELETE_ITEM: deleteItem,
  TOGGLE_COMPLETED: toggleItemCompleted,
  COMPLETE_ALL: completeAll,
  CLEAR_COMPLETED: clearCompleted,
  CHANGE_FILTER: changeFilter
}

export default (initalState = INITIAL_STATE) => {
  return (prevState, event) => {
    if (!event) {
      return cloneDeep(initalState)
    }

    const currentModifier = modifiers[event.type]

    if (!currentModifier) {
      return prevState
    }

    return currentModifier(prevState, event)
  }
}
