/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { getAllCartItems } from '../store/cart';

class Cart extends React.Component {
  async componentDidMount() {
    await this.props.getCartItems(this.props.auth.id);
  }

  render() {
    const albums = this.props.basket;

    const user = this.props.auth;
    let totalPrice = 0;

    const handleClick = () => {
      alert('button works');
      // this function should:
      // changed the "order complete" boolean to True in the db
      // initiate payment
      // redirect to thanks for purchase page with order number
    };
    return (
      <>
        {albums[0] ? (
          <>
            <h1>{user.username}'s cart</h1>
            {albums.map((album) => {
              totalPrice += album.price;
              return (
                <ul key={album.id}>
                  <li>Album: {album.title}</li>
                  <li>Price: {album.price}</li>
                  <li>Quantity: {album.albumCart.quantity}</li>
                </ul>
              );
            })}

            <div>Total Price {totalPrice}</div>
            <button onClick={() => handleClick()}> Checkout Now</button>
          </>
        ) : (
          <>Add an item to your cart!</>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => ({
  //
  getCartItems: (id) => {
    dispatch(getAllCartItems(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
