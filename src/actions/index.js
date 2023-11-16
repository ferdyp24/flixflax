// add one item to cart
export const addToCart = movie => ({
  type: 'ADD_TO_CART',
  payload: movie,
});

// to remove one cart item
export const removeOneItem = id => ({
  type: 'REMOVE_ONE_ITEM',
  payload: id,
});

// remove all cart item
export const resetCart = () => ({
  type: 'RESET_CART'
});

// add catalouge or all movies
export const insertCatalogue = movies => ({
  type: 'INSERT_CATALOGUE',
  payload: movies
});
