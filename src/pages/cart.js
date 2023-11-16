import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

// import actions definitions
import { removeOneItem, resetCart } from '../actions'

const Cart = () => {
  // get the cart items array and total price from redux
  const cartItems = useSelector(state => state.cart.items);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  const dispatch = useDispatch();

  // handler for deleting one item of the cart
  const deleteHandler = index => {
    dispatch(removeOneItem(index));
  }
  // handler for removing all cart item
  const resetHandler = () => {
    dispatch(resetCart());
  }

  return (
    <div className="container">
      <h2 className="mt-4 pb-2 border-bottom">Cart items...</h2>
      <table className="table mt-4">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col" className="text-end">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {cartItems.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">
                <img src={item.poster} width={141} height={214} alt="poster"/>
              </th>
              <td className="align-middle">{item.title}</td>
              <td className="align-middle"><strong>Rp{item.price}</strong></td>
              <td className="align-middle text-end">
                <button
                  className="btn btn-danger me-2"
                  onClick={() => deleteHandler(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="row pt-4">
        <div className="col-6">
          <button className="btn btn-danger me-2" onClick={resetHandler}>
            Remove All
          </button>
        </div>
        <div className="col-6 text-end">Total: <strong>Rp{totalPrice}</strong></div>
      </div>
    </div>
  )
};

export default Cart;
