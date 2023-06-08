import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm'

function DeletePlacePopup({
  openPopup,
  closePopup,
  onConfirmDeleteCard,
  onOverlayClick,
  onDisabled }) {




  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmDeleteCard();
  }


  return (
    <PopupWithForm
      name={"trash"}
      title={"Вы уверены?"}
      openPopup={openPopup}
      closePopup={closePopup}
      buttonText={'Да'}
      onSubmit={handleSubmit}
      disabled={onDisabled}
      onOverlayClick={onOverlayClick}
    ></PopupWithForm>

  );
}

export default DeletePlacePopup;

