/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddToCartButton from './buttons/AddToCartButton.js';

const AlbumList = (props) => {
  if (props.currentAlbums) {
    return props.currentAlbums.map((albums) => (
      <div key={albums.id}>
        <div>
          <p>
            <Link to={`/albums/${albums.id}`}>{albums.title}</Link>
          </p>
          <p>by {albums.Artist.name}</p>
          <Link to={`/albums/${albums.id}`}>
            <img className='album-icon' src={albums.img_url} />
          </Link>
          <p>${albums.price}</p>
          <AddToCartButton album={props.albums} userId={props.state} />
        </div>
      </div>
    ));
  }
};
export default connect()(AlbumList);
