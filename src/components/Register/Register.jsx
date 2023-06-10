import React from 'react';


const Register = () => {
  return (
    <div className='register entry-page'>
      {/* <div className='entry-page__wrapper'> */}
      <h1 className='entry-page__title'>Регистрация</h1>
      <form className='entry-page__form entry-page__form_register'>
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
          Зарегистрироваться
        </button>
      </form>
      <p className='entry-page__paragraph'>Уже зарегистрированы?&ensp;
        <span className='entry-page__accent'>
          <a className='entry-page__link links' href="#">Войти</a>
        </span></p>
      {/* </div> */}
    </div>
  );
}

export default Register;
