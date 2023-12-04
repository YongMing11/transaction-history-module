// src/transaction/context/TransactionContext.tsx
import React, { createContext, ReactNode, useContext } from 'react';
import { TransactionController } from '../interfaceAdapters/controllers/TransactionController';
import { GetTransactionsUseCaseImpl } from '../useCases/GetTransactions';
import { TransactionPresenterImpl } from '../interfaceAdapters/presenters/TransactionPresenter';

interface TransactionContextProps {
  children: ReactNode;
}

export const TransactionContext = createContext<TransactionController | undefined>(undefined);

export const TransactionProvider: React.FC<TransactionContextProps> = ({ children }) => {
  const transactionController = new TransactionController(
    new GetTransactionsUseCaseImpl(),
    new TransactionPresenterImpl()
  );

  return (
    <TransactionContext.Provider value={transactionController}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionController = (): TransactionController => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactionController must be used within a TransactionProvider');
  }
  return context;
};
