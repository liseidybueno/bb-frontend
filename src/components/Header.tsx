import React from 'react';
import styles from './Layout.module.scss';
import { Earth } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks/reduxHooks';
import { logoutUser } from '../store/authSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className={styles.header}>
      <div className={styles.heading}>
        <Earth size={32} color="white"/>
        <h1 className={styles.headingText}>borderbuddy</h1>
      </div>
      <div className={styles.buttons}>
        <button className={styles.logOutBtn} onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}

export default Header;