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
    return <div></div>;
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  getAllAlbums: () => {
    dispatch(getAllAlbums());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumView);
