import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAdminCheck } from '../store/userData';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SingleMemberView from './SingleMemberView';

export default function UserData() {
  const users = useSelector((state) => state.users || []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isAdminCheck());
  }, []);

  //check that the user is an admin
  //if not return error page

  return !Array.isArray(users) ? (
    <div>
      <h1>No Hacking allowed</h1>
      <img
        className="forbiddenImg"
        src="https://i.kym-cdn.com/entries/icons/original/000/002/144/You_Shall_Not_Pass!_0-1_screenshot.jpg"
      />
    </div>
  ) : (
    <div>
      <h1>Super Secret User Data NO HACKING ALLOWED</h1>
      <ul>
        {users.map((user) => (
          <Link
            key={user.id}
            to={{
              pathname: `/users/${user.id}`,
              user,
            }}
          >
            <li>{user.username}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
