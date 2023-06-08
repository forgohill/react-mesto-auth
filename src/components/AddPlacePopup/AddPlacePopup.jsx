import React from 'react';

import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useForm } from '../../hooks/useForm';


function AddPlacePopup({
  openPopup,
  closePopup,
  onUpdateCards,
  onOverlayClick,
  onDisabled }) {

  const { values, handleChange, resetForm } = useForm({});

  const handleAddPlaceSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    const { inputFoto, inputLink } = values;
    onUpdateCards({
      name: inputFoto,
      link: inputLink
    });
  }

  return (

    <PopupWithForm
      name={"add"}
      title={"Новое место"}
      openPopup={openPopup}
      closePopup={closePopup}
      buttonText={'Создать'}
      onSubmit={handleAddPlaceSubmit}
      disabled={onDisabled}
      onOverlayClick={onOverlayClick}
      resetForm={resetForm}
    >
      <input
        value={values.inputFoto ?? ''}
        id="foto"
        type="text"
        minLength="2"
        maxLength="30"
        name="inputFoto"
        placeholder="Название"
        className="popup__input popup__input_foto" required
        onChange={handleChange}
      />
      <span className="popup__error popup__error_foto">
      </span>
      <input
        value={values.inputLink ?? ''}
        id="link"
        type="url"
        name="inputLink"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_link" required
        onChange={handleChange}
      />
      <span className="popup__error popup__error_link">
      </span>
    </PopupWithForm>


  );
}

export default AddPlacePopup;
