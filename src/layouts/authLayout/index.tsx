import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { AuthHeader } from '../../components';
import routes from '../../constants/routes';

const AuthLayout = () => {
  const { pathname } = useLocation();
  return (
    <div className="app-container">
      <div className="app-layout">
        <div className={pathname === routes.signInPage ? 'signup-page' : 'verify-page'}>
          {!pathname.includes(routes.congratulationPage) && <AuthHeader />}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default React.memo(AuthLayout);
