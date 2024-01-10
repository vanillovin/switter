import { useNavigate } from 'react-router-dom';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';

import { authService } from '../../services/firebase/firebaseConfig';
import { defaultProfileImageURL } from './AuthForm';
import {
  createSocialInitialUser,
  setProfileData,
} from '../../services/firebase/userService';

export default function GoogleButton() {
  const navigate = useNavigate();
  const onSocialClick = async () => {
    let provider;
    try {
      provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(authService, provider);
      const uid = user.uid;
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      await updateProfile(user, {
        displayName: '🧁',
        photoURL: defaultProfileImageURL,
      });
      await setProfileData(uid, createSocialInitialUser(uid, user.email as string));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={onSocialClick} name="google" className="authBtn">
      Google로 로그인{' '}
      <FontAwesomeIcon icon={faGoogle} color={'#fff'} style={{ marginLeft: 2 }} />
    </button>
  );
}
