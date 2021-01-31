/* eslint-disable no-console */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api';
import AddPlacePopup from './AddPlacePopup';

function App() {
  // initial user data
  const [currentUser, setCurrentUser] = React.useState({});
  // initial cards
  const [cards, setCards] = React.useState([]);

  // POPUPS
  // set states for popups
  const [isEditProfilePopopOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState(false);

  // set states for image popups
  const [selectedLink, setSelectedLink] = React.useState('');
  const [selectedName, setSelectedName] = React.useState('');

  // handler functions for popups
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (link, name) => {
    setSelectedCard(true);
    setSelectedLink(link);
    setSelectedName(name);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  };

  // api functions for popup data
  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar
        });
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatar(avatar)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          about: res.about,
          avatar: res.avatar
        });
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleAddPlaceSubmit(cardInfo) {
    api
      .addCard(cardInfo)
      .then((res) => setCards([...cards, res]))
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  // CARD FUNCTIONALITY
  // likes and dislikes
  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const res = !isLiked
      ? api.cardLikeAdd(card._id)
      : api.cardLikeRemove(card._id);

    res
      .then((newCard) => {
        // Create a new array based on the existing one
        // and put a new card into it
        // eslint-disable-next-line
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        // Update the state
        setCards(newCards);
      })
      .catch((err) => console.error(err));
  }

  // trash
  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const newCardList = cards.filter((c) => c._id !== card._id);
        setCards(newCardList);
      })
      .catch((err) => console.error(err));
  }

  // GETTING INITIAL DATA FROM SERVER

  React.useEffect(() => {
    api
      .getCardList()
      .then((res) => {
        setCards(
          res.map((card) => ({
            link: card.link,
            name: card.name,
            likes: card.likes,
            _id: card._id,
            owner: card.owner
          }))
        );
      })
      .catch((err) => console.error(err));
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((res) => setCurrentUser(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Switch>
            <Route exact path="/">
              <Header />
              <Main
                handleEditAvatarClick={handleEditAvatarClick}
                handleEditProfileClick={handleEditProfileClick}
                handleAddPlaceClick={handleAddPlaceClick}
                handleCardClick={handleCardClick}
                cards={cards}
                handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
              />
            </Route>
            <Route path="/signup">
              <Header />
              <Register />
            </Route>
            <Route path="/signin">
              <Header />
              <Login />
            </Route>
          </Switch>
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopopOpen}
          onClose={closeAllPopups}
          handleUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          handleUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          handleAddPlaceSubmit={handleAddPlaceSubmit}
        />

        <PopupWithForm name="delete-card" title="Are your sure?">
          <h3 className="popup__heading popup__heading_type_no-inputs">
            Are you sure?
          </h3>
        </PopupWithForm>

        <ImagePopup
          onClose={closeAllPopups}
          isOpen={selectedCard}
          link={selectedLink}
          name={selectedName}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
