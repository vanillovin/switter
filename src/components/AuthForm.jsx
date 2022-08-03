import React, { useState } from 'react';
import { authService, dbService } from 'services/firebase/fbase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

const defaultProfileURL =
  'https://firebasestorage.googleapis.com/v0/b/switter-b2db8.appspot.com/o/logo.png?alt=media&token=d636781d-a94b-4b3f-8b18-374cceacf61d';

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
      let data;
      if (newAccount) {
        // create newAccount
        createUserWithEmailAndPassword(authService, email, password)
          .then((res) => {
            data = res;
            return res.user.uid;
          })
          .then((uid) => {
            const userObj = {
              [uid]: defaultProfileURL,
            };

            const usersRef = collection(dbService, 'users');

            setDoc(doc(usersRef, 'profilePhoto'), userObj).catch((err) => {
              console.log('가입시 usersProfilePhoto 설정 err', err);
            });

            setDoc(doc(usersRef, 'profileData'), {
              [uid]: {
                email,
                aboutMe: '',
                displayName: '♥',
                photoURL: defaultProfileURL,
                commentedSweets: [],
                writtenSweets: [],
                likesSweets: [],
              },
            })
              .then((res) => {
                console.log('가입시 usersProfileData 설정 res', res);
              })
              .catch((err) => {
                console.log('가입시 usersProfileData 설정 err', err);
              });
          });
      } else {
        // log in
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log('Auth data', data.user.uid);
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
