import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthForm from "./AuthForm";
import { login } from "../utils/auth";

function Login({ setLoggedIn, showTooltip }) {
  const history = useHistory();
  // States for auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const authForm = useRef();

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
  );
}

export default Login;
