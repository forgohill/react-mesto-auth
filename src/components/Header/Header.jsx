import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { headerLogo } from '../../utils/images.js'


function Header({ isLoggedIn, userEmail, onSignOut }) {

  console.log(`хедер : ${isLoggedIn}`);

  const handleButtonExit = () => {
    console.log('exit');
    onSignOut();
  }

  return (
    <header className="header">
      <div className='header__wrapper'>

        <a href="#"
          className="header__link links"
          title="Переход на главную - проект: место.">
          <img
            src={headerLogo}
            alt="Логотип проекта Место"
            className="header__logo" />
        </a>

        <Routes>
          <Route path='/' element={(
            <div className='header__wrapper'>
              <p className='header__paragraph'>{`${userEmail}`}</p>
              <button
                type="button"
                className="header__logout links"
                onClick={handleButtonExit}

              // onClick={() => {
              // onSignOut();
              // handleOpenMenu();
              // }
              // }
              >
                Выйти
              </button>
            </div>
          )} />
          <Route path='/sign-up' element={(<><Link to='/sign-in' className="header__paragraph links">Войти</Link></>)} />
          <Route path='/sign-in' element={(<><Link to='/sign-up' className="header__paragraph links">Регистрация</Link></>)} />

        </Routes>
        {/*
        {
          isLoggedIn
            ? <Link to='/sign-in' className="header__login links">Войти</Link>
            : <Link to='/sign-up' className="header__login links">Регистрация</Link>
        } */}



      </div >
    </header >

  );
}

export default Header;
