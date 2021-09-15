import React from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, signOut } from '@firebase/auth';

const Profile = () => {
  const auth = getAuth();
  const history = useHistory();

  const onLogOutClick = () => {
    signOut(auth); // auth.signOut();
    history.push('/');
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
