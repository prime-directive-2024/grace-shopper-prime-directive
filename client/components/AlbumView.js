import React from 'react';

const AlbumView = () => {
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
    //
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

  return sampleAlbums.map((sampleAlbum) => (
    <div>
      <div>
        <p>{sampleAlbum.title}</p>
        <p>Artist: {sampleAlbum.artist}</p>
        <img className="album-icon" src={sampleAlbum.image} />

        <ul>
          Tracks:
          {sampleAlbum.songs.map((song) => (
            <li key={song.id}>{song.title}</li>
          ))}
        </ul>
      </div>
    </div>
  ));
};

export default AlbumView;
