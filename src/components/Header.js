import React from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header({ loggedIn, navText, path }) {
  const email = "cheezumcali23@gmail.com";
  return (
    <>
      {loggedIn && (
        <div className="header__dropdown header__dropdown_receptive">
          <p className="header__dropdown-email">{email}</p>
          <Link className="header__dropdown-link">{navText}</Link>
        </div>
      )}
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Around the U.S Logo" />
        </Link>
        {loggedIn ? (
          <nav className="header__nav-overlay">
            <p className="header__email">{email}</p>
            <Link to={path} className="header__link">
              {navText}
            </Link>
            <button className="header__menu-hamburger" />
          </nav>
        ) : (
          <nav className="header__nav-overlay">
            <Link to={path} className="header__link">
              {navText}
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}

export default Header;
