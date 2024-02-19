 import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setUsername] = useState('');

  return (
    <UserContext.Provider value={{ name, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}; 

