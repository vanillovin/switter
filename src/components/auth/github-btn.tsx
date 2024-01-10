import { useNavigate } from 'react-router-dom';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GithubAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';

import { authService } from '../../services/firebase/firebaseConfig';
import {
  createSocialInitialUser,
  setProfileData,
} from '../../services/firebase/userService';
import { defaultProfileImageURL } from './AuthForm';

export default function GitHubButton() {
  const navigate = useNavigate();

  const onSocialClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      const { user } = await signInWithPopup(authService, provider);
      const uid = user.uid;
      await updateProfile(user, {
        displayName: '🧁',
        photoURL: defaultProfileImageURL,
      });
      await setProfileData(uid, createSocialInitialUser(uid, user.email as string));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={onSocialClick} name="github" className="authBtn">
      Github로 로그인{' '}
      <FontAwesomeIcon icon={faGithub} color={'#fff'} style={{ marginLeft: 2 }} />
    </button>
  );
}
