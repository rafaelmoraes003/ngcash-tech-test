import { createContext } from 'react';

export interface ContextProps {
  balance: number,
  createdTransaction(value: number): void,
}

const UserDataContext = createContext<ContextProps | null>(null);

export default UserDataContext;
