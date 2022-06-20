/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddToCartButton from './buttons/AddToCartButton.js';
//stripe
import StripeCheckout from 'react-stripe-checkout';

const AlbumList = (props) => {
  if (props.currentAlbums) {
    return props.currentAlbums.map((album) => (
      <div key={album.id}>
        <div>
          <p>
            <Link to={`/albums/${album.id}`}>{album.title}</Link>
          </p>
          <p>by {album.Artist.name}</p>
          <Link to={`/albums/${album.id}`}>
            <img className="album-icon" src={album.img_url} />
          </Link>
          <p>${album.price}</p>
          <AddToCartButton album={album} userId={props.state} />
        </div>
      </div>
    ));
  }
};
export default connect()(AlbumList);
