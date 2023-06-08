import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Card from '../Card/Card'

function Main({
  onChangeAvatar,
  onEditProfile,
  onAddCard,
  onConfirmDeleteCard,
  onSelectedCard,
  onCardLike,
  onCardDelete,
  cards }) {

  const cardList = cards.map((item) => {
    return (
      (<Card
        key={item._id}
        onSelectedCard={onSelectedCard}
        item={item}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        onConfirmDeleteCard={onConfirmDeleteCard}
      />)
    )
  });

  // глобальный контекст
  const currentUser = React.useContext(CurrentUserContext);

  return (

    <main className="main">

      <section className="profile">
        <div className="profile__container">
          <div className="profile__wrapper-avatar">
            <div
              className="profile__avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            ></div>
            <button
              type="button"
              className="profile__avatar-button links"
              onClick={onChangeAvatar}
            ></button>
          </div>
          <div className="profile__wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__mission">{currentUser.about}</p>
            <button
              type="button"
              name="button-edit"
              aria-label="Редактировать профиль"
              className="profile__btn-edit links"
              onClick={onEditProfile}
            ></button>
          </div>
        </div>
        <button
          type="button"
          name="button-add"
          aria-label="Добавить картинку"
          className="profile__btn-add links"
          onClick={onAddCard}
        ></button>
      </section>

      <section className="grid-places">
        {cardList}
      </section>

    </main >
  );
}

export default Main;
