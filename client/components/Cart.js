import React from "react";
import { connect } from "react-redux";

class Cart extends React.Component {
  render() {

    const albums = [{id: 1, title: "album_1", price: 100 }, { id: 2, title: "album_2", price: 120 }]
    const user = { id: 1, name: "Robert" };
    const totalPrice = albums.reduce((pv, cv) => pv.price + cv.price);

    const handleClick = () => {
      alert("button works");
      // this function should:
      // changed the "order complete" boolean to True in the db
      // initiate payment
      // redirect to thanks for purchase page with order number
    };

    return (
      <>
        <h1>{user.name}'s cart</h1>
        <ol>
          {albums.map((album) => {
            return (
              <li key={album.id}>
                Album {album.title} Price {album.price}
              </li>
            );
          })}
        </ol>
        <div>Total Price {totalPrice}</div>
        <button onClick={() => handleClick()}> Checkout Now</button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  //
});

const mapDispatchToProps = (dispatch) => ({
  //
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
