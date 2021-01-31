/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';

const ImagePopup = (props) => {
  const { isOpen, onClose, link, name } = props;
  return (
    <div
      className={`popup popup_type_display-image ${
        isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className="popup__image-wrapper">
        <figure className="popup__figure">
          <img className="popup__image" src={link} alt={name} />
          <figcaption className="popup__image-caption">{name}</figcaption>
        </figure>
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button"
        />
      </div>
    </div>
  );
};

ImagePopup.propTypes = {
  isOpen: PropTypes.func,
  onClose: PropTypes.func,
  link: PropTypes.string,
  name: PropTypes.string
};

ImagePopup.defaultProps = {
  isOpen: () => {},
  onClose: () => {},
  link: '',
  name: ''
};

export default ImagePopup;
