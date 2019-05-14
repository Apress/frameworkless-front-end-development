const EVENT_TYPES = Object.freeze({
  ADD_ITEM: 'ADD_ITEM',
  UPDATE_ITEM: 'UPDATE_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  TOGGLE_COMPLETED: 'TOGGLE_COMPLETED',
  COMPLETE_ALL: 'COMPLETE_ALL',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  CHANGE_FILTER: 'CHANGE_FILTER'
})

export default {
  addItem: text => ({
    type: EVENT_TYPES.ADD_ITEM,
    payload: text
  }),
  updateItem: (index, text) => ({
    type: EVENT_TYPES.UPDATE_ITEM,
    payload: {
      text,
      index
    }
  }),
  deleteItem: index => ({
    type: EVENT_TYPES.DELETE_ITEM,
    payload: index
  }),
  toggleItemCompleted: index => ({
    type: EVENT_TYPES.TOGGLE_COMPLETED,
    payload: index
  }),
  completeAll: () => ({
    type: EVENT_TYPES.COMPLETE_ALL
  }),
  clearCompleted: () => ({
    type: EVENT_TYPES.CLEAR_COMPLETED
  }),
  changeFilter: filter => ({
    type: EVENT_TYPES.CHANGE_FILTER,
    payload: filter
  })
}
