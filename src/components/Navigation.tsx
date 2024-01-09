import { useAtomValue } from 'jotai';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faEllipsisH,
  faEnvelope,
  faHome,
  faMoon,
  faSignOut,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { userAtom } from '../atoms/userAtom';
import { useTheme } from '../contexts/ThemeProvider';
import { authService } from '../services/firebase/firebaseConfig';

function Navigation() {
  const user = useAtomValue(userAtom);
  const { darkMode, toggleTheme } = useTheme();

  const onLogOut = async () => {
    const ok = confirm('정말 로그아웃하시겠습니까?');
    if (ok) authService.signOut();
  };

  return (
    <nav className={darkMode ? 'nav dark' : 'nav'}>
      {/* <ul style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}> */}
      <ul style={{ display: 'flex', justifyContent: 'center' }}>
        <li className="logo">
          <NavLink to="/" className="navlink">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
            <span>♥</span>
          </NavLink>
        </li>
        <li className="home">
          <NavLink to="/" className="navlink">
            <FontAwesomeIcon icon={faHome} size="2x" />
            <span>홈</span>
          </NavLink>
        </li>

        <li className="profile">
          <NavLink className="navlink" to={user ? `/profile/${user?.uid}` : '/auth'}>
            <FontAwesomeIcon icon={faUser} size="2x" />
            <span>프로필</span>
          </NavLink>
        </li>
        {user && (
          <li className="">
            <button onClick={onLogOut} className="navlink">
              <FontAwesomeIcon icon={faSignOut} size="2x" />
              <span>로그아웃</span>
            </button>
          </li>
        )}

        <li className="msg">
          <NavLink to="/msg" className="navlink">
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
            <span>{'+1'}</span>
          </NavLink>
        </li>
        <li className="dark navlink" onClick={toggleTheme}>
          <FontAwesomeIcon
            icon={faMoon}
            size="2x"
            color={darkMode ? '#e9c77b' : '#000000cc'}
          />
          <span>{darkMode ? 'light' : 'dark'}</span>
        </li>
        <li className="more navlink">
          <FontAwesomeIcon icon={faEllipsisH} size="2x" />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
