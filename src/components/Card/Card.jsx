import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card({
  item,
  onSelectedCard,
  onCardLike,
  onCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext);

  // обрабатоваем клик на кратинку
  const handleCardImageClick = () => {
    onSelectedCard(item);
  }

  // обрабатоваем клик на лайк
  const handleLikeClick = () => {
    onCardLike(item);
  }
  // обрабатоваем клик на мусорку
  const handleDeleteClick = () => {
    onCardDelete(item);
  }

  const isOwn = item.owner._id === currentUser._id;
  const isLiked = item.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `cards__btn-like ${isLiked && 'cards__btn-like_active'}`
  );

  return (

    <article className="grid-places__cards cards"
    >
      <img
        alt={item.name}
        className="cards__image"
        src={item.link}
        onClick={handleCardImageClick}
      />
      <div className="cards__wrapper">
        <h2 className="cards__title">{item.name}</h2>
        <div className="cards__container-like">

          <button
            type="button"
            aria-label="Понравилось"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}></button>
          <p className="cards__counter-like">{item.likes.length}</p>
        </div>
      </div>
      {isOwn && <button className="cards__trash links" onClick={handleDeleteClick}></button>};
    </article>

  );
}

export default Card;
