import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

import routes from '../../constants/routes';

const PasswordSuccessPage = () => {
  const navigate = useNavigate();

  const width = window.innerWidth || 100;
  const height = window.innerHeight || 100;

  return (
    <>
      <Confetti width={width} height={height} />

      <div className="w-100 h-100 d-flex justify-around flex-column align-center p-16 ">
        <div className="flex-1 text-center d-flex justify-center flex-column mt-20">
          <h1 className="f-28 f-w-700 l-h-normal txt-primary mb-24">Congratulation!</h1>
          <p className="f-28 f-w-500 l-h-normal txt-primary">Your password has been updated</p>
        </div>
        <div className="w-100 d-flex justify-end flex-column align-center flex-1">
          <Button
            onClick={() => navigate(routes.myProfileScreen)}
            fullWidth
            variant="outlined"
            color="inherit">
            Return to profile
          </Button>
          <Button className="mt-20" fullWidth variant="contained">
            Discover content
          </Button>
        </div>
      </div>
    </>
  );
};

export default React.memo(PasswordSuccessPage);
