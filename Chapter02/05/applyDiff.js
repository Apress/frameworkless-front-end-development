const isNodeChanged = (node1, node2) => {
  if (node1.attributes.length !== node2.attributes.length) {
    return true
  }

  const differentAttribute = Array.from(node1.attributes).find(attributeName => {
    return node1.getAttribute(attributeName) !== node2.getAttribute(attributeName)
  })

  if (differentAttribute) {
    return true
  }

  if (node1.children.length === 0 && node2.children.length === 0 && node1.textContent !== node2.textContent) {
    return true
  }

  return false
}

const applyDiff = (parentNode, oldNode, newNode) => {
  if (!oldNode && newNode) {
    console.log('Adding', newNode)
    parentNode.appendChild(newNode)
    return
  }

  if (oldNode && !newNode) {
    console.log('Removing', oldNode)
    oldNode.remove()
    return
  }

  if (isNodeChanged(newNode, oldNode)) {
    console.log('Replacing', newNode)
    oldNode.replaceWith(newNode)
    return
  }

  const oldChildren = Array.from(oldNode.children)
  const newChildren = Array.from(newNode.children)

  const max = Math.max(oldChildren.length, newChildren.length)
  for (let i = 0; i < max; i++) {
    applyDiff(
      oldNode,
      oldChildren[i],
      newChildren[i]
    )
  }
}

export default applyDiff
