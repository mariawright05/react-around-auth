import React from 'react';
import PropTypes from 'prop-types';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, handleUpdateAvatar }) {
  const avatarInput = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar(avatarInput.current.value);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Change profile picture"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__info">
        <div className="popup__label">
          <input
            ref={avatarInput}
            id="profile-avatar"
            type="url"
            name="avatar"
            className="popup__field popup__field_type_url"
            placeholder="Profile picture URL"
            required
          />
          <span id="profile-avatar-error" className="popup__error" />
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

EditAvatarPopup.propTypes = {
  handleUpdateAvatar: PropTypes.func,
  isOpen: PropTypes.func,
  onClose: PropTypes.func
};

EditAvatarPopup.defaultProps = {
  handleUpdateAvatar: () => {},
  isOpen: () => {},
  onClose: () => {}
};

export default EditAvatarPopup;
