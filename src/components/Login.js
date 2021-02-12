/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header';
import PropTypes from 'prop-types';
import * as auth from '../utils/auth';


const Login = ({ handleLogin }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setMessage('');
  }

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    auth.authorize(email, password) // A token is returned with no errors
      .then((data) => {
        if (!data) {
          throw new Error('User does not exist'); 
        }
        if (data.token) {
          console.log('there is a token!!'); // This doesn't happen
          handleLogin(); // ...so I assume this isn't getting called either
        }
      })
      .then(resetForm)
      .then(() => history.push('/main'))
      .catch(err => setMessage(err.message));
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      history.push('/main') // This is where I push to /main (instead of in handleLogin())
    }
  }, [])

  return (
    <div>
      <Header text="Sign up" link="/signup"></Header>
      <div className="form__container">
        <form action="submit" onSubmit={handleSubmit} className="popup__form">
          <h3 className="form__heading">Log in</h3>
          <fieldset className="form__fields-container">
            <div className="form__label">
              <input
                id="email"
                type="text"
                name="email"
                className="form__field"
                placeholder="Email"
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form__label">
              <input
                id="password"
                type="text"
                name="password"
                className="form__field"
                placeholder="Password"
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </fieldset>
          <input type="submit" className="form__button" value="Log in" />
          <Link className="form__message" to='signup'>Not a member yet? Sign up here!</Link>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = { onSubmit: PropTypes.func };
Login.defaultProps = { onSubmit: () => {} };

export default Login;
