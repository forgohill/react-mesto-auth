import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { authorize } from '../../utils/auth'


const Login = () => {


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

    console.log(formValue);
    const { email, password } = formValue;

    authorize(password, email)
      .then((res) => {
        // console.log(res);
        const { token } = res;
        localStorage.setItem('token', token);
        // localStorage.removeItem('token');
        // console.log(localStorage.token);

        // console.log(token);
      })
      .catch((err) => { console.error(err) })

  }

  return (
    <div className='login entry-page'>

      <h1 className='entry-page__title'>Вход</h1>
      <form
        className='entry-page__form entry-page__form_login'
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          name='email'
          value={formValue.email}
          onChange={handleChange}
          className='entry-page__input entry-page__input_email'
          placeholder='Email'
        />
        <input
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          className='entry-page__input entry-page__input_password'
          placeholder='Пароль'
        />
        <button
          type="submit"
          className='entry-page__submit'>
          Войти
        </button>
      </form>


    </div>
  );
}

export default Login;
