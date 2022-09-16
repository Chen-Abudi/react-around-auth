// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// function Register() {
//   const [values, setValues] = useState({ email: "", password: "" });

//   function handleChange(evt) {
//     const name = evt.target.name.split("-").pop();
//     setValues({ ...values, [name]: evt.target.value });
//   }

//   return (
//     <form className="form" name="form-register">
//       <h2 className="form__title">Sign up</h2>
//       <input
//         onChange={handleChange}
//         name="email-signup"
//         id="email-signup"
//         className="form__input"
//         aria-label="Email"
//         placeholder="Email"
//         type="email"
//         minLength="5"
//         maxLength="320"
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
//         minLength="10"
//         maxLength="256"
//         required
//       />
//       <button className="form__button" type="submit" name="submit-login">
//         Sign up
//       </button>
//       <Link to="/signin" className="form__text link">
//         Already a member? Log in here!
//       </Link>
//     </form>
//   );
// }

// export default Register;

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
