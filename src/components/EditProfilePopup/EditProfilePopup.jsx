import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useForm } from '../../hooks/useForm';


function EditProfilePopup({
  openPopup,
  closePopup,
  onUpdateUser,
  onOverlayClick,
  onDisabled }) {

  const { name, about } = React.useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values)
  }

  React.useEffect(() => {
    if ({ name, about }) {
      setValues({ name, about });
    }

  }, [openPopup, name, about]);

  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактировать профиль"}
      openPopup={openPopup}
      closePopup={closePopup}
      buttonText={'Сохранить'}
      onSubmit={handleSubmit}
      disabled={onDisabled}
      onOverlayClick={onOverlayClick}

    >

      <input
        value={values.name ?? ''}
        id="name"
        type="text"
        minLength="2"
        maxLength="40"
        name="name"
        placeholder="Имя"
        className="popup__input popup__input_name" required
        onChange={handleChange}
      />
      <span className="popup__error popup__error_name">
      </span>
      <input
        value={values.about ?? ''}
        id="mission"
        type="text"
        minLength="2"
        maxLength="200"
        name="about"
        placeholder="О себе"
        className="popup__input popup__input_mission" required
        onChange={handleChange}
      />
      <span className="popup__error popup__error_mission">
      </span>
    </PopupWithForm >
  );
}

export default EditProfilePopup;
