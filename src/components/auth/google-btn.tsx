import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { authService } from '../../services/firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function GoogleButton() {
  const navigate = useNavigate();
  const onSocialClick = async () => {
    let provider;
    try {
      provider = new GoogleAuthProvider();
      await signInWithPopup(authService, provider);
      navigate('/');
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
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
