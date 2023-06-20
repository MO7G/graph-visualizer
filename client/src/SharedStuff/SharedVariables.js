import React, { createContext, useState } from 'react';
import Home from '../Pages/home'
const SharedValuesContext = createContext();

export function SharedValuesProvider({ children }) {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  return (
    <SharedValuesContext.Provider value={{ a, setA, b, setB }}>
      <Home></Home>
    </SharedValuesContext.Provider>
  );
}

export default SharedValuesContext;