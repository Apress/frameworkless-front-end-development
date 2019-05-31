import eventBusFactory from './eventBus'
let eventBus

const counterModel = (state, event) => {
  if (!event) {
    return {
      counter: 0
    }
  }

  if (event.type !== 'COUNTER') {
    return state
  }

  return {
    counter: state.counter++
  }
}

describe('eventBus', () => {
  beforeEach(() => {
    eventBus = eventBusFactory(counterModel)
  })

  test('subscribers should be invoked when the model catch the event', () => {
    let counter = 0

    eventBus.subscribe(() => counter++)

    eventBus.dispatch({ type: 'COUNTER' })

    expect(counter).toBe(1)
  })

  test('subscribers should not be invoked when the model does not catch the event', () => {
    let counter = 0

    eventBus.subscribe(() => counter++)

    eventBus.dispatch({ type: 'NOT_COUNTER' })

    expect(counter).toBe(0)
  })

  test('subscribers should receive an immutable state', () => {
    eventBus.dispatch({ type: 'COUNTER' })
    eventBus.subscribe((state) => {
      expect(() => {
        state.counter = 0
      }).toThrow()
    })
  })

  test('should throw error in the model does not return a state', () => {
    const eventBus = eventBusFactory(() => {
      return undefined
    })

    expect(() => {
      eventBus.dispatch({ type: 'EVENT' })
    }).toThrow()
  })
})
