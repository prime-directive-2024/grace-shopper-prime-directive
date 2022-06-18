/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../store/orders.js';

class AllOrders extends React.Component {
  componentDidMount() {
    this.props.getAllOrders();
  }

  //
  render() {
    const orders = this.props.orders || [];
    return (
      <div>
        {orders[0] ? (
          orders.map((order) => (
            <div key={order.id}>
              <div>
                <p>
                  <Link to={`/order/${order.id}`}>
                    Order Number: {order.id}
                  </Link>
                </p>
                <p>Total Price: ${order.price}</p>
                <div>Items Bought</div>
                <ol>
                  {order.Albums.map((album) => (
                    <li>
                      <ul>
                        <li>{album.title}</li>
                        <li>${album.cost}</li>
                        <li>
                          <img className='album-icon' src={album.img_url} />
                        </li>
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
