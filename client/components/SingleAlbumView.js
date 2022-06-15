import React from 'react';
import { connect } from 'react-redux';
import { getSingleAlbum } from '../store/singleAlbum';

class SingleAlbumView extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getSingleAlbum(id);
  }

  //
  render() {
    const album = this.props.album || {};
    const songs = album.Songs || [];
    console.log(album);
    return (
      <div>
        <h1>
          {album.title} ${album.price}
        </h1>
        <img src={album.img_url} />
        <ul>
          {songs.map((song) => (
            <li key={song.id}>{song.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  album: state.singleAlbum,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleAlbum: (id) => {
    dispatch(getSingleAlbum(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbumView);
