import observableFactory from './observable.js'

const INITIAL_STATE = {
  todos: [],
  currentFilter: 'All'
}

export default (initialState = INITIAL_STATE) => {
  const state = observableFactory(initialState)

  const addItem = text => {
    if (!text) {
      return
    }

    state.todos = [...state.todos, {
      text,
      completed: false
    }]
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

    state.todos = state.todos.map((todo, i) => {
      if (i === index) {
        todo.text = text
      }
      return todo
    })
  }

  const deleteItem = index => {
    if (index < 0) {
      return
    }

    if (!state.todos[index]) {
      return
    }

    state.todos = state.todos.filter((todo, i) => i !== index)
  }

  const toggleItemCompleted = index => {
    if (index < 0) {
      return
    }

    if (!state.todos[index]) {
      return
    }

    state.todos = state.todos.map((todo, i) => {
      if (i === index) {
        todo.completed = !todo.completed
      }
      return todo
    })
  }

  const completeAll = () => {
    state.todos = state.todos.map((todo, i) => {
      todo.completed = true
      return todo
    })
  }

  const clearCompleted = () => {
    state.todos = state.todos.filter(t => !t.completed)
  }

  const changeFilter = filter => {
    state.currentFilter = filter
  }

  return {
    addChangeListener: state.addChangeListener,
    addItem,
    updateItem,
    deleteItem,
    toggleItemCompleted,
    completeAll,
    clearCompleted,
    changeFilter
  }
}
