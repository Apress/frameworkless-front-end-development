const base = {
  foo: 'bar'
}

const handler = {
  get: (target, name) => {
    console.log(`Getting ${name}`)
    return target[name]
  },
  set: (target, name, value) => {
    console.log(`Setting ${name} to ${value}`)
    target[name] = value
    return true
  }
}

const proxy = new Proxy(base, handler)

proxy.foo = 'baz'
console.log(`Logging ${proxy.foo}`)
