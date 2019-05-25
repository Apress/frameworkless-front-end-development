import observableFactory from './observable.js'

let observable

describe('observable factory with proxy', () => {
  beforeEach(() => {
    observable = observableFactory({
      property: 'value'
    })
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
    observable.property = 'another value'
    expect(counter).toBe(2)
  })

  test('listeners should be removed when unsubscribing', () => {
    let counter = 0
    const unsubscribe = observable.addChangeListener(data => {
      counter++
    })
    unsubscribe()
    observable.property = 'another value'
    expect(counter).toBe(1)
  })

  test('in listeners state should be immutable', () => {
    observable.addChangeListener(data => {
      expect(() => {
        data.property = 'another value'
      }).toThrow()
    })
  })
})
