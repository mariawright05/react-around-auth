/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';

function PopupWithForm({
  formName,
  isOpen,
  onClose,
  onSubmit,
  title,
  children
}) {
  return (
    <div
      className={`popup popup_type_${formName} ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__container popup__profile-wrapper">
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button"
        />
        <form action="submit" onSubmit={onSubmit} className="popup__form">
          <h3 className="popup__heading">{title}</h3>
          {children}
          <input type="submit" className="popup__button" value="Save" />
        </form>
      </div>
    </div>
  );
}

PopupWithForm.propTypes = {
  formName: PropTypes.string,
  isOpen: PropTypes.func,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node.isRequired
};

PopupWithForm.defaultProps = {
  formName: '',
  isOpen: () => {},
  onClose: () => {},
  onSubmit: () => {},
  title: ''
};

export default PopupWithForm;
