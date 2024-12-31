import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import UrlNotFoundPage from './pages/UrlNotFoundPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthProvider';
import './styles/App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/url-not-found" element={<UrlNotFoundPage />} />
          <Route path="/" element={<PrivateRoute loginUrl="/login" />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;