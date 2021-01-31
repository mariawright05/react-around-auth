import React from 'react';
import PropTypes from 'prop-types';
// import CurrentUserContext from '../contexts/CurrentUserContext';

const Register = ({ onSubmit }) => {
  // const currentUserContext = useContext(CurrentUserContext);
  // const { email, password } = currentUserContext;

  return (
    <div className="form__container">
      <form action="submit" onSubmit={onSubmit} className="popup__form">
        <h3 className="form__heading">Sign up</h3>
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
        <input type="submit" className="form__button" value="Sign up" />
        <p className="form__message">Already a member? Log in here!</p>
      </form>
    </div>
  );
};

Register.propTypes = { onSubmit: PropTypes.func };
Register.defaultProps = { onSubmit: () => {} };

export default Register;
