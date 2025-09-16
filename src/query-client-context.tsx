import React, { createContext, useContext, ReactNode } from 'react';
import { QueryClient } from './query-client.ts';

const QueryClientContext = createContext<QueryClient | null>(null);

export const useQueryClient = () => {
  const context = useContext(QueryClientContext);
  if (!context) {
    throw new Error('useQueryClient must be used within a QueryClientProvider');
  }
  return context;
};

interface QueryClientProviderProps {
  client: QueryClient;
  children: ReactNode;
}

export const QueryClientProvider: React.FC<QueryClientProviderProps> = ({ client, children }) => {
  return (
    <QueryClientContext.Provider value={client}>
      {children}
    </QueryClientContext.Provider>
  );
};