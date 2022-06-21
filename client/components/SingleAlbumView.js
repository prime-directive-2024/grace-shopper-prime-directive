/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../store/singleUser';
import { connect } from 'react-redux';
import {
  deleteSingleAlbum,
  getSingleAlbum,
  updateSingleAlbum,
} from '../store/singleAlbum';

const SingleAlbumView = (props) => {
  const album = useSelector((state) => state.singleAlbum || {});
  const dispatch = useDispatch();
  const [albumForm, setAlbumForm] = useState({
    id: album.id,
    title: album.title,
    price: album.price,
    img: album.img_url,
    genre: album.genre,
    editing: false,
  });
  useEffect(() => {
    const id = props.match.params.id;
    dispatch(getSingleAlbum(id));
    setAlbumForm({
      ...albumForm,
      id: album.id,
      title: album.title,
      price: album.price,
      img: album.img_url,
      genre: album.genre,
    });
  }, [2]);

  const handleChange = (event) => {
    setAlbumForm({
      ...albumForm,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = () => {
    dispatch(updateSingleAlbum(albumForm));
    setAlbumForm({ ...albumForm, editing: !albumForm.editing });
  };
  const songs = album.Songs || [];

  return (
    <div>
      <h1>
        Title:
        {albumForm.editing ? (
          <input
            type="text"
            name="title"
            value={albumForm.title}
            onChange={handleChange}
            placeholder={albumForm.title}
          />
        ) : (
          album.title
        )}
      </h1>

      <h2>
        $
        {albumForm.editing ? (
          <input
            type="text"
            name="price"
            value={albumForm.price}
            onChange={handleChange}
            placeholder={albumForm.price}
          />
        ) : (
          album.price
        )}
      </h2>
      <h2>
        Genre:{' '}
        {albumForm.editing ? (
          <input
            type="text"
            name="genre"
            value={albumForm.genre}
            onChange={handleChange}
            placeholder={albumForm.genre}
          />
        ) : (
          album.genre
        )}
      </h2>
      {albumForm.editing ? (
        <>
          <label>Enter image url here: </label>
          <input
            type="text"
            name="img"
            value={albumForm.img}
            onChange={handleChange}
            placeholder={albumForm.img}
          />
        </>
      ) : (
        <img src={album.img_url} />
      )}
      <div>
        {songs.map((song) => (
          <div key={song.id}>
            <div key={song.id}>{song.title}</div>
            {albumForm.editing ? <button>Delete song</button> : <></>}
          </div>
        ))}
        {albumForm.editing ? <button>Add song</button> : <></>}
      </div>
        <button className="buttonSpacing"
          onClick={() => dispatch(deleteSingleAlbum(props.match.params.id))}
        >
          Delete
        </button>
        {albumForm.editing ? (
          <button onClick={() => handleSubmit()}>Save Changes</button>
        ) : (
          <button
          className="buttonSpacing"
            onClick={() =>
              setAlbumForm({
                id: album.id,
                title: album.title,
                price: album.price,
                img: album.img_url,
                genre: album.genre,
                editing: !albumForm.editing,
              })
            }
          >
            Edit Album
          </button>
        )}
      </div>
  );
};

export default connect()(SingleAlbumView);
