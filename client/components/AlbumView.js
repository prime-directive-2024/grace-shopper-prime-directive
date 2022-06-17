/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { getAllAlbums } from '../store/albums.js';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton.js';

class AlbumView extends React.Component {
  componentDidMount() {
    this.props.getAllAlbums();
  }

  //
  render() {
    console.log();
    const albums = this.props.albums || [];
    return albums.map((albums) => (
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
          <AddToCartButton album={albums} userId={this.state} />
        </div>
      </div>
    ));
  }
}

const mapStateToProps = (state) => ({
  albums: state.albums,
});

const mapDispatchToProps = (dispatch) => ({
  getAllAlbums: () => {
    dispatch(getAllAlbums());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumView);
