import { Fragment } from 'react';
// Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store';
// componentes de página
import HomePage from './pages/HomePage'; // componente de chat
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
// auth
import PrivateRoute from './components/PrivateRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;