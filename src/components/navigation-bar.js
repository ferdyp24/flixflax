import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const NavBar = () => {
  // to show how many much items on the badge, we need to know how much items that are in the cart.
  // get the cart items from redux state and get the length of the array.
  const cart = useSelector(state => state.cart.items);
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">Flix Flax</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/catalogue" className="nav-link">Catalogue</Link>
          </li>
          <li className="nav-item">
            {/* Cart menu and badge */}
            <Link to="/cart" className="nav-link">Cart <span className="badge text-bg-secondary bg-danger">{cart.length}</span></Link>
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default NavBar;
