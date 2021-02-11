/* eslint-disable */
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../images/usa-logo-white.svg';


function Header(props) {
  const { text, link, loggedIn, onSignOut } = props;
  if (loggedIn) {
    return (
    <div className="header">
      <img className="logo" src={ logo } alt="Around the US logo" />
      <ul>
        <li>{`${text}`}</li>
        <li className="header__link" onClick={onSignOut}>Log out</li>
        </ul>
    </div>
    )
  } else {
    return (
      <div className="header">
        <img className="logo" src={ logo } alt="Around the US logo" />
        <NavLink className="header__link" to={ `${link}` }>
            {text}
        </NavLink>
      </div>
    )
  }
}

export default Header;
