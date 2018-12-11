const registry = {}

const renderWrapper = component => {
  return (targetElement, state) => {
    const element = component(targetElement, state)

    const childComponents = element
      .querySelectorAll('[data-component]')

    Array
      .from(childComponents)
      .forEach(target => {
        const name = target
          .dataset
          .component

        const child = registry[name]
        if (!child) {
          return
        }

        target.replaceWith(child(target, state))
      })

    return element
  }
}

const add = (name, component) => {
  registry[name] = renderWrapper(component)
}

const boot = (root, state) => {
  const cloneComponent = root => {
    return root.cloneNode(true)
  }
  const newRoot = renderWrapper(cloneComponent)(root, state)
  root.replaceWith(newRoot)
}

export default {
  add,
  boot
}
