import React from 'react';

import { useNavigate } from 'react-router-dom';
//Material Import
import { Button } from '@mui/material';

import routes from '../../constants/routes';

function LoginPage() {
  const navigate = useNavigate();

  const navigatePage = () => {
    navigate(routes.signInPage);
  };

  return (
    <div className="app-container">
      <div className="app-layout">
        <div className="login-page relative p-24">
          <div className="d-flex h-100 flex-column align-center relative index-1">
            <div className="flex-1 d-flex align-center">
              <div className="login-logo"></div>
            </div>
            <div className="w-100 text-center mb-24">
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={navigatePage}>
                Sign in
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className="mt-16"
                fullWidth>
                Sign Up on Mobile App
              </Button>
              <p className="f-18 f-w-700 l-h-22 txt-primary mt-24">About</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
