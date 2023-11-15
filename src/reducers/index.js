import cartReducer from './cartReducer'
import catalogueReducer from './catalogueReducer'
import { combineReducers } from 'redux'

const allreducers = combineReducers({
  catalogue: catalogueReducer,
  cart: cartReducer
})

export default allreducers