const cloneDeep = x => {
  return JSON.parse(JSON.stringify(x))
}

const freeze = state => Object.freeze(cloneDeep(state))

export default (actions, getStateThunk) => {
  let listeners = []

  const addChangeListener = cb => {
    listeners.push(cb)
    cb(freeze(getStateThunk()))
    return () => {
      listeners = listeners.filter(element => element !== cb)
    }
  }

  const invokeListeners = () => {
    const data = freeze(getStateThunk())
    listeners.forEach(l => l(data))
  }

  const createProxyObject = target => {
    const proxy = {}

    Object.keys(target).forEach(methodName => {
      const value = target[methodName]
      if (typeof value === 'function') {
        proxy[methodName] = (...args) => {
          const value = target[methodName](...args)
          invokeListeners()
          return value
        }
        return
      }

      if (typeof value === 'object') {
        proxy[methodName] = createProxyObject(value)
      }
    })

    return proxy
  }

  const proxy = createProxyObject(actions)

  proxy.addChangeListener = addChangeListener

  return proxy
}
