/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { getAllCartItems } from '../store/cart';
import RemoveFromCartButton from './buttons/RemoveFromCartButton';
import ClearCartButton from './buttons/ClearCartButton';
import CheckOutButton from './buttons/CheckOutButton';
import StripeCheckout from 'react-stripe-checkout';
import AddOne from './buttons/AddOne';
import SubtractOne from './buttons/SubtractOne';

class Cart extends React.Component {
  async componentDidMount() {
    if (this.props.auth.id) {
      await this.props.getCartItems(this.props.auth.carts[0].id);
    } else {
      this.props.getCartItems();
    }
  }

  render() {
    const albums = this.props.basket || [];
    const user = this.props.auth;
    let totalPrice = 0;

    return (
      <>
        {albums[0] ? (
          <>
            <h1>{user.username ? user.username : "Guest's Cart"}'s cart</h1>
            {albums.map((album) => {
              totalPrice += album.price * album.albumCart.quantity;
              return (
                <ul key={album.id}>
                  <li>Album: {album.title}</li>
                  <li>Price: ${parseInt(album.price) * 0.01}</li>
                  <li>Quantity: {album.albumCart.quantity}</li>
                  <AddOne basket={this.props.basket} album={album} />
                  <SubtractOne basket={this.props.basket} album={album} />
                  {this.props.auth.id ? (
                    <RemoveFromCartButton
                      albumId={album.id}
                      cartId={album.albumCart.cartId}
                    />
                  ) : (
                    <RemoveFromCartButton albumId={album.id} />
                  )}
                </ul>
              );
            })}

            <div>Total Price ${parseInt(totalPrice) * 0.01}</div>
            <CheckOutButton userId={user.id} total={totalPrice} />
            {this.props.auth.id ? (
              <ClearCartButton cartId={this.props.basket[0].albumCart.cartId} />
            ) : (
              <ClearCartButton />
            )}
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
