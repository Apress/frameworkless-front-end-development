import stateFactory from './state.js'

describe('external state', () => {
  test('data should be immutable', () => {
    const state = stateFactory()

    expect(() => {
      state.get().currentFilter = 'WRONG'
    }).toThrow()
  })

  test('should add an item', () => {
    const state = stateFactory()

    state.addItem('dummy')

    const { todos } = state.get()

    expect(todos.length).toBe(1)
    expect(todos[0]).toEqual({
      text: 'dummy',
      completed: false
    })
  })

  test('should not add an item when a falsy text is provided', () => {
    const state = stateFactory()

    state.addItem('')
    state.addItem(undefined)
    state.addItem(0)
    state.addItem()
    state.addItem(false)

    const { todos } = state.get()

    expect(todos.length).toBe(0)
  })

  test('should update an item', () => {
    const state = stateFactory({
      todos: [{
        text: 'dummy',
        completed: false
      }]
    })

    state.updateItem(0, 'new-dummy')

    const { todos } = state.get()

    expect(todos[0].text).toBe('new-dummy')
  })

  test('should not update an item when an invalid index is provided', () => {
    const state = stateFactory({
      todos: [{
        text: 'dummy',
        completed: false
      }]
    })

    state.updateItem(1, 'new-dummy')

    const { todos } = state.get()

    expect(todos[0].text).toBe('dummy')
  })
})
