import React from 'react';
import { connect } from 'react-redux';
import { getSingleAlbum } from '../store/albums';

class SingleAlbumView extends React.Component {
  componentDidMount() {
    const id = this.req.match.params.id;
    this.props.getSingleAlbum(id);
  }

  //
  render() {
    const album = this.props.albums || {};
    return album.map((track) => (
      <div key={track.title}>
        {/* need to update key to id */}
        <div>
          <p>{track.title}</p>
          {/* <p>by {track.Artist.name}</p> */}
        </div>
      </div>
    ));
  }
}

const mapStateToProps = (state) => ({
  albums: state.singleAlbum,
});

const mapDispatchToProps = (dispatch) => ({
  getAllAlbums: (id) => {
    dispatch(getSingleAlbum(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleAlbumView);
