import React from 'react';

import { Link } from 'react-router-dom'
import { headerLogo } from '../../utils/images.js'


function Header({ isLoggedIn }) {

  console.log(`хедер : ${isLoggedIn}`);

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
        {isLoggedIn
          ? <Link to='/sign-in' className="header__login links">Войти</Link>
          : <Link to='/sign-up' className="header__login links">Регистрация</Link>
        }
      </div >
    </header>

  );
}

export default Header;
