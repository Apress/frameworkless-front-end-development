const cloneDeep = x => {
  return JSON.parse(JSON.stringify(x))
}

const freeze = x => Object.freeze(cloneDeep(x))

const INITIAL_STATE = {
  todos: [],
  currentFilter: 'All'
}

export default (initalState = INITIAL_STATE) => {
  const state = cloneDeep(initalState)
  let listeners = []

  const addChangeListener = listener => {
    listeners.push(listener)

    listener(freeze(state))

    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  const invokeListeners = () => {
    const data = freeze(state)
    listeners.forEach(l => l(data))
  }

  const addItem = text => {
    if (!text) {
      return
    }

    state.todos.push({
      text,
      completed: false
    })

    invokeListeners()
  }

  const updateItem = (index, text) => {
    if (!text) {
      return
    }

    if (index < 0) {
      return
    }

    if (!state.todos[index]) {
      return
    }

    state.todos[index].text = text

    invokeListeners()
  }

  const deleteItem = index => {
    if (index < 0) {
      return
    }

    if (!state.todos[index]) {
      return
    }

    state.todos.splice(index, 1)

    invokeListeners()
  }

  const toggleItemCompleted = index => {
    if (index < 0) {
      return
    }

    if (!state.todos[index]) {
      return
    }

    state.todos[index].completed = !state.todos[index].completed

    invokeListeners()
  }

  const completeAll = () => {
    state.todos.forEach(t => {
      t.completed = true
    })

    invokeListeners()
  }

  const clearCompleted = () => {
    state.todos = state.todos.filter(t => !t.completed)
    invokeListeners()
  }

  const changeFilter = filter => {
    state.currentFilter = filter
    invokeListeners()
  }

  return {
    addItem,
    updateItem,
    deleteItem,
    toggleItemCompleted,
    completeAll,
    clearCompleted,
    changeFilter,
    addChangeListener
  }
}
