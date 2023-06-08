import React from 'react';

import {
  headerLogo,
} from '../../utils/images.js'


function Header() {
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

        <p className="header__login">Регистрация</p>
      </div >
    </header>

  );
}

export default Header;
