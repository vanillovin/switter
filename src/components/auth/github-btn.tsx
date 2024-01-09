import { useNavigate } from 'react-router-dom';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';

import { authService } from '../../services/firebase/firebaseConfig';

export default function GitHubButton() {
  const navigate = useNavigate();

  const onSocialClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(authService, provider);
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
