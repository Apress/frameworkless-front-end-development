import observableFactory from './observableFactory.js'

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
    observable.aDummySetter('Solid Snake')
    expect(counter).toBe(2)
  })

  test('listeners should be removed when unsubscribing', () => {
    let counter = 0
    const unsubscribe = observable.addChangeListener(data => {
      counter++
    })
    unsubscribe()
    observable.aDummySetter('Solid Snake')
    expect(counter).toBe(1)
  })

  test('state should be immutable', () => {
    observable.aDummySetter({
      name: 'Solid Snake'
    })
    observable.addChangeListener(data => {
      expect(() => {
        data.name = 'Liquid Snake'
      }).toThrow()
    })
  })
})
