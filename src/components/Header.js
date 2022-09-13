import React, { useState } from "react";
import logo from "../images/logo.svg";
import hamburgerOpen from "../images/hamburgerOpen.svg";
import hamburgerClose from "../images/hamburgerClose.svg";
import { Link } from "react-router-dom";

function Header({ loggedIn, navText, path }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const email = "cheezumcali23@gmail.com";

  function handleHamburgerClick() {
    setIsHamburgerOpen(!isHamburgerOpen);
  }

  return (
    <>
      {loggedIn && (
        <div
          className={`header__dropdown ${
            isHamburgerOpen && "header__dropdown_receptive"
          } `}
        >
          <p className="header__dropdown-email">{email}</p>
          <Link className="header__dropdown-link">{navText}</Link>
        </div>
      )}
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Around the U.S Logo" />
        </Link>
        {loggedIn ? (
          <div>
            <nav className="header__nav-overlay">
              <p className="header__email">{email}</p>
              <Link to={path} className="header__link">
                {navText}
              </Link>
            </nav>
            <button
              className="header__hamburger"
              onClick={handleHamburgerClick}
            >
              <img
                className="header__hamburger-icon"
                src={!isHamburgerOpen ? hamburgerOpen : hamburgerClose}
                alt="Hamburger Icon"
              />
            </button>
          </div>
        ) : (
          <nav className="header__nav-overlay">
            <Link to={path} className="header__link header__link_loggedout">
              {navText}
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}

export default Header;
