/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../store/orders.js';
import { getSingleOrder } from '../store/singleOrder.js';

class AllOrders extends React.Component {
  async componentDidMount() {
    this.props.getOrder(this.props.match.params.id);
  }

  //
  render() {
    const order = this.props.state.singleOrder || {};
    let date;
    return (
      <div>
        {order.id ? (
          <div>
            <div>
              <Link to={`/order/${order.id}`}>Order Number: {order.id}</Link>
            </div>
            <div>Total Price: ${order.totalPrice}</div>
            <div>Items Bought</div>
            <div>Ordered: {new Date(order.createdAt + '').toDateString()}</div>
            <ol>
              {order.Albums.map((album) => (
                <li key={album.id}>
                  <ul>
                    <li>{album.title}</li>
                    <li>${album.price}</li>
                    <li>
                      <img className="album-icon" src={album.img_url} />
                    </li>
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div>This order doesn't exist</div>
        )}
        <Link to={'/orders'}>back</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  getOrder: (id) => {
    dispatch(getSingleOrder(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders);
