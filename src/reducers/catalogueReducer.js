const initialState = {
  movies: [],
  isLoading: true
}

const catalogueReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INSERT_CATALOGUE':
      return {
        movies: action.payload,
        isLoading: false
      };

    // case 'SET_LOADING':
    //   return {
    //     ...state,
    //     isLoading: action.payload
    //   };

    default:
      return state;
  }
}

export default catalogueReducer
