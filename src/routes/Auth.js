import React, { useState } from 'react';
import { authService } from 'fbase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const Auth = () => {
  const [loginInputs, setLoginInputs] = useState({
    email: '',
    password: '',
  });
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const { email, password } = loginInputs;

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
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        // log in
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log('Auth data', data);
    } catch (error) {
      // const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const onSocialClick = async ({ target: { name } }) => {
    let provider;
    try {
      if (name === 'google') {
        provider = new GoogleAuthProvider();
        await signInWithPopup(authService, provider);
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
      } else if (name === 'github') {
        provider = new GithubAuthProvider();
        await signInWithPopup(authService, provider);
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value="Log in"
          value={newAccount ? 'Create Account' : 'Sign In'}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? 'Sign In' : 'Create Account'}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
