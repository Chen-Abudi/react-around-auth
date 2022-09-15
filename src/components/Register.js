import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthForm from "./AuthForm";
import { register } from "../utils/auth";

function Register({ showTooltip }) {
  const history = useHistory();

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

    register(email, password)
      .then((res) => {
        if (res) {
          showTooltip(true, "registered");
          setEmail("");
          setPassword("");
          history.push("/signin");
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
      title="Sign up"
      button="Sign up"
      subtitle="Already a member? Log in here!"
      path="/signin"
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      formRef={authForm}
      handleFormSubmit={handleFormSubmit}
    />
  );
}

export default Register;
