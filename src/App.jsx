import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './reset.css';

import { HashRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import ToastProvider from './components/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <HashRouter>
        <AppRouter />
      </HashRouter>
    </ToastProvider>
  );
}

export default App;
