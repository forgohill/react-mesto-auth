import React from 'react';

const InfoTooltip = ({
  openPopup,
  closePopup,
  onOverlayClick,
  sourceInfoTooltips }) => {

  const { message, access } = sourceInfoTooltips;

  return (
    <div className={`popup popup_info-tool-tip ${openPopup ? "popup_opened" : ""}`}
      onClick={onOverlayClick}
    >
      <div className="popup__container">

        <div className={`popup__union ${access ? 'popup__union_type_access' : 'popup__union_type_fail'}`}>
        </div>

        <h2 className="popup__title popup__title_info-tool-tip">{`${message}`}</h2>

        <button
          type="button"
          name="button-close"
          aria-label="Закрыть окно"
          className="popup__close popup__close_edit links"
          onClick={closePopup}
        >
        </button>

      </div>
    </div>
  );
}

export default InfoTooltip;
