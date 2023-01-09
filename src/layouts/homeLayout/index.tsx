import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { DashboardHeader } from '../../components';
import { userDetails } from '../../redux/userSlice';

const AuthLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userDetails());
  }, []);

  return (
    <div className='app-container'>
      <div className='app-layout'>
        <div className='verify-page'>
          <DashboardHeader />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default React.memo(AuthLayout);
