import { Grommet } from 'grommet';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={theme} full>
      <App />
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);
