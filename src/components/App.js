import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";

import { auth } from "../utils/auth";

import { AccountContext } from "../contexts/AccountContext";
import ProtectedRoute from "./ProtectedRoute";

import Header from "./Header";
import Footer from "./Footer";

import AroundUS from "./AroundUS";
import Login from "./Login";
import Register from "./Register";

import InfoToolTip from "./InfoToolTip";

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);

  const [accountData, setAccountData] = useState({ _id: "", email: "" });

  // const [isTooltipSuccessOpen, setIsTooltipSuccessOpen] = useState(false);
  // const [isTooltipFailOpen, setIsTooltipFailOpen] = useState(false);
  // const [isTooltipInvalidOpen, setIsTooltipInvalidOpen] = useState(false);

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isInfoToolTipAction, setIsInfoToolTipAction] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setAccountData(res.data);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  const closeAllTooltips = () => {
    // setIsTooltipInvalidOpen(false);
    // setIsTooltipSuccessOpen(false);
    // setIsTooltipFailOpen(false);

    setIsInfoToolTipOpen(false);

    setListener(false);
  };

  const closeOnEscape = (evt) => {
    if (evt.key === "Escape") {
      closeAllTooltips();
    }
  };

  const setListener = (listen) => {
    listen
      ? document.addEventListener("keydown", closeOnEscape)
      : document.removeEventListener("keydown", closeOnEscape);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  };

  const login = (userData) => {
    setLoggedIn(true);
    setAccountData(userData);
    history.push("/");
  };

  const handleRegister = (credentials) => {
    setIsLoading(true);
    auth
      .register(credentials)
      .then((res) => {
        setIsInfoToolTipAction("successful");
        login(res.data);
      })
      .catch(() => {
        setIsInfoToolTipAction("unsuccessful");
      })
      .finally(() => {
        setListener(true);
        setIsLoading(false);

        setIsInfoToolTipOpen(true);
      });
  };

  function handleLogin(credentials) {
    setIsLoading(true);
    return auth
      .login(credentials)
      .then((res) => {
        login(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsInfoToolTipOpen(true);
        setIsInfoToolTipAction("unsuccessful");
        // setIsTooltipInvalidOpen(true);
        setListener(true);
        setIsLoading(false);
      });
  }

  const [isSuccess, setIsSuccess] = useState(true);

  function handleShowTooltip(success, text) {
    setIsSuccess(success);
    setIsInfoToolTipOpen(true);
    setIsInfoToolTipAction(text);

    // setIsTooltipInvalidOpen(text);
    // setIsTooltipInvalidOpen(true);
  }

  return (
    <AccountContext.Provider value={{ loggedIn, accountData }}>
      <div className="container">
        <Header
          handleLogout={handleLogout}
          loggedIn={loggedIn}
          userEmail={accountData.email}
        />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={AroundUS}
            loggedIn={loggedIn}
          />

          <Route path="/signin">
            <Login
              handleLogin={handleLogin}
              showTooltip={handleShowTooltip}
              isLoading={isLoading}
            />
          </Route>

          <Route path="/signup">
            <Register
              handleRegister={handleRegister}
              showTooltip={handleShowTooltip}
              isLoading={isLoading}
            />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>

        {/* <InfoToolTip
          type="success"
          isSuccess={isSuccess}
          isOpen={isTooltipSuccessOpen}
          onClose={closeAllTooltips}
        >
          Success! You have now been registered.
        </InfoToolTip>

        <InfoToolTip
          type="error"
          isSuccess={isSuccess}
          isOpen={isTooltipFailOpen}
          onClose={closeAllTooltips}
        >
          Oops, something went wrong! Please try again.
        </InfoToolTip>

        <InfoToolTip
          type="error"
          isSuccess={isSuccess}
          isOpen={isTooltipInvalidOpen}
          onClose={closeAllTooltips}
        >
          Oops, your email or password was incorrect! Please try again.
        </InfoToolTip> */}

        <InfoToolTip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllTooltips}
          action={isInfoToolTipAction}
          isToolTipOpen={isInfoToolTipOpen}
          name="tooltip"
        />
        <Footer />
      </div>
    </AccountContext.Provider>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import { Switch, Route, useHistory } from "react-router-dom";

// import Header from "./Header";
// import Main from "./Main";
// import Footer from "./Footer";

// import EditProfilePopup from "./EditProfilePopup";
// import EditAvatarPopup from "./EditAvatarPopup";
// import AddPlacePopup from "./AddPlacePopup";
// import ImagePopup from "./ImagePopup";
// import RemovePlacePopup from "./RemovePlacePopup";

// import ProtectedRoute from "./ProtectedRoute";
// // import AuthorizationRoute from "./AuthorizationRoute";

// import { CurrentUserContext } from "../contexts/CurrentUserContext";
// import InfoToolTip from "./InfoToolTip";
// // import Error from "./Error";

// import api from "../utils/api";

// import * as auth from "../utils/auth";
// import { checkToken } from "../utils/auth";
// import Register from "./Register";
// import Login from "./Login";

// function App() {
//   // Popup windows States
//   const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
//   const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
//   const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
//   const [isImageExhibitPopupOpen, setIsImageExhibitPopupOpen] = useState(false);
//   const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = useState(false);

//   const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);

//   // UX States
//   const [isToolTipActionText, setIsToolTipActionText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(true);

//   // Cards States
//   const [selectedCard, setSelectedCard] = useState({
//     name: "",
//     link: "",
//   });
//   const [selectedCardToRemove, setSelectedCardToRemove] = useState();
//   const [cards, setCards] = useState([]);

//   // User States
//   const [currentUser, setCurrentUser] = useState({});
//   const [userEmail, setUserEmail] = useState("");

//   // Auth States
//   const [loggedIn, setLoggedIn] = useState(false);
//   const history = useHistory();

//   useEffect(() => {
//     Promise.all([api.getUserInfo(), api.getInitialcards()])
//       .then(([user, cards]) => {
//         setCurrentUser(user);
//         setCards(cards);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       checkToken()
//         .then((res) => {
//           setUserEmail(res.data.email);
//           setLoggedIn(true);
//         })
//         .catch((err) => {
//           console.error(`Validation error: ${err}`);
//           handleLogout();
//           history.push("/signin");
//         });
//     }
//   }, [history, loggedIn]);

//   function handleLogout() {
//     localStorage.removeItem("token");
//     setLoggedIn(false);
//     setUserEmail("");
//   }

//   useEffect(() => {
//     function handleOverlayClose(evt) {
//       if (evt.target.classList.contains("popup_receptive")) {
//         closeAllPopups();
//       }
//     }

//     function handleEscapeClose(evt) {
//       if (evt.key === "Escape") {
//         closeAllPopups();
//       }
//     }

//     if (
//       [
//         isEditProfilePopupOpen,
//         isAddPlacePopupOpen,
//         isEditAvatarPopupOpen,
//         isImageExhibitPopupOpen,
//         isRemovePlacePopupOpen,
//       ]
//     ) {
//       document.addEventListener("mousedown", handleOverlayClose);
//       document.addEventListener("keydown", handleEscapeClose);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleOverlayClose);
//       document.removeEventListener("keydown", handleEscapeClose);
//     };
//   }, [
//     isEditProfilePopupOpen,
//     isAddPlacePopupOpen,
//     isEditAvatarPopupOpen,
//     isImageExhibitPopupOpen,
//     isRemovePlacePopupOpen,
//   ]);

//   function handleRegister({ email, password }) {
//     auth
//       .register(email, password)
//       .then((res) => {
//         if (res.data._id) {
//           setIsTooltipSuccessOpen(true);
//           history.push("signin");
//         } else {
//           setIsTooltipFailOpen(true);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//         setIsTooltipFailOpen(true);
//       });
//   }

//   function handleCardLike(card) {
//     // Check one more time if this card was already liked
//     const isLiked = card.likes.some((user) => user._id === currentUser._id);
//     // Send a request to the API and getting the updated card data
//     api
//       .cardLike(card._id, isLiked)
//       .then((newCard) => {
//         const newCards = cards.map((currentCard) =>
//           currentCard._id === card._id ? newCard : currentCard
//         );
//         setCards(newCards);
//       })
//       .catch((err) => console.log(err));
//   }

//   function handleCardDelete(card) {
//     setIsLoading(true);
//     api
//       .removeCard(card._id)
//       .then(() => {
//         const newCards = cards.filter(
//           (currentCard) => currentCard._id !== card._id
//         );
//         setCards(newCards);
//         closeAllPopups();
//       })
//       .catch((err) => console.log(err))
//       .finally(() => setIsLoading(false));
//   }

//   function handleUpdateUser(userData) {
//     setIsLoading(true);
//     api
//       .setUserInfo(userData)
//       .then((userInfo) => {
//         setCurrentUser(userInfo);
//         closeAllPopups();
//       })
//       .catch((err) => console.log(err))
//       .finally(() => setIsLoading(false));
//   }

//   function handleAddPlaceSubmit(cardData) {
//     setIsLoading(true);
//     api
//       .addCard(cardData)
//       .then((newCard) => {
//         setCards([newCard, ...cards]);
//         closeAllPopups();
//       })
//       .catch((err) => console.log(err))
//       .finally(() => setIsLoading(false));
//   }

//   function handleUpdateAvatar(avatarData) {
//     setIsLoading(true);
//     api
//       .setUserAvatar(avatarData)
//       .then((newAvatar) => {
//         setCurrentUser(newAvatar);
//         closeAllPopups();
//       })
//       .catch((err) => console.log(err))
//       .finally(() => setIsLoading(false));
//   }

//   function handleEditProfileClick() {
//     setIsEditProfilePopupOpen(true);
//   }

//   function handleAddPlaceClick() {
//     setIsAddPlacePopupOpen(true);
//   }

//   function handleEditAvatarClick() {
//     setIsEditAvatarPopupOpen(true);
//   }

//   function handleCardClick(card) {
//     setIsImageExhibitPopupOpen(true);
//     setSelectedCard({
//       name: card.name,
//       link: card.link,
//     });
//   }

//   function handleRemovePlaceClick(card) {
//     setSelectedCardToRemove(card);
//     setIsRemovePlacePopupOpen(true);
//   }

//   function handleShowTooltip(success, text) {
//     //  handleOverlayClose();
//     //  handleEscapeClose();
//     setIsSuccess(success);
//     setIsToolTipActionText(text);
//     setIsInfoToolTipOpen(true);

//     // setTimeout(() => {
//     //   closeAllPopups();
//     // }, 2000);
//   }

//   function closeAllPopups() {
//     setIsEditProfilePopupOpen(false);
//     setIsAddPlacePopupOpen(false);
//     setIsEditAvatarPopupOpen(false);
//     setIsImageExhibitPopupOpen(false);
//     setIsRemovePlacePopupOpen(false);
//     setIsInfoToolTipOpen(false);
//   }

//   return (
//     <CurrentUserContext.Provider value={currentUser}>
//       <Switch>
//         <AuthorizationRoute path="/signin" loggedIn={loggedIn}>
//           <Header
//             loggedIn={loggedIn}
//             path="/signup"
//             navText="Sign Up"
//             userEmail={userEmail}
//           />
//           <Login
//             setLoggedIn={setLoggedIn}
//             showTooltip={handleShowTooltip}
//             // closeAllPopups={closeAllPopups}
//             // isToolTipOpen={isInfoToolTipOpen}
//             // setIsInfoToolTipOpen={setIsInfoToolTipOpen}
//             // isToolTipActionText={isToolTipActionText}
//             // setIsToolTipActionText={setIsToolTipActionText}
//             // handleEscapeClose={memorizedEscapeClose}
//             // handleOverlayClose={memorizedOverlayClose}
//           />
//         </AuthorizationRoute>
//         <AuthorizationRoute path="/signup" loggedIn={loggedIn}>
//           <Header
//             loggedIn={loggedIn}
//             path="/signin"
//             navText="Log in"
//             userEmail={userEmail}
//           />

//           <Register
//             setLoggedIn={setLoggedIn}
//             showTooltip={handleShowTooltip}
//             // closeAllPopups={closeAllPopups}
//             // isToolTipOpen={isInfoToolTipOpen}
//             // setIsInfoToolTipOpen={setIsInfoToolTipOpen}
//             // isToolTipActionText={isToolTipActionText}
//             // setIsToolTipActionText={setIsToolTipActionText}
//             // handleEscapeClose={memorizedEscapeClose}
//             // handleOverlayClose={memorizedOverlayClose}
//           />
//         </AuthorizationRoute>
//         <ProtectedRoute exact path="/" loggedIn={loggedIn}>
//           <Header
//             loggedIn={loggedIn}
//             path="/signin"
//             navText="Log Out"
//             handleLogout={handleLogout}
//             userEmail={userEmail}
//           />
//           <Main
//             onEditProfileClick={handleEditProfileClick}
//             onAddPlaceClick={handleAddPlaceClick}
//             onEditAvatarClick={handleEditAvatarClick}
//             onCardClick={handleCardClick}
//             onCardLike={handleCardLike}
//             onCardDelete={handleRemovePlaceClick}
//             cards={cards}
//           />
//           <Footer />

//           <EditProfilePopup
//             isOpen={isEditProfilePopupOpen}
//             isLoading={isLoading}
//             onClose={closeAllPopups}
//             onUpdateUser={handleUpdateUser}
//           />

//           <AddPlacePopup
//             isOpen={isAddPlacePopupOpen}
//             isLoading={isLoading}
//             onClose={closeAllPopups}
//             onAddPlace={handleAddPlaceSubmit}
//           />

//           <EditAvatarPopup
//             isOpen={isEditAvatarPopupOpen}
//             isLoading={isLoading}
//             onClose={closeAllPopups}
//             onUpdateAvatar={handleUpdateAvatar}
//           />

//           <RemovePlacePopup
//             isOpen={isRemovePlacePopupOpen}
//             isLoading={isLoading}
//             onClose={closeAllPopups}
//             onCardDelete={handleCardDelete}
//             card={selectedCardToRemove}
//           />

//           <ImagePopup
//             card={selectedCard}
//             isOpen={isImageExhibitPopupOpen}
//             onClose={closeAllPopups}
//           />
//         </ProtectedRoute>
//         <Route>
//           <Header />
//           {/* <Error /> */}
//         </Route>
//       </Switch>
//       <InfoToolTip
//         action={isToolTipActionText}
//         isOpen={isInfoToolTipOpen}
//         onClose={closeAllPopups}
//         isSuccess={isSuccess}
//       />
//     </CurrentUserContext.Provider>

//   );
// }

// export default App;
