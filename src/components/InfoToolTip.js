import React from "react";
import successfulImage from "../images/successful.svg";
import failImage from "../images/fail.svg";

function InfoToolTip({ isOpen, onClose, isSuccess, action }) {
  return (
    <div className={`popup popup_role_tooltip ${isOpen && "popup_receptive"}`}>
      <div className="popup__overlay popup__overlay_type_success">
        <img
          className="popup__success"
          src={isSuccess ? successfulImage : failImage}
          alt="Successful"
        />
        <p className="popup__message">
          {isSuccess
            ? `Success! You have now been ${action}.`
            : `Oops, something went wrong! Please try again.`}
        </p>
        <button
          type="button"
          className="popup__close-button popup__close_role_tooltip"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTip;
