/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { getAllAlbums } from '../store/albums.js';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import AlbumList from './AllAlbums';

class AlbumView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      albumsPerPage: 10,
    };
  }
  componentDidMount() {
    this.props.getAllAlbums();
  }

  //
  render() {
    const paginate = (pageNumber) =>
      this.setState({ ...this.state, currentPage: pageNumber });
    const albums = this.props.albums || [];
    const indexOfLastPost = this.state.currentPage * this.state.albumsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.albumsPerPage;
    const currentAlbums = albums.slice(indexOfFirstPost, indexOfLastPost);
    return (
      <div>
        <AlbumList
          currentAlbums={currentAlbums}
          albums={albums}
          state={this.state}
        />
        <Pagination
          postPerPage={this.state.albumsPerPage}
          totalPosts={albums.length}
          paginate={paginate}
          location={'/home'}
        />
      </div>
    );
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
