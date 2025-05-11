import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import LoginForm from './pages/Login/Login';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import SignUpForm from './pages/SignUp/SignUp';
import Profile from './pages/Profile/Profile';
import Trips from './pages/Trips/Trips'
import Layout from './components/Layout';
import '@ionic/react/css/core.css';
import './styles/main.scss';
import { setupIonicReact } from '@ionic/react';
import { useDispatch } from 'react-redux';
import { checkAuth } from './store/authSlice';
import type { AppDispatch } from './store';

setupIonicReact();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useSelector((state: RootState) => state.auth);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const useAppDispatch = () => useDispatch<AppDispatch>();

const App: React.FC = () => {
  const [isRehydrated, setIsRehydrated] = useState(false)
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setIsRehydrated(true)
  }, [auth]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const googleAuthSuccess = urlParams.get('googleAuthSuccess');

    if (googleAuthSuccess === 'true') {
      const url = new URL(window.location.href);
      url.searchParams.delete('googleAuthSuccess');
      window.history.replaceState({}, document.title, url.toString());

      dispatch(checkAuth());
    }
  }, [dispatch]);

  if(!isRehydrated) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={auth.isAuthenticated ? <Navigate to="/dashboard" /> : <SignUpForm />}
        />
        <Route
          path="/login"
          element={auth.isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <Layout>
                <Trips />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={auth.isAuthenticated ? <Navigate to="/dashboard" /> : <LandingPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;

