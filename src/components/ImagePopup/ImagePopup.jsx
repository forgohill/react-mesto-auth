import React from 'react';

function ImagePopup({ card, closePopup, onOverlayClick }) {


  return (
    card &&
    <div className={`popup popup_preview ${card ? "popup_opened" : ""}`}
      onClick={onOverlayClick}>
      <figure className="popup__figure">
        <img
          src={card.link}
          alt={card.name}
          className="popup__image" />
        <figcaption
          className="popup__figcaption">{card.name}</figcaption>
        <button
          type="button"
          name="button-close"
          aria-label="Закрыть окно"
          className="popup__close popup__close_edit links"
          onClick={closePopup}
        ></button>
      </figure>
    </div >

  );
}

export default ImagePopup;
