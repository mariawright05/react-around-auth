/* eslint-disable */
import React from 'react';
import successIcon from '../images/success-icon.svg';
import errorIcon from '../images/error-icon.svg';

function InfoTooltip({ isOpen, onClose, isSuccessful }) {

  return (
    <div
      className={`popup popup_type_tooltip ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <img
        className="popup__icon"
        src={isSuccessful ? successIcon : errorIcon}
      />
      <p className="popup__heading popup__heading_type_no-inputs">
        {isSuccessful ? 'Success! You have now been registered.' : 'Oops, something went wrong! Try again.'}
      </p>

      <button className="popup__close-button" onClick={onClose} />
    </div>
  );
}

export default InfoTooltip;