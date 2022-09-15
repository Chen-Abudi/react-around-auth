import React, { useState, useEffect, useCallback } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import RemovePlacePopup from "./RemovePlacePopup";

import ProtectedRoute from "./ProtectedRoute";
import { checkToken } from "../utils/auth";
import Register from "./Register";
import Login from "./Login";
import InfoToolTip from "./InfoToolTip";
import Error from "./Error";

import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
// import { register, login, checkToken } from "../utils/auth";
import AuthorizationRoute from "./AuthorizationRoute";

function App() {
  // Popup windows States
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImageExhibitPopupOpen, setIsImageExhibitPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = useState(false);

  // UX States
  const [isToolTipActionText, setIsToolTipActionText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Cards States
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [selectedCardToRemove, setSelectedCardToRemove] = useState();
  const [cards, setCards] = useState([]);

  // User States
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkToken()
        .then((res) => {
          setUserEmail(res.data.email);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.error(`Validation error: ${err}`);
          handleLogout();
          history.push("/signin");
        });
    }
  }, [history, loggedIn]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialcards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    function handleOverlayClose(evt) {
      if (evt.target.classList.contains("popup_receptive")) {
        closeAllPopups();
      }
    }

    function handleEscapeClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if (
      [
        isEditProfilePopupOpen,
        isAddPlacePopupOpen,
        isEditAvatarPopupOpen,
        isImageExhibitPopupOpen,
        isRemovePlacePopupOpen,
      ]
    ) {
      document.addEventListener("mousedown", handleOverlayClose);
      document.addEventListener("keydown", handleEscapeClose);
      // document.addEventListener("keydown", memorizedEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleOverlayClose);
      document.removeEventListener("keydown", handleEscapeClose);
      // document.removeEventListener("keydown", memorizedEscape);
    };
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isImageExhibitPopupOpen,
    isRemovePlacePopupOpen,
  ]);

  function handleShowTooltip(success, text) {
    memorizedEscapeClose();
    memorizedOverlayClose();
    setIsSuccess(success);
    setIsToolTipActionText(text);
    setIsInfoToolTipOpen(true);

    setTimeout(() => {
      closeAllPopups();
    }, 2000);
  }

  const memorizedEscapeClose = useCallback((evt) => {
    evt.key === "Escape" && closeAllPopups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memorizedOverlayClose = useCallback((evt) => {
    evt.target.classList.contains("popup") && closeAllPopups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserEmail("");
  }

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    // Send a request to the API and getting the updated card data
    api
      .cardLike(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        );
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .removeCard(card._id)
      .then(() => {
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== card._id
        );
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api
      .setUserInfo(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    api
      .addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatarData) {
    setIsLoading(true);
    api
      .setUserAvatar(avatarData)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImageExhibitPopupOpen(true);
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
  }

  function handleRemovePlaceClick(card) {
    setSelectedCardToRemove(card);
    setIsRemovePlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImageExhibitPopupOpen(false);
    setIsRemovePlacePopupOpen(false);
    setIsInfoToolTipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <AuthorizationRoute path="/signin" loggedIn={loggedIn}>
          <Header
            loggedIn={loggedIn}
            path="/signup"
            navText="Sign Up"
            userEmail={userEmail}
          />
          <Login
            setLoggedIn={setLoggedIn}
            // closeAllPopups={closeAllPopups}
            // isToolTipOpen={isInfoToolTipOpen}
            // setIsInfoToolTipOpen={setIsInfoToolTipOpen}
            // isToolTipActionText={isToolTipActionText}
            // setIsToolTipActionText={setIsToolTipActionText}
            // handleEscapeClose={memorizedEscapeClose}
            // handleOverlayClose={memorizedOverlayClose}
            showTooltip={handleShowTooltip}
          />
        </AuthorizationRoute>
        <AuthorizationRoute path="/signup" loggedIn={loggedIn}>
          <Header
            loggedIn={loggedIn}
            path="/signin"
            navText="Log in"
            userEmail={userEmail}
          />

          <Register
            setLoggedIn={setLoggedIn}
            // closeAllPopups={closeAllPopups}
            // isToolTipOpen={isInfoToolTipOpen}
            // setIsInfoToolTipOpen={setIsInfoToolTipOpen}
            // isToolTipActionText={isToolTipActionText}
            // setIsToolTipActionText={setIsToolTipActionText}
            // handleEscapeClose={memorizedEscapeClose}
            // handleOverlayClose={memorizedOverlayClose}
            showTooltip={handleShowTooltip}
          />
        </AuthorizationRoute>
        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
          <Header
            loggedIn={loggedIn}
            path="/signin"
            navText="Log Out"
            handleLogout={handleLogout}
            userEmail={userEmail}
          />
          <Main
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onEditAvatarClick={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleRemovePlaceClick}
            cards={cards}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <RemovePlacePopup
            isOpen={isRemovePlacePopupOpen}
            isLoading={isLoading}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            card={selectedCardToRemove}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImageExhibitPopupOpen}
            onClose={closeAllPopups}
          />
        </ProtectedRoute>
        <Route>
          <Header />
          <Error />
        </Route>
      </Switch>
      <InfoToolTip
        action={isToolTipActionText}
        isOpen={isInfoToolTipOpen}
        onClose={closeAllPopups}
        isSuccess={isSuccess}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
