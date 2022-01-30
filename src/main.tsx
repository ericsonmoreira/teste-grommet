import { Grommet } from 'grommet';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseAuthProvider } from './context/FirebaseAuthContext';
import { theme } from './theme';

ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={theme} full>
      <FirebaseAuthProvider>
        <App />
      </FirebaseAuthProvider>
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);
