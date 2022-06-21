/** @format */

import React from 'react';
import { connect } from 'react-redux';

import {
  getAllCartItems,
  addItemToCart,
  updateCartItem,
} from '../../store/cart';

class AddToCart extends React.Component {
  async componentDidMount() {}

  async handleSubmit(propsData) {
    console.log('DATA FOR THE BUTTON', propsData);
    //This checks if the album is already in the cart
    const extractedAlbum = this.props.basket.filter(
      (album) => album.id === propsData.album.id
    );
    const AlbumAlreadyInCart = extractedAlbum.length > 0;
    //Boolean that defines if Logged In
    const UserLoggedIn = this.props.auth.id;
    if (UserLoggedIn) {
      if (!AlbumAlreadyInCart) {
        const reduxAlbum = {
          albumId: propsData.album.id,
          price: propsData.album.price,
          title: propsData.album.title,
          albumCart: { quantity: 1 },
        };
        const album = {
          albumId: propsData.album.id,
          price: propsData.album.price,
          userId: propsData.auth.id,
          quantity: 1,
          cartId: this.props.auth.carts[0].id,
        };
        console.log(`album data for API:`, reduxAlbum);
        this.props.addToCart(album, reduxAlbum);
      } else if (AlbumAlreadyInCart) {
        const album = {
          userId: propsData.auth.id,
          albumId: propsData.album.id,
          quantity: propsData.album.quantity++,
          cartId: this.props.auth.carts[0].id,
        };
        this.props.updateCart(album);
        console.log('Album Already In Cart');
      }
      await this.props.getCartItems(this.props.auth.id);
    } else if (!UserLoggedIn) {
      //GUEST cart functionality - add to local cart
      if (!AlbumAlreadyInCart) {
        let album = this.props.album;
        album.albumCart = {};
        album.albumCart.quantity = 1;
        this.props.addToCart(this.props.album);
      } else {
        //---------------------------------------
        const album = {
          albumId: propsData.album.id,
          price: propsData.album.price,
          userId: propsData.auth.id,
          quantity: propsData.album.quantity++,
          cartId: this.props.auth.carts[0].id,
        };
        this.props.updateCart(album);
        console.log('Album Already In STATE Cart');
      }
    }
  }
  render() {
    return (
      <button onClick={() => this.handleSubmit(this.props)}>Add to cart</button>
    );
  }
}
const mapStateToProps = (state) => ({
  basket: state.basket,
  auth: state.auth,
});
//cart: state.item

const mapDispatchToProps = (dispatch) => ({
  getCartItems: (id) => {
    dispatch(getAllCartItems(id));
  },
  addToCart: (album, reduxAlbum) => dispatch(addItemToCart(album, reduxAlbum)),
  updateCart: (album) => dispatch(updateCartItem(album)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
