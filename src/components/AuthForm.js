import React from "react";
import { Link } from "react-router-dom";

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
  isLoggedIn,
}) {
  // const [isSuccess, setIsSuccess] = useState(true);
  // const [isToolTipActionText, setIsToolTipActionText] = useState("");

  // function handleShowTooltip(success, text) {
  //   setIsSuccess(success);
  //   setIsToolTipActionText(text);
  //   // updateInfoTooltipState(true);
  //   setTimeout(() => {
  //     closeAllTooltips();
  //   }, 2000);
  // }

  return (
    <div className="auth">
      <h1 className="auth__title">{title}</h1>
      <form
        className="auth__form"
        action="login"
        ref={formRef}
        onSubmit={handleFormSubmit}
      >
        {/* <h1 className="auth__title">{title}</h1> */}
        {/* <div className="auth__input-overlay"> */}
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
        {/* </div> */}
        <footer className="auth__footer">
          <div className="auth__footer-overlay">
            <button className="auth__button" type="submit">
              {button}
            </button>
            <p className="auth__footer-subtitle">
              {/* {subtitle} */}
              <Link to={path} className="auth__subtitle">
                {subtitle}
              </Link>
            </p>
          </div>
        </footer>
        {/* <button className="auth__button" type="submit">
          {button}
        </button> */}
        {/* <Link to={path} className="auth__subtitle">
          {subtitle}
        </Link> */}
      </form>
    </div>

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

export default AuthForm;
