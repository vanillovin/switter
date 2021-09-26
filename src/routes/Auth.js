import React from 'react';
import { authService } from 'fbase';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import AuthForm from 'components/AuthForm';

const Auth = () => {
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
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#000'}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google{' '}
          <FontAwesomeIcon
            icon={faGoogle}
            color={'#fff'}
            style={{ marginLeft: 2 }}
          />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github{' '}
          <FontAwesomeIcon
            icon={faGithub}
            color={'#fff'}
            style={{ marginLeft: 2 }}
          />
        </button>
      </div>
    </div>
    // <div>
    //   <AuthForm />
    //   <div>
    //     <button onClick={onSocialClick} name="google">
    //       Continue with Google
    //     </button>
    //     <button onClick={onSocialClick} name="github">
    //       Continue with Github
    //     </button>
    //   </div>
    // </div>
  );
};

export default Auth;
