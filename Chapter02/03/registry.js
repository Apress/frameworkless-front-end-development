const registry = {}

const renderDecorator = component => (targetElement, state) => {
  const element = component(targetElement, state)

  Array
    .from(element.querySelectorAll('[data-component]'))
    .forEach(target => {
      const componentName = target.dataset.component
      const component = registry[componentName]
      if (!component) {
        return
      }

      target.replaceWith(component(target, state))
    })

  return element
}

const add = (name, component) => {
  registry[name] = renderDecorator(component)
}

export default {
  add,
  render: (root, state) => {
    const newRoot = renderDecorator(root => root.cloneNode(true))(root, state)
    root.replaceWith(newRoot)
  }
}
