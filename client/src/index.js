import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Pages/home.jsx';
import { SharedValuesProvider } from './SharedStuff/SharedVariables.js';

ReactDOM.render(
  <SharedValuesProvider>
    <Home />
  </SharedValuesProvider>,
  document.getElementById('root')
);