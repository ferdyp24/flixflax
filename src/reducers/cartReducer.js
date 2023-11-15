const initialState = {
  items: [],
  totalPrice: 0
};

const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      if (state.items.length > 0 && state.items.some(item => item.id === action.payload.id)) {
        return state;
      } else return {
        items: [...state.items, action.payload],
        totalPrice: state.totalPrice + action.payload.price
      };

    case 'REMOVE_ONE_ITEM':
      const newList = [...state.items];
      const newPrice = state.totalPrice - newList[action.payload].price;
      newList.splice(action.payload, 1);
      return {
        items: newList,
        totalPrice: newPrice
      };

    case 'RESET_CART':
      return initialState;

    default:
      return state;
  }
}

export default cartReducers
