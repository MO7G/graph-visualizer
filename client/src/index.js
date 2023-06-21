import React from 'react';
import ReactDOM from 'react-dom';
import HomeParent from './Pages/homeParent.js';
import { SharedValuesProvider } from './SharedStuff/SharedVariables.js';

ReactDOM.render(
  <SharedValuesProvider>
    <HomeParent />
  </SharedValuesProvider>,
  document.getElementById('root')
);