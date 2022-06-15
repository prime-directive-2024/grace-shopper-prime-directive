import React from 'react';
import { connect } from 'react-redux';
import { getAllAlbums } from '../store/albums.js';
const sampleAlbums = [
  {
    title: 'Billys album',
    artist: 'Billy',
    image:
      'http://res.cloudinary.com/ybmedia/image/upload/c_crop,h_1117,w_1985,x_0,y_252/c_fill,f_auto,h_900,q_auto,w_1600/v1/m/b/8/b8601cf5a1ce6be0421f710c8cdf89f05db3dd97/GettyImages-74290244.jpg',
    songs: [
      {
        id: 1,
        title: "Billy's first track",
      },
      {
        id: 2,
        title: "Billy's second track",
      },
    ],
  },
  {
    title: 'Bobs album',
    artist: 'Bob',
    image:
      'https://upload.wikimedia.org/wikipedia/en/2/21/%3F_XXXTENTACION_Cover.png',
    songs: [
      {
        id: 1,
        title: 'Bob first track',
      },
      {
        id: 2,
        title: 'track 2',
      },
    ],
  },
];

class AlbumView extends React.Component {
  componentDidMount() {
    this.props.getAllAlbums();
  }

  //
  render() {
    const albums = this.props.albums || [];
    console.log('SHOULD DISPLAY ALBUMS:', albums);
    return albums.map((albums) => (
      <div key={albums.id}>
        <div>
          <p>{albums.title}</p>
          <p>Artist: {albums.artist}</p>
          {/* <img className="album-icon" src={albums.image} /> */}

          {/* <ul>
            Tracks:
            {albums.songs.map((song) => (
              <li key={song.id}>{song.title}</li>
            ))}
          </ul> */}
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
