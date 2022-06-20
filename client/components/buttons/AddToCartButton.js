/** @format */

import React from 'react';
import { connect } from 'react-redux';

import { getAllCartItems, addItemToCart } from '../../store/cart';

class AddToCart extends React.Component {
  async componentDidMount() {}

  async handleSubmit(propsData) {
    console.log('DATA FOR THE BUTTON', propsData);
    // console.log('STATE DATA:', this.props.state);
    //This checks if the album is already in the cart
    const extractedAlbum = this.props.basket.filter(
      (album) => album.id === propsData.album.id
    );
    let AlbumAlreadyInCart = AlbumAlreadyInCart || extractedAlbum.length > 0;
    //Boolean that defines if Logged In
    const UserLoggedIn = this.props.auth.id;
    if (UserLoggedIn) {
      // const album = propsData.album;
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
          userId: propsData.auth.id || 'Guest',
          quantity: 1,
          cartId: this.props.auth.carts[0].id,
        };
        console.log(`album data for API:`, reduxAlbum);
        this.props.addToCart(album, reduxAlbum);
        AlbumAlreadyInCart = true;
        // this.propsData.basket.push(album);
        console.log('ALBUM ADDED TO CART');
      } else if (AlbumAlreadyInCart) {
        console.log('Album Already In Cart');
      }
    } else if (!UserLoggedIn) {
      let album = this.props.album;
      //Add to local cart
      if (!AlbumAlreadyInCart) {
        album.albumCart = {};
        album.albumCart.quantity = 1;
        this.props.addToCart(this.props.album);
      }
      //create new cart and add the item
    }
    //else}(
    //functionality for updating the cart
    // )
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
