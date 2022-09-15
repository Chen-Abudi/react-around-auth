import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthForm from "./AuthForm";
import { login } from "../utils/auth";
// import formText from '../utils/utils';
// import InfoTooltip from './InfoTooltip';

function Login({ setLoggedIn, showTooltip }) {
  const history = useHistory();
  // States for auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const [isSuccess, setIsSuccess] = useState(true);
  const authForm = useRef();

  // const redirectPath = role === "register" ? "/signin" : "/";

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     if (isToolTipOpen) {
  //       closeAllPopups();
  //     }
  //   }, 2000);
  // }, [closeAllPopups, isToolTipOpen]);

  // function updateSuccessMessage() {
  //   setIsToolTipActionText(role === "login" ? "logged in" : "registered");
  // }

  // function showTooltip(isSuccessful) {
  //   window.addEventListener("keydown", handleEscapeClose);
  //   window.addEventListener("mousedown", handleOverlayClose);
  //   setIsSuccess(isSuccessful);
  //   setIsInfoToolTipOpen(true);
  // }

  function handleFormSubmit(evt) {
    evt.preventDefault();

    // If form is invalid then prevent it submittion
    if (!authForm.current.checkValidity()) {
      authForm.current.reportValidity();
      return;
    }

    login(email, password)
      .then((res) => {
        if (res) {
          // updateSuccessMessage();
          showTooltip(true, "loggen in");
          setLoggedIn(true);
          setEmail("");
          setPassword("");
          history.push("/");
        } else {
          // Tooltip for failure is shown
          showTooltip(false, "");
        }
      })
      .catch((err) => {
        showTooltip(false, "");
      });
    // .catch((err) => console.log(err));
  }

  return (
    <AuthForm
      title="Log in"
      button="Log in"
      subtitle="Not a member yet? Sign up here!"
      path="/signup"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      formRef={authForm}
      handleFormSubmit={handleFormSubmit}
    />

    // <div className="auth">
    //   <form
    //     className="auth__form"
    //     action="login"
    //     ref={formRef}
    //     onSubmit={handleFormSubmit}
    //   >
    //     <h1 className="auth__title">{title}</h1>
    //     <div className="auth__input-overlay">
    //       <input
    //         className="auth__input"
    //         type="email"
    //         name="email"
    //         value={email}
    //         placeholder="Email"
    //         onChange={(evt) => setEmail(evt.target.value)}
    //         required
    //       />
    //       <input
    //         className="auth__input"
    //         type="password"
    //         name="password"
    //         value={password}
    //         placeholder="Password"
    //         onChange={(evt) => setPassword(evt.target.value)}
    //         required
    //       />
    //     </div>
    //     <button className="auth__button" type="submit">
    //       {button}
    //     </button>
    //     <Link to={path} className="auth__subtitle">
    //       {subtitle}
    //     </Link>
    //   </form>
    //   {/* <InfoToolTip
    //     isOpen={isToolTipOpen}
    //     isSuccess={isSuccess}
    //     onClose={closeAllPopups}
    //     action={isToolTipActionText}
    //   /> */}
    // </div>
  );
}

export default Login;
