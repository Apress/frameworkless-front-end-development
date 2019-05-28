const cloneDeep = x => {
  return JSON.parse(JSON.stringify(x))
}

const freeze = state => Object.freeze(cloneDeep(state))

export default (model) => {
  let listeners = []
  let state = model()

  const subscribe = listener => {
    listeners.push(listener)

    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  const invokeSubscribers = () => {
    const data = freeze(state)
    listeners.forEach(l => l(data))
  }

  const dispatch = event => {
    const newState = model(state, event)

    if (!newState) {
      throw new Error('modifiers should always return a value')
    }

    if (newState === state) {
      return
    }

    state = newState

    invokeSubscribers()
  }
  return {
    subscribe,
    dispatch,
    getState: () => freeze(state)
  }
}
