import React from 'react';
import { connect } from 'react-redux';
import /* Insert add to cart function */ '../store';
// import { Link } from 'react-router-dom';
import { getAllCartItems, addItemToCart } from '../store/cart';

class AddToCart extends React.Component {
  async componentDidMount() {}
  async handleSubmit(albumData) {
    await this.props.getCartItems(this.props.auth.id);
    if (albumData.basket.length > 0) {
      console.log('IT"S HERE');
    } else {
      console.log('Not here');
    }
    console.log('ALL DATA:looking for authID', albumData);
    const extractedAlbum = this.props.basket.filter(
      (album) => album.id === albumData.album.id
    );

    if (!extractedAlbum.length > 0) {
      const album = {
        albumId: albumData.album.id,
        price: albumData.album.price,
        userId: albumData.auth.id || 'Guest',
        quantity: 1,
      };
      this.props.addToCart(album);
      console.log('AlbumDataForRedux', album);
      //create new cart and add the item
    }
    // else {
    //   const quantity = extractedAlbum[0].albumCart.quantity;
    //   const album = {
    //     id: albumData.album.id,
    //     price: albumData.album.price,
    //     userId: albumData.auth.id || 'Guest',
    //     qty: quantity,
    //   };
    console.log('BASKET SHOULD INCLUDE NEW ALBUM: ', this.props.basket);
    //update functionality
    // return null;
  }
  //

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
  addToCart: (album) => dispatch(addItemToCart(album)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
