import modelFactory from './model.js'
let model

describe('observable model', () => {
  beforeEach(() => {
    model = modelFactory()
  })

  test('listeners should be invoked immediatly', () => {
    let counter = 0
    model.addChangeListener(data => {
      counter++
    })
    expect(counter).toBe(1)
  })

  test('listeners should be invoked when changing data', () => {
    let counter = 0
    model.addChangeListener(data => {
      counter++
    })
    model.addItem('dummy')
    expect(counter).toBe(2)
  })

  test('listeners should be removed when unsubscribing', () => {
    let counter = 0
    const unsubscribe = model.addChangeListener(data => {
      counter++
    })
    unsubscribe()
    model.addItem('dummy')
    expect(counter).toBe(1)
  })

  test('state should be immutable', () => {
    model.addChangeListener(data => {
      expect(() => {
        data.currentFilter = 'WRONG'
      }).toThrow()
    })
  })
})
