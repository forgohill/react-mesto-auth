import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// import { authorize } from '../../utils/auth'


const Login = ({ onLogin }) => {

  const [formValue, setFormValue] = React.useState({
    email: '',
    password: ''
  });

  // const navigate = useNavigate();

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
    onLogin(password, email);

    console.log(formValue);
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
          required
        />
        <input
          type="password"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          className='entry-page__input entry-page__input_password'
          placeholder='Пароль'
          required
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
