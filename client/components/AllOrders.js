/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../store/orders.js';

class AllOrders extends React.Component {
  async componentDidMount() {
    this.props.getAllOrders();
  }

  //
  render() {
    const orders = this.props.state.orders || [];

    let date;
    return (
      <div>
        {orders[0] ? (
          orders.map((order) => (
            <div key={order.id}>
              <div>
                <div>
                  <Link to={`/order/${order.id}`}>
                    Order Number: {order.id}
                  </Link>
                </div>
                <div>Total Price: ${order.totalPrice}</div>
                <div>Items Bought</div>
                <div>
                  Ordered: {new Date(order.createdAt + '').toDateString()}
                </div>
                <ol>
                  {order.Albums.map((album) => (
                    <li key={album.id}>
                      <ul>
                        <li>{album.title}</li>
                        <li>${album.price}</li>
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))
        ) : (
          <div>You haven't made any orders? Go spend some money!</div>
        )}
        <Link to={'/home'}>Back</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  getAllOrders: () => {
    dispatch(getAllOrders());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
