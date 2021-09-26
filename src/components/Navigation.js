import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import {
  faEllipsisH,
  faEnvelope,
  faHome,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ userObj }) => {
  return (
    <nav>
      {/* <ul style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}> */}
      <ul style={{ display: 'flex', justifyContent: 'center' }}>
        <li className="logo">
          <NavLink to="/" className="navlink" activeClassName="">
            <FontAwesomeIcon icon={faTwitter} size="2x" color="#E05D5D" />
            <span style={{ marginTop: 10 }}>♥</span>
          </NavLink>
        </li>
        <li className="home">
          <NavLink to="/" className="navlink" activeClassName="">
            <FontAwesomeIcon icon={faHome} size="2x" color="#E05D5D" />
            <span style={{ marginTop: 10 }}>home</span>
          </NavLink>
        </li>
        <li className="profile">
          <NavLink className="navlink" activeClassName="" to="/profile">
            <FontAwesomeIcon icon={faUser} size="2x" />
            <span style={{ marginTop: 10 }}>
              {userObj.displayName ? `${userObj.displayName}` : '♥'}
            </span>
          </NavLink>
        </li>
        <li className="msg">
          <NavLink to="/msg" className="navlink" activeClassName="active">
            <FontAwesomeIcon icon={faEnvelope} size="2x" color="#E05D5D" />
            <span style={{ marginTop: 10 }}>{'+1'}</span>
          </NavLink>
        </li>
        <li className="more">
          <FontAwesomeIcon icon={faEllipsisH} size="2x" color="#E05D5D" />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
