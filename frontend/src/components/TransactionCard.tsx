import React from 'react';

interface ITransactionCardProps {
  debitedAccountUsername: {
    username: string,
  },
  creditedAccountUsername: {
    username: string,
  },
  value: number,
  createdAt: string,
}

function TransactionCard({
  debitedAccountUsername, creditedAccountUsername, value, createdAt,
}: ITransactionCardProps) {
  return (
    <div>
      <h4>{`Value: R$${(value / 100).toFixed(2)}`}</h4>
      <h4>{`Origin: ${debitedAccountUsername.username}`}</h4>
      <h4>{`Destiny: ${creditedAccountUsername.username}`}</h4>
      <h4>{`Date: ${new Date(createdAt).toLocaleDateString('pt-BR')}`}</h4>
    </div>
  );
}

export default TransactionCard;
