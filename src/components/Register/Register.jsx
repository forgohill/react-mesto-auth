import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../utils/auth';

const Register = () => {
  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    register(password, email)
      .then((res) => {
        // debugger;
        console.log(res);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className='register entry-page'>
      <h1 className='entry-page__title'>Регистрация</h1>
      <form className='entry-page__form entry-page__form_register'
        onSubmit={handleSubmit}>
        <input
          name='email'
          type="email"
          onChange={handleChange}
          value={formValue.email}
          className='entry-page__input entry-page__input_email'
          placeholder='Email'
        />
        <input
          name='password'
          type="password"
          onChange={handleChange}
          value={formValue.password}
          className='entry-page__input entry-page__input_password'
          placeholder='Пароль'
        />
        <button
          type="submit"
          className='entry-page__submit'
          aria-label="Зарегистрироваться на сайте"
        >

          Зарегистрироваться
        </button>
      </form>
      <p className='entry-page__paragraph'>Уже зарегистрированы?&ensp;
        <span className='entry-page__accent'>
          <Link to='/sign-in' className='entry-page__link links' href="#">Войти</Link>
        </span></p>
    </div>
  );
}

export default Register;
