import React from 'react';

//Material Design
import { Button } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import { Client } from '../../config';

function TrustDevicePage() {
  const { state } = useLocation() as any;

  const navigate = useNavigate();

  const skipPage = () => {
    sessionStorage.setItem('usertk', state?.data?.accessToken.token);
    Client.defaults.headers.common['Authorization'] = `Bearer ${
      state?.data ? state?.data?.accessToken.token : state.accessToken?.token
    }`;
    navigate(routes.welcomeScreenPage);
  };

  const allowAccess = async () => {
    localStorage.setItem('usertk', state?.data?.accessToken.token);
    Client.defaults.headers.common['Authorization'] = `Bearer ${
      state?.data ? state?.data?.accessToken.token : state.accessToken?.token
    }`;
    navigate(routes.welcomeScreenPage);
  };

  return (
    <div className="verify-page-inside d-flex flex-column align-center p-24">
      <div className="relative h-100 index-1">
        <form className="flex-1 d-flex flex-column justify-center h-100 relative index-1">
          <div className="flex-1 d-flex align-center h-100">
            <div className="text-center">
              <p className="f-48 mb-16">✅ </p>
              <h1 className="f-28 f-w-700 l-h-normal txt-primary mb-20">Trust this device?</h1>
              <p className="f-18 f-w-500 l-h-22 txt-primary px-32">
                Allow access so we can trust this device for 30 days
              </p>
            </div>
          </div>
          <div className="w-100 text-center relative index-1 mb-24">
            <p onClick={skipPage} className="f-18 f-w-700 l-h-22 txt-primary mb-24">
              Skip
            </p>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={allowAccess}>
              Allow access
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(TrustDevicePage);
