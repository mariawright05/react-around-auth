/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import Header from './Header';
import * as auth from '../utils/auth';
import PropTypes from 'prop-types';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          throw new Error('Something went wrong');
        }
        return res; 
      })
      .then(resetForm()) 
      .then(() => history.push('/main')) 
      .catch(err => setMessage(err.message));      
  }

  useEffect(() => {
    console.log('useEffect working');
    if (localStorage.getItem('jwt')) {
      console.log('useEffect working');
      history.push('/main');
    }
  }, [history])

  return (
    <div>
      <Header text="Log in" link="/signin"></Header>
      <div className="form__container">
        <form action="submit" onSubmit={handleSubmit} className="popup__form">
          <h3 className="form__heading">Sign up</h3>
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
          <input type="submit" className="form__button" value="Sign up" />
          <Link className="form__message" to='/signin'>Already a member? Log in here!</Link>
        </form>
      </div>
    </div>
  );
};

Register.propTypes = { onSubmit: PropTypes.func };
Register.defaultProps = { onSubmit: () => {} };

export default Register;
