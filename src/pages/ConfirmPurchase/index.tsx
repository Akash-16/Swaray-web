import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

//Material Design
import { FormControl, Button } from '@mui/material';
import { Input } from '../../components';

import { AppLoader } from '../../components';
import { PoinstPackageList } from '../../common/interface/pointsPackage.interface';

import { CartHeader, PaymentTerms } from '../../components';

//styles
import './style.scss';
import { Client } from '../../config';
import { apiRoutes } from '../../constants/apiRoutes';
import { PaymentType, Currency } from '../../common/enum/subscription.enum';
import { CardsDetails } from '../../common/interface/CardsDetails.interface';
import { SuccessMessage } from '../../constants/successMessage';
import { Errors } from '../../constants/errors';

interface Istate {
  selectedPoints: PoinstPackageList;
  subscription: boolean;
}

interface UserDetails {
  userDetails: UserDetails;
  isLoading: boolean;
}

interface LoggedInUser {
  userDetails: {
    userDetails: UserDetails;
    isLoading: boolean;
  };
}

const ConfirmPurchase = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { state } = useLocation();

  const { enqueueSnackbar } = useSnackbar();

  const { isLoading }: UserDetails = useSelector(
    (state: LoggedInUser) => state?.userDetails
  );

  const { selectedPoints, subscription } = state as Istate;

  const {
    data,
    isLoading: cardLoading,
    refetch,
  } = useQuery('cardsList', () => Client.get(apiRoutes.cardList));

  const cardsList: CardsDetails[] = data?.data.data;

  const makePayment = async () => {
    setLoading(true);
    const paymentBody = {
      productId: subscription
        ? selectedPoints.stripeProductId.subscription
        : selectedPoints.stripeProductId.oneTime,
      paymentMethod: subscription
        ? PaymentType.SUBSCRIPTION
        : PaymentType.PAYMENT,
      currency: Currency.USD,
    };
    const response = await Client.post(apiRoutes.stripeCheckout, paymentBody);
    if (response.data) {
      setLoading(false);
      // eslint-disable-next-line no-restricted-globals
      location.href = response.data.data;
    } else {
      setLoading(false);
      const {
        response: {
          data: { message, statusCode },
        },
      } = response as AxiosError | any;

      enqueueSnackbar(message, {
        preventDuplicate: false,
        persist: false,
        variant: 'error',
      });
    }
  };

  const removeCard = async (cardId: string) => {
    setLoading(true);
    try {
      const { data } = await Client.delete(`${apiRoutes.deleteCard}${cardId}`);
      if (data.data) {
        enqueueSnackbar(SuccessMessage.removeCard, {
          preventDuplicate: false,
          persist: false,
          variant: 'error',
        });
        refetch();
      }
    } catch (err) {
      enqueueSnackbar(Errors.appError, {
        preventDuplicate: false,
        persist: false,
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='my-subscription-content p-24'>
        <div className='d-flex flex-column justify-between h-100'>
          <div>
            <h3 className='f-18 f-w-500 l-h-normal txt-primary text-center mb-24'>
              Checkout
            </h3>

            <CartHeader
              selectedPoints={selectedPoints}
              subscription={subscription}
            />

            {/* Subtotal Page Details */}
            <div className='my-20'>
              <div className='border-top-light py-16'>
                <div className='d-flex justify-between'>
                  <p className='f-16 f-w-400 l-h-normal txt-primary'>
                    Subtotal
                  </p>
                  <p className='f-16 f-w-400 l-h-normal txt-color-primary'>
                    ${selectedPoints.cost}
                  </p>
                </div>
                <div className='d-flex justify-between mt-10'>
                  <p className='f-16 f-w-400 l-h-normal txt-primary'>
                    Processing Fee{' '}
                    <span className='f-12'>(30 cents + 2.9%)</span>
                  </p>
                  <p className='f-16 f-w-400 l-h-normal txt-color-primary'>
                    $0.51
                  </p>
                </div>
              </div>

              <div className='d-flex justify-between py-12 border-top-light border-bottom-light'>
                <p className='f-16 f-w-700 l-h-normal txt-primary'>Total</p>
                <p className='f-16 f-w-400 l-h-normal txt-color-primary'>
                  ${selectedPoints.totalAmount}
                </p>
              </div>
            </div>

            {/* Card Details */}
            <div>
              <p className='f-18 f-w-500 l-h-normal txt-primary'>
                Payment Details
              </p>
              {cardsList?.length ? (
                <p className='f-14 f-w-400 l-h-normal txt-primary mt-20 mb-16'>
                  Your Save Card Details
                </p>
              ) : (
                <p className='f-14 f-w-400 l-h-normal txt-primary mt-20 mb-16 text-center'>
                  Card not found
                </p>
              )}

              {cardsList?.map((item, index) => (
                <div
                  key={index}
                  className='d-flex align-center justify-between mb-16'
                >
                  <div>
                    <p className='f-14 f-w-400 l-h-normal txt-tertiary mb-6'>
                      {item.isCreditCard ? 'Credit Card' : 'Debit Card'}
                    </p>
                    <p className='f-14 f-w-400 l-h-normal txt-primary'>
                      {item.nameOnCard}
                    </p>
                    <p className='f-14 f-w-400 l-h-normal txt-primary mt-4'>
                      .... .... .... {item.cardNumber}
                    </p>
                    <p className='f-14 f-w-400 l-h-normal txt-tertiary mt-6'>{`${item.expiryMonth}/${item.expiryYear}`}</p>
                  </div>
                  <Button
                    onClick={() => removeCard(item.cardId)}
                    variant='contained'
                    color='primary'
                    size='small'
                  >
                    Remove Card
                  </Button>
                </div>
              ))}
            </div>

            {/* Add Card Form Section */}
            {/* <div>
                <p className="f-18 f-w-500 l-h-normal txt-primary">Payment Details</p>

                <div className="mt-24">
                  <FormControl variant="outlined" fullWidth className="mb-16">
                    <label className="form-label">Name On Card</label>
                    <Input id="outlined-adornment-weight" placeholder="Name" />
                  </FormControl>
                  <div className="d-flex c-g-20">
                    <FormControl variant="outlined" fullWidth className="flex-2 mb-16">
                      <label className="form-label">Card Number</label>
                      <Input id="outlined-adornment-weight" placeholder="000-000-000-000" />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth className="flex-1 mb-16">
                      <label className="form-label">CVC</label>
                      <Input id="outlined-adornment-weight" placeholder="123" />
                    </FormControl>
                  </div>
                  <div className="d-flex c-g-20">
                    <FormControl variant="outlined" fullWidth className="mb-16">
                      <label className="form-label">Expiration Date</label>
                      <Input id="outlined-adornment-weight" placeholder="MM / DD" />
                    </FormControl>
                    <FormControl variant="outlined" fullWidth className="mb-16">
                      <label className="form-label">Postal Code</label>
                      <Input id="outlined-adornment-weight" placeholder="123" />
                    </FormControl>
                  </div>
                </div>
              </div> */}

            <PaymentTerms />
          </div>
          <div className='pb-24'>
            {/* Add card payments */}
            <Button
              onClick={makePayment}
              variant='contained'
              color='secondary'
              size='large'
              fullWidth
            >
              Confirm Purchase
            </Button>
          </div>
        </div>
      </div>
      <AppLoader loading={isLoading || loading || cardLoading} />
    </>
  );
};

export default React.memo(ConfirmPurchase);
