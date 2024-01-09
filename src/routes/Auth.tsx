import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AuthForm from '../components/auth/AuthForm';
import { useTheme } from '../contexts/ThemeProvider';
import GitHubButton from '../components/auth/github-btn';
import GoogleButton from '../components/auth/google-btn';

function Auth() {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? 'authContainer dark' : 'authContainer'}>
      {/* <FontAwesomeIcon icon={faDove} color="#9775fa" size="3x" /> */}
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#9775fa'}
        size="3x"
        // style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <GoogleButton />
        <GitHubButton />
      </div>
    </div>
  );
}

export default Auth;
