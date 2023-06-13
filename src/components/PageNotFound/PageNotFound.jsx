// import React from 'react';

import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div className='page-not-found'>
      <div className='page-not-found__wrapper'>
        <h1
          className='page-not-found__title'> Вы потерялись... такой страницы не существует...
        </h1>
        <p className='page-not-found__subtitle'>
          Но всегда можно вернуться <span
            className='page-not-found__accent'>
            <Link
              to='/sign-in'
              className='page-not-found__link links'>домой</Link>
          </span>

        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
