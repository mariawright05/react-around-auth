import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');
  const { handleAddPlaceSubmit, isOpen, onClose } = props;

  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
  };

  const handleCardLinkChange = (e) => {
    setCardLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    handleAddPlaceSubmit({
      name: cardName,
      link: cardLink
    });
  }

  return (
    <PopupWithForm
      name="add-card"
      title="New Place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__info">
        <div className="popup__label">
          <input
            id="card-title"
            type="text"
            name="title"
            className="popup__field popup__field_type_card-title"
            placeholder="Title"
            required
            minLength="1"
            maxLength="30"
            onChange={handleCardNameChange}
          />
          <span id="card-title-error" className="popup__error" />
        </div>
        <div className="popup__label">
          <input
            id="card-url"
            type="url"
            name="url"
            className="popup__field popup__field_type_url"
            placeholder="Image link"
            required
            onChange={handleCardLinkChange}
          />
          <span id="card-url-error" className="popup__error" />
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

AddPlacePopup.propTypes = {
  handleAddPlaceSubmit: PropTypes.func,
  isOpen: PropTypes.func,
  onClose: PropTypes.func
};

AddPlacePopup.defaultProps = {
  handleAddPlaceSubmit: () => {},
  isOpen: () => {},
  onClose: () => {}
};

export default AddPlacePopup;
