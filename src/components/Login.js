import React from 'react';
import PropTypes from 'prop-types';
// import CurrentUserContext from '../contexts/CurrentUserContext';

const Login = ({ onSubmit }) => {
  // const currentUserContext = useContext(CurrentUserContext);
  // const { email, password } = currentUserContext;

  return (
    <div className="form__container">
      <form action="submit" onSubmit={onSubmit} className="popup__form">
        <h3 className="form__heading">Log in</h3>
        <fieldset className="form__fields-container">
          <div className="form__label">
            <input
              id="email"
              type="text"
              name="email"
              className="form__field"
              placeholder="Email"
              required
              // onChange={ handleUserNameChange }
            />
          </div>
          <div className="form__label">
            <input
              id="password"
              type="text"
              name="password"
              className="form__field"
              placeholder="Password"
              required
              // onChange={ handleUserAboutChange }
            />
          </div>
        </fieldset>
        <input type="submit" className="form__button" value="Log in" />
        <p className="form__message">Not a member yet? Sign up here!</p>
      </form>
    </div>
  );
};

Login.propTypes = { onSubmit: PropTypes.func };
Login.defaultProps = { onSubmit: () => {} };

export default Login;
