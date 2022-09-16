// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// function Login() {
//   const [values, setValues] = useState({ email: "", password: "" });

//   function handleChange(evt) {
//     const name = evt.target.name.split("-").pop();
//     setValues({ ...values, [name]: evt.target.value });
//   }

//   return (
//     <form className="form" name="form-register">
//       <h2 className="form__title">Log in</h2>
//       <input
//         onChange={handleChange}
//         name="email-login"
//         id="email-login"
//         className="form__input"
//         aria-label="Email"
//         placeholder="Email"
//         type="email"
//         required
//       />
//       <input
//         onChange={handleChange}
//         name="password-login"
//         id="password-login"
//         className="form__input"
//         aria-label="Password"
//         placeholder="Password"
//         type="password"
//         required
//       />
//       <button className="form__button" type="submit" name="submit-login">
//         Log in
//       </button>
//       <Link to="/signup" className="form__text link">
//         Not a member yet? Sign up here!
//       </Link>
//     </form>
//   );
// }

// export default Login;

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
      subtitle="Not a member? Sign up here!"
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
