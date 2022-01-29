import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { MainRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <MainRoutes />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
