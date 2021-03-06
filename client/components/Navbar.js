/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { removeUser } from '../store/singleUser';
// import logo from '../../public/logo.png';

const Navbar = ({ handleClick, isLoggedIn, userName, adminStatus }) => {
  return (
    <div className='navBar'>
      <Link to='/home'>
        <img src='logo.png' className='nav__logo' alt='jamazon logo' />
      </Link>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            {/* <Link to="/home" className="navBar__link">
              Home
            </Link> */}
            <a href='#' className='navBar__link' onClick={handleClick}>
              Logout
            </a>
            <Link to='/orders' className='navBar__link'>
              Orders
            </Link>
            <Link to='/cart' className='navBar__link'>
              Cart
            </Link>
            {adminStatus ? (
              <>
                <Link to='/users' className='navBar__link'>
                  Users
                </Link>
                <Link to='/new-album' className='navBar__link'>
                  Add Album
                </Link>
              </>
            ) : (
              <></>
            )}
            <Link
              to='/profile'
              className='navBar__link'
            >{`${userName}'s profile`}</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            {/* <Link to="/home" className="navBar__link">
              Home
            </Link> */}
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
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userName: state.auth.username,
    adminStatus: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(removeUser());
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
