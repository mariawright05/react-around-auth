/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import Header from './components/Header.js';
import ProtectedRoute from './components/ProtectedRoute';
import Main from './components/Main.js';
import Register from './components/Register';
import Login from './components/Login';
import Footer from './components/Footer.js';
import PopupWithForm from './components/PopupWithForm.js';
import ImagePopup from './components/ImagePopup.js';
import CurrentUserContext from './contexts/CurrentUserContext';
import EditProfilePopup from './components/EditProfilePopup';
import EditAvatarPopup from './components/EditAvatarPopup';
import api from './utils/api.js';
import AddPlacePopup from './components/AddPlacePopup.js';
import { authorize, register, getContent } from './utils/auth.js';

function App() {

  // POPUPS
  // set states for popups
  const [isEditProfilePopopOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);

  // set states for image popups
  const [selectedLink, setSelectedLink] = useState('');
  const [selectedName, setSelectedName] = useState('');

  // set states for login
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const history = useHistory();

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
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  };

  // api functions for popup data
  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
    .then(res => {setCurrentUser({ name:res.name, about:res.about, avatar:res.avatar })})
    .then(() => {closeAllPopups()})
    .catch(err => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar(avatar)
    .then(res => {setCurrentUser({ name:res.name, about:res.about, avatar:res.avatar })})
    .then(() => {closeAllPopups()})
    .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(cardInfo) {
    api.addCard(cardInfo)
    .then(res => (setCards([...cards, res])))
    .then(() => {closeAllPopups()})
    .catch(err => console.log(err))
  }

  // CARD FUNCTIONALITY
  // likes and dislikes
  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    let res = !isLiked ? api.cardLikeAdd(card._id) : api.cardLikeRemove(card._id);

    res.then((newCard) => {
      // Create a new array based on the existing one and putting a new card into it
      const newCards = cards.map((c) => c._id === card._id ? newCard : c)
      // Update the state
      setCards(newCards);
    })
    .catch(err => console.log(err));
  }

  // trash
  function handleCardDelete(card) {
    api.removeCard(card._id)
    .then(() => {
      const newCardList = cards.filter((c) => c._id !== card._id);
      setCards(newCardList);
    })
    .catch(err => console.log(err));
  }

  // AUTH
  // see if user is logged in
  function handleLogin(e) {
    e.preventDefault();
    setLoggedIn(true);
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
       getContent(jwt)
        .then((res) => {
          userData = { email: res.email };
          setLoggedIn(true);
          setUserData(userData);
          history.push('/main');
        });
    }
  }, [loggedIn]);

  // Log user out
  const onSignOut = () => {
    localStorage.removeItem('jwt')
    setLoggedIn(false);
    history.push('/signin');
  }

  // GETTING INITIAL DATA FROM SERVER
  // initial cards
  const [cards, setCards] = useState([]);
  // add if (loggedIn), then [loggedIn]
  useEffect(() => {
    api.getCardList()
    .then((res) => {
      setCards(res.map((card) => ({
        link:card.link,
        name: card.name,
        likes: card.likes,
        _id: card._id,
        owner: card.owner
      })));
    })
    .catch(err => console.log(err))
  }, []);

  // initial user data
  const [currentUser, setCurrentUser] = React.useState({});
  
  useEffect(() => {
    api.getUserInfo()
    .then((res) => setCurrentUser(res))
    .catch(err => console.log(err))
  }, []);

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="page">
        <div className="page__container">
          <Switch>
            <Route exact path='/'>
              { loggedIn ? <Redirect to='/main' /> : <Redirect to='/signin' /> }
            </Route>
            <Route
              path="/main"
              render={() =>
                <Main
                  loggedIn={ loggedIn }
                  userData={ userData.email }
                  handleEditAvatarClick={ handleEditAvatarClick }
                  handleEditProfileClick={ handleEditProfileClick }
                  handleAddPlaceClick={ handleAddPlaceClick }
                  handleCardClick={ handleCardClick }
                  cards={ cards }
                  handleCardLike={ handleCardLike }
                  handleCardDelete={ handleCardDelete }
                  onSignOut={ onSignOut }
                />
              }
            />
            <Route path="/signup" component={Register} />
            <Route path="/signin"
              render={ () => 
                <Login handleLogin={ handleLogin } />
              }  />
          </Switch>
        
          <EditProfilePopup isOpen={isEditProfilePopopOpen} onClose={closeAllPopups} handleUpdateUser={handleUpdateUser} />
              
          <EditAvatarPopup isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } handleUpdateAvatar={ handleUpdateAvatar } />
          
          <AddPlacePopup isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups } handleAddPlaceSubmit={ handleAddPlaceSubmit } />
          
          <PopupWithForm name="delete-card" title="Are you sure?">
            <h3 className="popup__heading popup__heading_type_no-inputs">Are you sure?</h3>
          </PopupWithForm>

          <ImagePopup 
            onClose={closeAllPopups}
            isOpen={selectedCard}
            link={selectedLink}
            name={selectedName}
          />
        </div> 
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
