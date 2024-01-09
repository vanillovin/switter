import { useNavigate } from 'react-router-dom';
import { useState, ChangeEvent, FormEvent } from 'react';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import { authService } from '../../services/firebase/firebaseConfig';
import { getAuthErrorMessage } from '../../utils/errorMessages';
import { FirebaseError } from 'firebase/app';
import { Profile } from '../../types/Profile';
import { User } from '../../types/User';
import { setProfileData } from '../../services/firebase/userService';

export const defaultProfileImageURL =
  'https://firebasestorage.googleapis.com/v0/b/switter-b2db8.appspot.com/o/logo.png?alt=media&token=d636781d-a94b-4b3f-8b18-374cceacf61d';

function AuthForm() {
  const navigate = useNavigate();
  const [authInputs, setAuthInputs] = useState({
    displayName: '',
    email: '',
    password: '',
  });
  const { displayName, email, password } = authInputs;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [newAccount, setNewAccount] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAuthInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;
    try {
      setIsLoading(true);
      if (newAccount) {
        const credentials = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
        const uid = credentials.user.uid;
        await updateProfile(credentials.user, {
          displayName,
          photoURL: defaultProfileImageURL,
        });
        await setProfileData(
          uid,
          getInitialUser({
            email,
            displayName,
            uid,
            profileImageURL: defaultProfileImageURL,
          })
        );
        navigate('/');
      } else {
        await signInWithEmailAndPassword(authService, email, password);
        navigate('/');
      }
    } catch (error) {
      // console.error(`${newAccount ? 'newAccount' : 'login'} error ${error}`);
      if (error instanceof FirebaseError) {
        const { code } = error;
        setError(getAuthErrorMessage(code));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <h2 className="" style={{ marginTop: 30 }}>
        Switter {newAccount ? '가입하기' : '로그인'}
      </h2>
      <form onSubmit={onSubmit} className="container">
        {newAccount && (
          <input
            name="displayName"
            type="displayName"
            placeholder="Name"
            required
            value={displayName}
            onChange={onChange}
            className="authInput"
          />
        )}
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
          value={isLoading ? '로딩 중..' : newAccount ? '가입하기' : '로그인'}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <div className="authSwitch">
        <span>{newAccount ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}</span>
        <button onClick={toggleAccount}>
          {newAccount ? '로그인하기' : '이메일로 가입하기'}&rarr;
        </button>
      </div>
    </>
  );
}

export default AuthForm;

const getInitialUser = (user: User): Profile => ({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  profileImageURL: user.profileImageURL,
  about: '',
  joinedDate: Date.now(),
  followers: [],
  following: [],
  comments: [],
  likes: [],
  sweets: [],
});
