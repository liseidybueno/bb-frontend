import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div>
    <Header />
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main className={styles.mainLayout}>{children}</main>
    </div>
  </div>
);

export default Layout;
