import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, updateUser } from '../store/singleUser';

export default function SingleUser() {
  //getting the single user info and setting it on state
  const dispatch = useDispatch();

  //getting user from state
  const user = useSelector((state) => state.singleUser || {});
  //setting the profile form to have the data from user
  const [profileForm, setProfileForm] = useState({
    email: user.email,
    username: user.username,
    editingUsername: false,
    editingEmail: false,
  });

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleChange = (event) => {
    setProfileForm({
      ...profileForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    // send profileForm;
    dispatch(updateUser(profileForm));
  };

  const emailStatus = user.email || 'no email';
  return (
    <div>
      <h1>{user.username}'s' Profile</h1>
      <p>
        User Name:{' '}
        {profileForm.editingUsername ? (
          <input
            type="text"
            name="username"
            value={profileForm.username}
            onChange={handleChange}
            placeholder={profileForm.username}
          />
        ) : profileForm.username ? (
          profileForm.username
        ) : (
          user.username
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
            placeholder={profileForm.email}
          />
        ) : profileForm.email ? (
          profileForm.email
        ) : (
          emailStatus
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
      <button onClick={handleSubmit} type="submit">
        Submit
      </button>
    </div>
  );
}
