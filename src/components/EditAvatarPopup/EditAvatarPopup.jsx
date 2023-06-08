import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm'


function EditAvatarPopup({
  openPopup,
  closePopup,
  onUpdateAvatar,
  onOverlayClick,
  onDisabled }) {

  const inputAvatarRef = React.useRef(null);

  const handleSubmit = (e) => {

    e.preventDefault();

    onUpdateAvatar(
      {
        avatarLink: inputAvatarRef.current.value
      }
    )
  }

  const resetForm = () => {
    inputAvatarRef.current.value = '';
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      openPopup={openPopup}
      closePopup={closePopup}
      buttonText={'Сохранить'}
      disabled={onDisabled}
      onSubmit={handleSubmit}
      onOverlayClick={onOverlayClick}
      resetForm={resetForm}
    >
      <input
        id="link-avatar"
        type="url"
        name="avatarLink"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_link" required
        ref={inputAvatarRef}
      />
      <span className="popup__error popup__error_link-avatar">
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
