import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function PopupWithForm({
  name,
  title,
  openPopup,
  closePopup,
  buttonText,
  onSubmit,
  disabled,
  onOverlayClick,
  resetForm,
  ...props }) {

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (resetForm) {
      resetForm();
    }
  }, [currentUser, openPopup]);


  return (
    <div className={`popup popup_${name} ${openPopup ? "popup_opened" : ""}`}
      onClick={onOverlayClick}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>

        <form className={`popup__form popup__form_${name}`}
          name={`popup${name}`}
          method="post"
          onSubmit={onSubmit}
        >
          {props.children}

          <button
            disabled={disabled}
            type="submit"
            aria-label="Сохранить изменения в профиле"
            className="popup__submit">{buttonText || 'Сохранить'}</button>
        </form>

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

export default PopupWithForm;
