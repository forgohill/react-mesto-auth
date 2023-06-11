import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import api from '../utils/api';
import { checkToken } from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import ImagePopup from './ImagePopup/ImagePopup';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import Register from './Register/Register.jsx';
import Login from './Login/Login.jsx';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';

import DeletePlacePopup from './DeletePlacePopup/DeletePlacePopup.jsx';

function App() {
  // стейты для попапов
  const [isOpenedPopupChangeAvatar, setIsOpenedPopupChangeAvatar] = React.useState(false);
  const [isOpenedPopupEditProfile, setIsOpenedPopupEditProfile] = React.useState(false);
  const [isOpenedPopupAddCard, setIsOpenedPopupAddCard] = React.useState(false);
  const [isOpenedPopupConfirmDeleteCard, setIsOpenedPopupConfirmDeleteCard] = React.useState(false);
  // стетейт массив карточек
  const [cards, setCards] = React.useState([]);
  // стейт Context
  const [currentUser, setCurrentUser] = React.useState({});
  // стейт карточки
  const [selectedCard, setSelectedCard] = React.useState(null);
  // стейт для хранения карточки для удаления
  const [selectedConfirmDeleteCard, setSelectedConfirmDeleteCard] = React.useState(null);
  // стейт enable/disable
  const [isDisabled, setIsDisabled] = React.useState(false);
  // стейт навигации
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // стейт хранения email
  const [userEmail, setUserEmail] = React.useState('');

  // блок обработчиков кнопок
  const handleEditAvatarClick = () => {
    setIsDisabled(false);
    setIsOpenedPopupChangeAvatar(true);
  }

  const handleEditProfileClick = () => {
    setIsDisabled(false);
    setIsOpenedPopupEditProfile(true);
  }

  const handleAddCardClick = () => {
    setIsDisabled(false);
    setIsOpenedPopupAddCard(true);
  }

  // обработчик клика на карточку для открытия привью
  const handleCardImageClick = (item) => {
    setSelectedCard(item);
  }

  // закрытие по Escape
  const isOpen = isOpenedPopupChangeAvatar || isOpenedPopupEditProfile || isOpenedPopupAddCard || isOpenedPopupConfirmDeleteCard || selectedCard;
  React.useEffect(() => {
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  // закрытие по оверлею
  const handleOverlayClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  const closeAllPopups = () => {
    setIsOpenedPopupChangeAvatar(false);
    setIsOpenedPopupEditProfile(false);
    setIsOpenedPopupAddCard(false);
    setIsOpenedPopupConfirmDeleteCard(false);
    setSelectedCard(null);
    setSelectedConfirmDeleteCard(null);
  }

  // ставим/удаляем Like
  const handleCardLike = (card) => {
    const isLiked = card.likes
      .some((item) => {
        return item._id === currentUser._id;
      });

    // API проверка на true/false и отправка лайка либо снятие
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards(
          (state) => state.map(
            (item) => {
              return (item._id === card._id
                ? newCard
                : item)
            }));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // удаляем карточку
  const handleCardDelete = (card) => {
    setIsDisabled(false);
    setSelectedConfirmDeleteCard(card);
    setIsOpenedPopupConfirmDeleteCard(true);
  }

  // изменяем данные юзера
  const handleUpdateUser = ({ name, about }) => {
    setIsDisabled(true);
    // API отправляем данные для изменения имени и описания
    api.patchUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
        setIsDisabled(false);
      });
  }

  // обновляем Аватар
  const handleUpdateAvatar = ({ avatarLink }) => {
    setIsDisabled(true);

    // API отправляем данные для изменения Ававтара
    api.patchAvatar({ avatarLink })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
        setIsDisabled(false);
      });
  }

  // добавляем карточку
  const handleUpdateCards = (data) => {
    setIsDisabled(true);

    // API отправляем данные новой карточки
    api.setCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
        setIsDisabled(false);
      });
  }

  // нажатие ДА в попап удалить Карточку
  const handleConfirmDeleteCardClick = () => {
    setIsDisabled(true);

    // API удаляем  карточку где нажали ведро
    api.deleteCard(selectedConfirmDeleteCard._id)
      .then((data) => {
        // обновляем стейт cards
        setCards(
          cards
            .filter((item) => {
              return item !== selectedConfirmDeleteCard;
            })
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
        setIsDisabled(false);
      });
  }

  const navigate = useNavigate();

  //  Проверка токена
  const tockenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((res) => {
          const { email } = res.data;
          console.log(email);

          setUserEmail(email);
          setIsLoggedIn(true);
          console.log(userEmail);
          // console.log(isLoggedIn);
          navigate('/', { replace: true });
        })
        .catch((err) => { console.error(err); })
    }
  }

  // удаление токена
  const removeToken = () => {
    localStorage.removeItem('token');
  }

  // первая инициализация данных с сервера
  React.useEffect(() => {
    // API чекаем токен
    tockenCheck();



    // API получения и запись стейта текущийЮзер
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      });

    // API инициалищируем карточки
    api.getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error(err);
      })
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>

        <Header isLoggedIn={isLoggedIn} userEmail={userEmail} onSignOut={removeToken} />
        <Routes>
          {/* <Route path='/' element={
            isLoggedIn
              ? <><Main
                onChangeAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddCard={handleAddCardClick}
                onSelectedCard={handleCardImageClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              /><Footer /></>
              : <Login />
          } /> */}
          <Route path='/' element={
            <>
              <ProtectedRoute element={Main} isLoggedIn={isLoggedIn} onChangeAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddCard={handleAddCardClick}
                onSelectedCard={handleCardImageClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards} />
              <ProtectedRoute element={Footer} isLoggedIn={isLoggedIn} />
            </>
          } />

          {/* <Route path='/'
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                onChangeAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddCard={handleAddCardClick}
                onSelectedCard={handleCardImageClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                element={<Main />
                }>
              </ProtectedRoute>} /> */}


          {/*
              <Route path='/'
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                element={<><Main
                  onChangeAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddCard={handleAddCardClick}
                  onSelectedCard={handleCardImageClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                /><Footer /></>
                }>
              </ProtectedRoute>} /> */}


          <Route path='/sign-up'
            element={<Register />}
          />
          <Route path='/sign-in'
            element={<Login />}
          />


        </Routes>


        {/* ПРЕВЬЮХА */}
        <ImagePopup
          card={selectedCard}
          closePopup={closeAllPopups}
          onOverlayClick={handleOverlayClick}
        />

        {/* РЕДАКТИРОВАТЬ */}
        <EditProfilePopup
          openPopup={isOpenedPopupEditProfile}
          closePopup={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onDisabled={isDisabled}
          onOverlayClick={handleOverlayClick}
        >
        </EditProfilePopup>

        {/* ИЗМЕНИТЬ АВАТАР */}
        <EditAvatarPopup
          openPopup={isOpenedPopupChangeAvatar}
          closePopup={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onOverlayClick={handleOverlayClick}
          onDisabled={isDisabled}
        ></EditAvatarPopup >


        {/* ДОБАВИТЬ КАРТОЧКУ */}
        <AddPlacePopup
          openPopup={isOpenedPopupAddCard}
          closePopup={closeAllPopups}
          onUpdateCards={handleUpdateCards}
          onOverlayClick={handleOverlayClick}
          onDisabled={isDisabled}
        >
        </AddPlacePopup >

        {/* УДАЛИТЬ КАРТОЧКУ */}
        <DeletePlacePopup
          openPopup={isOpenedPopupConfirmDeleteCard}
          closePopup={closeAllPopups}
          onConfirmDeleteCard={handleConfirmDeleteCardClick}
          onOverlayClick={handleOverlayClick}
          onDisabled={isDisabled}
        >
        </DeletePlacePopup>


        <div className='popup popup_info-tool-tip'
        // <div className='popup popup_info-tool-tip popup_opened'

        // onClick={onOverlayClick}
        >
          <div className="popup__container">

            <div className='popup__union popup__union_type_access'>
            </div>

            <h2 className="popup__title popup__title_info-tool-tip">Вы успешно зарегистрировались!</h2>

            <button
              type="button"
              name="button-close"
              aria-label="Закрыть окно"
              className="popup__close popup__close_edit links"
            // onClick={closePopup}
            >
            </button>

          </div>
        </div>


        <div className='popup popup_info-tool-tip'
        // <div className='popup popup_info-tool-tip popup_opened'

        // onClick={onOverlayClick}
        >
          <div className="popup__container">

            <div className='popup__union popup__union_type_fail'>
            </div>

            <h2 className="popup__title popup__title_info-tool-tip">Что-то пошло не так!
              Попробуйте ещё раз.</h2>

            <button
              type="button"
              name="button-close"
              aria-label="Закрыть окно"
              className="popup__close popup__close_edit links"
            // onClick={closePopup}
            >
            </button>

          </div>
        </div>


      </CurrentUserContext.Provider >

    </div >
  );
}

export default App;



