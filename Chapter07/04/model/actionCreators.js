const ACTION_TYPES = Object.freeze({
  ITEM_ADDED: 'ITEM_ADDED',
  ITEM_UPDATED: 'ITEM_UPDATED',
  ITEM_DELETED: 'ITEM_DELETED',
  ITEMS_COMPLETED_TOGGLED: 'ITEMS_COMPLETED_TOGGLED',
  ITEMS_MARKED_AS_COMPLETED: 'ITEMS_MARKED_AS_COMPLETED',
  COMPLETED_ITEM_DELETED: 'COMPLETED_ITEM_DELETED',
  FILTER_CHANGED: 'FILTER_CHANGED'
})

export default {
  addItem: text => ({
    type: ACTION_TYPES.ITEM_ADDED,
    payload: text
  }),
  updateItem: (index, text) => ({
    type: ACTION_TYPES.ITEM_UPDATED,
    payload: {
      text,
      index
    }
  }),
  deleteItem: index => ({
    type: ACTION_TYPES.ITEM_DELETED,
    payload: index
  }),
  toggleItemCompleted: index => ({
    type: ACTION_TYPES.ITEMS_COMPLETED_TOGGLED,
    payload: index
  }),
  completeAll: () => ({
    type: ACTION_TYPES.ITEMS_MARKED_AS_COMPLETED
  }),
  clearCompleted: () => ({
    type: ACTION_TYPES.COMPLETED_ITEM_DELETED
  }),
  changeFilter: filter => ({
    type: ACTION_TYPES.FILTER_CHANGED,
    payload: filter
  })
}
