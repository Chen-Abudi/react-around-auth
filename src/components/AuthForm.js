import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import formText from "../utils/utils";
import InfoToolTip from "./InfoToolTip";

function AuthForm({
  handleAuth,
  role,
  closeAllPopups,
  isToolTipOpen,
  setIsInfoToolTipOpen,
  isToolTipActionText,
  setIsToolTipActionText,
  setLoggedIn,
}) {
  const history = useHistory();

  // User states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Info tooltip states
  const [isSuccess, setIsSuccess] = useState(true);
  const authForm = useRef();
  const redirectPath = role === "register" ? "/signin" : "/";

  function updateSuccessMessage() {
    setIsToolTipActionText(role === "login" ? "logged in" : "registered");
  }

  // const { title, button, subtitle, path } = formText[role];

  function showTooltip(isSuccessful) {
    setIsSuccess(isSuccessful);
    setIsInfoToolTipOpen(true);

    setTimeout(() => {
      setIsInfoToolTipOpen(false);
    }, 1500);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    // If form is invalid then prevent it submittion
    if (!authForm.current.checkValidity()) {
      authForm.current.reportValidity();
      return;
    }

    handleAuth(email, password)
      .then((res) => {
        if (res) {
          updateSuccessMessage();
          setEmail("");
          setPassword("");
          role === "login" && setLoggedIn(true);
          showTooltip(true);
          history.push(redirectPath);
        } else {
          // Tooltip for failure is shown
          showTooltip(false);
        }
      })
      .catch((err) => {
        showTooltip(false);
      });
    // .catch((err) => console.log(err));
  }

  return (
    <div className="auth">
      <form className="auth__form" action="login" ref={authForm}>
        <h1 className="auth__title">{title}</h1>
        <div className="auth__input-overlay">
          <input
            className="auth__input"
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(evt) => setEmail(evt.target.value)}
            required
          />
          <input
            className="auth__input"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(evt) => setPassword(evt.target.value)}
            required
          />
        </div>
        <button
          className="auth__button"
          type="submit"
          onClick={handleFormSubmit}
        >
          {button}
        </button>
        <Link to={path} className="auth__subtitle">
          {subtitle}
        </Link>
      </form>
      <InfoToolTip
        isOpen={isToolTipOpen}
        isSuccess={isSuccess}
        onClose={closeAllPopups}
        action={isToolTipActionText}
      />
    </div>
  );
}

export default AuthForm;
