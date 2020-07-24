const menuLoaded = (newMenu) => {
  return {
    type: 'MENU_LOADED',
    payload: newMenu,
  }
}

const menuRequested = () => {
  return {
    type: 'MENU_REQUESTED',
  }
}

const menuError = (newMessage) => {
  return {
    type: 'MENU_ERROR',
    errorMessage: newMessage,
  }
}

const addedToCard = (id) => {
  return {
    type: 'ITEM_ADD_TO_CART',
    payload: id
  }
}

const deleteFromCard = (id) => {
  return {
    type: 'ITEM_REMOVE_FROM_CART',
    payload: id
  }
}

const reCountFromCard = (id) => {
  return {
    type: 'RE_COUNT_ITEM_FROM_CART',
    payload: id
  }
}

const costCount =() => {
  return {
    type: 'COST_COUNT',
  }
}

const clearCart =() => {
  return {
    type: 'CLEAR_CART',
  }
}

export {
  menuLoaded,
  menuRequested,
  menuError,
  addedToCard,
  deleteFromCard,
  reCountFromCard,
  costCount,
  clearCart
}