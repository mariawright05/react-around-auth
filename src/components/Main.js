/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
  handleEditAvatarClick,
  handleEditProfileClick,
  handleAddPlaceClick,
  handleCardClick,
  cards,
  handleCardLike,
  handleCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__user-container">
          <div className="profile__avatar-container">
            <img
              className="profile__user-avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
              alt={currentUser.name}
            />
            <button
              className="profile__user-avatar_overlay"
              onClick={handleEditAvatarClick}
              type="button"
            />
          </div>
          <div className="profile__user-info">
            <h1 className="profile__user-name">{currentUser.name}</h1>
            <p className="profile__user-about">{currentUser.about}</p>
            <button
              className="profile__edit-button"
              onClick={handleEditProfileClick}
              type="button"
            />
          </div>
        </div>
        <button
          className="profile__add-button"
          onClick={handleAddPlaceClick}
          type="button"
        />
      </section>

      <section>
        <ul className="photo-grid">
          {cards.map((card) => (
            <Card
              key={card.id} // was {index}
              card={card}
              name={card.name}
              link={card.link}
              likes={card.likes}
              _id={card._id}
              owner={card.owner}
              onCardClick={() => handleCardClick(card.link, card.name)}
              onCardLike={() => handleCardLike(card)}
              onCardDelete={() => handleCardDelete(card)}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

Main.propTypes = {
  handleEditAvatarClick: PropTypes.func,
  handleEditProfileClick: PropTypes.func,
  handleAddPlaceClick: PropTypes.func,
  handleCardClick: PropTypes.func,
  cards: PropTypes.arrayOf(PropTypes.object),
  handleCardLike: PropTypes.func,
  handleCardDelete: PropTypes.func
};

Main.defaultProps = {
  handleEditAvatarClick: () => {},
  handleEditProfileClick: () => {},
  handleAddPlaceClick: () => {},
  handleCardClick: () => {},
  cards: [],
  handleCardLike: () => {},
  handleCardDelete: () => {}
};

export default Main;
