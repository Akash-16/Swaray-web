import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { useSnackbar } from 'notistack';

//Material Design
import { Button, Dialog, DialogContent } from '@mui/material';

import { AppLoader, CartHeader, PaymentTerms } from '../../components';
import { PoinstPackageList } from '../../common/interface/pointsPackage.interface';
import { UserDetails } from '../../common/interface/userDetails.interface';
import routes from '../../constants/routes';
import { PointsPackageType } from '../../common/enum/pointsPackage.enum';
import { Client } from '../../config';

//styles
import './style.scss';
import { apiRoutes } from '../../constants/apiRoutes';
import { Errors } from '../../constants/errors';
import { HttpStatus } from '../../common/enum/statusCode.enum';

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
  selectedPoints: PoinstPackageList;
  subscription: boolean;
  pointsPackageName: PointsPackageType;
}

const PointsPackageDetails = () => {
  const [loading, setIsLoading] = useState(false);

  const [open, setOpen] = useState<boolean>(false);

  const { isLoading }: userDetails = useSelector((state: loggedInUser) => state?.userDetails);

  const { library, account } = useWeb3React();

  const { enqueueSnackbar } = useSnackbar();

  const { state } = useLocation();

  const navigate = useNavigate();

  const { selectedPoints, subscription, pointsPackageName } = state as Istate;

  const PayWithCrypto = async () => {
    setIsLoading(true);
    const { data } = await Client.post(apiRoutes.cryptoTotalCost, {
      id: selectedPoints.id
    });

    if (data?.data) {
      const {
        data: { maticPrice, toAddress }
      } = data;
      try {
        if (account) {
          const signature = await library?.provider?.request({
            method: 'eth_sendTransaction',
            params: [
              {
                from: account,
                to: toAddress,
                value: maticPrice
              }
            ]
          });
          if (signature) {
            const { data } = await Client.post(apiRoutes.cryptoTransfer, {
              id: selectedPoints.id,
              txId: signature
            });
            if (data.data) {
              navigate(routes.viewBalance);
            }
          }
        } else {
          enqueueSnackbar(Errors.appError, {
            variant: 'error',
            persist: false,
            preventDuplicate: true
          });
        }
      } catch (err: any) {
        setIsLoading(false);
        if (err.code === HttpStatus.CRYPTO_ERR0R_CODE) {
          enqueueSnackbar(err.message, {
            variant: 'error',
            persist: false,
            preventDuplicate: true
          });
        } else {
          enqueueSnackbar(Errors.appError, {
            variant: 'error',
            persist: false,
            preventDuplicate: true
          });
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <AppLoader loading={isLoading ? isLoading : loading} />
      <div className="my-subscription-content p-24">
        <div className="d-flex flex-column justify-between h-100">
          <div>
            <h3 className="f-18 f-w-500 l-h-normal txt-primary text-center mb-24">Cart</h3>
            <CartHeader selectedPoints={selectedPoints} subscription={subscription} />
            <div className="my-20">
              <div className="d-flex justify-between py-12 border-top-light border-bottom-light">
                <p className="f-16 f-w-600 l-h-normal txt-primary">Total</p>
                <p className="f-16 f-w-400 l-h-normal txt-color-primary">
                  ${selectedPoints.totalAmount}
                </p>
              </div>
            </div>

            <PaymentTerms />
          </div>
          <div className="pb-24">
            {pointsPackageName === PointsPackageType.Fiat ? (
              <Button
                onClick={() =>
                  navigate(routes.confirmPurchases, {
                    state: {
                      selectedPoints,
                      subscription
                    }
                  })
                }
                variant="contained"
                color="primary"
                size="large"
                fullWidth>
                Add Payment Details
              </Button>
            ) : (
              <Button
                onClick={PayWithCrypto}
                variant="contained"
                color="primary"
                size="large"
                fullWidth>
                Pay With Crypto
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(PointsPackageDetails);
