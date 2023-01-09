import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { useSnackbar } from 'notistack';

//Material Design
import { Avatar, Button } from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { SwarayCoinLogo } from '../../assets/img';
import { UserDetails } from '../../common/interface/userDetails.interface';
import { AppLoader } from '../../components';

//styles
import './style.scss';
import { Client } from '../../config';
import { apiRoutes } from '../../constants/apiRoutes';
import routes from '../../constants/routes';
import { HttpStatus } from '../../common/enum/statusCode.enum';
import { ConnectWallet } from '../../config';
import { Errors } from '../../constants/errors';
import { SuccessMessage } from '../../constants/successMessage';
import { useDeviceId } from '../../hooks';

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

interface Istate {
  refreshToken: string;
}

const MyUserProfile = () => {
  const [loading, setIsLoading] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const { activate, active, account, deactivate } = useWeb3React();

  const navigate = useNavigate();

  const deviceId = useDeviceId();

  const { userDetails, isLoading }: userDetails = useSelector(
    (state: loggedInUser) => state?.userDetails
  );

  const provider = localStorage.getItem('provider');

  React.useEffect(() => {
    const connectWallet = localStorage.getItem('walletconnect');
    if (provider || connectWallet) {
      activate(ConnectWallet, (error) => {
        console.log(error);
        localStorage.removeItem('provider');
      });
    }
  }, []);

  const signOutUser = async () => {
    setIsLoading(true);
    const { data: token } = await Client.patch(apiRoutes.trustDevice, {
      deviceId,
    });

    const { data } = await Client.post(apiRoutes.signOut, {
      refreshToken: token.data?.refreshToken?.token,
    });
    setIsLoading(false);
    if (data?.statusCode === HttpStatus.OK) {
      localStorage.removeItem('usertk');
      sessionStorage.removeItem('usertk');
      localStorage.removeItem('walletconnect');
      localStorage.removeItem('provider');
      navigate(routes.signInPage);
    }
  };

  const walletConnectApi = React.useCallback(async () => {
    if (provider && account) {
      const { data } = await Client.post(apiRoutes.cryptoWallets, {
        address: account,
        type: provider,
      });
      if (data?.data) {
        enqueueSnackbar(SuccessMessage.WallectConnect, {
          preventDuplicate: true,
          variant: 'success',
          persist: false,
        });
      } else {
        enqueueSnackbar(Errors.appError, {
          preventDuplicate: true,
          variant: 'error',
          persist: false,
        });
      }
    }
  }, [account, provider]);

  const walletConnect = async () => {
    if (userDetails.cryptoWallets?.length >= 0) {
      localStorage.setItem('provider', 'walletConnect');
      await activate(ConnectWallet, (error) => {
        console.log('error', error);
        localStorage.removeItem('provider');
      });
      await walletConnectApi();
    }
  };

  /*
    TODO: need to implement this method once client confirmation
  */

  const disConnectWallet = async () => {
    await deactivate();
    localStorage.removeItem('provider');
    await Client.get(apiRoutes.removeWallets);
  };

  return (
    <>
      <div className='my-profile-content'>
        <div className='profile-header'>
          <div className='profile-image'>
            {userDetails?.background && (
              <img src={userDetails?.background} alt='profile' />
            )}
          </div>
          <div className='d-flex align-end h-100 px-20 py-16 relative index-2'>
            <div className='mr-12'>
              <Avatar
                alt='AK'
                src={userDetails?.profilePhoto}
                className='profile-img bordered-white'
              />
            </div>
            <div className='flex-1'>
              <h3 className='f-18 f-w-600 l-h-normal txt-primary'>
                {userDetails?.firstName} {userDetails?.lastName}
              </h3>
              <p className='f-14 f-w-400 l-h-normal txt-color-primary mt-4'>
                @{userDetails?.username}
              </p>
            </div>
          </div>
        </div>
        <div className='p-20'>
          <List className='my-profile-menu d-grid g-8'>
            <ListItem
              onClick={() =>
                navigate(routes.viewBalance, {
                  state: {
                    isWalletActive: active,
                  },
                })
              }
            >
              <div className='d-flex align-center justify-between w-100'>
                <div className='flex-1 d-flex justify-between'>
                  <ListItemText primary='My Balance' />
                  <div className='d-flex align-center'>
                    <img
                      src={SwarayCoinLogo}
                      alt=''
                      className='img sawaray-coin-img'
                    />
                    <p className='f-14 f-w-500 l-h-normal txt-primary ml-4'>
                      {userDetails?.wallet?.pts}
                    </p>
                  </div>
                </div>
                <KeyboardArrowRightIcon className='txt-secondary' />
              </div>
            </ListItem>
            <ListItem>
              <div className='d-flex justify-between w-100'>
                <div className={active ? 'connected-dot' : 'active-dot'} />
                <ListItemText
                  onClick={walletConnect}
                  primary={
                    !active
                      ? 'Connect crypto wallet'
                      : `${
                          account && account?.length >= 15
                            ? `${account?.substring(0, 15)}... Connected`
                            : account
                        }`
                  }
                  className='flex-1'
                />
                <KeyboardArrowRightIcon className='txt-secondary' />
              </div>
            </ListItem>
            <ListItem disabled>
              <div className='d-flex justify-between w-100'>
                <ListItemText primary='My Fan Pages' className='flex-1' />
                <KeyboardArrowRightIcon className='txt-secondary' />
              </div>
            </ListItem>
            <ListItem disabled>
              <div className='d-flex justify-between w-100'>
                <ListItemText primary='Favorites' className='flex-1' />
                <KeyboardArrowRightIcon className='txt-secondary' />
              </div>
            </ListItem>
            <ListItem disabled>
              <div className='d-flex justify-between w-100'>
                <ListItemText
                  primary='Monthly subscriptions'
                  className='flex-1'
                />
                <KeyboardArrowRightIcon className='txt-secondary' />
              </div>
            </ListItem>
            <ListItem disabled>
              <div className='d-flex justify-between w-100'>
                <ListItemText primary='Account settings' className='flex-1' />
                <KeyboardArrowRightIcon className='txt-secondary' />
              </div>
            </ListItem>
          </List>
          <div className='text-center mt-32 mb-20'>
            <Button
              onClick={signOutUser}
              className='f-16 f-w-500 l-h-normal txt-primary'
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
      <AppLoader loading={isLoading || loading} />
    </>
  );
};

export default React.memo(MyUserProfile);
