export const initialState = {
  items: [],
  totalPrice: 0
};

const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // since it's a rental movie web app, we can't add the same movie for multiple times.
      // can only add a movie once. check if the array is empty or not. if not empty,
      // check again if one of the cart item's already has the same ID with the payload.
      if (state.items.length > 0 && state.items.some(item => item.id === action.payload.id)) {
        return state;
      } else return {
        items: [...state.items, action.payload],
        totalPrice: state.totalPrice + action.payload.price
        // also need to count the total price here to avoid the need to calculate the price in the cart page.
        // if calculating the price in the cart page, need to do double loop,
        // first to render the HTML element of the cart, second to calculate the price.
      };

    case 'REMOVE_ONE_ITEM':
      // copy the cart content
      const newList = [...state.items];
      // reduce the total price when removing an item.
      // the payload here will only contain the item index.
      const newPrice = state.totalPrice - newList[action.payload].price;

      // delete the item
      newList.splice(action.payload, 1);

      // return new state
      return {
        items: newList,
        totalPrice: newPrice
      };

    // remove all item in the cart
    case 'RESET_CART':
      return initialState;

    default:
      return state;
  }
}

export default cartReducers
