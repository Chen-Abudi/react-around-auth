import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
// import formText from "../utils/utils";
// import InfoToolTip from "./InfoToolTip";

function AuthForm({
  title,
  button,
  subtitle,
  path,
  email,
  setEmail,
  password,
  setPassword,
  formRef,
  handleFormSubmit,
}) {
  // const history = useHistory();

  // // User states
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // // Info tooltip states
  // const [isSuccess, setIsSuccess] = useState(true);
  // const authForm = useRef();
  // const redirectPath = role === "register" ? "/signin" : "/";

  // function updateSuccessMessage() {
  //   setIsToolTipActionText(role === "login" ? "logged in" : "registered");
  // }

  // const { title, button, subtitle, path } = formText[role];

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     if (isToolTipOpen) {
  //       closeAllPopups();
  //     }
  //   }, 2000);
  // }, [closeAllPopups, isToolTipOpen]);

  // function showTooltip(isSuccessful) {
  //   window.addEventListener("keydown", handleEscapeClose);
  //   window.addEventListener("mousedown", handleOverlayClose);
  //   setIsSuccess(isSuccessful);
  //   setIsInfoToolTipOpen(true);
  // }

  // function handleFormSubmit(evt) {
  //   evt.preventDefault();
  //   // If form is invalid then prevent it submittion
  //   if (!authForm.current.checkValidity()) {
  //     authForm.current.reportValidity();
  //     return;
  //   }

  //   handleAuth(email, password)
  //     .then((res) => {
  //       if (res) {
  //         updateSuccessMessage();
  //         showTooltip(true);
  //         role === "login" && setLoggedIn(true);
  //         setEmail("");
  //         setPassword("");
  //         history.push(redirectPath);
  //       } else {
  //         // Tooltip for failure is shown
  //         console.log("What is happening here?");
  //         showTooltip(false);
  //       }
  //     })
  //     .catch((err) => {
  //       showTooltip(false);
  //     });
  //   // .catch((err) => console.log(err));
  // }

  {
    /* <InfoToolTip
        isOpen={isToolTipOpen}
        isSuccess={isSuccess}
        onClose={closeAllPopups}
        action={isToolTipActionText}
      /> */
  }

  return (
    <div className="auth">
      <form
        className="auth__form"
        action="login"
        ref={formRef}
        onSubmit={handleFormSubmit}
      >
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
        <button className="auth__button" type="submit">
          {button}
        </button>
        <Link to={path} className="auth__subtitle">
          {subtitle}
        </Link>
      </form>
      {/* <InfoToolTip
        isOpen={isToolTipOpen}
        isSuccess={isSuccess}
        onClose={closeAllPopups}
        action={isToolTipActionText}
      /> */}
    </div>
  );
}

export default AuthForm;
