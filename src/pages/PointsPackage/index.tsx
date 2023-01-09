import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';

//Material Design
import {
  IconButton,
  Dialog,
  DialogContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { SwarayWhiteLogo } from '../../assets/img';
import { AppLoader } from '../../components';

//styles
import { Client } from '../../config';
import { apiRoutes } from '../../constants/apiRoutes';
import { routes } from '../../constants/routes';
import { PoinstPackageList } from '../../common/interface/pointsPackage.interface';
import './style.scss';
import { PointsPackageType } from '../../common/enum/pointsPackage.enum';
import { Errors } from '../../constants/errors';

interface IsWallectConnected {
  pointsPackageName: string;
}

const MySubscriptionPage = () => {
  const [open, setOpen] = React.useState(false);

  const [selectedPoints, setSelectedPoints] = React.useState<PoinstPackageList>();

  const [isSubscription, setIsSubScribtion] = React.useState(false);

  const { state } = useLocation() as { state: IsWallectConnected };

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { data, isLoading } = useQuery(['pointsPackageList', state.pointsPackageName], async () => {
    return Client.get(apiRoutes.pointsPackageList, {
      params: {
        type: state.pointsPackageName
      }
    });
  });

  const pointsPackageList: PoinstPackageList[] = data?.data?.data;

  const handleClose = () => setOpen(false);

  const selectedPointsPackage = (data: PoinstPackageList, isSubscription: boolean) => {
    setOpen(true);
    setSelectedPoints(data);
    setIsSubScribtion(isSubscription);
  };

  const handleSubscriptionForCrypto = (item: PoinstPackageList) => {
    if (state.pointsPackageName === PointsPackageType.Fiat) {
      navigate(routes.mySubscriptionPayment, {
        state: {
          selectedPoints: item,
          subscription: true,
          ...state
        }
      });
    } else {
      enqueueSnackbar(Errors.subscriptionNotAllowed, {
        preventDuplicate: false,
        persist: false,
        variant: 'error'
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <AppLoader loading={isLoading} />
      ) : (
        <div className="my-subscription-content p-24">
          <h3 className="f-18 f-w-500 l-h-normal txt-primary text-center mb-16">
            Select Point Package or Point Subscription
          </h3>
          <div className="d-flex py-10">
            <div className="flex-1"></div>
            <div className="flex-1 text-center">
              <p className="f-18 f-w-500 l-h-normal txt-primary mb-4">Buy Points</p>
              <p className="f-12 f-w-500 l-h-normal txt-primary">One time purchase</p>
            </div>
            <div className="flex-1 text-center">
              <p className="f-18 f-w-500 l-h-normal txt-primary mb-4">Subscribe</p>
              <p className="f-12 f-w-500 l-h-normal txt-primary">and get more!</p>
            </div>
          </div>

          {pointsPackageList?.map((item, index) => (
            <div key={index} className="row-border-top">
              <div className="d-flex align-center py-10">
                <div className="flex-1 text-center">
                  <p className="f-16 f-w-600 l-h-normal txt-secondary">${item.cost}</p>
                  {item.isValuePack && (
                    <Chip label="Value Pack" color="secondary" className="MuiChip-exSmall" />
                  )}
                </div>
                <div className="flex-1 text-center">
                  <Button
                    variant="outlined"
                    color="inherit"
                    className="minw-96 MuiButton-sizeMedium text-secondary px-12"
                    // onClick={() => selectedPointsPackage(item, false)}
                    onClick={() =>
                      navigate(routes.mySubscriptionPayment, {
                        state: {
                          selectedPoints: item,
                          subscription: false,
                          ...state
                        }
                      })
                    }>
                    <img
                      className="img subscription-button-img mr-8"
                      src={SwarayWhiteLogo}
                      alt="Swaray Logo"
                    />
                    {item.oneTime}
                  </Button>
                </div>
                <div className="flex-1 text-center">
                  <Button
                    disabled={state.pointsPackageName === PointsPackageType.crypto}
                    variant="contained"
                    color="secondary"
                    className="minw-96 MuiButton-sizeMedium text-secondary px-12"
                    // onClick={() => selectedPointsPackage(item, true)}
                    onClick={() => handleSubscriptionForCrypto(item)}>
                    <img
                      className="img subscription-button-img mr-8"
                      src={SwarayWhiteLogo}
                      alt="Swaray Logo"
                    />
                    {item.subscription}
                  </Button>
                </div>
              </div>

              {/* Forgot Modal design */}
              {/* <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                className="purchase-coins-modal"
                open={open}>
                <DialogContent>
                  <div className="d-flex align-center mb-24">
                    <IconButton onClick={handleClose} aria-label="close">
                      <CloseIcon className="f-24 txt-secondary mr-24" />
                    </IconButton>
                    <div className="flex-1 text-center">
                      <p className="f-18 f-w-700 l-h-normal txt-primary pr-20">Purchase Points</p>
                    </div>
                  </div>
                  <div className="d-flex align-center mb-20">
                    <div>
                      <p className="f-16 f-w-600 l-h-normal txt-secondary">
                        ${selectedPoints?.cost}
                      </p>
                      {selectedPoints?.isValuePack && (
                        <Chip label="Value Pack" color="secondary" className="MuiChip-exSmall" />
                      )}
                    </div>
                    <div className="flex-1 pl-16">
                      {isSubscription ? (
                        <Button
                          variant="contained"
                          color="secondary"
                          className="minw-96 MuiButton-sizeMedium text-secondary px-12"
                          onClick={() => selectedPointsPackage(item, true)}>
                          <img
                            className="img subscription-button-img mr-8"
                            src={SwarayWhiteLogo}
                            alt="Swaray Logo"
                          />
                          {selectedPoints?.subscription}
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="inherit"
                          className="minw-96 MuiButton-sizeMedium button-selected text-secondary px-12">
                          <img
                            className="img subscription-button-img mr-8"
                            src={SwarayWhiteLogo}
                            alt="Swaray Logo"
                          />
                          {selectedPoints?.oneTime}
                        </Button>
                      )}
                    </div>
                  </div>

                  <p className="f-18 f-w-500 l-h-22 txt-primary mw-300 mb-12">
                    Swaray Premium Subscription (2,000 Points)
                  </p>
                  <p className="f-14 f-w-400 l-h-normal txt-secondary mb-16">One time Purchase</p>

                  <List className="my-purchase-menu d-grid g-8">
                    <ListItem
                      onClick={() =>
                        navigate(routes.mySubscriptionPayment, {
                          state: {
                            selectedPoints,
                            subscription: isSubscription
                          }
                        })
                      }
                      className="Mui-selected">
                      <div className="d-flex align-center justify-between w-100">
                        <div className="flex-1">
                          <ListItemText primary="Pay with Card" />
                          <p className="f-12 f-w-400 l-h-18 txt-secondary mt-6">
                            Buy Points with your Credit Card or Bank Account with Stripe.
                          </p>
                        </div>
                        <KeyboardArrowRightIcon className="txt-secondary" />
                      </div>
                    </ListItem>
                    <ListItem disabled={!isSubscription && state.isWalletActive ? false : true}>
                      <div className="d-flex align-center justify-between w-100">
                        <div className="flex-1">
                          <ListItemText primary="Pay with Crypto" />
                          <p className="f-12 f-w-400 l-h-18 txt-secondary mt-6">
                            Top off your balance with Crypto using your MetaMask Wallet.
                          </p>
                        </div>
                        <KeyboardArrowRightIcon className="txt-secondary" />
                      </div>
                    </ListItem>
                  </List>
                </DialogContent>
              </Dialog> */}
            </div>
          ))}
          <div className="mt-24">
            <p className="f-12 f-w-500 l-h-18 txt-tertiary mb-12">
              When you buy Swaray Points you receive only a limited, non-refundable,
              non-transferable, revocable license to use Swaray Points, which has no value in real
              currency. By selecting one of the Points Packages, (1) you agree that you are over 18
              and that you authorize us to charge your account every month until you cancel the
              subscription, and (2) you represent that you understand and agree to the Terms of Use,
              which includes an agreement to arbitrate any dispute between you and Swaray, and
              Privacy Policy. You can cancel at any time by clicking “Cancel subscription” on the
              billing tab of the setting page. If you cancel, you will still be charged for the
              current billing period. See Terms of Use for other limitations.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(MySubscriptionPage);
