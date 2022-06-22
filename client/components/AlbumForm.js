/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddAlbum } from '../store/albums';

export default function AlbumForm() {
  const dispatch = useDispatch();

  const [albumForm, setalbumForm] = useState({
    title: '',
    price: '',
    img_url: '',
    genre: '',
    artist: '',
  });

  const handleChange = (event) => {
    setalbumForm({
      ...albumForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(AddAlbum(albumForm));
    setalbumForm({
      title: '',
      price: '',
      img_url: '',
      genre: '',
      artist: '',
    });
  };

  return (
    <div>
      <label>Title: </label>
      <input
        type='text'
        name='title'
        value={albumForm.title}
        onChange={handleChange}
      />
      <label>Price: </label>
      <input
        type='text'
        name='price'
        value={albumForm.price}
        onChange={handleChange}
      />
      <label>Image Url: </label>
      <input
        type='text'
        name='img_url'
        value={albumForm.img_url}
        onChange={handleChange}
      />
      <label>Genre: </label>
      <select name='genre' value={albumForm.genre} onChange={handleChange}>
        <option value='Rock'>Rock</option>
        <option value='R&B'>R{'&'}B</option>
        <option value='Pop'>Pop</option>
        <option value='Country'>Country</option>
        <option value='Techno'>Techno</option>
        <option value='EDM'>EDM</option>
        <option value='Dubstep'>Dubstep</option>
        <option value='Jazz'>Jazz</option>
      </select>
      <label>Artist: </label>
      <input
        type='text'
        name='artist'
        value={albumForm.artist}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
