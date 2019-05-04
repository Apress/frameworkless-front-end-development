import observableFactory from './observable.js'

let observable
let state
const actions = {
  aDummySetter: data => {
    state = data
  }
}

describe('observable factory', () => {
  beforeEach(() => {
    state = {}
    observable = observableFactory(actions, () => state)
  })

  test('listeners should be invoked immediatly', () => {
    let counter = 0
    observable.addChangeListener(data => {
      counter++
    })
    expect(counter).toBe(1)
  })

  test('listeners should be invoked when changing data', () => {
    let counter = 0
    observable.addChangeListener(data => {
      counter++
    })
    observable.aDummySetter('Value')
    expect(counter).toBe(2)
  })

  test('listeners should be removed when unsubscribing', () => {
    let counter = 0
    const unsubscribe = observable.addChangeListener(data => {
      counter++
    })
    unsubscribe()
    observable.aDummySetter('Value')
    expect(counter).toBe(1)
  })

  test('in listeners state should be immutable', () => {
    observable.aDummySetter({
      name: 'Value'
    })
    observable.addChangeListener(data => {
      expect(() => {
        data.name = 'Another Value'
      }).toThrow()
    })
  })
})
