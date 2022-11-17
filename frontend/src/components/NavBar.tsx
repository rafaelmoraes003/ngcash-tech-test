import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDataContext, { ContextProps } from '../Context/UserDataContext';

function NavBar() {
  const navigate = useNavigate();
  const { balance } = useContext(UserDataContext) as ContextProps;
  const { username } = JSON.parse(localStorage.getItem('user') as string);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('user');
  };

  return (
    <div className="navbar">
      <h1>{`Balance: R$${(balance / 100).toFixed(2)}`}</h1>
      <h1>{`Username: ${username}`}</h1>
      <button
        type="button"
        id="home-button-navbar"
        onClick={() => navigate('/home')}
      >
        Home
      </button>
      <button
        type="button"
        id="transactions-button-navbar"
        onClick={() => navigate('/transactions')}
      >
        Transactions
      </button>
      <button
        type="button"
        id="logout-button-navbar"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default NavBar;
