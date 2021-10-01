import React, { useState } from 'react';
import { authService } from 'fbase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

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
      console.log(error.message);
      if (error.code.includes('weak-password')) {
        setError('비밀번호는 6자 이상이어야 합니다.');
      } else if (error.code.includes('wrong-password')) {
        setError('비밀번호가 틀렸습니다.');
      } else if (error.code.includes('user-not-found')) {
        setError('가입되지 않는 이메일입니다.');
      } else if (error.code.includes('email-already-in-use')) {
        setError('이미 사용 중인 이메일입니다.');
      } else if (error.code.includes('too-many')) {
        setError('로그인 실패. 비밀번호를 재설정해주세요.');
      }
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
