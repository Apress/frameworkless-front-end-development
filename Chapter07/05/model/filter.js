const changeFilter = (state, action) => {
  return action.payload
}

const modifiers = {
  CHANGE_FILTER: changeFilter
}

export default (prevState, action) => {
  if (!prevState) {
    return 'All'
  }

  const currentModifier = modifiers[action.type]

  if (!currentModifier) {
    return prevState
  }

  return currentModifier(prevState, action)
}
