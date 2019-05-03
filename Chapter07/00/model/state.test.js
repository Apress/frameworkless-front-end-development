import stateFactory from './state.js'

let state

describe('stateFactory', () => {
  beforeEach(() => {
    state = stateFactory()
  })

  test('should work', () => {
    state.addItem('dummy')

    const { todos } = state.get()

    expect(todos.length).toBe(1)
    expect(todos[0]).toEqual({
      text: 'dummy',
      completed: false
    })
  })
})
