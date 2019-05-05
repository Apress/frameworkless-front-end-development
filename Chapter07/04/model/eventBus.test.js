import eventBusFactory from './eventBus'
let eventBus

const counterModifiers = (state, event) => {
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
    eventBus = eventBusFactory(counterModifiers)
  })

  test('subscribers should be invoked when a modifiers catch the event', () => {
    let counter = 0

    eventBus.subscribe(() => counter++)

    eventBus.dispatch('COUNTER')

    expect(counter).toBe(1)
  })

  test('subscribers should not be invoked when a modifiers does not catch the event', () => {
    let counter = 0

    eventBus.subscribe(() => counter++)

    eventBus.dispatch('NOT_COUNTER')

    expect(counter).toBe(0)
  })

  test('subscribers should receive an immutable state', () => {
    eventBus.dispatch('COUNTER')
    eventBus.subscribe((state) => {
      expect(() => {
        state.counter = 0
      }).toThrow()
    })
  })

  test('should throw error in a modifiers does not return a state', () => {
    const eventBus = eventBusFactory(() => {
      return undefined
    })

    expect(() => {
      eventBus.dispatch('EVENT')
    }).toThrow()
  })
})
