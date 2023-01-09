import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { routes } from '../constants/routes';
import { useLocalStorage } from '../hooks';

const PrivateRoute = () => {
  const userToken = useLocalStorage();

  return !userToken ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={routes.myProfileScreen} />
  );
};

export default React.memo(PrivateRoute);
