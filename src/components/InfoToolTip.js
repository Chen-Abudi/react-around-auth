import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import successfulIcon from "../images/successful.svg";
import failIcon from "../images/fail.svg";

function InfoToolTip({ isOpen, onClose, action }) {
  const success = action === "successful";

  useEffect(() => {
    if (isOpen) {
      const clock = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(clock);
    }
  });

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      // className="tooltip"
      name="tooltip"
      // title=""
    >
      <img
        className="tooltip__icon"
        src={success ? successfulIcon : failIcon}
        // alt="Tooltip Icon"
        alt={`${success ? "successful" : "unsuccessful"} attempt`}
      />
      <p className="tooltip__message">
        {success
          ? `Success! You have now been registered.`
          : `Oops, something went wrong! Please try again.`}
      </p>
    </PopupWithForm>
  );
}

export default InfoToolTip;
