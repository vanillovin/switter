import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faEllipsisH,
  faEnvelope,
  faHome,
  faMoon,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ userObj, darkMode, onDarkMode }) => {
  return (
    <nav className={darkMode ? 'nav dark' : 'nav'}>
      {/* <ul style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}> */}
      <ul style={{ display: 'flex', justifyContent: 'center' }}>
        <li className="logo">
          <NavLink to="/" className="navlink" activeClassName="">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
            <span>♥</span>
          </NavLink>
        </li>
        <li className="home">
          <NavLink to="/" className="navlink" activeClassName="">
            <FontAwesomeIcon icon={faHome} size="2x" />
            <span>home</span>
          </NavLink>
        </li>
        <li className="profile">
          <NavLink className="navlink" activeClassName="" to={`/profile/${userObj.uid}`}>
            <FontAwesomeIcon icon={faUser} size="2x" />
            <span>{userObj.displayName || '♥'}</span>
          </NavLink>
        </li>
        <li className="msg">
          <NavLink to="/msg" className="navlink" activeClassName="active">
            <FontAwesomeIcon icon={faEnvelope} size="2x" />
            <span>{'+1'}</span>
          </NavLink>
        </li>
        <li className="dark navlink" onClick={onDarkMode}>
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
};

export default Navigation;
