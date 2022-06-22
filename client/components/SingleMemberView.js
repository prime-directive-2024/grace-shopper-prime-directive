/** @format */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateMember } from '../store/singleUser';
// import { isAdminCheck } from '../store/userData';

export default function SingleMemberView(props) {
  //getting the single user info and setting it on state
  const dispatch = useDispatch();

  //getting user from state
  const user = useSelector((state) => props.location.user || {});
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  //setting the profile form to have the data from user
  const [profileForm, setProfileForm] = useState({
    userId: user.id,
    email: user.email || '',
    username: user.username || '',
    editingUsername: false,
    editingEmail: false,
  });

  const handleChange = (event) => {
    setProfileForm({
      ...profileForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    // send profileForm;
    setProfileForm(profileForm);
    dispatch(updateMember(profileForm));
  };
  console.log(props.location);
  const emailStatus = user.email || 'no email';
  return (
    <div>
      <h2>EDIT MEMBER ID# {user.id}</h2>

      <p>
        User Name:{' '}
        {profileForm.editingUsername ? (
          <input
            type="text"
            name="username"
            value={profileForm.username}
            onChange={handleChange}
            placeholder="Enter new name here"
          />
        ) : (
          ''
        )}
      </p>
      <button
        onClick={() =>
          setProfileForm({
            ...profileForm,
            username: user.username,
            editingUsername: !profileForm.editingUsername,
          })
        }
      >
        edit
      </button>
      <p>
        E-mail:{' '}
        {profileForm.editingEmail ? (
          <input
            name="email"
            value={profileForm.email}
            onChange={handleChange}
            placeholder="Enter new email address"
          />
        ) : (
          ''
        )}
      </p>
      <button
        onClick={() =>
          setProfileForm({
            ...profileForm,
            email: user.email,
            editingEmail: !profileForm.editingEmail,
          })
        }
      >
        edit
      </button>
      <p>Account Type: {user.isAdmin ? 'Admin' : 'Customer'}</p>
      <button onClick={() => handleSubmit()} type="submit">
        Submit
      </button>
    </div>
  );
}
