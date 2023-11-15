import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const NavBar = () => {
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
            <Link to="/cart" className="nav-link">Cart <span className="badge text-bg-secondary bg-danger">{cart.length}</span></Link>
          </li>
        </ul>
      </div>
    </nav>
  )
};

export default NavBar;
