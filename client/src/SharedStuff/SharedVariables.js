import React, { createContext, useState } from 'react';
import Home from '../Pages/home'
const SharedValuesContext = createContext();

export function SharedValuesProvider({ children }) {
  const [operation,setOperation] = useState('');
  const [algorithm,setAlgorithm] = useState('');
  // x and y have temporarily values until seting up the frontend
  const [x,setX] = useState();
  const [y,setY] = useState();

  const values = {operation,setOperation,algorithm,setAlgorithm,x,setX,y,setY}
  return (
    <SharedValuesContext.Provider value={values}>
      <Home></Home>
    </SharedValuesContext.Provider>
  );
}

export default SharedValuesContext;