/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({
  card,
  link,
  name,
  likes,
  onCardClick,
  onCardLike,
  onCardDelete
}) {
  // USER INFO
  const currentUser = React.useContext(CurrentUserContext);

  // Checking if you are the owner of the current card
  const isOwn = card.owner._id === currentUser._id;

  // Creating a variable which you'll then set
  // in `className` for the delete button
  const cardDeleteButtonClassName = `${
    isOwn ? 'photo-grid__remove' : 'photo-grid__remove_hidden'
  }`;

  // LIKE INFO
  // Check if the card was liked by the current user
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = isLiked
    ? 'photo-grid__like photo-grid__like_true'
    : 'photo-grid__like';

  // Opens card popup on click
  function handleClick() {
    onCardClick(card);
  }

  // Changes likes on click
  function handleLikeClick() {
    onCardLike(card);
  }

  // Deletes card on trash click
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="photo-grid__item">
      <div
        className="photo-grid__image"
        style={{ backgroundImage: `url(${link})` }}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      />
      <div className="photo-grid__title-container">
        <h2 className="photo-grid__title">{name}</h2>
        <div className="photo-grid__like-wrapper">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          />
          <p className="photo-grid__like-count">{likes.length}</p>
        </div>
      </div>
    </li>
  );
}

Card.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
    likes: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
    onCardClick: PropTypes.func,
    onCardLike: PropTypes.func,
    onCardDelete: PropTypes.func
  }),
  name: PropTypes.string,
  link: PropTypes.string,
  likes: PropTypes.string,
  _id: PropTypes.string,
  owner: PropTypes.string,
  onCardClick: PropTypes.func,
  onCardLike: PropTypes.func,
  onCardDelete: PropTypes.func
};

Card.defaultProps = {
  card: {},
  name: '',
  link: '',
  likes: '',
  _id: '',
  owner: '',
  onCardClick: () => {},
  onCardLike: () => {},
  onCardDelete: () => {}
};

export default Card;
