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
      rb: true,
      rock: true,
      jazz: true,
      edm: true,
      dubstep: true,
      techno: true,
      country: true,
      pop: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.getAllAlbums();
  }

  handleChange(evt) {
    let value = evt.target.value;
    if (value === 'true') {
      value = true;
    }
    if (value === 'false') {
      value = false;
    }
    console.log(this.state);
    this.setState({
      ...this.state,
      [evt.target.name]: value,
    });
  }
  render() {
    const paginate = (pageNumber) =>
      this.setState({ ...this.state, currentPage: pageNumber });
    let albums = this.props.albums || [];
    if (
      !this.state.rock ||
      !this.state.jazz ||
      !this.state.edm ||
      !this.state.dubstep ||
      !this.state.techno ||
      !this.state.country ||
      !this.state.pop ||
      !this.state.rb
    ) {
      if (this.state.rock) {
        albums = albums.filter((album) => album.genre !== 'Rock');
      }
      if (this.state.jazz) {
        albums = albums.filter((album) => album.genre !== 'Jazz');
      }
      if (this.state.edm) {
        albums = albums.filter((album) => album.genre !== 'EDM');
      }
      if (this.state.dubstep) {
        albums = albums.filter((album) => album.genre !== 'Dubstep');
      }
      if (this.state.techno) {
        albums = albums.filter((album) => album.genre !== 'Techno');
      }
      if (this.state.country) {
        albums = albums.filter((album) => album.genre !== 'Country');
      }
      if (this.state.pop) {
        albums = albums.filter((album) => album.genre !== 'Pop');
      }
      if (this.state.rb) {
        albums = albums.filter((album) => album.genre !== 'R&B');
      }
    }

    const indexOfLastPost = this.state.currentPage * this.state.albumsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.albumsPerPage;
    const currentAlbums = albums.slice(indexOfFirstPost, indexOfLastPost);
    return (
      <div>
        <div>
          <label>Rock</label>
          <input
            value={!this.state.rock}
            type='checkbox'
            name={'rock'}
            onChange={this.handleChange}
          />
          <label>Jazz</label>
          <input
            value={!this.state.jazz}
            type='checkbox'
            name={'jazz'}
            onChange={this.handleChange}
          />
          <label>Dubstep</label>
          <input
            value={!this.state.dubstep}
            type='checkbox'
            name={'dubstep'}
            onChange={this.handleChange}
          />
          <label>EDM</label>
          <input
            value={!this.state.edm}
            type='checkbox'
            name={'edm'}
            onChange={this.handleChange}
          />
          <label>Techno</label>
          <input
            value={!this.state.techno}
            type='checkbox'
            name={'techno'}
            onChange={this.handleChange}
          />
          <label>Country</label>
          <input
            value={!this.state.country}
            type='checkbox'
            name={'country'}
            onChange={this.handleChange}
          />
          <label>Pop</label>
          <input
            value={!this.state.pop}
            type='checkbox'
            name={'pop'}
            onChange={this.handleChange}
          />
          <label>R{'&'}B</label>
          <input
            value={!this.state.rb}
            type='checkbox'
            name={'rb'}
            onChange={this.handleChange}
          />
        </div>
        <div className='allAlbums'>
          <AlbumList
            currentAlbums={currentAlbums}
            albums={albums}
            state={this.state}
          />
        </div>
        <div className='pagination'>
          <p>Album Pages:</p>
          <Pagination
            postPerPage={this.state.albumsPerPage}
            totalPosts={albums.length}
            paginate={paginate}
            location={'/home'}
          />
        </div>
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
