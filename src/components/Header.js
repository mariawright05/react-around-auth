import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import CurrentUserContext from '../contexts/CurrentUserContext';
import logo from '../images/usa-logo-white.svg';

function Header(props) {
  const currentUser = CurrentUserContext;

  const history = useHistory();

  function signOut() {
    localStorage.removeItem('jwt');
    props.handleLogout();
    history.push('/login');
  }

  return (
    <header className="header">
      <img className="logo" src={logo} alt="Around the US logo" />
      <ul>
        <li>{currentUser.email}</li>
        <li>
          <button onClick={signOut} type="button">
            Log out
          </button>
        </li>
      </ul>
    </header>
  );
}

Header.propTypes = { handleLogout: PropTypes.func };
Header.defaultProps = { handleLogout: () => {} };

export default Header;
