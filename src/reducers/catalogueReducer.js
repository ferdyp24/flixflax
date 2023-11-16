const initialState = {
  movies: [],
  isLoading: true
}

const catalogueReducer = (state = initialState, action) => {
  switch (action.type) {
    // add the movies list and set the loading state to false
    case 'INSERT_CATALOGUE':
      return {
        movies: action.payload,
        isLoading: false
      };

    default:
      return state;
  }
}

export default catalogueReducer
