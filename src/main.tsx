import { Grommet } from 'grommet';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={theme} full>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);
