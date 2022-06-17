import React from 'react';
import { connect } from 'react-redux';
import /* Insert add to cart function */ '../store';
// import { Link } from 'react-router-dom';
import { getAllCartItems, addItemToCart } from '../store/cart';

class AddToCart extends React.Component {
  async componentDidMount() {
    await this.props.getCartItems(this.props.auth.id);
  }
  handleSubmit(albumData) {
    console.log('ALL DATA:', albumData);
    const extractedAlbum = this.props.basket.filter(
      (album) => album.id === albumData.album.id
    );

    if (!extractedAlbum.length > 0) {
      const album = {
        id: albumData.album.id,
        price: albumData.album.price,
        userId: albumData.auth.id || 'Guest',
        qty: 1,
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
    console.log('BASKET:', this.props);
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
  //addToCart: ()=> dispatch(addToCart())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
