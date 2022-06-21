/** @format */

import React from 'react';
import { connect } from 'react-redux';

import {
  getAllCartItems,
  addItemToCart,
  updateCartItem,
} from '../../store/cart';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {}

  async handleSubmit() {
    //This checks if the album is already in the cart
    const extractedAlbum = this.props.basket.filter(
      (album) => album.id === this.props.album.id
    );
    const AlbumAlreadyInCart = extractedAlbum.length > 0;

    let cart = JSON.parse(localStorage.getItem('cart'));
    const extractedCartAlbum = cart.filter(
      (album) => album.id === this.props.album.id
    );
    const itemInLocalCart = extractedCartAlbum > 0;

    if (!AlbumAlreadyInCart && !itemInLocalCart) {
      const album = {
        ...this.props.album,
        userId: this.props.auth.id || 1,
        albumCart: { quantity: 1 },
      };
      this.props.addToCart(album);
      await this.props.getCartItems(this.props.auth.id);
    } else if (AlbumAlreadyInCart) {
      const album = {
        ...this.props.album,
        userId: this.props.auth.id,
        albumCart: { quantity: extractedAlbum[0].albumCart.quantity + 1 },
      };

      this.props.updateCart(album);
    }
  }

  render() {
    return <button onClick={() => this.handleSubmit()}>Add to cart</button>;
  }
}
const mapStateToProps = (state) => ({
  basket: state.basket,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getCartItems: (id) => {
    dispatch(getAllCartItems(id));
  },

  addToCart: (album) => dispatch(addItemToCart(album)),
  updateCart: (album) => dispatch(updateCartItem(album)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
