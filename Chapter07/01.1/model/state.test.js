import observableStateFactory from './state.js'
let state

describe('observable state', () => {
  beforeEach(() => {
    state = observableStateFactory()
  })

  test('listeners should be invoked immediatly', () => {
    let counter = 0
    state.addChangeListener(data => {
      counter++
    })
    expect(counter).toBe(1)
  })

  test('listeners should be invoked when changing data', () => {
    let counter = 0
    state.addChangeListener(data => {
      counter++
    })
    state.addItem('dummy')
    expect(counter).toBe(2)
  })

  test('listeners should be removed when unsubscribing', () => {
    let counter = 0
    const unsubscribe = state.addChangeListener(data => {
      counter++
    })
    unsubscribe()
    state.addItem('dummy')
    expect(counter).toBe(1)
  })

  test('state should be immutable', () => {
    state.addChangeListener(data => {
      expect(() => {
        data.currentFilter = 'WRONG'
      }).toThrow()
    })
  })
})
