import React from 'react';
import { SwarayLogo } from '../../assets/img/index';

const LoginHeader = () => {
  return (
    <div className='login-header bg-secondary w-100 d-grid place-center'>
      <img className='img login-img' src={SwarayLogo} alt='' />
    </div>
  );
};

export default React.memo(LoginHeader);
