import React, { useState } from 'react';
import { authService } from 'services/firebase/fbase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { updateUsersProfileData, updateUsersProfilePhoto } from 'services/users';

const defaultProfileURL =
  'https://firebasestorage.googleapis.com/v0/b/switter-b2db8.appspot.com/o/logo.png?alt=media&token=d636781d-a94b-4b3f-8b18-374cceacf61d';

const initialUserObj = (email, photoURL) => ({
  email,
  aboutMe: '',
  displayName: '♥',
  photoURL,
  writtenSweets: [],
  commentedSweets: [],
  likesSweets: [],
});

const AuthForm = () => {
  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: '',
  });
  const { email, password } = loginInputs;
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState(true);

  const onChange = (event) => {
    const { name, value } = event.target;
    setLoginInputs({
      ...loginInputs,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // let data;
      if (newAccount) {
        // create newAccount
        createUserWithEmailAndPassword(authService, email, password).then((res) => {
          const uid = res.user.uid;
          updateUsersProfilePhoto(uid, defaultProfileURL).catch((err) => {
            console.log('updateUsersProfilePhoto err', err);
          });
          updateUsersProfileData(uid, initialUserObj(email, defaultProfileURL)).catch(
            (err) => console.log('updateUsersProfileData err', err)
          );
        });
      } else {
        // log in
        await signInWithEmailAndPassword(authService, email, password);
      }
      // console.log('Auth data', data.user.uid);
    } catch (error) {
      console.log('AuthForm onSubmit error :', error, 'error.message :', error.message);
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? '가입하기' : '로그인'}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? '로그인하기' : '이메일로 가입하기'}
      </span>
    </>
  );
};

export default AuthForm;
