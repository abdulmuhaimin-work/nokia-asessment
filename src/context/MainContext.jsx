import React, { createContext, useState, useContext } from 'react';

const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  return (
    <MainContext.Provider value={{ showAlert, setShowAlert, alertMessage, setAlertMessage }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => useContext(MainContext);