import React, { useState } from "react";
import logo from "../images/logo.svg";
import hamburgerOpen from "../images/hamburgerOpen.svg";
import hamburgerClose from "../images/hamburgerClose.svg";
import { Link } from "react-router-dom";

function Header({ loggedIn, navText, handleLogout, path, userEmail }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  // const email = "cheezumcali23@gmail.com";

  function toggleHamburger() {
    setIsHamburgerOpen(!isHamburgerOpen);
  }

  function handleLogoutFromDropdown() {
    toggleHamburger();
    handleLogout();
  }

  return (
    <>
      {loggedIn && (
        <div
          className={`header__dropdown ${
            isHamburgerOpen && "header__dropdown_receptive"
          } `}
        >
          <p className="header__dropdown-email">{userEmail}</p>
          <Link
            className="header__dropdown-link"
            to={path}
            onClick={handleLogoutFromDropdown}
          >
            {navText}
          </Link>
        </div>
      )}
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Around the U.S Logo" />
        </Link>
        {loggedIn ? (
          <div>
            <nav className="header__nav-overlay">
              <p className="header__email">{userEmail}</p>
              <Link to={path} className="header__link" onClick={handleLogout}>
                {navText}
              </Link>
            </nav>
            <button className="header__hamburger" onClick={toggleHamburger}>
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
