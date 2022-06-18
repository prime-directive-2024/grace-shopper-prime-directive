/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className='navBar'>
    <img
      src='https://i.ibb.co/ns1zQht/logo.png'
      className='nav__logo'
      alt='jamazon logo'
    />
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to='/home' className='navBar__link'>
            Home
          </Link>
          <a href='#' className='navBar__link' onClick={handleClick}>
            Logout
          </a>
          <Link to='/orders' className='navBar__link'>
            Orders
          </Link>
          <Link to='/cart' className='navBar__link'>
            Cart
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to='/' className='navBar__link'>
            Albums
          </Link>
          <Link to='/login' className='navBar__link'>
            Login
          </Link>
          <Link to='/signup' className='navBar__link'>
            Sign Up
          </Link>
          <Link to='/cart' className='navBar__link'>
            Cart
          </Link>
        </div>
      )}
    </nav>
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
