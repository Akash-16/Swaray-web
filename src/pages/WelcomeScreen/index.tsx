import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

//React Confetti animations
import Confetti from 'react-confetti';

//Material Design
import { Button } from '@mui/material';

import routes from '../../constants/routes';
import { UserDetails } from '../../common/interface/userDetails.interface';
import { AppLoader } from '../../components';

interface loggedInUser {
  userDetails: {
    userDetails: UserDetails;
    isLoading: boolean;
  };
}

interface userDetails {
  userDetails: UserDetails;
  isLoading: boolean;
}

function WelcomeScreen() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userDetails, isLoading }: userDetails = useSelector(
    (state: loggedInUser) => state?.userDetails
  );

  const width = window.innerWidth || 100;
  const height = window.innerHeight || 100;

  const navigateProfilePage = () => {
    navigate(routes.myProfileScreen, {
      state: state
    });
  };

  return (
    <>
      <div className="verify-page-inside d-flex flex-column align-center p-24">
        {!isLoading && (
          <>
            <Confetti width={width} height={height} />
            <div className="relative h-100 index-1">
              <form className="flex-1 d-flex flex-column justify-center h-100 relative index-1">
                <div className="flex-1 d-flex align-center h-100">
                  <div className="text-center">
                    <p className="f-48 mb-16">🎉</p>
                    <h1 className="f-28 f-w-700 l-h-normal txt-primary mb-20 px-32">
                      {userDetails?.username ? `${userDetails?.username},` : ''} you’re all set!
                      Welcome to Swaray!
                    </h1>
                  </div>
                </div>
                <div className="w-100 text-center relative index-1 mb-24">
                  <Button
                    onClick={navigateProfilePage}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth>
                    Let&apos;s go!
                  </Button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
      <AppLoader loading={isLoading} />
    </>
  );
}

export default WelcomeScreen;
