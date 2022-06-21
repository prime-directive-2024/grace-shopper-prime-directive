/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { getAllCartItems } from '../store/cart';
import RemoveFromCartButton from './buttons/RemoveFromCartButton';
import ClearCartButton from './buttons/ClearCartButton';
import CheckOutButton from './buttons/CheckOutButton';

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
              totalPrice += album.price;
              return (
                <ul key={album.id}>
                  <li>Album: {album.title}</li>
                  <li>Price: {album.price}</li>
                  <li>Quantity: {album.albumCart.quantity}</li>
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

            <div>Total Price {totalPrice}</div>
            <CheckOutButton userId={user.id} />
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
