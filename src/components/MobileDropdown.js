import React from "react";
import { Link } from "react-router-dom";

function MobileDropdown(props) {
  return (
    <div
      className={`header__mobile-dropdown ${
        props.isHamburgerOpen ? "header__mobile-dropdown_receptive" : ""
      } `}
    >
      <ul className="header__links-items header__links-items_mobile-dropdown">
        <li className="header__links-item">{props.userEmail}</li>
        <li className="header__links-item">
          <Link
            className="header__link"
            to="/signin"
            onClick={props.handleLogoutFromDropdown}
          >
            {props.navText}
          </Link>
        </li>
      </ul>
      <div className="divider divider_type_mobile-dropdown"></div>
    </div>
  );
}

export default MobileDropdown;
