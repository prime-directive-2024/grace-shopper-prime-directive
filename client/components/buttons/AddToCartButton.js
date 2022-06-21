/** @format */

import React from 'react';
import { connect } from 'react-redux';

import { getAllCartItems, addItemToCart } from '../../store/cart';

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
    console.log(cart);
    const extractedCartAlbum = cart.filter(
      (album) => album.id === this.props.album.id
    );
    console.log('this ran?', !extractedCartAlbum > 0);
    const temp = extractedCartAlbum > 0;
    // const album = this.props.album;

    if (!AlbumAlreadyInCart && !temp) {
      let cartId;
      if (this.props.auth.carts) {
        cartId = this.props.auth.carts[0].id;
      }
      const album = {
        ...this.props.album,
        userId: this.props.auth.id || 1,
        albumCart: { quantity: 1 },
        cartId,
      };
      console.log(`album data for API:`, album);
      this.props.addToCart(album);
    } else if (AlbumAlreadyInCart) {
      console.log('Album Already In Cart');
    }

    //else}(
    //functionality for updating the cart
    // )
  }
  render() {
    return <button onClick={() => this.handleSubmit()}>Add to cart</button>;
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
  addToCart: (album) => dispatch(addItemToCart(album)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
