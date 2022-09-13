import React, { useState } from "react";
import { Link } from "react-router-dom";
import formText from "../utils/utils";

function AuthForm({ handleSubmit, role }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { title, button, subtitle, path } = formText[role];

  return (
    <div className="auth">
      <form className="auth__form" action="login">
        <h1 className="auth__title">{title}</h1>
        <div className="auth__input-overlay">
          <input
            className="auth__input"
            type="text"
            name="email"
            value={email}
            placeholder="Email"
          />
          <input
            className="auth__input"
            type="text"
            name="password"
            value={password}
            placeholder="Password"
          />
        </div>
        <button className="auth__button" type="submit" onClick={handleSubmit}>
          {button}
        </button>
        <Link to={path} className="auth__subtitle">
          {subtitle}
        </Link>
      </form>
    </div>
  );
}

export default AuthForm;
