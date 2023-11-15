export const addToCart = movie => ({
  type: 'ADD_TO_CART',
  payload: movie,
});

export const removeOneItem = id => ({
  type: 'REMOVE_ONE_ITEM',
  payload: id,
});

export const resetCart = () => ({
  type: 'RESET_CART'
});

export const insertCatalogue = movies => ({
  type: 'INSERT_CATALOGUE',
  payload: movies
});

// export const setCatalogueLoading = movies => ({
//   type: 'SET_LOADING',
//   payload: movies
// });
