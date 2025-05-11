import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Layout.module.scss';
import { Home, User, Map } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              <Home size={20} />
              <span className={styles.navText}>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              <User size={20} />
              <span className={styles.navText}>Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/trips"
              className={({ isActive }) =>
                isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
              }
            >
              <Map size={20} />
              <span className={styles.navText}>Trips</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
