/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useContext, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import '../index.css';
import { ToastContainer } from 'react-toastify';
import getToast from '../utils/getToast';
import UserDataContext, { ContextProps } from '../Context/UserDataContext';

function TransactionModal() {
  const [username, setUsername] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const { token } = JSON.parse(localStorage.getItem('user') as string);
  const { createdTransaction } = useContext(UserDataContext) as ContextProps;

  const validateFields = () => {
    const MIN_USERNAME_LENGTH = 3;
    return username.length >= MIN_USERNAME_LENGTH && value > 0;
  };

  const createTransaction = async () => {
    try {
      const response = await fetch('http://localhost:3001/transactions', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: token,
        }),
        body: JSON.stringify({ creditedAccountUsername: username, value }),
      });
      const body = await response.json();
      if (body.error) getToast('error', body.error);
      else {
        createdTransaction(body.value);
        getToast('success', 'Transaction successfully created!');
      }
    } catch (error) {
      const err = error as Error;
      getToast('error', err.message);
    }
  };

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="Button violet button" type="button">
            New Transaction
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Create a new transaction</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Send money to whoever you want.
            </Dialog.Description>
            <fieldset className="Fieldset fieldset">
              <label className="Label" htmlFor="username">
                Username
              </label>
              <input
                className="Input input"
                id="username"
                placeholder="John Doe"
                onChange={(e) => setUsername(e.target.value)}
              />
            </fieldset>
            <fieldset className="Fieldset fieldset">
              <label className="Label" htmlFor="username">
                Value
              </label>
              <input
                className="Input input"
                id="value"
                type="number"
                placeholder="50.00"
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </fieldset>
            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
              <button
                className="Button green button"
                type="button"
                disabled={!validateFields()}
                onClick={createTransaction}
              >
                Create
              </button>
            </div>
            <Dialog.Close asChild>
              <button
                className="IconButton button"
                aria-label="Close"
                type="button"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <ToastContainer />
    </>
  );
}

export default TransactionModal;
