import React, {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import UserDataContext from './UserDataContext';

interface ProviderProps {
  children: ReactNode
}

function Provider({ children }: ProviderProps) {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const getBalance = async () => {
      const { token } = JSON.parse(localStorage.getItem('user') as string);
      const response = await fetch('http://localhost:3001/account', {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: token,
        }),
      });
      const body = await response.json();
      setBalance(body.balance);
    };
    getBalance();
  }, [balance]);

  const contextValue = useMemo(() => {
    const createdTransaction = (value: number) => {
      setBalance((oldBalance) => oldBalance - value);
    };

    return {
      balance,
      createdTransaction,
    };
  }, [balance]);

  return (
    <UserDataContext.Provider value={contextValue}>
      { children }
    </UserDataContext.Provider>
  );
}

export default Provider;
