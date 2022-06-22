import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMember } from '../../store/singleUser';

export default function UpdateMemberButton(props) {
  const dispatch = useDispatch();
  const handleClick = () => {
    const member = {
      userId: props.userId,
      username: props.username,
      email: props.email,
    };
    dispatch(updateMember(member));
  };

  return <button onClick={handleClick}>Update</button>;
}
