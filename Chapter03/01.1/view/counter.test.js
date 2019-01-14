import counterView from './counter.js'

let targetElement

describe('counterView', () => {
  beforeEach(() => {
    targetElement = document.createElement('div')
  })

  test('should put the number of not completed todo in a new DOM elements', () => {
    const newCounter = counterView(targetElement, {
      todos: [
        {
          text: 'First',
          completed: true
        },
        {
          text: 'Second',
          completed: false
        },
        {
          text: 'Third',
          completed: false
        }
      ]
    })
    expect(newCounter.textContent).toBe('2 Items left')
  })

  test('should consider the singular form when only one item is left', () => {
    const newCounter = counterView(targetElement, {
      todos: [
        {
          text: 'First',
          completed: true
        },
        {
          text: 'Third',
          completed: false
        }
      ]
    })
    expect(newCounter.textContent).toBe('1 Item left')
  })
})
