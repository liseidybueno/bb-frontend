// Dashboard.tsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { checkAuth } from '../../store/authSlice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, user } = useAppSelector(state => state.auth);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const googleAuthSuccess = params.get('googleAuthSuccess');

    if (googleAuthSuccess === 'true') {
      console.info('Google auth success detected, checking authentication...');

      navigate('/dashboard', { replace: true });

      dispatch(checkAuth());
    }
  }, [dispatch, location, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && !loading) {
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard">
      <h1>Welcome to your Dashboard, {user?.firstName}!</h1>
      {/* Your dashboard content */}
    </div>
  );
};

export default Dashboard;
