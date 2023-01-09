import React, { useState } from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult } from 'firebase/auth';
import OtpInput from 'react-otp-input';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

//Material Design
import { Button, FormControl } from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';
import { app, Client } from '../../config';
import { SignIn } from '../../common/interface/signIn.interface';
import { apiRoutes } from '../../constants/apiRoutes';
import routes from '../../constants/routes';
import { Errors } from '../../constants/errors';
import { AppLoader } from '../../components';
import { useDeviceId } from '../../hooks';

interface IurlState extends SignIn {
  isPhoneNumberVerified: boolean;
  userId: string;
  isForgotPasswordPage: boolean;
}
interface Istate {
  verifyOtp: {
    recaptchaVerifier: ConfirmationResult;
  };
}

function VerifyOtpScreen() {
  const [otp, setOtp] = useState('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [verifyOtp, setverifyOtp] = useState<ConfirmationResult>();

  // app.settings.appVerificationDisabledForTesting = true;

  const deviceId = useDeviceId();

  const { state } = useLocation() as { state: IurlState };

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const recaptchaDetails: ConfirmationResult = useSelector(
    (state: Istate) => state.verifyOtp.recaptchaVerifier
  );

  /* TODO: Need to change from inline css to scss after demo */
  const optInputStyle = {
    width: '30px',
    height: '50px',
    backgroundColor: 'transparent',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    borderBottom: '1px solid white',
    color: 'white',
    fontSize: '36px',
    fontWeight: 'bold',
    outline: 'none'
  };

  const sendOtp = async () => {
    const reCaptchaVerifier = new RecaptchaVerifier(
      'request-otp',
      {
        size: 'normal'
      },
      app
    );
    const phoneNumber = `+91${state.phoneNumber}`;
    const getResult = await signInWithPhoneNumber(app, phoneNumber, reCaptchaVerifier);
    setverifyOtp(getResult);
  };

  const confirmOtp = async () => {
    setIsLoading(true);
    if (otp) {
      const verified = verifyOtp
        ? await verifyOtp?.confirm(otp)
        : await recaptchaDetails.confirm(otp);
      if (!state.isForgotPasswordPage) {
        const isVerified = await Client.patch(`${apiRoutes.verifyUser}${state.userId}`, {
          firebaseUid: verified.user.uid,
          deviceId
        });
        if (isVerified.data.data.isVerified) {
          navigate(routes.trustDevicePage, {
            state: isVerified.data.data
          });
        } else {
          setIsLoading(false);
          enqueueSnackbar(Errors.appError, {
            preventDuplicate: false,
            persist: false,
            variant: 'error'
          });
        }
      } else {
        const { data } = await Client.patch(apiRoutes.forgotPassword, {
          firebaseUid: verified.user.uid
        });
        if (data?.data) {
          navigate(routes.newPassword, {
            state: data?.data
          });
        } else {
          setIsLoading(false);
          enqueueSnackbar(Errors.appError, {
            preventDuplicate: false,
            persist: false,
            variant: 'error'
          });
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="py-50 px-24">
        <div className="flex-1 d-flex flex-column justify-center text-center">
          <h1 className="f-28 f-w-700 l-h-normal txt-primary text-center mb-48">
            Enter the code we
            <br /> just texted you 💬
          </h1>
          <div className="px-40">
            <FormControl variant="outlined" fullWidth>
              <OtpInput
                value={otp}
                onChange={(otp: string) => setOtp(otp)}
                numInputs={6}
                containerStyle={{ justifyContent: 'center' }}
                inputStyle={optInputStyle}
                separator={<span style={{ marginLeft: '10px' }} />}
              />
            </FormControl>
          </div>
        </div>
        <div id="request-otp"></div>
        <div className="w-100 text-center mb-30 mt-80">
          <Button
            onClick={sendOtp}
            className="d-inline-block f-18 f-w-700 l-h-22 txt-primary text-center mb-24">
            I didn’t receive my code
          </Button>
          <Button onClick={confirmOtp} variant="contained" color="primary" size="large" fullWidth>
            Submit
          </Button>
        </div>
      </div>
      <AppLoader loading={isLoading} />
    </>
  );
}

export default React.memo(VerifyOtpScreen);
