import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import ImagePopup from './ImagePopup/ImagePopup';
import PageNotFound from './PageNotFound/PageNotFound';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import DeletePlacePopup from './DeletePlacePopup/DeletePlacePopup';
import Register from './Register/Register';
import Login from './Login/Login';
import InfoTooltip from './InfoTooltip/InfoTooltip';

import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

import api from '../utils/api';
import { register, authorize, checkToken } from '../utils/auth.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  // стейты для попапов
  const [isOpenedPopupChangeAvatar, setIsOpenedPopupChangeAvatar] = React.useState(false);
  const [isOpenedPopupEditProfile, setIsOpenedPopupEditProfile] = React.useState(false);
  const [isOpenedPopupAddCard, setIsOpenedPopupAddCard] = React.useState(false);
  const [isOpenedPopupConfirmDeleteCard, setIsOpenedPopupConfirmDeleteCard] = React.useState(false);
  const [isOpenedPopupInfoTooltip, setIsOpenedPopupInfoTooltip] = React.useState(false);

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
  //стейт для хранения типа ошибок
  const [sourceInfoTooltips, setSourceInfoTooltips] = React.useState({
    access: false,
    message: '',
  });


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
  const isOpen = isOpenedPopupChangeAvatar || isOpenedPopupEditProfile || isOpenedPopupAddCard || isOpenedPopupConfirmDeleteCard || selectedCard || isOpenedPopupInfoTooltip;

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
    setIsOpenedPopupInfoTooltip(false);
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

  // //////////////////////////////////////////
  // //////////// РЕГИСТРАЦИЯ АВТОРИЗАЦИЯ /////
  // //////////////////////////////////////////

  const navigate = useNavigate();

  //  Проверка токена
  const tockenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then((res) => {
          const { email } = res.data;
          setUserEmail(email);
          setIsLoggedIn(true);
          navigate('/', { replace: true });
        })
        .catch((err) => {
          console.error(`Что-то пошло не так! Попробуйте ещё раз. ОШИБКА : ${err}`)
          setIsOpenedPopupInfoTooltip(true);
          setSourceInfoTooltips({
            access: false,
            message: 'Время использования ключа истекло, повторите вход.',
          })
        })
    }
  }

  // выполнение аторизации
  const handleLogin = (password, email) => {

    setIsDisabled(true);

    authorize(password, email)
      .then((res) => {
        if (password && email !== '') {
          const { token } = res;
          localStorage.setItem('token', token);
          setUserEmail(email);
          setIsLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        if (err === 401) {
          console.error('Введен неверный пароль или Email. ОШИБКА : 401')
          setIsOpenedPopupInfoTooltip(true);
          setSourceInfoTooltips({
            access: false,
            message: 'Невереный пароль или Email, проверте данные.',
          })
        } else if (err !== 401) {
          console.error(`Что-то пошло не так! Попробуйте ещё раз. ОШИБКА : ${err}`)
          setIsOpenedPopupInfoTooltip(true);
          setSourceInfoTooltips({
            access: false,
            message: 'Что-то пошло не так! Попробуйте ещё раз.',
          })
        }
      })
      .finally(() => {
        setIsDisabled(false);
      })
  }

  // выполнение регистрации / register
  const handleRegister = (password, email) => {

    setIsDisabled(true);

    register(password, email)
      .then((res) => {
        setSourceInfoTooltips({
          access: true,
          message: 'Вы успешно зарегистрировались!',
        })
        setIsOpenedPopupInfoTooltip(true);
        setIsLoggedIn(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        if (err === 400) {
          console.error(`Это e-mail уже зарегестрирован, войдите используя пароль. ОШИБКА : ${err}`);
          setSourceInfoTooltips({
            access: false,
            message: 'Это e-mail уже зарегестрирован, войдите используя пароль.',
          })
          setIsOpenedPopupInfoTooltip(true);
          setIsDisabled(false);
        } else if (err !== 400) {
          console.error(`Что-то пошло не так! Попробуйте ещё раз. ОШИБКА : ${err}`);
          setSourceInfoTooltips({
            access: false,
            message: 'Что-то пошло не так! Попробуйте ещё раз.',
          })
          setIsOpenedPopupInfoTooltip(true);
          setIsDisabled(false);
        }
      })
      .finally(() => {
        setIsDisabled(false);
      });
  }

  // удаление токена
  const removeToken = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/sign-in', { replace: true });
  }

  // API чекаем токен
  React.useEffect(() => {
    tockenCheck();
  }, [isLoggedIn]);



  // первая инициализация данных с сервера
  React.useEffect(() => {

    // API получения и запись стейта текущийЮзер
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      });

    // API инициализируем карточки
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

        <Header userEmail={userEmail} onSignOut={removeToken} />
        <Routes>
          <Route path='/' element={
            <>
              <ProtectedRoute element={Main}
                isLoggedIn={isLoggedIn}
                onChangeAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddCard={handleAddCardClick}
                onSelectedCard={handleCardImageClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards} />
              <ProtectedRoute
                element={Footer}
                isLoggedIn={isLoggedIn} />
            </>
          } />

          <Route path='/sign-up'
            element={<Register
              onRegister={handleRegister}
              onDisabled={isDisabled}
            />}
          />
          <Route path='/sign-in'
            element={<Login
              onLogin={handleLogin}
              onDisabled={isDisabled}
            />}
          />

          <Route path='*'
            element={<PageNotFound
            />}
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

        <InfoTooltip
          openPopup={isOpenedPopupInfoTooltip}
          closePopup={closeAllPopups}
          onOverlayClick={handleOverlayClick}
          sourceInfoTooltips={sourceInfoTooltips}
        ></InfoTooltip>

      </CurrentUserContext.Provider >

    </div >
  );
}

export default App;



