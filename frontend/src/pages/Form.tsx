import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputWithLabel from '../components/InputWithLabel';
import getToast from '../utils/getToast';

interface IForm {
  endpoint: string,
}

function Form({ endpoint }: IForm) {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const validateFields = ():boolean => {
    const MIN_USERNAME_LENGTH: number = 3;
    const MIN_PASSWORD_LENGTH: number = 8;
    const regex: RegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/g;

    return username.length >= MIN_USERNAME_LENGTH
      && password.length >= MIN_PASSWORD_LENGTH
      && regex.test(password);
  };

  const createRequest = async () => {
    try {
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ username, password }),
      });
      const body = await response.json();
      if (body.error) {
        getToast('error', 'Invalid user.');
      } else {
        delete body.password;
        localStorage.setItem('user', JSON.stringify(body));
        navigate('/home');
      }
    } catch (error) {
      getToast('error', 'Server error.');
    }
  };

  return (
    <div className="form-container">
      <form className="form">
        <InputWithLabel
          id="username-input-login"
          labelText="Username"
          type="text"
          setState={setUsername}
        />

        <InputWithLabel
          id="passowrd-input-login"
          labelText="Password"
          type="password"
          setState={setPassword}
        />

        <button
          id="button-login"
          disabled={!validateFields()}
          type="button"
          onClick={createRequest}
        >
          {endpoint === '/login' ? 'Login' : 'Create'}
        </button>

        {endpoint === '/login' && (
        <button
          id="register-button-login"
          type="button"
          onClick={() => navigate('/register')}
        >
          Create Account
        </button>
        )}

        <ToastContainer />
      </form>
    </div>
  );
}

export default Form;
