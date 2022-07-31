import React from 'react';
import { authService } from 'services/firebase/fbase';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import AuthForm from 'components/AuthForm';

const Auth = ({ darkMode }) => {
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
    <div className={darkMode ? 'authContainer dark' : 'authContainer'}>
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#9775fa'}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Google로 로그인{' '}
          <FontAwesomeIcon icon={faGoogle} color={'#fff'} style={{ marginLeft: 2 }} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Github로 로그인{' '}
          <FontAwesomeIcon icon={faGithub} color={'#fff'} style={{ marginLeft: 2 }} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
