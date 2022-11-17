import React, { useEffect, useState } from 'react';
import TransactionCard from '../components/TransactionCard';
import NavBar from '../components/NavBar';
import Provider from '../Context/Provider';

interface ITransactions {
  id: number,
  debitedAccountId: number,
  creditedAccountId: number,
  value: number,
  createdAt: string,
  debitedAccountUsername: {
    username: string,
  },
  creditedAccountUsername: {
    username: string,
  },
}

const dateOrders = ['DESC', 'ASC'];

const transactionTypes = [
  { type: 'all', value: 'All' },
  { type: 'cash-in', value: 'Cash-in' },
  { type: 'cash-out', value: 'Cash-out' },
];

function Transactions() {
  const [transactions, setTransactions] = useState<ITransactions[]>([]);
  const [date, setDate] = useState<string>('DESC');
  const [type, setType] = useState<string>('all');
  const { token } = JSON.parse(localStorage.getItem('user') as string);

  useEffect(() => {
    const getTransactions = async () => {
      const response = await fetch('http://localhost:3001/transactions', {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: token,
        }),
      });
      const data = await response.json();
      setTransactions(data);
    };
    getTransactions();
  }, []);

  const getFilteredTransactions = async () => {
    const response = await
    fetch(`http://localhost:3001/transactions/filter?date=${date}&type=${type}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
    const data = await response.json();
    setTransactions(data);
  };

  return (
    <>
      <Provider>
        <NavBar />
      </Provider>
      <div className="filters-container">
        <h2>Filters</h2>
        <label htmlFor="date">
          By Date
          <select id="date" onChange={(e) => setDate(e.target.value)}>
            {dateOrders.map((dateOrder) => (
              <option
                key={dateOrder}
                value={dateOrder}
              >
                {dateOrder === 'DESC' ? 'NEWER' : 'OLDER'}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="types">
          By Transaction Type
          <select id="types" onChange={(e) => setType(e.target.value)}>
            {transactionTypes.map((t) => (
              <option
                key={t.type}
                value={t.type}
              >
                {t.value}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={getFilteredTransactions}
        >
          Apply filters
        </button>
      </div>
      <div className="transactions-container">
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <TransactionCard
              key={t.id}
              createdAt={t.createdAt}
              creditedAccountUsername={t.creditedAccountUsername}
              debitedAccountUsername={t.debitedAccountUsername}
              value={t.value}
            />
          ))
        ) : <h1 style={{ color: 'rgba(0,0,0,1)' }}>You do not transactions yet.</h1>}
      </div>
    </>
  );
}

export default Transactions;
