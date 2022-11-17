import React from 'react';
import NavBar from '../components/NavBar';
import TransactionModal from '../components/TransactionModal';
import Provider from '../Context/Provider';

function Home() {
  return (
    <Provider>
      <NavBar />
      <TransactionModal />
    </Provider>
  );
}

export default Home;
