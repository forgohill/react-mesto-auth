import React from 'react';

const Login = () => {
  return (
    <div className='login entry-page'>
      {/* <div className='entry-page__wrapper'> */}
      <h1 className='entry-page__title'>Вход</h1>
      <form className='entry-page__form entry-page__form_login'>
        <input
          type="e-mail"
          className='entry-page__input entry-page__input_email'
          placeholder='Email'
        />
        <input
          type="password"
          className='entry-page__input entry-page__input_password'
          placeholder='Пароль'
        />
        <button
          type="button"
          className='entry-page__submit'>
          Войти
        </button>
      </form>

      {/* </div> */}
    </div>
  );
}

export default Login;
